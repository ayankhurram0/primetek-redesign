const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next')) {
        results = results.concat(getFiles(file));
      }
    } else {
      if (file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = getFiles('c:/Users/ayank/OneDrive/Documents/primetek-redesign/app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Remove the comment
  content = content.replace(/\s*\{\/\*\s*Rich Gradient Background\s*\*\/\}\s*/g, '');
  
  // Remove the absolute gradient backgrounds
  content = content.replace(/\s*<div className=\"absolute inset-0 bg-gradient-to-b from-\[#020817\][^>]*\/>/g, '');
  content = content.replace(/\s*<div className=\"absolute top-0 left-0 w-full h-full bg-\[radial-gradient[^>]*\/>/g, '');
  content = content.replace(/\s*<div className=\"absolute bottom-0 right-0 w-full h-full bg-\[radial-gradient[^>]*\/>/g, '');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Modified ' + file);
  }
});
