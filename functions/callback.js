/**
 * Cloudflare Pages Function — Decap CMS GitHub OAuth /callback
 *
 * GitHub 授权用户后，将 popup 重定向到这个 URL 并附带 ?code=xxx。
 * 本函数用授权码换取 access token，然后通过 postMessage 将
 * token 以 NetlifyAuthenticator 期望的格式发送回 Decap CMS 主窗口，
 * 最后关闭 popup。
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing authorization code', { status: 400 });
  }

  const clientId = env.GITHUB_OAUTH_CLIENT_ID || 'Ov23liCcYA5s6BHU1wPi';
  const clientSecret = env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientSecret) {
    return new Response('Server misconfiguration: OAuth secret not set', { status: 500 });
  }

  try {
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
        }),
      }
    );

    const data = await tokenResponse.json();

    if (data.error) {
      return new Response(
        `GitHub OAuth error: ${data.error_description || data.error}`,
        { status: 401 }
      );
    }

    // NetlifyAuthenticator 期望的格式:
    // postMessage("authorization:github:success:" + JSON.stringify({token, ...}), origin)
    const authPayload = JSON.stringify({
      token: data.access_token,
      ...(data.refresh_token ? { refresh_token: data.refresh_token } : {}),
      ...(data.scope ? { scope: data.scope } : {}),
    });

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>授权成功</title></head>
<body style="background:#f1f5f9;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:system-ui,sans-serif;">
  <p style="color:#64748b;">授权成功，正在跳转...</p>
  <script>
    (function() {
      try {
        var payload = ${JSON.stringify(authPayload)};
        // NetlifyAuthenticator 格式: "authorization:github:success:{...}"
        var message = 'authorization:github:success:' + payload;
        window.opener.postMessage(message, '*');
        setTimeout(function() { window.close(); }, 500);
      } catch (e) {
        document.body.innerHTML = '<p style="color:#ef4444;">授权失败: ' + e.message + '</p>';
      }
    })();
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error('OAuth callback error:', err);
    return new Response('Internal server error during OAuth', { status: 500 });
  }
}
