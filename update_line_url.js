const fs = require('fs');

const files = [
    'course-robotics.html',
    'course-roblox.html',
    'course-scratch.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace the default line URL with the one from spec.md
    if (content.includes('https://line.me/R/ti/p/@yourlineid')) {
        content = content.replace(
            /https:\/\/line\.me\/R\/ti\/p\/@yourlineid/g,
            'https://lin.ee/r2JlDBU'
        );
        fs.writeFileSync(file, content, 'utf-8');
    }
});

console.log('Fixed LINE URLs.');
