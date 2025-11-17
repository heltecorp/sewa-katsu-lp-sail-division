document.addEventListener('DOMContentLoaded', () => {
    const CONFIG = {
        gasWebAppUrl: 'https://script.google.com/macros/s/AKfycbyRrAO86nduBbYTVOE9DP87gcoNXfY6N8P-Jo8ZR3bWzu1FgtTkqYFvZ_67V0p8r4_w/exec',
        referralBaseUrl: 'https://sewa-katsu-lp-sd.helte.jp/?id=referral'
    };

    const COOKIE_STORAGE_KEY = 'sewakatsu-cookie-consent';
    const ANALYTICS_CONFIG = {
        googleTagId: 'G-FWXZ4WCSZ8',
        microsoftClarityId: 't0pcptw5q1',
        linkedinPartnerId: '8014244'
    };

    const TRANSLATIONS = {
        ja: {
            meta: {
                title: 'ようこそ世話カツへ｜あなたの日本でのキャリアをサポートします'
            },
            header: {
                logoAlt: '世話カツ ロゴ',
                cta: '無料キャリア相談'
            },
            languageToggle: {
                ariaLabel: '言語の切替'
            },
            hero: {
                title: '日本で働きたいITエンジニアのための転職サポート！',
                badgeCombined: 'N1/N2 ホルダー専門のお仕事紹介',
                benefit1: 'お仕事のマッチング',
                benefit2: '書類チェック＆面接の対策',
                benefit3: '就労ビザの取得',
                benefit4: '入社後のサポート',
                requirements: {
                    title: '募集要件',
                    req1: 'プログラミングスキルと3年以上の開発経験',
                    req1_details: '（次のいずれか：PHP、Java、HTML、CSS、JavaScript（TypeScript）、Python）',
                    req2: 'データベースの知識（SQL）',
                    req3: 'Linux/Unixの知識',
                    req4: 'コンピュータネットワークの知識',
                    req5: '4年制大学卒業していること'
                },
                testimonialQuote: '「世話カツのスタッフの方に、履歴書や職務経歴書の書き方から丁寧に教えてもらったのが、本当に助かりました。」',
                testimonialAuthor: '- クラウディアさん (スロバキア出身)'
            },
            form: {
                heading: 'さあ、未来への第一歩を',
                description: 'まずは下のフォームから、あなたのことを教えてください。<br>日本語能力 N1・N2の皆さんへ日本のITエンジニアのお仕事を紹介します！',
                stepLabel: 'ステップ',
                required: '必須',
                optional: '任意',
                buttons: {
                    prev: '戻る',
                    next: '次へ',
                    submit: '利用規約に同意して送信',
                    submitting: '送信中...',
                    addLanguage: '+ 言語と経験を追加'
                },
                stepNames: ['基本情報', 'スキル・ご経験', 'ご希望'],
                welcomeReferred: 'ご友人からのご紹介ですね！',
                welcomeDefault: 'ようこそ、世話カツへ！',
                workExperienceAlert: 'お仕事の経験を一つ以上選択してください。',
                redirectHeading: '申し込みありがとうございました',
                redirectBody: 'ご応募を受け付けました。<br>キャリア面談の日程調整ページへ自動的に移動します。しばらくお待ちください...', 
                successHeading: '申し込みありがとうございました',
                successBody: 'ご応募を受け付けました。<br>内容を確認の上、担当者よりご連絡いたしますので、今しばらくお待ちください。',
                consentNotice: '「送信する」ボタンを押すことにより、<a href="https://sewa-katsu.helte.jp/ja/terms/" target="_blank" class="underline hover:text-sewa-blue">利用規約</a>に同意したものとみなされます。',
                fields: {
                    nameKatakana: {
                        label: 'お名前 (カタカナ)',
                        placeholder: 'スズキ タロウ'
                    },
                    email: {
                        label: 'メールアドレス',
                        placeholder: 'your_address@example.com'
                    },
                    age: {
                        label: '年齢',
                        placeholder: '例：25'
                    },
                    phone: {
                        label: '電話番号',
                        placeholder: '09012345678'
                    },
                    japaneseLevel: {
                        label: '日本語の資格'
                    },
                    englishLevel: {
                        label: '英語での会話レベル'
                    },
                    residenceStatus: {
                        label: '在留資格の種類'
                    },
                    workExperience: {
                        label: 'お仕事の経験（年数）',
                        options: {
                            frontend: 'Web開発 (フロントエンド)',
                            backend: 'Web開発 (バックエンド)',
                            mobile: 'モバイルアプリ開発',
                            cloud: 'インフラ/クラウド',
                            datascience: 'データサイエンス',
                            other: 'その他'
                        }
                    },
                    countryOrigin: {
                        label: '出身国・地域',
                        placeholder: '例：ベトナム'
                    },
                    countryCurrent: {
                        label: '今住んでいる国・地域',
                        placeholder: '例：日本'
                    },
                    desiredLocation: {
                        label: '希望する勤務地',
                        placeholder: '例：東京都内'
                    },
                    education: {
                        label: '最終学歴'
                    }
                },
                options: {
                    select: '選択してください',
                    japaneseLevel: {
                        none: '資格なし'
                    },
                    englishLevel: {
                        basic: '基礎レベル',
                        conversational: '会話レベル',
                        business: 'ビジネスレベル',
                        fluent: '流暢レベル',
                        native: '母国語レベル',
                        none: '話せない'
                    },
                    residenceStatus: {
                        engineer: '技術・人文知識・国際業務',
                        ssw: '特定技能',
                        student: '留学',
                        wh: '特定活動/ワーキングホリデー',
                        spouse: '配偶者等',
                        permanent: '永住者',
                        none: '取得なし',
                        other: 'その他'
                    },
                    education: {
                        highSchool: '高校卒業',
                        vocationalStudent: '在学中（専門学校）',
                        vocationalGraduate: '専門学校卒業',
                        universityStudent: '在学中（大学・大学院）',
                        universityGraduate: '大学卒業',
                        graduateSchool: '大学院卒業'
                    }
                }
            },
            flow: {
                heading: 'ご相談から入社後までの「まるごとサポート」の流れ',
                description: '私たちは、あなたのキャリアのあらゆる段階に寄り添います。',
                step1: '1. 無料相談',
                step2: '2. 求人紹介',
                step3: '3. 選考対策',
                step4: '4. 内定・ビザ',
                step5: '5. 入社後フォロー'
            },
            faq: {
                heading: 'よくあるご質問',
                q1: 'サービスの利用に料金はかかりますか？',
                a1: 'いいえ、かかりません。キャリア相談から求人紹介、内定、入社後のサポートまで、すべてのサービスを無料でご利用いただけますので、ご安心ください。',
                q2: 'まだ転職するか決めていなくても、相談できますか？',
                a2: 'はい、もちろんです。「まずは情報収集したい」「自分の市場価値を知りたい」といった段階でも大歓迎です。あなたのキャリアの可能性を一緒に探しましょう。',
                q3: 'どんな仕事を紹介してもらえますか？',
                a3: '私たちは、IT業界を中心に、外国籍の方が安心して長く働ける優良企業の求人を多数扱っています。あなたの希望とスキルに合ったお仕事を一緒に見つけます。'
            },
            footer: {
                logoAlt: '世話カツ ロゴ'
            },
            floatingCta: '無料キャリア相談',
            share: {
                copySuccess: 'コピーしました！',
                copyFailure: 'コピーに失敗しました',
                referralText: '日本のホテルで働きたいあなたへ！「世話カツ」が履歴書作成から面接まで、あなたの就職を無料でフルサポートします。まずは、下のリンクから詳細をチェック！',
                emailSubject: '「世話カツ」のご紹介',
                lineLabel: 'LINE',
                emailLabel: 'メール',
                messengerLabel: 'Messenger',
                whatsappLabel: 'WhatsApp'
            },
            cookie: {
                title: 'クッキーの利用について',
                text: '当サイトでは、最高の体験を提供するためにクッキーを使用しています。<a href="https://helte.jp/privacy-policy/" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>をご確認ください。',
                accept: '承諾する',
                decline: '拒否する'
            }
        },
        en: {
            meta: {
                title: 'Welcome to sewa-katsu | Supporting Your Career in Japan'
            },
            header: {
                logoAlt: 'sewa-katsu logo',
                cta: 'Free Career Consultation'
            },
            languageToggle: {
                ariaLabel: 'Language toggle'
            },
            hero: {
                title: 'Recruitment support for IT engineers who want to work in Japan!',
                badgeCombined: 'Exclusive Job Offers for N1/N2 Holders',
                benefit1: 'Job Matching',
                benefit2: 'Resume Check & Interview Prep',
                benefit3: 'Work Visa Acquisition',
                benefit4: 'Post-Hire Support',
                requirements: {
                    title: 'Recruitment Requirements',
                    req1: 'Programming skills and 3+ years of development experience',
                    req1_details: '(Any of the following: PHP, Java, HTML, CSS, JavaScript (TypeScript), Python)',
                    req2: 'Database knowledge (SQL)',
                    req3: 'Knowledge of Linux/Unix',
                    req4: 'Knowledge of computer networks',
                    req5: 'Graduation from a 4-year university'
                },
                testimonialQuote: '"The Sewakatsu staff were a huge help, patiently teaching me everything from how to write my resume and CV."',
                testimonialAuthor: '- Klaudia from Slovakia'
            },
            form: {
                heading: 'Take the First Step Toward Your Future',
                description: 'Tell us about yourself in the form below.<br>We introduce IT engineer jobs in Japan to JLPT N1 and N2 talent!',
                stepLabel: 'Step',
                required: 'Required',
                optional: 'Optional',
                buttons: {
                    prev: 'Back',
                    next: 'Next',
                    submit: 'Agree to the Terms and Submit',
                    submitting: 'Submitting...',
                    addLanguage: '+ Add Language & Experience'
                },
                stepNames: ['Basic Information', 'Skills & Experience', 'Preferences'],
                welcomeReferred: 'You were referred by a friend!',
                welcomeDefault: 'Welcome to sewa-katsu!',
                workExperienceAlert: 'Please select at least one work experience.',
                redirectHeading: '申し込みありがとうございました',
                redirectBody: 'We have received your application.<br>You will be redirected to the career consultation scheduling page shortly. Please wait a moment...', 
                successHeading: '申し込みありがとうございました',
                successBody: 'We have received your application.<br>Our team will review the details and contact you soon.',
                consentNotice: 'By clicking “Submit”, you agree to our <a href="https://sewa-katsu.helte.jp/ja/terms/" target="_blank" class="underline hover:text-sewa-blue">Terms of Service</a>.',
                fields: {
                    nameKatakana: {
                        label: 'Name (Katakana)',
                        placeholder: 'e.g., SUZUKI TARO'
                    },
                    email: {
                        label: 'Email address',
                        placeholder: 'your_address@example.com'
                    },
                    age: {
                        label: 'Age',
                        placeholder: 'e.g., 25'
                    },
                    phone: {
                        label: 'Phone number',
                        placeholder: 'e.g., 09012345678'
                    },
                    japaneseLevel: {
                        label: 'Japanese language certification'
                    },
                    englishLevel: {
                        label: 'English conversation level'
                    },
                    residenceStatus: {
                        label: 'Residence status in Japan'
                    },
                    workExperience: {
                        label: 'Work experience (years)'
                    },
                    countryOrigin: {
                        label: 'Country/region of origin',
                        placeholder: 'e.g., Vietnam'
                    },
                    countryCurrent: {
                        label: 'Current country/region of residence',
                        placeholder: 'e.g., Japan'
                    },
                    desiredLocation: {
                        label: 'Preferred work location in Japan',
                        placeholder: 'e.g., Tokyo'
                    },
                    education: {
                        label: 'Highest level of education'
                    }
                },
                options: {
                    select: 'Please select',
                    japaneseLevel: {
                        none: 'No certification'
                    },
                    englishLevel: {
                        basic: 'Basic',
                        conversational: 'Conversational',
                        business: 'Business',
                        fluent: 'Fluent',
                        native: 'Native',
                        none: 'Do not speak'
                    },
                    residenceStatus: {
                        engineer: 'Engineer / Specialist in Humanities / International Services',
                        ssw: 'Specified Skilled Worker',
                        student: 'Student',
                        wh: 'Designated Activities / Working Holiday',
                        spouse: 'Spouse or equivalent',
                        permanent: 'Permanent Resident',
                        none: 'None',
                        other: 'Other'
                    },
                    education: {
                        highSchool: 'High school graduate',
                        vocationalStudent: 'Currently enrolled (vocational school)',
                        vocationalGraduate: 'Vocational school graduate',
                        universityStudent: 'Currently enrolled (university or graduate school)',
                        universityGraduate: 'University graduate',
                        graduateSchool: 'Graduate school graduate'
                    }
                }
            },
            flow: {
                heading: '"Total Support" Flow from Consultation to Post-employment',
                description: 'We are with you every step of the way.',
                step1: '1. Free Consultation',
                step2: '2. Job Matching',
                step3: '3. Interview Prep',
                step4: '4. Offer & Visa',
                step5: '5. After-care'
            },
            faq: {
                heading: 'Frequently Asked Questions',
                q1: 'Is there any fee to use your service?',
                a1: 'No. Every service—from consultations to job introductions, offers, and post-hire support—is completely free, so please feel at ease.',
                q2: 'Can I talk with you even if I\'m not sure about changing jobs yet?',
                a2: 'Absolutely. Whether you simply want information or to understand your market value, we welcome you. Let’s explore your possibilities together.',
                q3: 'What kinds of jobs can you introduce?',
                a3: 'We primarily handle job openings from excellent companies in the IT industry where foreign nationals can thrive. We will find roles that match your goals and skills.'
            },
            footer: {
                logoAlt: 'sewa-katsu logo'
            },
            floatingCta: 'Free Career Consultation',
            share: {
                copySuccess: 'Copied!',
                copyFailure: 'Unable to copy',
                referralText: 'Looking to work at a hotel in Japan? sewa-katsu offers free, end-to-end support from resumes to interviews. Check the details from the link below!',
                emailSubject: 'Introducing sewa-katsu',
                lineLabel: 'LINE',
                emailLabel: 'Email',
                messengerLabel: 'Messenger',
                whatsappLabel: 'WhatsApp'
            },
            cookie: {
                title: 'About Cookies',
                text: 'We use cookies to ensure you get the best experience on our website. Please review our <a href="https://helte.jp/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.',
                accept: 'Accept',
                decline: 'Decline'
            }
        }
    };

    let currentLanguage = 'en';

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
        consentCheckboxContainer: document.getElementById('consent-checkbox-container'),
        formContainer: document.getElementById('custom-form-container'),
        successMessage: document.getElementById('form-success-message'),
        copyButton: document.getElementById('copy-button'),
        copyFeedback: document.getElementById('copy-feedback'),
        referralMessageTextarea: document.getElementById('referral-message'),
        lineShareLink: document.getElementById('line-share-link'),
        emailShareLink: document.getElementById('email-share-link'),
        messengerShareLink: document.getElementById('messenger-share-link'),
        whatsappShareLink: document.getElementById('whatsapp-share-link'),
        heroShareLink: document.getElementById('hero-share-link'),
        languageToggleButtons: document.querySelectorAll('.lang-btn'),
        cookieBanner: document.getElementById('cookie-banner'),
        cookieAcceptBtn: document.getElementById('cookie-accept'),
        cookieDeclineBtn: document.getElementById('cookie-decline'),
        languageExperienceContainer: document.getElementById('language-experience-container'),
        addLanguageBtn: document.getElementById('add-language-btn')
    };

    let currentStep = 0;
    let analyticsLoaded = false;

    function getNestedTranslation(lang, key) {
        return key.split('.').reduce((value, part) => (value && value[part] !== undefined ? value[part] : undefined), TRANSLATIONS[lang]);
    }

    function translate(key, lang = currentLanguage) {
        const value = getNestedTranslation(lang, key);
        if (value !== undefined) {
            return value;
        }
        if (lang !== 'ja') {
            const fallback = getNestedTranslation('ja', key);
            if (fallback !== undefined) {
                return fallback;
            }
        }
        return '';
    }

    function showElement(element) {
        if (element) {
            element.classList.remove('hidden');
            element.style.display = '';
        }
    }

    function hideElement(element) {
        if (element) {
            element.classList.add('hidden');
            element.style.display = 'none';
        }
    }

    function setDisabled(element, isDisabled) {
        if (element) {
            element.disabled = isDisabled;
        }
    }

    function applyTranslations() {
        document.documentElement.lang = currentLanguage === 'ja' ? 'ja' : 'en';
        const pageTitle = translate('meta.title');
        if (pageTitle) {
            document.title = pageTitle;
        }

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.dataset.i18n;
            const translated = translate(key);
            if (translated) {
                el.textContent = translated;
            }
        });

        document.querySelectorAll('[data-i18n-html]').forEach((el) => {
            const key = el.dataset.i18nHtml;
            const translated = translate(key);
            if (translated) {
                el.innerHTML = translated;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
            const key = el.dataset.i18nPlaceholder;
            const translated = translate(key);
            if (translated) {
                el.setAttribute('placeholder', translated);
            }
        });

        document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
            const key = el.dataset.i18nAlt;
            const translated = translate(key);
            if (translated) {
                el.setAttribute('alt', translated);
            }
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
            const key = el.dataset.i18nAriaLabel;
            const translated = translate(key);
            if (translated) {
                el.setAttribute('aria-label', translated);
            }
        });
    }

    function showCookieBanner() {
        if (ELEMENTS.cookieBanner) {
            ELEMENTS.cookieBanner.classList.add('visible');
        }
    }

    function hideCookieBanner() {
        if (ELEMENTS.cookieBanner) {
            ELEMENTS.cookieBanner.classList.remove('visible');
        }
    }

    function setGoogleAnalyticsDisabled(disabled) {
        if (ANALYTICS_CONFIG.googleTagId) {
            window[`ga-disable-${ANALYTICS_CONFIG.googleTagId}`] = disabled;
        }
    }

    function loadGoogleAnalytics() {
        if (window.gtag || !ANALYTICS_CONFIG.googleTagId) {
            return;
        }
        setGoogleAnalyticsDisabled(false);
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', ANALYTICS_CONFIG.googleTagId);

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.googleTagId}`;
        document.head.appendChild(script);
    }

    function loadMicrosoftClarity() {
        if (typeof window.clarity === 'function' || !ANALYTICS_CONFIG.microsoftClarityId) {
            return;
        }
        (function(c, l, a, r, i, t, y) {
            c[a] = c[a] || function () {
                (c[a].q = c[a].q || []).push(arguments);
            };
            t = l.createElement(r);
            t.async = 1;
            t.src = `https://www.clarity.ms/tag/${i}`;
            y = l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t, y);
        })(window, document, 'clarity', 'script', ANALYTICS_CONFIG.microsoftClarityId);
    }

    function loadLinkedInInsight() {
        if (window.lintrk || !ANALYTICS_CONFIG.linkedinPartnerId) {
            return;
        }
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(ANALYTICS_CONFIG.linkedinPartnerId);
        window.lintrk = function(a, b) {
            window.lintrk.q.push([a, b]);
        };
        window.lintrk.q = [];

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
        document.head.appendChild(script);
    }

    function loadAnalyticsScripts() {
        if (analyticsLoaded) {
            return;
        }
        analyticsLoaded = true;
        loadGoogleAnalytics();
        loadMicrosoftClarity();
        loadLinkedInInsight();
    }

    function initCookieBanner() {
        if (!ELEMENTS.cookieBanner) {
            return;
        }
        let consentValue = null;
        try {
            consentValue = localStorage.getItem(COOKIE_STORAGE_KEY);
        } catch (error) {
            consentValue = null;
        }

        if (!consentValue) {
            setGoogleAnalyticsDisabled(true);
            showCookieBanner();
        } else if (consentValue === 'accepted') {
            loadAnalyticsScripts();
        } else {
            setGoogleAnalyticsDisabled(true);
        }
    }

    function handleCookieConsent(value) {
        try {
            localStorage.setItem(COOKIE_STORAGE_KEY, value);
        } catch (error) {
            console.warn('Unable to store cookie consent:', error);
        }
        hideCookieBanner();
        if (value === 'accepted') {
            loadAnalyticsScripts();
        } else {
            setGoogleAnalyticsDisabled(true);
        }
    }

    function updateLanguageToggleUI() {
        ELEMENTS.languageToggleButtons.forEach((btn) => {
            const isActive = btn.dataset.language === currentLanguage;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function updateStepUI() {
        if (!ELEMENTS.steps.length) {
            return;
        }

        ELEMENTS.steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });

        const progress = ((currentStep + 1) / ELEMENTS.steps.length) * 100;
        if (ELEMENTS.progressBar) {
            ELEMENTS.progressBar.style.width = `${progress}%`;
        }

        if (ELEMENTS.currentStepSpan) {
            ELEMENTS.currentStepSpan.textContent = currentStep + 1;
        }

        const stepNames = getNestedTranslation(currentLanguage, 'form.stepNames') || getNestedTranslation('ja', 'form.stepNames') || [];
        if (ELEMENTS.stepNameSpan) {
            ELEMENTS.stepNameSpan.textContent = stepNames[currentStep] || '';
        }

        if (ELEMENTS.prevBtn) {
            ELEMENTS.prevBtn.style.display = currentStep === 0 ? 'none' : 'inline-block';
        }

        if (ELEMENTS.nextBtn) {
            ELEMENTS.nextBtn.style.display = currentStep === ELEMENTS.steps.length - 1 ? 'none' : 'inline-block';
        }

        if (ELEMENTS.submitBtn) {
            if (currentStep === ELEMENTS.steps.length - 1) {
                showElement(ELEMENTS.submitBtn);
                setDisabled(ELEMENTS.submitBtn, false);
                showElement(ELEMENTS.consentCheckboxContainer);
            } else {
                hideElement(ELEMENTS.submitBtn);
                setDisabled(ELEMENTS.submitBtn, true);
                hideElement(ELEMENTS.consentCheckboxContainer);
            }
        }
    }

    function updateWelcomeMessage() {
        let refId = 'N/A';
        try {
            const urlParams = new URLSearchParams(window.location.search);
            refId = urlParams.get('ref_id') || refId;
        } catch (error) {
            console.error('Error processing URL parameters:', error);
            refId = 'Error';
        }

        if (ELEMENTS.refIdInput) {
            ELEMENTS.refIdInput.value = refId;
        }

        if (ELEMENTS.welcomeMessage) {
            ELEMENTS.welcomeMessage.textContent = refId && refId !== 'N/A' && refId !== 'Error'
                ? translate('form.welcomeReferred')
                : translate('form.welcomeDefault');
        }
    }

    function updateFloatingButtonVisibility() {
        if (!ELEMENTS.floatingBtn || !ELEMENTS.formSection) {
            return;
        }
        const scrollPosition = window.scrollY + window.innerHeight;
        const formPosition = ELEMENTS.formSection.offsetTop;
        if (window.scrollY > window.innerHeight / 2 && scrollPosition < formPosition) {
            ELEMENTS.floatingBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        } else {
            ELEMENTS.floatingBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        }
    }

    function validateField(field) {
        if (!field) {
            return true;
        }
        field.classList.remove('invalid');
        if (field.hasAttribute('required') && !field.value) {
            field.classList.add('invalid');
            return false;
        }
        return true;
    }

    function validateCurrentStep() {
        if (!ELEMENTS.steps.length) {
            return true;
        }

        const currentStepElement = ELEMENTS.steps[currentStep];
        if (!currentStepElement) {
            return true;
        }

        let isValid = true;
        const requiredFields = currentStepElement.querySelectorAll('[required]:not(.language-experience-row [required])');
        requiredFields.forEach((field) => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid && currentStep === 1) {
            const langRows = ELEMENTS.languageExperienceContainer.querySelectorAll('.language-experience-row');
            if (langRows.length === 0) {
                alert(translate('form.workExperienceAlert'));
                return false;
            }
            langRows.forEach(row => {
                const langSelect = row.querySelector('select');
                const yearsInput = row.querySelector('input');
                if (!validateField(langSelect) || !validateField(yearsInput)) {
                    isValid = false;
                }
            });
        }

        return isValid;
    }

    function handleNextButtonClick() {
        if (validateCurrentStep()) {
            currentStep += 1;
            updateStepUI();
        }
    }

    function handlePrevButtonClick() {
        currentStep = Math.max(0, currentStep - 1);
        updateStepUI();
    }

    function handleFormSubmission(event) {
        event.preventDefault();
        if (!validateCurrentStep() || !ELEMENTS.form) {
            return;
        }

        if (ELEMENTS.submitBtn) {
            setDisabled(ELEMENTS.submitBtn, true);
            ELEMENTS.submitBtn.textContent = translate('form.buttons.submitting');
        }

        const formData = new FormData(ELEMENTS.form);
        const data = Object.fromEntries(formData.entries());
        
        const languages = [];
        const langSelects = document.querySelectorAll('.language-experience-row select');
        const yearsInputs = document.querySelectorAll('.language-experience-row input');
        langSelects.forEach((select, index) => {
            if(select.value) {
                languages.push({
                    language: select.value,
                    years: yearsInputs[index].value || 0
                });
            }
        });
        data.workExperience = languages;
        data.formType = 'referred';

        fetch(CONFIG.gasWebAppUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).catch((error) => {
            console.error('Fire-and-forget fetch failed:', error);
        });

        hideElement(ELEMENTS.form);
        showElement(ELEMENTS.successMessage);
    }

    function handleCopyButtonClick() {
        if (!ELEMENTS.referralMessageTextarea || !navigator.clipboard) {
            return;
        }
        ELEMENTS.referralMessageTextarea.select();
        navigator.clipboard
            .writeText(ELEMENTS.referralMessageTextarea.value)
            .then(() => {
                if (ELEMENTS.copyFeedback) {
                    ELEMENTS.copyFeedback.textContent = translate('share.copySuccess');
                    ELEMENTS.copyFeedback.style.opacity = '1';
                    setTimeout(() => {
                        ELEMENTS.copyFeedback.style.opacity = '0';
                    }, 2000);
                }
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
                if (ELEMENTS.copyFeedback) {
                    ELEMENTS.copyFeedback.textContent = translate('share.copyFailure');
                    ELEMENTS.copyFeedback.style.opacity = '1';
                    setTimeout(() => {
                        ELEMENTS.copyFeedback.style.opacity = '0';
                    }, 2000);
                }
            });
    }

    function handleHeroShareLinkClick(event) {
        if (!ELEMENTS.heroShareLink) {
            return;
        }
        event.preventDefault();
        const shareSection = document.getElementById('share');
        if (shareSection) {
            shareSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function setupLanguageExperienceForm() {
        if (!ELEMENTS.languageExperienceContainer || !ELEMENTS.addLanguageBtn) return;

        const languages = ["Java", "Python", "JavaScript", "TypeScript", "PHP", "Ruby", "Go", "Swift", "Kotlin", "C++", "C#", "HTML", "CSS", "SQL", "Other"];

        const createLanguageRow = () => {
            const row = document.createElement('div');
            row.className = 'language-experience-row';

            const select = document.createElement('select');
            select.name = 'language[]';
            select.className = 'form-select';
            select.setAttribute('required', '');
            
            let optionsHtml = `<option value="" disabled selected>${translate('options.select')}</option>`;
            languages.forEach(lang => {
                optionsHtml += `<option value="${lang}">${lang}</option>`;
            });
            select.innerHTML = optionsHtml;

            const input = document.createElement('input');
            input.type = 'number';
            input.name = 'years[]';
            input.className = 'form-input';
            input.placeholder = translate('form.fields.age.placeholder');
            input.min = '0';
            input.setAttribute('required', '');

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'remove-language-btn';
            removeBtn.textContent = '×';

            row.appendChild(select);
            row.appendChild(input);
            row.appendChild(removeBtn);

            ELEMENTS.languageExperienceContainer.appendChild(row);
        };

        ELEMENTS.addLanguageBtn.addEventListener('click', createLanguageRow);

        ELEMENTS.languageExperienceContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-language-btn')) {
                e.target.closest('.language-experience-row').remove();
            }
        });

        // Add one row initially
        createLanguageRow();
    }

    function initAnimations() {
        setTimeout(() => {
            ELEMENTS.animatedItems.forEach((el) => el.classList.add('is-visible'));
        }, 100);

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        ELEMENTS.scrollAnimateItems.forEach((el) => {
            scrollObserver.observe(el);
        });
    }

    function updateShareSection() {
        if (!ELEMENTS.referralMessageTextarea) {
            return;
        }
        const referralText = translate('share.referralText');
        const message = `${referralText}\n${CONFIG.referralBaseUrl}`;
        const encodedMessage = encodeURIComponent(message);
        const emailSubject = encodeURIComponent(translate('share.emailSubject'));

        ELEMENTS.referralMessageTextarea.value = message;
        if (ELEMENTS.lineShareLink) {
            ELEMENTS.lineShareLink.href = `https://line.me/R/msg/text/?${encodedMessage}`;
        }
        if (ELEMENTS.emailShareLink) {
            ELEMENTS.emailShareLink.href = `mailto:?subject=${emailSubject}&body=${encodedMessage}`;
        }
        if (ELEMENTS.messengerShareLink) {
            ELEMENTS.messengerShareLink.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(CONFIG.referralBaseUrl)}`;
        }
        if (ELEMENTS.whatsappShareLink) {
            ELEMENTS.whatsappShareLink.href = `https://api.whatsapp.com/send?text=${encodedMessage}`;
        }
    }

    function initForm() {
        currentStep = 0;
        updateWelcomeMessage();
        updateStepUI();
        setupLanguageExperienceForm();
    }

    function setupGlobalEventListeners() {
        window.addEventListener('scroll', updateFloatingButtonVisibility, { passive: true });
        if (ELEMENTS.prevBtn) {
            ELEMENTS.prevBtn.addEventListener('click', handlePrevButtonClick);
        }
        if (ELEMENTS.nextBtn) {
            ELEMENTS.nextBtn.addEventListener('click', handleNextButtonClick);
        }
        if (ELEMENTS.form) {
            ELEMENTS.form.addEventListener('submit', handleFormSubmission);
        }
        if (ELEMENTS.copyButton) {
            ELEMENTS.copyButton.addEventListener('click', handleCopyButtonClick);
        }
        if (ELEMENTS.heroShareLink) {
            ELEMENTS.heroShareLink.addEventListener('click', handleHeroShareLinkClick);
        }
        ELEMENTS.languageToggleButtons.forEach((btn) => {
            btn.addEventListener('click', () => setLanguage(btn.dataset.language));
        });

        if (ELEMENTS.cookieAcceptBtn) {
            ELEMENTS.cookieAcceptBtn.addEventListener('click', () => handleCookieConsent('accepted'));
        }
        if (ELEMENTS.cookieDeclineBtn) {
            ELEMENTS.cookieDeclineBtn.addEventListener('click', () => handleCookieConsent('declined'));
        }
    }

    function setLanguage(lang, options = {}) {
        if (!TRANSLATIONS[lang]) {
            lang = 'en';
        }
        currentLanguage = lang;
        applyTranslations();
        updateStepUI();
        updateWelcomeMessage();
        updateShareSection();
        updateLanguageToggleUI();
        if (!options.skipSave) {
            try {
                localStorage.setItem('sewakatsu-lang', currentLanguage);
            } catch (error) {
                console.warn('Unable to persist language preference:', error);
            }
        }
    }

    const savedLanguage = (() => {
        try {
            return localStorage.getItem('sewakatsu-lang');
        } catch (error) {
            return null;
        }
    })();

    if (savedLanguage && TRANSLATIONS[savedLanguage]) {
        currentLanguage = savedLanguage;
    }

    initAnimations();
    initForm();
    setupGlobalEventListeners();
    setLanguage(currentLanguage, { skipSave: true });
    updateFloatingButtonVisibility();
    initCookieBanner();
});