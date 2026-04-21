const fs = require('fs');

const files = [
    'course-robotics.html',
    'course-roblox.html',
    'course-scratch.html'
];

// Fix alignment of icon in course pages
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Fix robotics
    content = content.replace(
        /.info-list i \{\s*color: var\(--lego-blue\);\s*width: 25px;\s*text-align: center;\s*font-size: 1.2rem;\s*background: rgba\(59, 130, 246, 0.1\);\s*padding: 10px;\s*border-radius: 50%;\s*\}/g,
        `.info-list i { color: var(--lego-blue); display: flex; justify-content: center; align-items: center; width: 45px; height: 45px; flex-shrink: 0; font-size: 1.2rem; background: rgba(59, 130, 246, 0.1); border-radius: 50%; }`
    );

    // Fix roblox
    content = content.replace(
        /.info-list i \{\s*color: var\(--lego-red\);\s*width: 25px;\s*text-align: center;\s*font-size: 1.2rem;\s*background: rgba\(255, 77, 77, 0.1\);\s*padding: 10px;\s*border-radius: 50%;\s*\}/g,
        `.info-list i { color: var(--lego-red); display: flex; justify-content: center; align-items: center; width: 45px; height: 45px; flex-shrink: 0; font-size: 1.2rem; background: rgba(255, 77, 77, 0.1); border-radius: 50%; }`
    );

    // Fix scratch
    content = content.replace(
        /.info-list i \{\s*color: var\(--lego-green\);\s*width: 25px;\s*text-align: center;\s*font-size: 1.2rem;\s*background: rgba\(16, 185, 129, 0.1\);\s*padding: 10px;\s*border-radius: 50%;\s*\}/g,
        `.info-list i { color: var(--lego-green); display: flex; justify-content: center; align-items: center; width: 45px; height: 45px; flex-shrink: 0; font-size: 1.2rem; background: rgba(16, 185, 129, 0.1); border-radius: 50%; }`
    );

    fs.writeFileSync(file, content, 'utf-8');
});

// Fix 預購價 -> 早鳥價 in all HTML files
const allFiles = [...files, 'index.html'];
allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/預購價/g, '早鳥價');
    fs.writeFileSync(file, content, 'utf-8');
});

console.log('Update complete.');
