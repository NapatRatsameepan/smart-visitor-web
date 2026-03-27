const fs = require('fs');
try {
  fs.cpSync('c:/Smart-visitor/smart-visitor-web/app/admin/visit', 'c:/Smart-visitor/smart-visitor-web/app/super-admin/visit', { recursive: true });
  console.log('visit copied');
  fs.cpSync('c:/Smart-visitor/smart-visitor-web/app/admin/guard', 'c:/Smart-visitor/smart-visitor-web/app/super-admin/guard', { recursive: true });
  console.log('guard copied');
  fs.cpSync('c:/Smart-visitor/smart-visitor-web/app/admin/department', 'c:/Smart-visitor/smart-visitor-web/app/super-admin/department', { recursive: true });
  console.log('department copied');
  fs.cpSync('c:/Smart-visitor/smart-visitor-web/app/super-admin/accounts', 'c:/Smart-visitor/smart-visitor-web/app/admin/accounts', { recursive: true });
  console.log('accounts copied');
} catch (e) {
  console.error(e);
}
