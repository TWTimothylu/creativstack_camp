const fs = require('fs');

const files = [
    'course-robotics.html',
    'course-roblox.html',
    'course-scratch.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Make sure we only add it once
    if (content.includes('<video ') && !content.includes('autoplay loop muted')) {
        content = content.replace(
            /<video /g,
            '<video autoplay loop muted '
        );
        fs.writeFileSync(file, content, 'utf-8');
    }
});

console.log('Videos updated to autoplay, loop, and muted.');
