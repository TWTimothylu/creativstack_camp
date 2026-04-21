const fs = require('fs');

const mappings = {
    'course-robotics.html': 'images/spikeprime/樂高進階機器人營4×5_Full HD 1080p_HIGH_FR30.mp4',
    'course-roblox.html': 'images/roblox/Roblox營4：5_Full HD 1080p_HIGH_FR30.mp4',
    'course-scratch.html': 'images/scratch/Scratch營4×5_Full HD 1080p_HIGH_FR30.mp4'
};

for (const [file, videoPath] of Object.entries(mappings)) {
    let content = fs.readFileSync(file, 'utf-8');
    
    const videoHTML = `
                <!-- 課程精選活動影片 -->
                <div class="video-container" style="margin-top: 40px; text-align: center; background: #000; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-md);">
                    <video controls playsinline preload="metadata" style="width: 100%; max-height: 600px; display: block; object-fit: contain;">
                        <source src="${videoPath}" type="video/mp4">
                        您的瀏覽器不支援此影片格式。
                    </video>
                </div>`;
                
    // Replace the dummy block
    content = content.replace(
        /(\s*<!-- 預留圖片\/影片空間 -->\s*<div style="margin-top: 40px; text-align: center; color: #999; padding: 40px; background: rgba\(0,0,0,0.02\); border-radius: 12px; border: 2px dashed #ddd;">\s*\[ 預留活動照片 \/ 影片區塊 \]\s*<\/div>)/,
        videoHTML
    );
    
    fs.writeFileSync(file, content, 'utf-8');
}

console.log('Videos embedded successfully.');
