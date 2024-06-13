import fs from 'node:fs';
import path from 'path';
import archiver from 'archiver'; 
import { Plugin } from 'vite'
export default function zipPlugin ({ outputPath = '', zipName = ''} = {}): Plugin {
  return {
    name: 'vite:zip',
    configResolved(resolvedConfig) {
      const projectPath = resolvedConfig.root
      const pkgPath = path.resolve(projectPath, 'package.json');  
      const distPath = outputPath || path.resolve(projectPath, resolvedConfig.build.outDir);
      const pkgContent = fs.readFileSync(pkgPath, 'utf8'); 
      const {name = 'dist'} = JSON.parse(pkgContent);

      if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath);
      }

      const output = fs.createWriteStream(path.join(distPath, `${zipName || name}.zip`));
      const archive = archiver('zip', {
        zlib: { level: 9 } // 设置压缩级别
      });
      archive.pipe(output);
      // 打包 dist 目录
      archive.directory('./dist', false);
      // 完成打包
      archive.finalize();
    }
  }
}
module.exports = zipPlugin
zipPlugin["default"] = zipPlugin;