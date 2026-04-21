const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf-8');

const fixCSS = `
/* Layout blowout fix for mobile tables */
.content-grid,
.course-article,
.schedule-container {
    min-width: 0;
    max-width: 100%;
}
`;

if (!css.includes('Layout blowout fix')) {
    fs.writeFileSync('style.css', css + '\n' + fixCSS, 'utf-8');
}

console.log('Applied flexbox blowout fix.');
