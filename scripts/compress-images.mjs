/**
 * 构建前自动压缩上传图片（scripts/compress-images.mjs）
 * 作用：扫描 public/images/uploads 下超过阈值的图片，自动压缩到合理尺寸
 * 触发：npm run build 前自动执行（package.json prebuild）
 * 效果：后台（CMS）上传的大图，在每次构建时自动被压缩，无需手动处理
 */
import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

const UPLOADS_DIR = join(process.cwd(), 'public', 'images', 'uploads');
const MAX_BYTES = 300 * 1024;      // 超过 300KB 才处理
const MAX_WIDTH = 1200;            // 压缩到最宽 1200px
const JPEG_QUALITY = 82;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function compressFile(filePath, name) {
  const meta = await sharp(filePath).metadata();
  const width = meta.width || 0;
  const options = { width: Math.min(width, MAX_WIDTH), withoutEnlargement: true };
  let output;

  if (meta.format === 'png') {
    output = await sharp(filePath).resize(options).png({ compressionLevel: 9, palette: width > 800 ? false : true }).toBuffer();
  } else if (meta.format === 'webp') {
    output = await sharp(filePath).resize(options).webp({ quality: JPEG_QUALITY }).toBuffer();
  } else {
    output = await sharp(filePath).resize(options).jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
  }

  // 只在压缩后更小才覆盖（防止 PNG 转 JPEG 变大）
  if (output.length < statSync(filePath).size) {
    writeFileSync(filePath, output);
    console.log(`  ✓ 压缩 ${name}: ${(statSync(filePath).size / 1024).toFixed(0)}KB`);
    return true;
  }
  return false;
}

async function main() {
  try {
    const files = readdirSync(UPLOADS_DIR).filter((f) => EXTENSIONS.has(join(f).slice(join(f).lastIndexOf('.'))));
    let compressed = 0;
    for (const name of files) {
      const filePath = join(UPLOADS_DIR, name);
      const size = statSync(filePath).size;
      if (size > MAX_BYTES) {
        try {
          if (await compressFile(filePath, name)) compressed++;
        } catch (e) {
          console.error(`  ✗ 跳过 ${name}: ${e.message}`);
        }
      }
    }
    console.log(`[compress-images] 完成，压缩 ${compressed} 张图片`);
  } catch (e) {
    console.error('[compress-images] 失败:', e.message);
  }
}

main();
