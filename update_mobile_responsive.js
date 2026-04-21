const fs = require('fs');

// 1. Update style.css
let css = fs.readFileSync('style.css', 'utf-8');

const mobileCSS = `
/* Mobile Responsive Course Schedule Improvements */
.mobile-scroll-hint {
    display: none;
    color: var(--text-secondary);
    font-size: 0.95rem;
    text-align: right;
    margin-bottom: 5px;
    font-weight: 500;
}
.mobile-scroll-hint i {
    margin-right: 5px;
    animation: swipeLeftRight 2s infinite ease-in-out;
}

@keyframes swipeLeftRight {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(8px); }
}

@media (max-width: 850px) {
    .mobile-scroll-hint { display: block; }
    .schedule-container {
        margin-top: 10px !important;
        -webkit-overflow-scrolling: touch;
        box-shadow: none;
        border-right: 1px solid rgba(0,0,0,0.05); /* helps define edge during scrolling */
    }
    .schedule-table {
        min-width: 750px; 
    }
    .course-logistics {
        padding: 20px;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .course-logistics h4 {
        font-size: 1.1rem;
    }
    .course-logistics p {
        font-size: 1rem;
    }
}
`;

if (!css.includes('mobile-scroll-hint')) {
    fs.writeFileSync('style.css', css + '\n' + mobileCSS, 'utf-8');
}

// 2. Add hint to HTML files right above schedule-container
const files = [
    'course-robotics.html',
    'course-roblox.html',
    'course-scratch.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    if (!content.includes('mobile-scroll-hint')) {
        content = content.replace(
            /<div class="schedule-container"/,
            '<div class="mobile-scroll-hint"><i class="fa-solid fa-left-right"></i> 左右滑動查看完整課表</div>\n                <div class="schedule-container"'
        );
        fs.writeFileSync(file, content, 'utf-8');
    }
});

console.log('Mobile layout optimizations complete.');
