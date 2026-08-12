/**
 * Cloudflare Pages Function - 联系表单处理
 * POST /api/contact
 *
 * 1. 发送邮件通知到管理员邮箱（CMS中设置）
 * 2. 同时存储到 GitHub 仓库作为备份
 */

const GITHUB_REPO = 'forrestxm123321/suxin-pack-website';

/** 从 GitHub 读取 site.json 获取通知邮箱 */
async function getNotificationEmail(ghToken) {
  try {
    const resp = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/src/data/site.json`,
      {
        headers: {
          Authorization: `Bearer ${ghToken}`,
          Accept: 'application/vnd.github.v3.raw',
          'User-Agent': 'suxin-pack-contact',
        },
      }
    );
    if (resp.ok) {
      const data = await resp.json();
      return data?.SITE?.notificationEmail || data?.SITE?.email || '';
    }
  } catch (e) {
    console.error('Failed to read site.json:', e);
  }
  return '';
}

/** 通过 MailChannels 发送邮件（Cloudflare Workers 免费方案） */
async function sendEmail(toEmail, subject, body) {
  try {
    const resp = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: toEmail }] }],
        from: {
          email: 'noreply@suxin-pack.pages.dev',
          name: '塑鑫包装网站询价',
        },
        subject,
        content: [{ type: 'text/plain', value: body }],
      }),
    });
    return resp.ok;
  } catch (e) {
    console.error('Email send failed:', e);
    return false;
  }
}

/** 存储到 GitHub 作为备份 */
async function saveToGithub(ghToken, filename, content) {
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filename}`;
    const body = {
      message: `📨 新询价: ${filename}`,
      content: btoa(unescape(encodeURIComponent(content))),
      branch: 'main',
    };
    const resp = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${ghToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'suxin-pack-contact',
      },
      body: JSON.stringify(body),
    });
    return resp.ok;
  } catch (e) {
    console.error('GitHub save failed:', e);
    return false;
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const GITHUB_TOKEN = env.GITHUB_PAT;

  try {
    const body = await request.json();
    const { name, phone, company, email, message, website } = body;

    // Honeypot
    if (website) {
      return Response.json({ success: false, error: 'Spam detected' }, { status: 400 });
    }

    // 验证
    if (!name || !phone || !message) {
      return Response.json(
        { success: false, error: '请填写必填字段：姓名、电话、留言' },
        { status: 400 }
      );
    }

    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return Response.json({ success: false, error: '手机号格式不正确' }, { status: 400 });
    }

    if (name.length > 50 || message.length > 2000) {
      return Response.json({ success: false, error: '输入内容过长' }, { status: 400 });
    }

    // 时间戳
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const ts = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
    const safeName = name.replace(/[^a-zA-Z一-龥0-9]/g, '_').substring(0, 20);
    const filename = `data/submissions/${ts}_${safeName}.json`;

    const emailBody = [
      `========================================`,
      `       塑鑫包装网站 - 新询价/咨询`,
      `========================================`,
      ``,
      `  姓名：${name}`,
      `  电话：${phone}`,
      `  公司：${company || '未填写'}`,
      `  邮箱：${email || '未填写'}`,
      ``,
      `  留言内容：`,
      `  ${message}`,
      ``,
      `========================================`,
      `  提交时间：${now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`,
      `========================================`,
    ].join('\n');

    const submission = JSON.stringify(
      { name, phone, company: company || '', email: email || '', message, submittedAt: now.toISOString() },
      null,
      2
    );

    // 并行处理：发邮件 + 存GitHub
    const [emailSent, githubSaved] = await Promise.all([
      GITHUB_TOKEN
        ? getNotificationEmail(GITHUB_TOKEN).then((to) =>
            to ? sendEmail(to, `[网站询价] ${name} - ${phone}`, emailBody) : false
          )
        : Promise.resolve(false),
      GITHUB_TOKEN ? saveToGithub(GITHUB_TOKEN, filename, submission) : Promise.resolve(false),
    ]);

    return Response.json({
      success: true,
      message: '提交成功，我们将尽快与您联系！',
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return Response.json(
      { success: false, error: '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
}

export async function onRequestGet() {
  return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
}
