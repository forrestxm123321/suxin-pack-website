/**
 * GET  /api/submissions        — 列出所有询价记录
 * GET  /api/submissions?file=  — 获取单条内容
 * DELETE /api/submissions?file=xxx.json&sha=xxx — 删除一条记录
 */
export async function onRequest(context) {
  const { request, env } = context;
  const GITHUB_TOKEN = env.GITHUB_PAT;

  if (!GITHUB_TOKEN) {
    return new Response(JSON.stringify({ error: '未配置 GITHUB_PAT 密钥' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  const url = new URL(request.url);
  const fileName = url.searchParams.get('file');
  const fileSha = url.searchParams.get('sha');
  const method = request.method;
  const apiBase = 'https://api.github.com/repos/forrestxm123321/suxin-pack-website/contents/data/submissions';
  const ghHeaders = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'cloudflare-pages-function',
  };

  // 解码 GitHub base64 内容（正确处理 UTF-8 中文）
  function decodeContent(b64) {
    const clean = b64.replace(/\s/g, '');
    const binary = atob(clean);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  }

  const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' };

  try {
    // ===== DELETE: 删除一条记录 =====
    if (method === 'DELETE') {
      if (!fileName || !fileSha) {
        return new Response(JSON.stringify({ error: '缺少 file 或 sha 参数' }), { status: 400, headers: jsonHeaders });
      }
      // 不允许删除 .gitkeep
      if (fileName === '.gitkeep') {
        return new Response(JSON.stringify({ error: '不能删除 .gitkeep' }), { status: 400, headers: jsonHeaders });
      }
      const fileUrl = `${apiBase}/${encodeURIComponent(fileName)}`;
      const delResp = await fetch(fileUrl, {
        method: 'DELETE',
        headers: { ...ghHeaders },
        body: JSON.stringify({
          message: `删除询价记录: ${fileName}`,
          sha: fileSha,
        }),
      });
      if (!delResp.ok) {
        const err = await delResp.text();
        return new Response(JSON.stringify({ error: `删除失败 (${delResp.status}): ${err}` }), {
          status: delResp.status, headers: jsonHeaders,
        });
      }
      return new Response(JSON.stringify({ success: true, message: '已删除' }), { headers: jsonHeaders });
    }

    // ===== GET: 获取单个文件内容 =====
    if (fileName) {
      const fileUrl = `${apiBase}/${encodeURIComponent(fileName)}`;
      const resp = await fetch(fileUrl, { headers: ghHeaders });
      if (!resp.ok) {
        return new Response(JSON.stringify({ error: `文件不存在 (${resp.status})` }), {
          status: resp.status, headers: jsonHeaders,
        });
      }
      const data = await resp.json();
      const content = JSON.parse(decodeContent(data.content));
      return new Response(JSON.stringify(content), { headers: jsonHeaders });
    }

    // ===== GET: 列出所有 submissions =====
    const resp = await fetch(apiBase, { headers: ghHeaders });
    if (!resp.ok) {
      if (resp.status === 404) {
        return new Response(JSON.stringify([]), { headers: jsonHeaders });
      }
      return new Response(JSON.stringify({ error: `GitHub API 错误 (${resp.status})` }), {
        status: resp.status, headers: jsonHeaders,
      });
    }

    const files = await resp.json();
    const submissions = (Array.isArray(files) ? files : [])
      .filter(f => f.name.endsWith('.json'))
      .map(f => ({
        name: f.name,
        path: f.path,
        sha: f.sha,
      }))
      .sort((a, b) => b.name.localeCompare(a.name));

    return new Response(JSON.stringify(submissions), { headers: jsonHeaders });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: jsonHeaders,
    });
  }
}
