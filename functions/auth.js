/**
 * Cloudflare Pages Function — Decap CMS GitHub OAuth /auth
 *
 * 三种用途:
 * 1. Decap CMS 初始化时 fetch GET /auth (Accept: application/json)
 *    → 返回 JSON { app_id, providers } 获取 OAuth 配置
 * 2. 无 provider 参数的浏览器 GET /auth (老式兼容)
 *    → 302 重定向到 GitHub OAuth 授权页面
 * 3. 有 provider 参数的浏览器 GET /auth?provider=github&site_id=xxx (标准流程)
 *    → 返回 HTML 页面发送 handshake postMessage，然后重定向到 GitHub
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const clientId = env.GITHUB_OAUTH_CLIENT_ID || 'Ov23liCcYA5s6BHU1wPi';
  const accept = request.headers.get('Accept') || '';
  const provider = url.searchParams.get('provider');

  // Decap CMS 通过 fetch 获取 OAuth 配置 → 返回 JSON
  if (accept.includes('application/json')) {
    return Response.json({
      providers: ['github'],
      version: '1.0.0',
      app_id: clientId,
      auth_scope: 'repo',
    });
  }

  const origin = new URL(request.url).origin;
  const redirectUri = `${origin}/callback`;

  const authUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&scope=repo,user` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  // 标准 OAuth 弹窗流程 (NetlifyAuthenticator):
  // 先发送 handshake postMessage，再跳转到 GitHub
  if (provider) {
    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>授权中...</title></head>
<body style="background:#f1f5f9;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:system-ui,sans-serif;">
  <p style="color:#64748b;">正在跳转到 GitHub 授权...</p>
  <script>
    (function() {
      // 发送 handshake 消息给 Decap CMS
      try {
        window.opener.postMessage('authorizing:${provider}', '*');
      } catch(e) {
        console.error('Handshake postMessage failed:', e);
      }
      // 短暂延迟后跳转到 GitHub OAuth
      setTimeout(function() {
        window.location.href = ${JSON.stringify(authUrl)};
      }, 200);
    })();
  </script>
</body>
</html>`;
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // 无 provider 参数的浏览器请求 → 直接重定向到 GitHub
  return Response.redirect(authUrl, 302);
}
