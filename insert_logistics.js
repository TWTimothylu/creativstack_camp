const fs = require('fs');

// 1. Add CSS to style.css
let styleContent = fs.readFileSync('style.css', 'utf-8');
const cssToAdd = `
.course-logistics {
    background: #F9FAFB;
    border-radius: var(--border-radius-main);
    padding: 30px;
    margin-top: 40px;
    margin-bottom: 40px;
    border-left: 5px solid var(--lego-blue);
}
.course-logistics h4 {
    color: var(--text-primary);
    font-size: 1.15rem;
    margin-bottom: 15px;
    margin-top: 25px;
}
.course-logistics h4:first-child {
    margin-top: 0;
}
.course-logistics h4 i {
    margin-right: 10px;
}
.course-logistics p {
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 0;
    font-size: 1.05rem;
}
.warning-text {
    color: #e63946 !important;
    font-size: 0.95rem !important;
    margin-top: 15px !important;
    background: rgba(230, 57, 70, 0.05);
    padding: 12px 18px;
    border-radius: 8px;
    display: inline-block;
}
`;

if(!styleContent.includes('.course-logistics')) {
    styleContent += cssToAdd;
    fs.writeFileSync('style.css', styleContent, 'utf-8');
}

// 2. Insert blocks into HTML files
const files = {
    'course-robotics.html': {
        themeColor: 'var(--lego-blue)',
        target: '升小三到升小六',
        joy: '體驗製作機器人的樂趣',
        week: '第6週',
        dates: '8/3(一) - 8/7(五)'
    },
    'course-roblox.html': {
        themeColor: 'var(--lego-red)',
        target: '升小三到升小六',
        joy: '體驗創作遊戲的樂趣',
        week: '第4週',
        dates: '7/20(一) - 7/24(五)'
    },
    'course-scratch.html': {
        themeColor: 'var(--lego-green)',
        target: '升小一到升小三',
        joy: '體驗寫程式的樂趣',
        week: '第7週',
        dates: '8/10(一) - 8/14(五)'
    }
};

for (const [file, data] of Object.entries(files)) {
    let content = fs.readFileSync(file, 'utf-8');
    
    const logisticsHTML = `
                <div class="course-logistics" style="border-left-color: ${data.themeColor};">
                    <h4><i class="fa-solid fa-user-check" style="color: ${data.themeColor};"></i> 適合對象</h4>
                    <p>${data.target}<br>5人以下小班教學<br>沒有經驗也很適合，歡迎一起${data.joy}！</p>
                    
                    <h4><i class="fa-solid fa-calendar-day" style="color: ${data.themeColor};"></i> 營隊時間</h4>
                    <p>${data.week}：${data.dates}<br>上課時間：上午9:00 - 下午4:00</p>
                    
                    <h4><i class="fa-solid fa-clock" style="color: ${data.themeColor};"></i> 接送時間</h4>
                    <p>最早到教室時間：上午8:30<br>接回時間：下午4:00-5:30</p>
                    <p class="warning-text"><i class="fa-solid fa-circle-exclamation"></i> 若接回時間晚於下午5:30，每半小時收100元晚托費用，未滿半小時以半小時計</p>
                </div>`;
    
    // Look for the end of the target paragraph to insert
    // "</p>\n                \n                <!-- 預留圖片/影片空間 -->"
    
    // Using regex to reliably find the space right before the picture block
    if(!content.includes('course-logistics')) {
        content = content.replace(
            /(<\/p>)([\s\S]*?)(<!-- 預留圖片\/影片空間 -->)/,
            `$1${logisticsHTML}$2$3`
        );
        fs.writeFileSync(file, content, 'utf-8');
    }
}

console.log('Insertion completed.');
