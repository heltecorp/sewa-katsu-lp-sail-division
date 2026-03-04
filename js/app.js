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
    fetch('data/jobs_preview_export.csv')
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

function setupSearchFilters() {
    const searchForm = document.getElementById('job-search-form');
    const inputKeyword = document.getElementById('searchKeyword');
    const selectLocation = document.getElementById('searchLocation');
    const selectLanguage = document.getElementById('searchLanguage');

    if (!searchForm) return;

    function filterJobs() {
        // Add fade out effect
        const cards = document.querySelectorAll('.job-card');
        cards.forEach(card => card.style.opacity = '0');

        setTimeout(() => {
            const keyword = inputKeyword.value.toLowerCase();
            const location = selectLocation.value.trim();
            const language = selectLanguage.value;

            const filtered = allJobs.filter(job => {
                const matchKeyword = !keyword ||
                    (job['求人名'] && job['求人名'].toLowerCase().includes(keyword)) ||
                    (job['企業名(参照)'] && job['企業名(参照)'].toLowerCase().includes(keyword)) ||
                    (job['概要'] && job['概要'].toLowerCase().includes(keyword)) ||
                    (job['仕事内容'] && job['仕事内容'].toLowerCase().includes(keyword));

                const matchLocation = !location || (job['勤務地'] && job['勤務地'].includes(location)) || (job['勤務地詳細'] && job['勤務地詳細'].includes(location));
                const matchLanguage = language === 'All' || (job['言語要件'] && job['言語要件'].includes(language));

                return matchKeyword && matchLocation && matchLanguage;
            });

            // If empty wait, otherwise render
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
        }, 300); // Wait for fade out
    }

    inputKeyword.addEventListener('input', filterJobs);
    selectLocation.addEventListener('input', filterJobs);
    selectLanguage.addEventListener('change', filterJobs);
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
        // Smart Tag Generation: If Tags column doesn't exist, we create some from employment type and language
        let tagsHtml = '';
        if (job['雇用形態']) {
            tagsHtml += `<span class="job-tag">${job['雇用形態']}</span>`;
        }
        if (job['言語要件']) {
            // Extract just the JLPT level if possible, or show a snippet
            const langStr = job['言語要件'].includes('N1') ? 'N1' :
                job['言語要件'].includes('N2') ? 'N2' :
                    job['言語要件'].includes('N3') ? 'N3' :
                        job['言語要件'].includes('N4') ? 'N4' : '語学不問';
            tagsHtml += `<span class="job-tag">JLPT ${langStr}</span>`;
        }

        // Badge logic: Use 'IsNew' if exists, otherwise assume new if ID is present
        const badgeHtml = '<span class="job-badge new">NEW</span>';

        // Smarter company name extraction
        let companyName = job['企業名(参照)'] || job['求人企業名'] || '非公開企業';

        // If it's a confidential / placeholder, try to extract from Title (many have "Position / Visa / Company" format)
        if (companyName === '非公開企業' && job['求人名'] && job['求人名'].includes('/')) {
            const parts = job['求人名'].split('/');
            companyName = parts[parts.length - 1].trim();
        }

        const isConfidential = companyName === '非公開企業';
        const logoContent = isConfidential
            ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>'
            : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>';
        const logoClass = isConfidential ? 'company-logo confidential' : 'company-logo';

        // Clean up salary string length for card preview
        let salaryPreview = job['給与'] || '';
        if (salaryPreview.length > 20) {
            salaryPreview = salaryPreview.substring(0, 20) + '...';
        }

        const cardHtml = `
                <div class="job-card glass-panel" data-tilt>
                    <div class="job-header">
                        <div class="${logoClass}">${logoContent}</div>
                        ${badgeHtml}
                    </div>
                    <h3 class="job-title">${job['求人名']}</h3>
                    <p class="job-company">${companyName}</p>
                    
                    <div class="job-details">
                        <div class="detail-item">
                            <span class="detail-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </span>
                            ${job['勤務地'] || '-'}
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </span>
                            ${salaryPreview || '-'}
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            </span>
                            ${job['言語要件'] && (job['言語要件'].includes('N') || job['言語要件'].includes('日本語')) ? '語学要件あり' : '不問'}
                        </div>
                    </div>
                    
                    <div class="job-tags">
                        ${tagsHtml}
                    </div>
                    
                    <a href="job-detail.html?id=${job['求人ID']}" class="btn btn-secondary job-action">詳細を見る</a>
                </div>
            `;

        jobsContainer.insertAdjacentHTML('beforeend', cardHtml);
    });

    // Re-attach hover effects to new cards
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
