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
        fetch('data/jobs_preview_export.csv')
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
        // Smart Tag Generation: If Tags column doesn't exist, we create some from employment type and language
        let tagsHtml = '';
        if (job['雇用形態']) {
            tagsHtml += `<span class="job-tag">${job['雇用形態']}</span>`;
        }
        if (job['言語要件']) {
            const langStr = job['言語要件'].includes('N1') ? 'N1' :
                job['言語要件'].includes('N2') ? 'N2' :
                    job['言語要件'].includes('N3') ? 'N3' :
                        job['言語要件'].includes('N4') ? 'N4' : '語学不問';
            tagsHtml += `<span class="job-tag">JLPT ${langStr}</span>`;
        }
        if (job['年齢要件']) {
            tagsHtml += `<span class="job-tag">${job['年齢要件']}</span>`;
        }

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
            ? '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>'
            : '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>';
        const logoClass = isConfidential ? 'company-logo confidential' : 'company-logo';

        // Helper function to render text with newlines as HTML breaks
        const nl2br = (str) => {
            if (!str) return '';
            return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
        };

        const html = `
            <div class="glass-panel" style="padding: 3rem; margin-bottom: 3rem;">
                <div class="job-header" style="margin-bottom: 2rem;">
                    <div style="display: flex; align-items: center; gap: 1.5rem;">
                        <div class="${logoClass}" style="width: 80px; height: 80px; font-size: 2rem;">${logoContent}</div>
                        <div>
                            ${badgeHtml}
                            <h1 class="job-title" style="font-size: 2rem; margin-top: 0.5rem; margin-bottom: 0.5rem; line-height: 1.3;">${job['求人名']}</h1>
                            <p class="job-company" style="font-size: 1.125rem;">${companyName}</p>
                        </div>
                    </div>
                </div>
                
                <div class="job-details" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-bottom: 2.5rem; background: var(--clr-bg-surface-lighter); padding: 2rem; border-radius: 16px; border: 1px solid var(--clr-border);">
                    <div class="detail-item" style="flex-direction: column; align-items: flex-start;">
                        <span class="detail-icon" style="margin-bottom: 0.5rem; color: var(--clr-text-muted); font-size: 0.875rem;">勤務地</span>
                        <div style="font-size: 1.125rem; font-weight: 600; line-height: 1.4;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--clr-primary)" stroke-width="2" style="margin-right: 0.5rem; vertical-align: middle; flex-shrink: 0;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            ${nl2br(job['勤務地'])}
                        </div>
                        ${job['勤務地詳細'] ? `<div style="font-size: 0.875rem; color: var(--clr-text-muted); margin-top: 0.5rem;">${nl2br(job['勤務地詳細'])}</div>` : ''}
                    </div>
                    <div class="detail-item" style="flex-direction: column; align-items: flex-start;">
                        <span class="detail-icon" style="margin-bottom: 0.5rem; color: var(--clr-text-muted); font-size: 0.875rem;">想定給与</span>
                        <div style="font-size: 1.125rem; font-weight: 600; line-height: 1.4;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--clr-primary)" stroke-width="2" style="margin-right: 0.5rem; vertical-align: middle; flex-shrink: 0;"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            ${nl2br(job['給与'])}
                        </div>
                    </div>
                    <div class="detail-item" style="flex-direction: column; align-items: flex-start;">
                        <span class="detail-icon" style="margin-bottom: 0.5rem; color: var(--clr-text-muted); font-size: 0.875rem;">必須日本語レベル</span>
                        <div style="font-size: 1.125rem; font-weight: 600; line-height: 1.4;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--clr-primary)" stroke-width="2" style="margin-right: 0.5rem; vertical-align: middle; flex-shrink: 0;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            ${job['言語要件'] && (job['言語要件'].includes('N') || job['言語要件'].includes('日本語')) ? nl2br(job['言語要件']) : '不問'}
                        </div>
                    </div>
                </div>
                
                <div class="job-tags" style="margin-bottom: 3rem;">
                    ${tagsHtml}
                </div>

                <!-- Ultimate Segmented Content Layout -->
                <div class="job-description-segments">
                    
                    ${job['概要'] ? `
                    <div class="segment" style="margin-bottom: 2.5rem;">
                        <h3 style="margin-bottom: 1rem; font-size: 1.25rem; color: var(--clr-primary); display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                            概要
                        </h3>
                        <p style="white-space: pre-wrap; color: var(--clr-text); line-height: 1.8;">${job['概要']}</p>
                    </div>` : ''}

                    ${job['仕事内容'] ? `
                    <div class="segment" style="margin-bottom: 2.5rem;">
                        <h3 style="margin-bottom: 1rem; font-size: 1.25rem; color: var(--clr-primary); display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            仕事内容
                        </h3>
                        <p style="white-space: pre-wrap; color: var(--clr-text); line-height: 1.8;">${job['仕事内容']}</p>
                    </div>` : ''}

                    ${job['応募要件'] ? `
                    <div class="segment" style="margin-bottom: 2.5rem; background: rgba(246, 103, 72, 0.05); padding: 1.5rem; border-radius: 12px; border-left: 4px solid var(--clr-primary);">
                        <h3 style="margin-bottom: 1rem; font-size: 1.25rem; color: var(--clr-primary); display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            応募要件
                        </h3>
                        <p style="white-space: pre-wrap; color: var(--clr-text); line-height: 1.8;">${job['応募要件']}</p>
                    </div>` : ''}

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        ${job['勤務時間'] ? `
                        <div class="segment">
                            <h3 style="margin-bottom: 1rem; font-size: 1.25rem; color: var(--clr-primary); display: flex; align-items: center; gap: 0.5rem;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                勤務時間
                            </h3>
                            <p style="white-space: pre-wrap; color: var(--clr-text); line-height: 1.8;">${job['勤務時間']}</p>
                        </div>` : ''}

                        ${job['休日休暇'] ? `
                        <div class="segment">
                            <h3 style="margin-bottom: 1rem; font-size: 1.25rem; color: var(--clr-primary); display: flex; align-items: center; gap: 0.5rem;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                休日休暇
                            </h3>
                            <p style="white-space: pre-wrap; color: var(--clr-text); line-height: 1.8;">${job['休日休暇']}</p>
                        </div>` : ''}
                    </div>

                    ${job['福利厚生'] || job['保険'] || job['住宅サポート'] ? `
                    <div class="segment" style="margin-top: 2.5rem; margin-bottom: 2.5rem; padding-top: 2.5rem; border-top: 1px dashed var(--clr-border);">
                        <h3 style="margin-bottom: 1rem; font-size: 1.25rem; color: var(--clr-primary); display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            福利厚生・サポート
                        </h3>
                        <ul style="color: var(--clr-text); line-height: 1.8; list-style-type: none; padding: 0;">
                            ${job['保険'] ? `<li style="margin-bottom: 0.5rem;"><strong>社会保険:</strong> ${job['保険']}</li>` : ''}
                            ${job['福利厚生'] ? `<li style="margin-bottom: 0.5rem;"><strong>福利厚生:</strong><br>${nl2br(job['福利厚生'])}</li>` : ''}
                            ${job['住宅サポート'] ? `<li style="margin-bottom: 0.5rem;"><strong>住宅サポート:</strong> ${job['住宅サポート']}<br>${job['住宅サポート詳細'] ? nl2br(job['住宅サポート詳細']) : ''}</li>` : ''}
                            ${job['引越サポート'] ? `<li style="margin-bottom: 0.5rem;"><strong>引越サポート:</strong> ${job['引越サポート']}<br>${job['引越サポート詳細'] ? nl2br(job['引越サポート詳細']) : ''}</li>` : ''}
                            ${job['ビザサポート有無'] ? `<li style="margin-bottom: 0.5rem;"><strong>ビザサポート:</strong> ${job['ビザサポート有無']}</li>` : ''}
                        </ul>
                    </div>` : ''}

                    ${job['選考プロセス'] ? `
                    <div class="segment" style="margin-top: 2.5rem; background: var(--clr-bg-surface-lighter); padding: 1.5rem; border-radius: 12px;">
                        <h3 style="margin-bottom: 1rem; font-size: 1.125rem; color: var(--clr-text); display: flex; align-items: center; gap: 0.5rem;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                            選考プロセス
                        </h3>
                        <p style="white-space: pre-wrap; color: var(--clr-text); line-height: 1.8;">${job['選考プロセス']}</p>
                    </div>` : ''}

                </div>
            </div>
            
            <div class="text-center">
                <a href="#apply-form" class="btn btn-primary btn-glow btn-lg" style="margin-bottom: 2rem; font-size: 1.125rem; padding: 1rem 3rem;">この求人に応募する</a>
            </div>
        `;

        detailContainer.innerHTML = html;

        // Setup Sticky CTA
        const stickyTitle = document.getElementById('sticky-job-title');
        const stickySalary = document.getElementById('sticky-job-salary');
        const stickyCta = document.getElementById('sticky-cta');
        const stickyApplyBtn = document.getElementById('sticky-apply-btn');
        const applyFormSection = document.getElementById('apply-form');

        const iframe = document.getElementById('sewa-embed-frame');
        if (iframe) {
            iframe.src = `https://sewa-katsu-crm-staging.web.app/entry/embed?source=${job['求人ID']}&inflow_url=${encodeURIComponent(window.location.href)}`;
        }

        if (stickyTitle && stickySalary) {
            stickyTitle.textContent = job['求人名'];

            // Shorten salary for the sticky bar
            let stickySalaryPreview = job['給与'] || '';
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
        if (e.data.type === 'SEWA_EMBED_RESIZE') {
            var iframe = document.getElementById('sewa-embed-frame');
            if (iframe) {
                var newHeight = parseInt(e.data.height);
                if (!isNaN(newHeight)) {
                    iframe.style.height = newHeight + 'px';
                }
            }
        }
    });

});
