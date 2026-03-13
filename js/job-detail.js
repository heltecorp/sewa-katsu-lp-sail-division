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
       FETCH AND DISPLAY JOB DETAILS
    ========================================= */
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');
    const detailContainer = document.getElementById('job-detail-content');
    const jobIdInput = document.getElementById('job-id-input');

    if (jobIdInput) {
        jobIdInput.value = jobId;
    }

    if (jobId && detailContainer) {
        fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQibVl5joDPY00upwFI2r4YppfF0JILIDEZs9yyXGSAQgrYax0Mj3BlAFdv21sRgD_RDTm73UcVgtRd/pub?gid=627519988&single=true&output=csv&t=${Date.now()}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(csvText => {
                const jobs = parseCSV(csvText);
                const job = jobs.find(j => j['求人ID'] === jobId || j.ID === jobId);

                if (job) {
                    renderJobDetail(job);
                } else {
                    showError('指定された求人は見つかりませんでした。');
                }
            })
            .catch(error => {
                console.error('Error fetching job details:', error);
                showError('エラーが発生しました。求人情報を読み込めません。');
            });
    } else if (detailContainer) {
        showError('求人IDが指定されていません。');
    }

    function showError(message) {
        detailContainer.innerHTML = `
            <div class="loading-state">
                <p>${message}</p>
                <a href="index.html#jobs" class="btn btn-primary mt-4">求人一覧に戻る</a>
            </div>
        `;
    }

    function renderJobDetail(job) {
        const rawTagsData = job['タグ'] || '';
        const rawTags = rawTagsData.split(',').map(t => t.trim());
        const hasNewTag = rawTags.includes('NEW!');
        const textTags = rawTags.filter(t => t !== 'NEW!' && t !== '');

        const detailTags = [
            ...textTags,
            job['在留資格'],
            job['雇用形態'],
            job['業界'],
            job['勤務エリア（カード用）']
        ].filter(tag => tag && tag.trim() !== '');

        const uniqueDetailTags = [...new Set(detailTags)];
        const tagsHtml = uniqueDetailTags.length > 0
            ? `<div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
                ${uniqueDetailTags.map(tag => `<span class="job-tag-styled">#${tag}</span>`).join('')}
               </div>`
            : '';

        const badgeHtml = hasNewTag ? '<span class="job-badge new">NEW</span>' : '';

        // Company name is replaced by Job ID at user request
        const companyName = `求人ID: ${job['求人ID'] || job.ID}`;

        // Helper function to render text with newlines as HTML breaks
        const nl2br = (str) => {
            if (!str) return '';
            return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
        };

        // Extract Title
        const title = job['ポジション / おすすめポイント（カード用）'] || '求人タイトル未設定';
        // Cleanup title if it contains line breaks
        const formattedTitle = title.replace(/(?:\r\n|\r|\n)/g, '<br>');

        const getRowHtml = (label, content) => {
            if (!content || content.trim() === '') return '';
            return `
            <div class="job-detail-row">
                <div class="job-detail-label">${label}</div>
                <div class="job-detail-content">${nl2br(content)}</div>
            </div>`;
        };

        const html = `
            <div class="glass-panel job-detail-panel">
                <!-- Header Section -->
                <div class="job-header">
                    <div class="job-header-info">
                        ${hasNewTag ? `<div class="job-badge-wrapper" style="margin-bottom: 0.5rem;">${badgeHtml}</div>` : ''}
                        <h1 class="job-title-main">${formattedTitle}</h1>
                        <p class="job-company">${companyName}</p>
                    </div>
                </div>
                
                <div class="job-tags" style="margin-bottom: 3rem; display: flex; justify-content: flex-start;">
                    ${tagsHtml}
                </div>

                <!-- En-Japan Style Highlights Section -->
                ${job['おすすめポイント（詳細画面）'] || job['担当者からひとこと（詳細画面）'] ? `
                <div class="job-detail-segment review-segment">
                    <h2 class="segment-title-review">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--clr-primary)" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        プロフェッショナルレビュー
                    </h2>
                    
                    ${job['おすすめポイント（詳細画面）'] ? `
                    <div class="review-block">
                        <h3 class="review-block-title">【おすすめポイント】</h3>
                        <p class="review-block-text">${nl2br(job['おすすめポイント（詳細画面）'])}</p>
                    </div>` : ''}
                    
                    ${job['担当者からひとこと（詳細画面）'] ? `
                    <div class="review-block">
                        <h3 class="review-block-title">【担当者からの一言】</h3>
                        <p class="review-block-text">${nl2br(job['担当者からひとこと（詳細画面）'])}</p>
                    </div>` : ''}
                </div>` : ''}

                <!-- Recommended For Section -->
                ${job['こんな人におすすめ（詳細画面）'] ? `
                <div class="job-detail-segment recommend-segment">
                    <h3 class="segment-title-recommend">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--clr-primary)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        こんな人におすすめ
                    </h3>
                    <p class="recommend-text">${nl2br(job['こんな人におすすめ（詳細画面）'])}</p>
                </div>` : ''}

                <!-- Prominent Application Requirements (応募資格) -->
                ${job['応募資格（詳細画面）'] ? `
                <div class="job-detail-segment require-segment">
                    <h3 class="segment-title-require">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        【必須】応募資格（必ずご確認ください）
                    </h3>
                    <p class="require-text">${nl2br(job['応募資格（詳細画面）'])}</p>
                </div>` : ''}

                <!-- En-Japan Style Detailed Requirements Table (List) -->
                <div class="job-description-segments">
                    <h2 class="segment-title-main">募集要項</h2>
                    
                    <div class="job-detail-table">
                        ${getRowHtml('仕事内容', job['仕事内容（詳細画面）'])}
                        ${getRowHtml('募集背景', job['募集背景（詳細画面）'])}
                        ${getRowHtml('雇用条件', job['雇用条件（詳細画面）'])}
                        ${getRowHtml('勤務地', job['勤務地（詳細画面）'])}
                        ${getRowHtml('勤務時間', job['勤務時間（詳細画面）'])}
                        ${getRowHtml('給与', job['給与（詳細画面）'])}
                        ${getRowHtml('休日休暇', job['休日（詳細画面）'])}
                        ${getRowHtml('福利厚生', job['福利厚生（詳細画面）'])}
                    </div>
                </div>
            </div>
            
            <div class="text-center apply-btn-container">
                <a href="#apply-form" class="btn btn-primary btn-glow btn-lg apply-btn-inner">この求人に応募する</a>
            </div>
        `;

        detailContainer.innerHTML = html;
        updateDynamicSEO(job, formattedTitle);

        /* =========================================
           DYNAMIC SEO & JSON-LD
        ========================================= */
        function updateDynamicSEO(job, formattedTitle) {
            const cleanTitle = formattedTitle.replace(/<br>/g, ' ');
            const pageTitle = `${cleanTitle} | Sewa-Katsu (世話カツ)`;
            const description = `${job['給与（詳細画面）'] || ''} ${job['勤務地（詳細画面）'] || ''} ${job['仕事内容（詳細画面）'] || ''}`.substring(0, 150) + '...';
            const pageUrl = window.location.href;

            // Update Title & Meta
            document.title = pageTitle;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', description);

            // Update OGP
            const ogTitle = document.getElementById('og-title');
            const ogDesc = document.getElementById('og-description');
            const ogUrl = document.getElementById('og-url');
            const canonical = document.getElementById('canonical-link');

            if (ogTitle) ogTitle.setAttribute('content', pageTitle);
            if (ogDesc) ogDesc.setAttribute('content', description);
            if (ogUrl) ogUrl.setAttribute('content', pageUrl);
            if (canonical) canonical.setAttribute('href', pageUrl);

            // Inject JobPosting JSON-LD for Google Job Search
            const script = document.createElement('script');
            script.type = 'application/ld+json';

            const jobPosting = {
                "@context": "https://schema.org/",
                "@type": "JobPosting",
                "title": cleanTitle,
                "description": `
                    <h3>仕事内容</h3><p>${job['仕事内容（詳細画面）'] || ''}</p>
                    <h3>応募資格</h3><p>${job['応募資格（詳細画面）'] || ''}</p>
                    <h3>雇用条件</h3><p>${job['雇用条件（詳細画面）'] || ''}</p>
                `.replace(/\n/g, '<br>'),
                "identifier": {
                    "@type": "PropertyValue",
                    "name": "Sewa-Katsu",
                    "value": job['求人ID'] || job.ID
                },
                "datePosted": new Date().toISOString().split('T')[0],
                "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days from now
                "employmentType": job['雇用形態'] || "FULL_TIME",
                "hiringOrganization": {
                    "@type": "Organization",
                    "name": "Sewa-Katsu (世話カツ)",
                    "sameAs": "https://sewa-katsu.helte.jp/",
                    "logo": "https://sewa-katsu.helte.jp/assets/images/sewa_logo.png"
                },
                "jobLocation": {
                    "@type": "Place",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": job['勤務地（詳細画面）'] || "日本",
                        "addressRegion": job['勤務エリア（カード用）'] || "",
                        "addressCountry": "JP"
                    }
                },
                "baseSalary": {
                    "@type": "MonetaryAmount",
                    "currency": "JPY",
                    "value": {
                        "@type": "QuantitativeValue",
                        "value": job['年収（カード用）'] || "",
                        "unitText": "YEAR"
                    }
                }
            };

            script.text = JSON.stringify(jobPosting);
            document.head.appendChild(script);
        }

        // Setup Sticky CTA
        const stickyTitle = document.getElementById('sticky-job-title');
        const stickySalary = document.getElementById('sticky-job-salary');
        const stickyCta = document.getElementById('sticky-cta');
        const stickyApplyBtn = document.getElementById('sticky-apply-btn');
        const applyFormSection = document.getElementById('apply-form');


        // Note: iframe src and resize are now managed by the portable embed code in job-detail.html

        if (stickyTitle && stickySalary) {
            stickyTitle.textContent = formattedTitle.replace(/<br>/g, ' ');

            // Shorten salary for the sticky bar
            let stickySalaryPreview = job['給与（詳細画面）'] || job['年収（カード用）'] || '';
            if (stickySalaryPreview.length > 30) {
                stickySalaryPreview = stickySalaryPreview.substring(0, 30) + '...';
            }
            stickySalary.textContent = stickySalaryPreview;
        }

        // Smooth scroll for the new apply button and sticky CTA
        [detailContainer.querySelector('a[href="#apply-form"]'), stickyApplyBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector('#apply-form');
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                });
            }
        });

        // Intersection Observer to show/hide Sticky CTA
        if (stickyCta && applyFormSection) {
            const ctaObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    // If the form section is intersecting (visible), hide the sticky CTA.
                    if (entry.isIntersecting) {
                        stickyCta.classList.add('hidden-cta');
                    } else {
                        // Show the sticky CTA only if we've scrolled past the header/hero area
                        if (window.scrollY > 300) {
                            stickyCta.classList.remove('hidden-cta');
                        }
                    }
                });
            }, {
                root: null,
                threshold: 0.1 // Triggers when 10% of the form is visible
            });

            ctaObserver.observe(applyFormSection);

            // Also check scroll position to show CTA initially if scrolled down
            window.addEventListener('scroll', () => {
                const rect = applyFormSection.getBoundingClientRect();
                const isFormVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);

                if (!isFormVisible && window.scrollY > 300) {
                    stickyCta.classList.remove('hidden-cta');
                } else {
                    stickyCta.classList.add('hidden-cta');
                }
            });
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
                if (currentLine.some(f => f.trim() !== '')) {
                    result.push(currentLine);
                }
                currentLine = [];
                currentField = '';
            } else {
                currentField += char;
            }
        }

        currentLine.push(currentField);
        if (currentLine.some(f => f.trim() !== '')) {
            result.push(currentLine);
        }

        if (result.length < 2) return [];

        const headers = result[0].map(h => h.trim());
        const objects = [];

        for (let i = 1; i < result.length; i++) {
            const row = result[i];
            if (row.length === headers.length || row.length > 1) {
                const obj = {};
                headers.forEach((header, index) => {
                    obj[header] = row[index] ? row[index].trim() : '';
                });
                objects.push(obj);
            }
        }

        return objects;
    }

    /* =========================================
       IFRAME RESIZER & EMBED LOGIC
    ========================================= */
    window.addEventListener('message', function (e) {
        // Optional: Uncomment to restrict origin for security
        // if (e.origin !== "https://sewa-katsu-crm-staging.web.app") return; 

        if (!e.data) return;

        // ① Auto-resize iframe height
        if (e.data.type === 'SEWA_EMBED_RESIZE') {
            var iframe = document.getElementById('sewa-embed-frame');
            if (iframe) {
                var newHeight = parseInt(e.data.height);
                if (!isNaN(newHeight)) {
                    iframe.style.height = newHeight + 'px';
                }
            }
        }

        // ② Auto-scroll to top or error field on step change
        if (e.data.type === 'SEWA_EMBED_SCROLL_TOP') {
            var iframe = document.getElementById('sewa-embed-frame');
            if (iframe) {
                var offset = e.data.offset || 0;
                var iframeRect = iframe.getBoundingClientRect();
                var targetY = iframeRect.top + window.scrollY + offset;
                window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
        }
    });

    /* =========================================
       COOKIE CONSENT BANNER LOGIC
    ========================================= */
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const cookieAcceptBtn = document.getElementById('cookie-accept-btn');

    if (cookieBanner && cookieAcceptBtn) {
        if (!localStorage.getItem('cookieConsent')) {
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
