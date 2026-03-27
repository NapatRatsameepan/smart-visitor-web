const fs = require('fs');

function patchFile(file, replacements) {
    if(fs.existsSync(file)) {
        let c = fs.readFileSync(file, 'utf8');
        for (let k in replacements) {
            c = c.split(k).join(replacements[k]);
        }
        fs.writeFileSync(file, c);
    }
}

try {
    const src = 'c:/Smart-visitor/smart-visitor-web/app/admin/[id]/edit/page.tsx';
    const content = fs.readFileSync(src, 'utf8');

    // 1. Move to admin/guard
    fs.mkdirSync('c:/Smart-visitor/smart-visitor-web/app/admin/guard/[id]/edit', { recursive: true });
    let adminContent = content.replace(/router\.push\("\/guard"\)/g, 'router.push("/admin/guard")');
    fs.writeFileSync('c:/Smart-visitor/smart-visitor-web/app/admin/guard/[id]/edit/page.tsx', adminContent);

    // 2. Copy to super-admin/guard
    fs.mkdirSync('c:/Smart-visitor/smart-visitor-web/app/super-admin/guard/[id]/edit', { recursive: true });
    let saContent = content.replace(/router\.push\("\/guard"\)/g, 'router.push("/super-admin/guard")');
    fs.writeFileSync('c:/Smart-visitor/smart-visitor-web/app/super-admin/guard/[id]/edit/page.tsx', saContent);

    // 3. Fix brand files
    patchFile('c:/Smart-visitor/smart-visitor-web/app/super-admin/brand/[id]/edit/page.tsx', {
        'router.push("/brand")': 'router.push("/super-admin/brand")'
    });
    patchFile('c:/Smart-visitor/smart-visitor-web/app/super-admin/brand/new/page.tsx', {
        'router.push("/brand")': 'router.push("/super-admin/brand")'
    });

    // 4. Delete old orphaned dir
    fs.unlinkSync(src);
    fs.rmdirSync('c:/Smart-visitor/smart-visitor-web/app/admin/[id]/edit');
    fs.rmdirSync('c:/Smart-visitor/smart-visitor-web/app/admin/[id]');

    console.log("GUARD_FIX_DONE");
} catch(e) {
    console.error(e);
}
