import { readdirSync, statSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distPath = join(__dirname, '../dist');

const getFileSize = (filePath) => {
  const stats = statSync(filePath);
  return (stats.size / 1024).toFixed(2);
};

const analyzeBundle = () => {
  console.log('\n📊 Bundle Size Analysis\n');

  const files = readdirSync(distPath);
  let totalSize = 0;
  let runtimeSize = 0;

  files.forEach((file) => {
    if (file.endsWith('.map')) return;

    const filePath = join(distPath, file);
    const size = parseFloat(getFileSize(filePath));

    if (!file.endsWith('.d.ts')) {
      runtimeSize += size;
    }
    totalSize += size;

    const emoji = file.endsWith('.js')
      ? '📦'
      : file.endsWith('.css')
        ? '🎨'
        : '📄';

    console.log(`${emoji} ${file}: ${size} KB`);
  });

  console.log(`\n✨ Runtime Bundle: ${runtimeSize.toFixed(2)} KB`);
  console.log(`📦 Total (with types): ${totalSize.toFixed(2)} KB`);

  const maxSize = 52;
  if (runtimeSize > maxSize) {
    console.log(
      `\n⚠️  Warning: Runtime bundle (${runtimeSize.toFixed(2)} KB) exceeds target (${maxSize} KB)`
    );
    process.exit(1);
  } else {
    console.log(`\n✅ Runtime bundle is within target (${maxSize} KB)\n`);
  }
};

analyzeBundle();
