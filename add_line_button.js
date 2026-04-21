const fs = require('fs');

const files = [
    'course-robotics.html',
    'course-roblox.html',
    'course-scratch.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Check if LINE button already exists to avoid duplication
    if (!content.includes('fa-line')) {
        content = content.replace(
            /<a href="https:\/\/forms\.gle[^>]*>([\s\S]*?)<\/a>/,
            (match) => {
                return `${match}\n                <div style="margin-top: 15px;">\n                    <a href="https://line.me/R/ti/p/@yourlineid" target="_blank" rel="noopener noreferrer" class="btn" style="display: flex; align-items: center; justify-content: center; width: 100%; max-width: 400px; margin: 0 auto; background: #06C755; color: white; border: none; box-shadow: 0 10px 20px -5px rgba(6, 199, 85, 0.4);"><i class="fa-brands fa-line" style="font-size: 1.4rem; margin-right: 10px;"></i>LINE 專人諮詢</a>\n                </div>`;
            }
        );
        fs.writeFileSync(file, content, 'utf-8');
    }
});

console.log('Added LINE button to all course pages.');
