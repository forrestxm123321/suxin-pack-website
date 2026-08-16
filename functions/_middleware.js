/**
 * 全局中间件：www.suxinpack.cn → suxinpack.cn 301 跳转
 * 防止 www 与主域重复内容，统一收录权重
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);

  // www 子域名 301 到主域名（保留路径和查询参数）
  if (url.hostname === 'www.suxinpack.cn') {
    const target = `https://suxinpack.cn${url.pathname}${url.search}`;
    return Response.redirect(target, 301);
  }

  return context.next();
}
