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
      
      const targetStatePattern = /const\s+\[lang,\s*setLang\]\s*=\s*useState\(['"]TH['"]\)\s*(?:\r?\n)*\s*const\s+isTH\s*=\s*lang\s*===\s*['"]TH['"]/;
      
      if (targetStatePattern.test(content)) {
        console.log('Processing:', fullPath);
        
        // 1. Replace state
        content = content.replace(targetStatePattern, 'const { isTH } = useLanguageStore()');
        
        // 2. Add import for useLanguageStore if not present
        if (!content.includes('useLanguageStore')) {
           // Insert after import React
           content = content.replace(/(import React.*?from\s+['"].*?['"];?)/m, '$1\nimport { useLanguageStore } from "@/store/useLanguageStore"');
        }
        
        // 3. Remove props from Headbar
        content = content.replace(/lang=\{lang\}\s*setLang=\{setLang\}\s*/g, '');
        
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processDir('c:/Users/Admin_Bnn/Desktop/SmartVisitor/smart-visitor-web/app');
console.log('Done script!');
