const fs = require('fs');
const readline = require('readline');

const files = [
    'course-robotics.html',
    'course-roblox.html',
    'course-scratch.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // We want to replace the whole block from <div class="mobile-scroll-hint"> to </div><!-- table end -->
    // Since we don't have cheerio, we'll extract the content using regex or string splitting
    
    // 1. Find table block
    const tableStart = content.indexOf('<table class="schedule-table">');
    const tableEnd = content.indexOf('</table>', tableStart);
    if (tableStart === -1) return; // Already migrated or doesn't exist
    
    const tableHTML = content.substring(tableStart, tableEnd + 8);
    
    // Quick regex to extract morning/afternoon data
    // The table has two interesting rows (ignoring break-row):
    // tr 0 -> td AM, td Day1, td Day2, td Day3, td Day4, td Day5
    // tr 2 -> td PM, td Day1, td Day2, td Day3, td Day4, td Day5
    const trMatches = tableHTML.match(/<tr>[\s\S]*?<\/tr>/g);
    
    let amData = [];
    let pmData = [];
    
    if (trMatches && trMatches.length >= 3) {
        // extract TDs from first tr
        const amTds = [...trMatches[0].matchAll(/<td>([\s\S]*?)<\/td>/g)].map(m => m[1].replace(/<br>/g, ' ').replace(/<[^>]+>/g, ' ').trim().split(' ').filter(x=>x).join('<br>'));
        const pmTds = [...trMatches[2].matchAll(/<td>([\s\S]*?)<\/td>/g)].map(m => m[1].replace(/<br>/g, ' ').replace(/<[^>]+>/g, ' ').trim().split(' ').filter(x=>x).join('<br>'));
        
        amData = amTds; 
        pmData = pmTds;
        
        // Sometimes the original had tags like <strong>Title</strong><br><span style="...">Desc1<br>Desc2</span>
        // A better extraction logic:
        const parseCell = (html) => {
            const strongMatch = html.match(/<strong>(.*?)<\/strong>/);
            const title = strongMatch ? strongMatch[1] : '';
            const spanMatch = html.match(/<span[^>]*>([\s\S]*?)<\/span>/);
            const desc = spanMatch ? spanMatch[1].replace(/<br\s*\/?>/g, '、').replace(/\n/, '') : html.replace(/<[^>]*>/g, '');
            return { title, desc: desc || '進階應用' };
        };
        
        amData = [...trMatches[0].matchAll(/<td>([\s\S]*?)<\/td>/g)].map(m => parseCell(m[1]));
        pmData = [...trMatches[2].matchAll(/<td>([\s\S]*?)<\/td>/g)].map(m => parseCell(m[1]));
    }

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
                            <h4>${amData[i]?.title || '精彩課程'}</h4>
                            <p>${amData[i]?.desc || '敬請期待'}</p>
                        </div>
                        <div class="time-block">
                            <span class="badge afternoon" style="background:var(--primary-color);">下午 13:00 - 16:00</span>
                            <h4>${pmData[i]?.title || '進階挑戰'}</h4>
                            <p>${pmData[i]?.desc || '敬請期待'}</p>
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
    const afterStr = content.substring(containerEnd + 6);
    
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
            setTimeout(()=> document.getElementById(targetId).classList.add("active"), 10);
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

console.log('Successfully completed schedule refactoring script.');
