const fs = require('fs');

const files = [
    'course-robotics.html',
    'course-roblox.html',
    'course-scratch.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    if (content.includes('.price-box .early { color: var(--primary-color);')) {
        content = content.replace(
            /\.price-box \.early \{ color: var\(--primary-color\);/g,
            '.price-box .early { color: var(--lego-red);'
        );
        fs.writeFileSync(file, content, 'utf-8');
    }
});

console.log('Fixed early bird text color in all course pages.');
