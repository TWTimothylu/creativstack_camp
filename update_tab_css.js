const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf-8');

// The new Tab layout CSS
const tabCSS = `
/* Modern Tabs System */
.modern-tabs {
    margin-top: 30px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    border: 1px solid rgba(0,0,0,0.05);
    overflow: hidden;
}

.tab-nav {
    display: flex;
    background: #F9FAFB;
    border-bottom: 2px solid var(--primary-color);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
}

/* Hide scrollbar for a cleaner look */
.tab-nav::-webkit-scrollbar {
    display: none;
}
.tab-nav {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.tab-btn {
    padding: 16px 24px;
    cursor: pointer;
    border: none;
    background: transparent;
    color: var(--text-secondary);
    font-size: 1.05rem;
    font-weight: 700;
    font-family: inherit;
    transition: all 0.3s ease;
    flex-grow: 1;
    text-align: center;
    position: relative;
    border-right: 1px solid rgba(0,0,0,0.05);
}

.tab-btn:hover {
    background: rgba(0, 95, 158, 0.05);
    color: var(--primary-color);
}

.tab-btn.active {
    background: #fff;
    color: var(--primary-color);
}

.tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--primary-color);
    border-radius: 4px 4px 0 0;
}

.tab-content {
    display: none;
    padding: 30px;
    animation: fadeIn 0.4s ease;
}

.tab-content.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
}

.time-block {
    margin-bottom: 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}

.time-block:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
}

.badge {
    display: inline-block;
    background: var(--lego-blue);
    color: white;
    padding: 4px 12px;
    border-radius: 5px;
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 12px;
}

.badge.afternoon {
    background: var(--lego-red);
}

.time-block h4 {
    font-size: 1.25rem;
    color: var(--text-primary);
    margin-bottom: 8px;
    margin-top: 0;
}

.time-block p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
}

/* Remove old mobile-scroll-hint since we use tabs */
.mobile-scroll-hint { display: none !important; }
`;

// Remove `.mobile-scroll-hint` blocks from `style.css` if present
css = css.replace(/\/\* Mobile \w* \*\/.*?mobile-scroll-hint.*?@media[\s\S]*?\}/g, '');

if (!css.includes('.modern-tabs')) {
    fs.writeFileSync('style.css', css + '\n' + tabCSS, 'utf-8');
}

console.log('Added Tab UI styles.');
