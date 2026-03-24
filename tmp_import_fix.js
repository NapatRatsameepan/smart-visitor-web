const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      if (content.includes('useLanguageStore') && !content.includes('from "@/store/useLanguageStore"')) {
        console.log('Adding import to:', fullPath);
        
        // Find the first import statement
        const importMatch = content.match(/^import .*?$/m);
        if (importMatch) {
            content = content.replace(importMatch[0], importMatch[0] + '\nimport { useLanguageStore } from "@/store/useLanguageStore"');
        } else {
            // Unlikely, but if no imports exist
            content = '"use client"\nimport { useLanguageStore } from "@/store/useLanguageStore"\n' + content;
        }
        
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processDir('c:/Users/Admin_Bnn/Desktop/SmartVisitor/smart-visitor-web/app');
console.log('Import fix script done!');
