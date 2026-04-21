const fs = require('fs');

const files = [
    'course-robotics.html',
    'course-roblox.html',
    'course-scratch.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // 1. Find table block
    const tableStart = content.indexOf('<table class="schedule-table">');
    const tableEnd = content.indexOf('</table>', tableStart);
    if (tableStart === -1) return; // Already migrated
    
    const tableHTML = content.substring(tableStart, tableEnd + 8);
    
    // Extract exactly the 10 data cells
    const tdRegex = /<td><strong>(.*?)<\/strong><br><span[^>]*>([\s\S]*?)<\/span><\/td>/g;
    const matches = [...tableHTML.matchAll(tdRegex)];
    
    if (matches.length !== 10) {
        console.error('Failed to parse exactly 10 schedule items in', file);
        return;
    }
    
    const amData = matches.slice(0, 5).map(m => ({
        title: m[1],
        desc: m[2].replace(/<br\s*\/?>/g, '、').replace(/\n/g, '').trim()
    }));
    
    const pmData = matches.slice(5, 10).map(m => ({
        title: m[1],
        desc: m[2].replace(/<br\s*\/?>/g, '、').replace(/\n/g, '').trim()
    }));

    // Build the tabs DOM
    const targetBadgeCol = file.includes('robotics') ? 'var(--lego-blue)' : (file.includes('roblox') ? 'var(--lego-red)' : 'var(--lego-green)');
    
    let tabsHTML = `<div class="modern-tabs">
                    <div class="tab-nav">
                        <button class="tab-btn active" onclick="switchTab(event, 'day1', '${file}')">星期一</button>
                        <button class="tab-btn" onclick="switchTab(event, 'day2', '${file}')">星期二</button>
                        <button class="tab-btn" onclick="switchTab(event, 'day3', '${file}')">星期三</button>
                        <button class="tab-btn" onclick="switchTab(event, 'day4', '${file}')">星期四</button>
                        <button class="tab-btn" onclick="switchTab(event, 'day5', '${file}')">星期五</button>
                    </div>`;
                    
    for (let i = 0; i < 5; i++) {
        tabsHTML += `
                    <div id="day${i+1}_${file.replace('.html', '')}" class="tab-content ${i === 0 ? 'active' : ''}">
                        <div class="time-block">
                            <span class="badge" style="background:${targetBadgeCol};">上午 09:00 - 12:00</span>
                            <h4>${amData[i].title}</h4>
                            <p>${amData[i].desc}</p>
                        </div>
                        <div class="time-block">
                            <span class="badge afternoon">下午 13:00 - 16:00</span>
                            <h4>${pmData[i].title}</h4>
                            <p>${pmData[i].desc}</p>
                        </div>
                    </div>`;
    }
    
    tabsHTML += `\n                </div>`;

    // Replace the block logically
    // Start at <div class="mobile-scroll-hint"> if it exists, or just schedule-container
    const hintStart = content.indexOf('<div class="mobile-scroll-hint">');
    const replaceStartPos = hintStart !== -1 ? hintStart : content.indexOf('<div class="schedule-container"');
    
    const containerEnd = content.indexOf('</div>', tableEnd);
    
    const beforeStr = content.substring(0, replaceStartPos);
    const afterStr = content.substring(containerEnd + 6); // length of </div>
    
    let finalContent = beforeStr + tabsHTML + afterStr;

    // Append switchTab script if not exists
    if (!finalContent.includes('function switchTab')) {
        finalContent = finalContent.replace('</body>', `
    <script>
        function switchTab(evt, dayName, fileRef) {
            let contextId = fileRef.replace('.html', '');
            let tabcontent = document.querySelectorAll('.tab-content[id$="_' + contextId + '"]');
            for (let i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
                tabcontent[i].classList.remove("active");
            }

            let tabbuttons = evt.currentTarget.parentElement.getElementsByClassName("tab-btn");
            for (let i = 0; i < tabbuttons.length; i++) {
                tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
            }

            let targetId = dayName + "_" + contextId;
            document.getElementById(targetId).style.display = "block";
            // Use small timeout to allow display:block to apply before animating opacity
            setTimeout(() => document.getElementById(targetId).classList.add("active"), 10);
            evt.currentTarget.className += " active";
        }
        
        // initialize
        document.addEventListener("DOMContentLoaded", () => {
            const tabs = document.querySelectorAll('.tab-content');
            tabs.forEach(t => { if(!t.classList.contains('active')) t.style.display = 'none'; });
        });
    </script>
</body>`);
    }

    fs.writeFileSync(file, finalContent, 'utf-8');
});

console.log('Successfully completed schedule refactoring script v2.');
