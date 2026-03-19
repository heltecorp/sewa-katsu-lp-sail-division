document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */
    const header = document.querySelector('.glass-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* =========================================
       SMOOTH SCROLLING FOR NAV LINKS
    ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* =========================================
       DYNAMIC MARQUEE GENERATION
    ========================================= */
    // Clone marquee items to ensure seamless infinite scrolling
    const scroller = document.querySelector('.scroller-inner');
    if (scroller) {
        const scrollerContent = Array.from(scroller.children);

        // Duplicate items
        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scroller.appendChild(duplicatedItem);
        });
    }

    /* =========================================
       COOKIE CONSENT BANNER LOGIC
    ========================================= */
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const cookieAcceptBtn = document.getElementById('cookie-accept-btn');

    if (cookieBanner && cookieAcceptBtn) {
        // Check if user has already consented
        if (!localStorage.getItem('cookieConsent')) {
            // Show banner after a slight delay for better UX
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }

        cookieAcceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            cookieBanner.classList.remove('show');
        });
    }
});

/* =========================================
   DYNAMIC JOBS CSV LOADER & SEARCH
========================================= */
const jobsContainer = document.getElementById('jobs-container');
let allJobs = [];

if (jobsContainer) {
    // Fetch and parse the CSV data
    fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQibVl5joDPY00upwFI2r4YppfF0JILIDEZs9yyXGSAQgrYax0Mj3BlAFdv21sRgD_RDTm73UcVgtRd/pub?gid=627519988&single=true&output=csv&t=${Date.now()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(csvText => {
            allJobs = parseCSV(csvText);
            renderJobs(allJobs.slice(0, 6)); // Initial render
            setupSearchFilters();
        })
        .catch(error => {
            console.error('Error fetching jobs:', error);
            jobsContainer.innerHTML = '<div class="loading-state"><p>エラーが発生しました。求人情報を読み込めません。</p></div>';
        });
}

/* =========================================
   IKYU-STYLE SEARCH & FILTERING
========================================= */
let searchState = {
    freeword: '',
    areas: [],
    industry: '',
    checks: {} // e.g. { '在留資格_技術・人文知識・国際業務': true, ... }
};

function setupSearchFilters() {
    // Gather unique values from CSV data
    // Harcoded 47 prefectures
    const prefectures = [
        "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
        "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
        "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
        "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
        "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
        "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
        "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
    ];
    const areas = prefectures;
    const industries = [...new Set(allJobs.map(j => j['業界']).filter(v => v && v.trim()))];
    const visaTypes = [...new Set(allJobs.map(j => j['在留資格']).filter(v => v && v.trim()))];
    const employTypes = [...new Set(allJobs.map(j => j['雇用形態']).filter(v => v && v.trim()))];

    // --- Populate Industry <select> ---
    const industrySelect = document.getElementById('search-industry');
    if (industrySelect) {
        industries.forEach(ind => {
            const opt = document.createElement('option');
            opt.value = ind;
            opt.textContent = ind;
            industrySelect.appendChild(opt);
        });
        industrySelect.addEventListener('change', function() {
            this.style.color = this.value ? '#2B3A5A' : '#94a3b8';
        });
    }

    // --- Area Multi-Select Dropdown ---
    const areaWrapper = document.getElementById('area-select-wrapper');
    const areaDropdown = document.getElementById('area-dropdown');
    const areaDisplay = document.getElementById('area-select-display');

    if (areaDropdown && areaWrapper) {
        // Populate area checkboxes in dropdown
        let areaHtml = '';
        areas.forEach(area => {
            areaHtml += `
                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1rem; cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: 0.85rem; color: #2B3A5A; transition: background 0.15s;"
                       onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                    <input type="checkbox" class="area-checkbox" value="${area}" style="accent-color: #0077c0; width: 16px; height: 16px;">
                    ${area}
                </label>`;
        });
        areaDropdown.innerHTML = areaHtml;

        // Toggle dropdown
        areaWrapper.addEventListener('click', function(e) {
            if (e.target.type === 'checkbox' || e.target.tagName === 'LABEL') return;
            areaDropdown.style.display = areaDropdown.style.display === 'none' ? 'block' : 'none';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!areaWrapper.contains(e.target)) {
                areaDropdown.style.display = 'none';
            }
        });

        // Update display text when checkboxes change
        areaDropdown.addEventListener('change', function() {
            const checked = Array.from(areaDropdown.querySelectorAll('.area-checkbox:checked')).map(cb => cb.value);
            searchState.areas = checked;
            if (checked.length === 0) {
                areaDisplay.textContent = '勤務エリアを選択';
                areaDisplay.style.color = '#94a3b8';
            } else if (checked.length <= 2) {
                areaDisplay.textContent = checked.join(', ');
                areaDisplay.style.color = '#2B3A5A';
            } else {
                areaDisplay.textContent = checked.slice(0, 2).join(', ') + ` 他${checked.length - 2}件`;
                areaDisplay.style.color = '#2B3A5A';
            }
        });
    }

    // --- Checkbox Filters Row (visa types, employment types, etc.) ---
    const checkboxContainer = document.getElementById('checkbox-filters');
    if (checkboxContainer) {
        let checkHtml = '';

        // Visa types
        visaTypes.forEach(v => {
            checkHtml += `
                <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; white-space: nowrap;">
                    <input type="checkbox" class="filter-check" data-field="在留資格" data-value="${v}" style="accent-color: #0077c0; width: 15px; height: 15px;">
                    ${v}
                </label>`;
        });

        // Employment types
        employTypes.forEach(v => {
            checkHtml += `
                <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; white-space: nowrap;">
                    <input type="checkbox" class="filter-check" data-field="雇用形態" data-value="${v}" style="accent-color: #0077c0; width: 15px; height: 15px;">
                    ${v}
                </label>`;
        });

        // Separator + "絞り込み" icon (like Ikyu)
        checkHtml += `
            <span style="display: flex; align-items: center; gap: 0.3rem; margin-left: auto; color: #94a3b8; cursor: pointer; font-size: 0.8rem;" id="filter-more-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line></svg>
                絞り込み
            </span>`;

        checkboxContainer.innerHTML = checkHtml;
    }

    // --- Search Button Handler ---
    const searchBtn = document.getElementById('search-btn');
    const freewordInput = document.getElementById('search-freeword');

    if (searchBtn) {
        searchBtn.addEventListener('click', executeSearch);
    }

    // Enter key on freeword
    if (freewordInput) {
        freewordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                executeSearch();
            }
        });
    }

    function executeSearch() {
        // Gather state
        searchState.freeword = (freewordInput ? freewordInput.value.trim() : '');
        searchState.industry = (industrySelect ? industrySelect.value : '');
        
        // Gather area checkboxes
        if (areaDropdown) {
            searchState.areas = Array.from(areaDropdown.querySelectorAll('.area-checkbox:checked')).map(cb => cb.value);
        }

        // Gather other checkboxes
        searchState.checks = {};
        document.querySelectorAll('.filter-check:checked').forEach(cb => {
            const field = cb.getAttribute('data-field');
            const val = cb.getAttribute('data-value');
            if (!searchState.checks[field]) searchState.checks[field] = [];
            searchState.checks[field].push(val);
        });

        // Filter
        const filtered = allJobs.filter(job => {
            // Freeword match (search across multiple fields)
            if (searchState.freeword) {
                const q = searchState.freeword.toLowerCase();
                const searchableFields = ['ポジション / おすすめポイント（カード用）', '業界', '勤務エリア（カード用）', '在留資格', '仕事内容（詳細画面）', 'こんな人におすすめ（カード用）'];
                const found = searchableFields.some(f => (job[f] || '').toLowerCase().includes(q));
                if (!found) return false;
            }

            // Area match (multi-select, LIKE search, OR logic within areas)
            if (searchState.areas.length > 0) {
                const jobAreaStr = job['勤務エリア（カード用）'] || '';
                const matchFound = searchState.areas.some(selectedArea => jobAreaStr.includes(selectedArea));
                if (!matchFound) return false;
            }

            // Industry match
            if (searchState.industry) {
                if (job['業界'] !== searchState.industry) return false;
            }

            // Checkbox matches (per field, OR logic within group)
            for (const [field, values] of Object.entries(searchState.checks)) {
                if (values.length > 0) {
                    if (!values.includes(job[field])) return false;
                }
            }

            return true;
        });

        // Update URL
        const newUrl = new URL(window.location);
        if (searchState.freeword) newUrl.searchParams.set('q', searchState.freeword);
        else newUrl.searchParams.delete('q');
        if (searchState.areas.length > 0) newUrl.searchParams.set('area', searchState.areas.join(','));
        else newUrl.searchParams.delete('area');
        if (searchState.industry) newUrl.searchParams.set('industry', searchState.industry);
        else newUrl.searchParams.delete('industry');
        window.history.pushState({}, '', newUrl);

        // Render results
        const cards = document.querySelectorAll('.job-card');
        cards.forEach(card => card.style.opacity = '0');

        setTimeout(() => {
            if (filtered.length === 0) {
                jobsContainer.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: rgba(255,255,255,0.5); border-radius: 20px;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--clr-text-muted)" stroke-width="2" style="margin-bottom: 1rem;">
                            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <h3 style="font-size: 1.25rem; color: var(--clr-text);">条件に一致する求人が見つかりませんでした</h3>
                        <p style="color: var(--clr-text-muted); margin-top: 0.5rem;">条件を変更して再度お試しください。</p>
                    </div>`;
            } else {
                renderJobs(filtered);
            }

            // Scroll to jobs
            const jobsEl = document.getElementById('jobs');
            if (jobsEl) {
                jobsEl.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    }
}

// Robust CSV Parser (Handles quotes, commas inside quotes, and newlines inside quotes)
function parseCSV(text) {
    const result = [];
    let currentLine = [];
    let currentField = '';
    let inQuotes = false;

    // Normalize newlines to \n and remove BOM
    text = text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let nextChar = text[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                currentField += '"'; // Escaped quote ""
                i++; // Skip next quote
            } else {
                inQuotes = !inQuotes; // Toggle state
            }
        } else if (char === ',' && !inQuotes) {
            currentLine.push(currentField);
            currentField = '';
        } else if (char === '\n' && !inQuotes) {
            currentLine.push(currentField);
            // Only add if line isn't completely empty
            if (currentLine.some(f => f.trim() !== '')) {
                result.push(currentLine);
            }
            currentLine = [];
            currentField = '';
        } else {
            currentField += char;
        }
    }

    // Add the very last field and line if text didn't end with a newline
    currentLine.push(currentField);
    if (currentLine.some(f => f.trim() !== '')) {
        result.push(currentLine);
    }

    if (result.length < 2) return []; // Meaningless if just headers or empty

    // Map rows to objects based on the first row (headers)
    const headers = result[0].map(h => h.trim());
    const objects = [];

    for (let i = 1; i < result.length; i++) {
        const row = result[i];
        if (row.length === headers.length || row.length > 1) { // Basic validation
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index] ? row[index].trim() : '';
            });
            objects.push(obj);
        }
    }

    return objects;
}

// Render Job Cards into the DOM
function renderJobs(jobsToRender) {
    // Clear loading state
    jobsContainer.innerHTML = '';

    jobsToRender.forEach(job => {
        // Collect tags for this specific card
        const rawTagsData = job['タグ'] || '';
        // Split by comma or space and filter out empty strings
        const rawTags = rawTagsData.split(/[,\s+]/).map(t => t.trim()).filter(t => t !== '');
        
        const hasNewTag = rawTags.includes('NEW!');
        const hasUrgentTag = rawTags.includes('急募');
        
        // Filter out the special header badges from the tag list below the title
        const textTags = rawTags.filter(t => t !== 'NEW!' && t !== '急募');

        const cardTags = [
            ...textTags,
            job['在留資格'],
            job['雇用形態'],
            job['業界'],
            job['勤務エリア（カード用）']
        ].filter(tag => tag && tag.trim() !== '');

        const uniqueCardTags = [...new Set(cardTags)];
        const tagsHtml = uniqueCardTags.length > 0
            ? `<div class="job-card-tags" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.2rem;">
                ${uniqueCardTags.map(tag => `<span class="job-tag-styled">#${tag}</span>`).join('')}
               </div>`
            : '';

        let badgeHtml = '';
        if (hasNewTag) badgeHtml += '<span class="job-badge new">NEW</span>';
        if (hasUrgentTag) badgeHtml += '<span class="job-badge urgent">急募</span>';

        const title = job['ポジション / おすすめポイント（カード用）'] || '求人タイトル未設定';
        const formattedTitle = title.replace(/(?:\r\n|\r|\n)/g, '<br>');

        const cardHtml = `
                <div class="job-card glass-panel" data-tilt>
                    <div class="job-card-glow"></div>
                    <div class="job-header-updated">
                        ${badgeHtml}
                    </div>
                    <h3 class="job-title-updated">${formattedTitle}</h3>
                    <p class="job-id-updated">求人ID: ${job['求人ID'] || job.ID}</p>
                    
                    ${tagsHtml}
                    
                    <div class="job-details-list">
                        <div class="detail-item">
                            <span class="detail-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </span>
                            ${job['勤務エリア（カード用）'] || '-'}
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </span>
                            ${job['年収（カード用）'] || '-'}
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            </span>
                            <span class="recommended-text">${job['こんな人におすすめ（カード用）'] || '-'}</span>
                        </div>
                    </div>
                    
                    <a href="job-detail.html?id=${job['求人ID']}" class="btn job-action">詳細を見る</a>
                </div>
            `;

        jobsContainer.insertAdjacentHTML('beforeend', cardHtml);
    });

    if (typeof attachCardGlowObserver === 'function') {
        attachCardGlowObserver();
    }
}

/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Reveal only once
        }
    });
}, observerOptions);

document.querySelectorAll('.view-section').forEach(section => {
    observer.observe(section);
});

// Initial check for hero section
setTimeout(() => {
    const hero = document.querySelector('.hero.view-section');
    if (hero) hero.classList.add('is-visible');
}, 100);

/* =========================================
   GLOWING BORDER SCROLL REVEAL (MOBILE & DESKTOP INTRO)
========================================= */
function attachCardGlowObserver() {
    const cards = document.querySelectorAll('.job-card');
    const borderObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger the once-off sparkle animation
                entry.target.classList.add('flash-glow');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    cards.forEach(card => borderObserver.observe(card));
}

