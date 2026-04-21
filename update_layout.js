const fs = require('fs');

const files = [
    'course-robotics.html',
    'course-roblox.html',
    'course-scratch.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // CSS updates
    content = content.replace(
        /.content-grid \{\s*display: grid;\s*grid-template-columns: 1fr 350px;\s*gap: 40px;\s*\}/,
        `.content-grid { display: flex; flex-direction: column; gap: 40px; }`
    );

    content = content.replace(
        /.sidebar-info \{\s*background: var\(--bg-white\);\s*padding: 30px;\s*border-radius: var\(--border-radius-main\);\s*box-shadow: var\(--shadow-sm\);\s*border: 1px solid rgba\(0,0,0,0.03\);\s*height: fit-content;\s*\}/,
        `.sidebar-info {
            background: var(--bg-white);
            padding: 40px;
            border-radius: var(--border-radius-main);
            box-shadow: var(--shadow-sm);
            border: 1px solid rgba(0,0,0,0.03);
            text-align: center;
        }`
    );

    content = content.replace(
        /.info-list \{\s*list-style: none;\s*margin-bottom: 30px;\s*\}/,
        `.info-list {
            list-style: none;
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 30px;
        }`
    );

    content = content.replace(
        /.price-box \{\s*background: rgba\(0,0,0,0.02\);\s*padding: 20px;\s*border-radius: var\(--border-radius-sm\);\s*text-align: center;\s*margin-bottom: 30px;\s*\}/,
        `.price-box {
            background: rgba(0,0,0,0.02);
            padding: 20px;
            border-radius: var(--border-radius-sm);
            text-align: center;
            margin-bottom: 30px;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }`
    );

    // Swap HTML parts
    // Step 1: Remove the image block from the bottom of course-article
    content = content.replace(
        /(\s*)<!-- 預留圖片\/影片空間 -->\s*<div style="margin-top: 50px; text-align: center; color: #999; padding: 40px; background: rgba\(0,0,0,0.02\); border-radius: 12px; border: 2px dashed #ddd;">\s*\[ 預留活動照片 \/ 影片區塊 \]\s*<\/div>/,
        ''
    );

    // Step 2: Insert the image block before the schedule header
    const imgBlock = `
                <!-- 預留圖片/影片空間 -->
                <div style="margin-top: 40px; text-align: center; color: #999; padding: 40px; background: rgba(0,0,0,0.02); border-radius: 12px; border: 2px dashed #ddd;">
                    [ 預留活動照片 / 影片區塊 ]
                </div>
`;
    content = content.replace(
        /(\s*<h3 style="margin-top: 50px;">每日日程表<\/h3>)/,
        imgBlock + '$1'
    );
    
    // Step 3: Button wrap so it doesn't take 100% width on desktop when in center layout
    content = content.replace(
        /<a href="https:\/\/forms.gle\/Cyem3i9cvwZY5Ler5"[^>]*class="btn btn-primary"[^>]*>([\s\S]*?)<\/a>/g,
        (match, innerText) => {
            // Keep original inline styles but limit max width
            return match.replace(/style="width: 100%;([^"]*)"/, 'style="display: inline-block; width: 100%; max-width: 400px;$1"');
        }
    );

    fs.writeFileSync(file, content, 'utf-8');
});

console.log('Update complete.');
