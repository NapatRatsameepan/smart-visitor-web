// fix.js
const fs = require('fs');
const path = require('path');

function replaceAll(str, map) {
    for(let k in map) {
        str = str.split(k).join(map[k]);
    }
    return str;
}

function processDir(src, dest, replacements) {
    if (!fs.existsSync(src)) return;
    if (fs.statSync(src).isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(item => {
            processDir(path.join(src, item), path.join(dest, item), replacements);
        });
    } else {
        let content = fs.readFileSync(src, 'utf8');
        content = replaceAll(content, replacements);
        fs.writeFileSync(dest, content);
    }
}

try {
    // 1. admin -> super-admin for visit, guard, department
    processDir('c:/Smart-visitor/smart-visitor-web/app/admin/visit', 'c:/Smart-visitor/smart-visitor-web/app/super-admin/visit', {
        '"/admin/visit"': '"/super-admin/visit"',
        '"/visit"': '"/super-admin/visit"',
        '`/admin/visit/': '`/super-admin/visit/',
        'router.push("/visit")': 'router.push("/super-admin/visit")'
    });

    processDir('c:/Smart-visitor/smart-visitor-web/app/admin/guard', 'c:/Smart-visitor/smart-visitor-web/app/super-admin/guard', {
        '"/admin/guard"': '"/super-admin/guard"',
        '"/guard"': '"/super-admin/guard"',
        '`/admin/guard/': '`/super-admin/guard/',
        'router.push("/guard")': 'router.push("/super-admin/guard")'
    });

    processDir('c:/Smart-visitor/smart-visitor-web/app/admin/department', 'c:/Smart-visitor/smart-visitor-web/app/super-admin/department', {
        '"/admin/department"': '"/super-admin/department"',
        '"/department"': '"/super-admin/department"',
        '`/admin/department/': '`/super-admin/department/',
        'router.push("/department")': 'router.push("/super-admin/department")'
    });

    // 2. super-admin -> admin for accounts
    processDir('c:/Smart-visitor/smart-visitor-web/app/super-admin/accounts', 'c:/Smart-visitor/smart-visitor-web/app/admin/accounts', {
        '"/super-admin/accounts"': '"/admin/accounts"',
        '`/super-admin/accounts/': '`/admin/accounts/',
        'router.push("/admin")': 'router.push("/admin/accounts")'
    });

    // Fix existing bugs in original files
    function patchFile(file, replacements) {
        if(fs.existsSync(file)) {
            let c = fs.readFileSync(file, 'utf8');
            c = replaceAll(c, replacements);
            fs.writeFileSync(file, c);
        }
    }

    // Fix Original Super-Admin accounts
    patchFile('c:/Smart-visitor/smart-visitor-web/app/super-admin/accounts/new/page.tsx', {
        'router.push("/admin")': 'router.push("/super-admin/accounts")'
    });
    patchFile('c:/Smart-visitor/smart-visitor-web/app/super-admin/accounts/[id]/edit/page.tsx', {
        'router.push("/admin")': 'router.push("/super-admin/accounts")'
    });

    // Fix Cancel buttons in Original Admin visit/guard/department (they pushed to /visit instead of /admin/visit)
    patchFile('c:/Smart-visitor/smart-visitor-web/app/admin/visit/new/page.tsx', { 'router.push("/visit")': 'router.push("/admin/visit")' });
    patchFile('c:/Smart-visitor/smart-visitor-web/app/admin/visit/[id]/edit/page.tsx', { 'router.push("/visit")': 'router.push("/admin/visit")' });
    patchFile('c:/Smart-visitor/smart-visitor-web/app/admin/guard/new/page.tsx', { 'router.push("/guard")': 'router.push("/admin/guard")' });
    patchFile('c:/Smart-visitor/smart-visitor-web/app/admin/guard/[id]/edit/page.tsx', { 'router.push("/guard")': 'router.push("/admin/guard")' });
    patchFile('c:/Smart-visitor/smart-visitor-web/app/admin/department/new/page.tsx', { 'router.push("/department")': 'router.push("/admin/department")' });
    patchFile('c:/Smart-visitor/smart-visitor-web/app/admin/department/[id]/edit/page.tsx', { 'router.push("/department")': 'router.push("/admin/department")' });

    console.log("DONE");
} catch(e) {
    console.error(e);
}
