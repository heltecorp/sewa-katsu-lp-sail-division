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
   DYNAMIC TAG GENERATION & FILTERING
========================================= */
let activeFilters = {
    '在留資格': [],
    '雇用形態': [],
    '業界': [],
    '勤務エリア（カード用）': []
};

function setupSearchFilters() {
    const filterContainer = document.getElementById('dynamic-filter-tags');

    // Generate unique tags from data
    const filterCategories = ['在留資格', '雇用形態', '業界', '勤務エリア（カード用）'];
    const uniqueTagsData = {};

    filterCategories.forEach(cat => {
        uniqueTagsData[cat] = [...new Set(allJobs.map(job => job[cat]).filter(val => val && val.trim() !== ''))];
    });

    // Render filter UI
    if (filterContainer) {
        let filterHtml = '';
        filterCategories.forEach(cat => {
            if (uniqueTagsData[cat].length > 0) {
                const displayName = cat === '勤務エリア（カード用）' ? '勤務エリア' : cat;
                filterHtml += `
                <div class="filter-group" style="display: flex; align-items: flex-start; gap: 1rem; flex-wrap: wrap;">
                    <span style="font-size: 0.85rem; font-weight: 700; color: var(--clr-text); white-space: nowrap; padding-top: 0.4rem; min-width: 80px;">${displayName}</span>
                    <div class="filter-tags" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        ${uniqueTagsData[cat].map(tag => `
                            <button type="button" class="filter-tag-btn" data-category="${cat}" data-value="${tag}" 
                                style="background: rgba(43,58,90,0.05); color: #2B3A5A; border: 1px solid rgba(43,58,90,0.1); padding: 0.4rem 1.2rem; border-radius: 100px; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease;">
                                ${tag}
                            </button>
                        `).join('')}
                    </div>
                </div>`;
            }
        });
        filterContainer.innerHTML = filterHtml;

        // Attach event listeners to newly created tag buttons
        document.querySelectorAll('.filter-tag-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const cat = this.getAttribute('data-category');
                const val = this.getAttribute('data-value');

                const index = activeFilters[cat].indexOf(val);
                if (index > -1) {
                    activeFilters[cat].splice(index, 1);
                    this.style.background = 'rgba(43,58,90,0.05)';
                    this.style.color = '#2B3A5A';
                    this.style.borderColor = 'rgba(43,58,90,0.1)';
                } else {
                    activeFilters[cat].push(val);
                    this.style.background = '#F66748';
                    this.style.color = '#fff';
                    this.style.borderColor = '#F66748';
                }

                filterJobs();
            });
        });
    }

    function filterJobs() {
        const cards = document.querySelectorAll('.job-card');
        cards.forEach(card => card.style.opacity = '0');

        setTimeout(() => {
            const filtered = allJobs.filter(job => {
                let matchTags = true;
                filterCategories.forEach(cat => {
                    if (activeFilters[cat].length > 0) {
                        // For string match
                        if (!activeFilters[cat].includes(job[cat])) {
                            matchTags = false;
                        }
                    }
                });

                return matchTags;
            });

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
        const cardTags = [
            job['在留資格'],
            job['雇用形態'],
            job['業界'],
            job['勤務エリア（カード用）']
        ].filter(tag => tag && tag.trim() !== '');

        const uniqueCardTags = [...new Set(cardTags)];
        const tagsHtml = uniqueCardTags.length > 0
            ? `<div class="job-card-tags" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.2rem;">
                ${uniqueCardTags.map(tag => `<span style="background: rgba(246, 103, 72, 0.08); color: #DF4F33; padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700; border: 1px solid rgba(246, 103, 72, 0.15);">#${tag}</span>`).join('')}
               </div>`
            : '';

        const badgeHtml = '<span class="job-badge new">NEW</span>';

        const isConfidential = true;
        const logoContent = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';
        const logoClass = 'company-logo confidential';

        const title = job['ポジション / おすすめポイント（カード用）'] || '求人タイトル未設定';
        const formattedTitle = title.replace(/(?:\r\n|\r|\n)/g, '<br>');

        const cardHtml = `
                <div class="job-card glass-panel" data-tilt>
                    <div class="job-header">
                        <div class="${logoClass}">${logoContent}</div>
                        ${badgeHtml}
                    </div>
                    <h3 class="job-title" style="margin-bottom: 0.5rem;">${formattedTitle}</h3>
                    <p class="job-company" style="color: var(--clr-text-muted); font-size: 0.875rem; margin-bottom: 1.2rem;">非公開企業</p>
                    
                    ${tagsHtml}
                    
                    <div class="job-details">
                        <div class="detail-item">
                            <span class="detail-icon" style="color: var(--clr-primary);">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </span>
                            ${job['勤務エリア（カード用）'] || '-'}
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon" style="color: var(--clr-primary);">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </span>
                            ${job['年収（カード用）'] || '-'}
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon" style="color: var(--clr-primary);">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            </span>
                            ${job['こんな人におすすめ（カード用）'] || '-'}
                        </div>
                    </div>
                    
                    <a href="job-detail.html?id=${job['求人ID']}" class="btn job-action">詳細を見る</a>
                </div>
            `;

        jobsContainer.insertAdjacentHTML('beforeend', cardHtml);
    });

    attachCardInteractions();
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
   3D TILT & MAGNETIC HOVER FOR CARDS
========================================= */
function attachCardInteractions() {
    const cards = document.querySelectorAll('.job-card');

    cards.forEach(card => {
        // Remove old listeners to avoid duplicates if re-rendered
        card.removeEventListener('mousemove', handleTiltAndGlow);
        card.removeEventListener('mouseleave', resetTiltAndGlow);

        card.addEventListener('mousemove', handleTiltAndGlow);
        card.addEventListener('mouseleave', resetTiltAndGlow);
    });
}

function handleTiltAndGlow(e) {
    const card = this;
    const cardRect = card.getBoundingClientRect();

    // Calculate mouse position relative to card
    const x = e.clientX - cardRect.left;
    const y = e.clientY - cardRect.top;

    // Set CSS variables for the magnetic glow effect
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // Calculate mouse position relative to card center for 3D tilt
    const centerX = cardRect.width / 2;
    const centerY = cardRect.height / 2;

    const mouseX = x - centerX;
    const mouseY = y - centerY;

    // Calculate tilt amounts (max 8 degrees for a softer feel)
    const rotateX = (mouseY / centerY) * -8;
    const rotateY = (mouseX / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function resetTiltAndGlow() {
    this.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
}

// Initial attachment handled in renderJobs()
