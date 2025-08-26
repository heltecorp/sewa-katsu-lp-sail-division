document.addEventListener('DOMContentLoaded', function() {
    // --- Constants ---
    const ELEMENTS = {
        animatedItems: document.querySelectorAll('.animated-item'),
        scrollAnimateItems: document.querySelectorAll('.scroll-animate'),
        welcomeMessage: document.getElementById('welcome-message'),
        refIdInput: document.getElementById('ref_id'),
        floatingBtn: document.getElementById('floating-btn'),
        formSection: document.getElementById('form-section'),
        steps: document.querySelectorAll('.form-step'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        submitBtn: document.getElementById('submit-btn'),
        progressBar: document.getElementById('progress-bar'),
        currentStepSpan: document.getElementById('current-step'),
        stepNameSpan: document.getElementById('step-name'),
        form: document.getElementById('sewakatsu-form'),
        formContainer: document.getElementById('custom-form-container'),
        successMessage: document.getElementById('form-success-message'),
        redirectMessage: document.getElementById('form-redirect-message'),
        referralMessageTextarea: document.getElementById('referral-message'),
        copyButton: document.getElementById('copy-button'),
        copyFeedback: document.getElementById('copy-feedback'),
        lineShareLink: document.getElementById('line-share-link'),
        emailShareLink: document.getElementById('email-share-link'),
        messengerShareLink: document.getElementById('messenger-share-link'),
        whatsappShareLink: document.getElementById('whatsapp-share-link'),
        heroShareLink: document.getElementById('hero-share-link')
    };

    const CONFIG = {
        stepNames: ['基本情報', 'スキル・ご経験', 'ご希望'],
        gasWebAppUrl: 'https://script.google.com/macros/s/AKfycbwXS3UiaiHpiAoACIyTMWZ6DULvyD_-itm3PnOkSbFWSDv95BnV0BtJqDWTKbD-wqEU/exec',
        jicooRedirectUrl: 'https://www.jicoo.com/t/helte/e/l18IvvwC9O_u',
        referralBaseUrl: 'https://sewakatsu.example.com/referral?code=ABC123XYZ',
        referralText: `日本のホテルで働きたいあなたへ！「世話カツ」が履歴書作成から面接まで、あなたの就職を無料でフルサポートします。まずは、下のリンクから詳細をチェック！`
    };

    let currentStep = 0;

    // --- Utility Functions ---
    function showElement(element) {
        if (element) element.classList.remove('hidden');
    }

    function hideElement(element) {
        if (element) element.classList.add('hidden');
    }

    function setDisabled(element, isDisabled) {
        if (element) element.disabled = isDisabled;
    }

    // --- UI Update Functions ---
    function updateStepUI() {
        ELEMENTS.steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });
        const progress = ((currentStep + 1) / ELEMENTS.steps.length) * 100;
        ELEMENTS.progressBar.style.width = `${progress}%`;
        ELEMENTS.currentStepSpan.textContent = currentStep + 1;
        ELEMENTS.stepNameSpan.textContent = CONFIG.stepNames[currentStep];

        ELEMENTS.prevBtn.style.display = currentStep === 0 ? 'none' : 'inline-block';
        ELEMENTS.nextBtn.style.display = currentStep === ELEMENTS.steps.length - 1 ? 'none' : 'inline-block';
        
        if (currentStep === ELEMENTS.steps.length - 1) {
            showElement(ELEMENTS.submitBtn);
            setDisabled(ELEMENTS.submitBtn, false); // Always enable on the last step
        } else {
            hideElement(ELEMENTS.submitBtn);
            setDisabled(ELEMENTS.submitBtn, true);
        }
    }

    function updateWelcomeMessage() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const refId = urlParams.get('ref_id');
            if (refId) {
                ELEMENTS.welcomeMessage.textContent = `ご友人からのご紹介ですね！`;
                ELEMENTS.refIdInput.value = refId;
            } else {
                ELEMENTS.welcomeMessage.textContent = 'ようこそ、世話カツへ！';
                ELEMENTS.refIdInput.value = 'N/A';
            }
        } catch (error) {
            console.error('Error processing URL parameters:', error);
            ELEMENTS.welcomeMessage.textContent = 'ようこそ、世話カツへ！';
            ELEMENTS.refIdInput.value = 'Error';
        }
    }

    function updateFloatingButtonVisibility() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const formPosition = ELEMENTS.formSection.offsetTop; 
        if (window.scrollY > window.innerHeight / 2 && scrollPosition < formPosition) {
            ELEMENTS.floatingBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        } else {
            ELEMENTS.floatingBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        }
    }

    // --- Validation Functions ---
    function validateField(field) {
        field.classList.remove('invalid');
        if (field.hasAttribute('required') && !field.value) {
            field.classList.add('invalid');
            return false;
        }
        return true;
    }

    function validateCurrentStep() {
        const currentStepFields = ELEMENTS.steps[currentStep].querySelectorAll('[required]');
        let isValid = true;
        currentStepFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        // Specific validation for work experience checkboxes
        if (currentStep === 1) {
            const expCheckboxes = ELEMENTS.steps[currentStep].querySelectorAll('input[name="workExperience"]:checked');
            if(expCheckboxes.length === 0) {
                isValid = false;
                alert('お仕事の経験を一つ以上選択してください。'); // Consider replacing with inline error
            }
        }
        return isValid;
    }

    // --- Event Handlers ---
    function handleNextButtonClick() {
        if (validateCurrentStep()) {
            currentStep++;
            updateStepUI();
        }
    }

    function handlePrevButtonClick() {
        currentStep--;
        updateStepUI();
    }

    function handleFormSubmission(e) {
        e.preventDefault();
        if (!validateCurrentStep()) return;

        setDisabled(ELEMENTS.submitBtn, true);
        ELEMENTS.submitBtn.textContent = '送信中...';

        const workExperienceCheckboxes = ELEMENTS.form.querySelectorAll('input[name="workExperience"]:checked');
        const workExperienceValues = Array.from(workExperienceCheckboxes).map(cb => cb.value);
        const formData = new FormData(ELEMENTS.form);
        const data = Object.fromEntries(formData.entries());
        data.workExperience = workExperienceValues;
        data.formType = 'referred';

        // 「Fire and Forget」: データを送信するが、返事は待たない
        fetch(CONFIG.gasWebAppUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(data)
        }).catch(error => {
            // 送信に失敗してもユーザーには見せないが、開発者向けにログは残す
            console.error('Fire-and-forget fetch failed:', error);
        });

        // データ送信を待たずに、すぐに画面を切り替える
        const japaneseLevel = data.japanese_level;
        if (japaneseLevel === 'JLPT N1' || japaneseLevel === 'JLPT N2') {
            hideElement(ELEMENTS.formContainer);
            showElement(ELEMENTS.redirectMessage);
            setTimeout(() => { window.location.href = CONFIG.jicooRedirectUrl; }, 1500);
        } else {
            hideElement(ELEMENTS.formContainer);
            showElement(ELEMENTS.successMessage);
        }
    }

    function handleCopyButtonClick() {
        if (ELEMENTS.referralMessageTextarea) {
            ELEMENTS.referralMessageTextarea.select();
            navigator.clipboard.writeText(ELEMENTS.referralMessageTextarea.value).then(() => {
                ELEMENTS.copyFeedback.textContent = 'コピーしました！';
                ELEMENTS.copyFeedback.style.opacity = '1';
                setTimeout(() => { ELEMENTS.copyFeedback.style.opacity = '0'; }, 2000);
            }).catch(err => {
                console.error('クリップボードへのコピーに失敗しました: ', err);
                ELEMENTS.copyFeedback.textContent = 'コピーに失敗しました';
            });
        }
    }

    function handleHeroShareLinkClick(e) {
        e.preventDefault();
        document.getElementById('share').scrollIntoView({ behavior: 'smooth' });
    }

    // --- Initialization ---
    function initAnimations() {
        setTimeout(() => { ELEMENTS.animatedItems.forEach(el => el.classList.add('is-visible')); }, 100);
        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        ELEMENTS.scrollAnimateItems.forEach(el => {
            scrollObserver.observe(el);
        });
    }

    function initShareSection() {
        const encodedReferralMessage = encodeURIComponent(`${CONFIG.referralText}\n${CONFIG.referralBaseUrl}`);
        if (ELEMENTS.referralMessageTextarea) {
            ELEMENTS.referralMessageTextarea.value = `${CONFIG.referralText}\n${CONFIG.referralBaseUrl}`;
        }
        if (ELEMENTS.lineShareLink) { ELEMENTS.lineShareLink.href = `https://line.me/R/msg/text/?${encodedReferralMessage}`; }
        if (ELEMENTS.emailShareLink) { ELEMENTS.emailShareLink.href = `mailto:?subject=${encodeURIComponent('「世話カツ」のご紹介')}&body=${encodedReferralMessage}`; }
        if (ELEMENTS.messengerShareLink) { ELEMENTS.messengerShareLink.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(CONFIG.referralBaseUrl)}`; }
        if (ELEMENTS.whatsappShareLink) { ELEMENTS.whatsappShareLink.href = `https://api.whatsapp.com/send?text=${encodedReferralMessage}`; }
    }

    function initForm() {
        updateWelcomeMessage();
        updateStepUI(); // Initial UI update
    }

    function setupGlobalEventListeners() {
        window.addEventListener('scroll', updateFloatingButtonVisibility, { passive: true });
        if (ELEMENTS.prevBtn) ELEMENTS.prevBtn.addEventListener('click', handlePrevButtonClick);
        if (ELEMENTS.nextBtn) ELEMENTS.nextBtn.addEventListener('click', handleNextButtonClick);
        if (ELEMENTS.submitBtn) ELEMENTS.form.addEventListener('submit', handleFormSubmission);
        if (ELEMENTS.copyButton) ELEMENTS.copyButton.addEventListener('click', handleCopyButtonClick);
        if (ELEMENTS.heroShareLink) ELEMENTS.heroShareLink.addEventListener('click', handleHeroShareLinkClick);
    }

    // --- Main Initialization ---
    initAnimations();
    initShareSection();
    initForm();
    setupGlobalEventListeners();
});