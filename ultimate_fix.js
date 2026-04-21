const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf-8');

// The ultimate flexbox blowout fix. Ensure all flex containers and items in the hierarchy specify min-width: 0 and restrict bounds.
const finalMobileFix = `
/* ULTIMATE MOBILE BLOWOUT FIX */
html, body {
    overflow-x: hidden;
    max-width: 100vw;
}

body.course-page, 
.course-detail,
.content-grid,
.course-article,
.schedule-container {
    min-width: 0 !important;
    max-width: 100vw !important;
}

.course-detail {
    width: 100%;
}

.course-article {
    width: 100%;
    overflow-x: hidden; /* Clamp any leakage escaping from schedule-table */
}

/* Ensure the table container handles its own scrolling bounded to 100vw minus paddings */
.schedule-container {
    width: 100%;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
}

/* Ensure hero image scales correctly without blowing out */
.hero-img {
    max-width: 100%;
}
`;

if (!css.includes('ULTIMATE MOBILE BLOWOUT FIX')) {
    fs.writeFileSync('style.css', css + '\n' + finalMobileFix, 'utf-8');
}

console.log('Applied ultimate blowout fix.');
