const fs = require('fs');

const files = [
    'course-robotics.html',
    'course-roblox.html',
    'course-scratch.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Extract the logistics block
    const match = content.match(/(\s*<div class="course-logistics"[\s\S]*?<\/div>)/);
    if(match) {
        const logisticsBlock = match[1];
        
        // Remove it from its current position
        content = content.replace(logisticsBlock, '');
        
        // Insert it right before the dummy photo block
        content = content.replace(
            /(\s*<!-- 預留圖片\/影片空間 -->)/,
            `${logisticsBlock}$1`
        );
        
        fs.writeFileSync(file, content, 'utf-8');
    }
});

console.log('Fixed logistics block placement.');
