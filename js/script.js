document.addEventListener('DOMContentLoaded', () => {
    const CONFIG = {
        gasWebAppUrl: 'https://script.google.com/macros/s/AKfycby5MHyTzB6dgLUqOJ-hd24W-7NaM59of1gRItA2rmwTRhafonJjCxcZ8dVj9fJU4qtX/exec',
        jicooRedirectUrl: 'https://www.jicoo.com/t/helte/e/l18IvvwC9O_u',
        referralBaseUrl: 'https://sewa-katsu-lp-sd.helte.jp/?id=referral'
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
                badgeFree: '無料',
                badgeLimited: '日本語能力 N1・N2 の方限定',
                title: 'ホテル業界の外国人材採用を知り尽くしたプロが<br>あなたの最高のキャリア実現を徹底サポート',
                subtitle: 'N1/N2人材のホテル業界への就職に特化。私たちは、言葉の壁だけでなく、文化の壁も乗り越える転職を支援する唯一無二のパートナーです。',
                primaryCta: 'まずは無料でキャリア相談',
                shareCta: 'または、お友達に紹介する →'
            },
            partners: {
                heading: '「世話カツ」がご紹介する信頼のホテルパートナー（一部）',
                description: '外資系ラグジュアリーホテルから全国展開のシティホテルチェーンまで、幅広い優良企業と提携しています。',
                logos: {
                    chm: 'CHMロゴ',
                    esp: 'ESPロゴ',
                    gv: 'GVロゴ',
                    ryu: 'RYUロゴ',
                    sfv: 'SFVロゴ',
                    trs: 'TR&Sロゴ'
                }
            },
            benefits: {
                heading: '「世話カツ」のサービスを受けるメリット',
                description: '「世話カツ」は、あなたが日本でのキャリアを成功に導くための、特別なサポートを提供します。',
                icons: {
                    limitedJobs: '限定非公開求人',
                    resumeSupport: 'プロによる書類添削',
                    interviewPreparation: '徹底した面接対策',
                    aftercare: '安心の入社後フォロー'
                },
                cards: {
                    limitedJobs: {
                        title: '限定非公開求人',
                        body: '一般には出回らない、優良ホテルの非公開求人へのアクセスを提供します。'
                    },
                    resumeSupport: {
                        title: 'プロによる書類添削',
                        body: '外国人材の強みを最大限に活かす履歴書・職務経歴書作成をサポートします。'
                    },
                    interviewPreparation: {
                        title: '徹底した面接対策',
                        body: '日本のホテルならではの面接スタイルを熟知したコンサルタントによる模擬面接で自信をつけます。'
                    },
                    aftercare: {
                        title: '安心の入社後フォロー',
                        body: '新しい環境で安心してスタートできるよう、入社後も定期的に連絡を取りサポートします。'
                    }
                }
            },
            testimonials: {
                heading: '「世話カツ」で夢を叶えた先輩たちの声',
                description: '実際に「世話カツ」を利用し、日本でのキャリアを掴んだ方々の生の声をお届けします。',
                linkLabel: 'noteで詳しく読む',
                items: {
                    shin: {
                        quote: '「日本で働きたい」と思い、インターネットで検索していた時に「世話カツ」を見つけました。他にもいくつか転職サイトはありましたが、ホームページのデザインがとても綺麗で、細部まで情報がしっかり載っていたので、「ここなら信頼できる」と感じて利用を決めました。',
                        name: 'シンさん (韓国出身)',
                        imageAlt: 'シンさん'
                    },
                    lumia: {
                        quote: 'キャリアアドバイザーの方と何度も面接練習をしました。私は話が長くなる癖があったのですが、「ビジネスでは簡潔さが重要」だと、どこを短くすれば良いか具体的にアドバイスをいただけたのが本当に助かりました。自分一人では気づけないことだったので、とても勉強になりました。',
                        name: 'ルミアさん (マレーシア出身)',
                        imageAlt: 'ルミアさん'
                    },
                    claudia: {
                        quote: '初めての日本での就職活動で、何もかもが分かりませんでした。特にヨーロッパとは全く違う履歴書の書き方を丁寧に教えてもらえたのが心強かったです。入社後の住まい探しや手続きまでサポートしていただき、不安がどんどん解消されていきました。おかげで安心して就職活動に臨めました。',
                        name: 'クラウディアさん (スロバキア出身)',
                        imageAlt: 'クラウディアさん'
                    }
                }
            },
            flow: {
                heading: '徹底サポートフロー',
                description: 'ご相談から内定、そして入社後まで、あなたのキャリアに光が差すまで伴走します。',
                steps: {
                    step1: {
                        title: 'オンライン相談',
                        body: 'まずはあなたの希望や経歴をヒアリング。最適なプランを一緒に考えます。'
                    },
                    step2: {
                        title: '求人紹介・書類作成',
                        body: '厳選した求人をご紹介。あなたの魅力が伝わる応募書類の作成もサポート。'
                    },
                    step3: {
                        title: '面接練習・本番',
                        body: '本番を想定した模擬面接で自信をつけます。当日は面接に同席も可能です。'
                    },
                    step4: {
                        title: '内定・入社手続き',
                        body: '給与や待遇の交渉、複雑な入社手続きやビザのサポートまでお任せください。'
                    },
                    step5: {
                        title: '入社後のフォロー',
                        body: '新しい環境で安心してスタートできるよう、入社後も定期的に連絡を取りサポートします。'
                    }
                }
            },
            consultant: {
                heading: 'あなたのキャリアを支えるプロフェッショナル',
                description: '「世話カツ」のコンサルタントは、ホテル業界と外国人材のキャリア支援に情熱を燃やすプロフェッショナル集団です。',
                name: 'Shingo Ono',
                title: 'マネジャー',
                bio: 'グローバル企業で培った経験を活かし、あなたのキャリアを拓くお手伝いをします。<br><br>キャリアアドバイザーとして、日本語会話力向上プログラムの開発やキャリアカウンセリングを担当しています。<br><br>大手製薬会社での勤務経験は、私のキャリア形成の基盤です。営業職として、アレルギーやがん免疫療法といった分野で成果を上げ、その後は新規プロジェクトの立ち上げを主導しました。また、在職中に取得したMBA（経営学修士）は、論理的思考力とビジネスの全体像を捉える力を私に与えてくれました。<br><br>これらの経験と知識を活かし、あなたの強みを見出し、将来につながるキャリアプランを共に描きます。漠然とした不安を抱えている方から、具体的な目標を持つ方まで、一人ひとりに寄り添い、最適な道筋を提案します。'
            },
            share: {
                heading: 'このチャンスを、ご友人にも',
                description: 'あなたの周りにも、日本でのキャリアを探している友人はいませんか？<br>ぜひ「世話カツ」の特別なサポートを教えてあげてください。',
                label: '紹介メッセージとリンク',
                copyButton: 'コピー',
                or: 'または、SNSで直接シェア',
                lineLabel: 'LINE',
                emailLabel: 'メール',
                messengerLabel: 'Messenger',
                whatsappLabel: 'WhatsApp',
                lineAria: 'LINEでシェア',
                emailAria: 'Eメールでシェア',
                messengerAria: 'Facebook Messengerでシェア',
                whatsappAria: 'WhatsAppでシェア',
                copySuccess: 'コピーしました！',
                copyFailure: 'コピーに失敗しました',
                referralText: '日本のホテルで働きたいあなたへ！「世話カツ」が履歴書作成から面接まで、あなたの就職を無料でフルサポートします。まずは、下のリンクから詳細をチェック！',
                emailSubject: '「世話カツ」のご紹介'
            },
            form: {
                heading: 'さあ、未来への第一歩を',
                description: 'まずは下のフォームから、あなたのことを教えてください。<br>日本語能力 N1・N2の皆さんへホテル業界のお仕事を紹介します！',
                stepLabel: 'ステップ',
                required: '必須',
                optional: '任意',
                buttons: {
                    prev: '戻る',
                    next: '次へ',
                    submit: '利用規約に同意して送信',
                    submitting: '送信中...'
                },
                stepNames: ['基本情報', 'スキル・ご経験', 'ご希望'],
                welcomeReferred: 'ご友人からのご紹介ですね！',
                welcomeDefault: 'ようこそ、世話カツへ！',
                workExperienceAlert: 'お仕事の経験を一つ以上選択してください。',
                redirectHeading: 'ありがとうございます！',
                redirectBody: 'ご応募を受け付けました。<br>キャリア面談の日程調整ページへ自動的に移動します。しばらくお待ちください...',
                successHeading: 'ありがとうございます。',
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
                        label: 'お仕事の経験',
                        options: {
                            hotel: 'ホテル',
                            ryokan: '旅館',
                            restaurant: 'レストラン',
                            cafe: 'カフェ',
                            retail: '販売',
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
            faq: {
                heading: 'よくあるご質問',
                q1: 'サービスの利用に料金はかかりますか？',
                a1: 'いいえ、かかりません。キャリア相談から求人紹介、内定、入社後のサポートまで、すべてのサービスを無料でご利用いただけますので、ご安心ください。',
                q2: 'まだ転職するか決めていなくても、相談できますか？',
                a2: 'はい、もちろんです。「まずは情報収集したい」「自分の市場価値を知りたい」といった段階でも大歓迎です。あなたのキャリアの可能性を一緒に探しましょう。',
                q3: 'どんな仕事を紹介してもらえますか？',
                a3: '私たちは、ホテル・飲食業界を中心に、外国籍の方が安心して長く働ける優良企業の求人を多数扱っています。あなたの希望とスキルに合ったお仕事を一緒に見つけます。'
            },
            footer: {
                logoAlt: '世話カツ ロゴ',
                company: '運営会社：株式会社Helte',
                privacy: 'プライバシーポリシー',
                cookie: 'クッキーポリシー',
                terms: '利用規約'
            },
            floatingCta: '無料キャリア相談'
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
                badgeFree: 'Free',
                badgeLimited: 'Exclusive to JLPT N1 & N2 talent',
                title: 'Hospitality hiring experts for international talent<br>Fully committed to achieving your ideal career',
                subtitle: "We specialize in helping JLPT N1/N2 talent land roles in Japan's hotel industry. We are the unique partner who helps you overcome both language and cultural barriers.",
                primaryCta: 'Book a Free Career Consultation',
                shareCta: 'Or share with your friends →'
            },
            partners: {
                heading: 'Trusted hotel partners introduced by sewa-katsu (selected)',
                description: 'From global luxury hotels to nationwide city hotel chains, we partner with a wide range of top-class employers.',
                logos: {
                    chm: 'CHM logo',
                    esp: 'ESP logo',
                    gv: 'GV logo',
                    ryu: 'RYU logo',
                    sfv: 'SFV logo',
                    trs: 'TR&S logo'
                }
            },
            benefits: {
                heading: 'Why Choose sewa-katsu',
                description: 'sewa-katsu delivers dedicated support that helps you build a successful career in Japan.',
                icons: {
                    limitedJobs: 'Exclusive hidden jobs icon',
                    resumeSupport: 'Resume support icon',
                    interviewPreparation: 'Interview preparation icon',
                    aftercare: 'Post-start follow-up icon'
                },
                cards: {
                    limitedJobs: {
                        title: 'Exclusive Hidden Jobs',
                        body: 'Gain access to premium hotel openings that never appear on public job boards.'
                    },
                    resumeSupport: {
                        title: 'Professional Resume Coaching',
                        body: 'We help you craft resumes and CVs that highlight the strengths of international talent.'
                    },
                    interviewPreparation: {
                        title: 'Thorough Interview Preparation',
                        body: "Mock interviews with consultants who understand the hotel industry's expectations in Japan."
                    },
                    aftercare: {
                        title: 'Post-Start Follow-up',
                        body: 'We stay in touch after you join to ensure you can settle into your new environment with confidence.'
                    }
                }
            },
            testimonials: {
                heading: 'Voices of Talent Who Achieved Their Dream with sewa-katsu',
                description: 'Hear directly from people who used sewa-katsu to build their careers in Japan.',
                linkLabel: 'Read the full story on note',
                items: {
                    shin: {
                        quote: '“When I decided I wanted to work in Japan, I found sewa-katsu online. Other job sites existed, but their beautifully designed website packed with detailed information made me feel I could trust them.”',
                        name: 'Shin (from South Korea)',
                        imageAlt: 'Portrait of Shin from South Korea'
                    },
                    lumia: {
                        quote: '“I practiced interviews many times with my career advisor. I tend to talk too long, and they gave concrete advice on how to stay concise in business settings. It was incredibly helpful to receive feedback I could never have figured out alone.”',
                        name: 'Lumia (from Malaysia)',
                        imageAlt: 'Portrait of Lumia from Malaysia'
                    },
                    claudia: {
                        quote: '“It was my first job hunt in Japan and I had no idea where to start. They patiently taught me how to write resumes, which is completely different from Europe. They even supported my housing search and paperwork after I received an offer, which really eased my anxiety.”',
                        name: 'Klaudia (from Slovakia)',
                        imageAlt: 'Portrait of Klaudia from Slovakia'
                    }
                }
            },
            flow: {
                heading: 'End-to-End Support Flow',
                description: 'We stay by your side from the initial consultation through your offer and onboarding, until your career truly takes off.',
                steps: {
                    step1: {
                        title: 'Online Consultation',
                        body: 'We listen to your goals and background and plan the best strategy together.'
                    },
                    step2: {
                        title: 'Job Introductions & Documents',
                        body: 'We introduce carefully selected roles and support you in creating compelling application documents.'
                    },
                    step3: {
                        title: 'Interview Coaching & Day-of Support',
                        body: 'Build confidence through mock interviews. We can even accompany you on the actual day.'
                    },
                    step4: {
                        title: 'Offer & Onboarding Procedures',
                        body: 'Leave salary negotiations, complex paperwork, and visa support to us.'
                    },
                    step5: {
                        title: 'Follow-up After You Start',
                        body: 'We check in regularly after you join so you can thrive in your new environment.'
                    }
                }
            },
            consultant: {
                heading: 'Professionals Supporting Your Career',
                description: 'Our sewa-katsu consultants are passionate experts in both the hotel industry and supporting global talent.',
                name: 'Shingo Ono',
                title: 'Manager',
                bio: 'I draw on my experience in global companies to help open up your career opportunities.<br><br>As a career advisor, I develop Japanese conversation programs and provide one-on-one counseling.<br><br>My years at a major pharmaceutical company laid the foundation for my career. I delivered results in allergy and cancer immunotherapy sales, then led new project launches. Earning an MBA while working strengthened my logical thinking and ability to see the full picture of business.<br><br>I use these experiences to uncover your strengths and co-create a career plan that leads to your future. Whether you feel uncertain or have a clear goal, I will stand beside you and propose the best path forward.'
            },
            share: {
                heading: 'Share this opportunity with your friends',
                description: "Do you have friends who want to build a career in Japan?<br>Let them know about sewa-katsu's dedicated support.",
                label: 'Referral message and link',
                copyButton: 'Copy',
                or: 'Or share directly on social media',
                lineLabel: 'LINE',
                emailLabel: 'Email',
                messengerLabel: 'Messenger',
                whatsappLabel: 'WhatsApp',
                lineAria: 'Share on LINE',
                emailAria: 'Share via email',
                messengerAria: 'Share on Facebook Messenger',
                whatsappAria: 'Share on WhatsApp',
                copySuccess: 'Copied!',
                copyFailure: 'Unable to copy',
                referralText: 'Looking to work at a hotel in Japan? sewa-katsu offers free, end-to-end support from resumes to interviews. Check the details from the link below!',
                emailSubject: 'Introducing sewa-katsu'
            },
            form: {
                heading: 'Take the First Step Toward Your Future',
                description: 'Tell us about yourself in the form below.<br>We introduce hotel jobs in Japan to JLPT N1 and N2 talent!',
                stepLabel: 'Step',
                required: 'Required',
                optional: 'Optional',
                buttons: {
                    prev: 'Back',
                    next: 'Next',
                    submit: 'Agree to the Terms and Submit',
                    submitting: 'Submitting...'
                },
                stepNames: ['Basic Information', 'Skills & Experience', 'Preferences'],
                welcomeReferred: 'You were referred by a friend!',
                welcomeDefault: 'Welcome to sewa-katsu!',
                workExperienceAlert: 'Please select at least one work experience.',
                redirectHeading: 'Thank you!',
                redirectBody: 'We have received your application.<br>You will be redirected to the career consultation scheduling page shortly. Please wait a moment...',
                successHeading: 'Thank you.',
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
                        label: 'Work experience',
                        options: {
                            hotel: 'Hotel',
                            ryokan: 'Ryokan',
                            restaurant: 'Restaurant',
                            cafe: 'Cafe',
                            retail: 'Retail',
                            other: 'Other'
                        }
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
            faq: {
                heading: 'Frequently Asked Questions',
                q1: 'Is there any fee to use your service?',
                a1: 'No. Every service—from consultations to job introductions, offers, and post-hire support—is completely free, so please feel at ease.',
                q2: "Can I talk with you even if I'm not sure about changing jobs yet?",
                a2: 'Absolutely. Whether you simply want information or to understand your market value, we welcome you. Let’s explore your possibilities together.',
                q3: 'What kinds of jobs can you introduce?',
                a3: 'We mainly work with hotels and food & beverage companies that provide supportive environments for international talent. We will find roles that match your goals and skills.'
            },
            footer: {
                logoAlt: 'sewa-katsu logo',
                company: 'Operated by: Helte Co., Ltd.',
                privacy: 'Privacy Policy',
                cookie: 'Cookie Policy',
                terms: 'Terms of Service'
            },
            floatingCta: 'Free Career Consultation'
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
        redirectMessage: document.getElementById('form-redirect-message'),
        referralMessageTextarea: document.getElementById('referral-message'),
        copyButton: document.getElementById('copy-button'),
        copyFeedback: document.getElementById('copy-feedback'),
        lineShareLink: document.getElementById('line-share-link'),
        emailShareLink: document.getElementById('email-share-link'),
        messengerShareLink: document.getElementById('messenger-share-link'),
        whatsappShareLink: document.getElementById('whatsapp-share-link'),
        heroShareLink: document.getElementById('hero-share-link'),
        languageToggleButtons: document.querySelectorAll('.lang-btn')
    };

    let currentStep = 0;

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
        }
    }

    function hideElement(element) {
        if (element) {
            element.classList.add('hidden');
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
            el.textContent = translate(key);
        });

        document.querySelectorAll('[data-i18n-html]').forEach((el) => {
            const key = el.dataset.i18nHtml;
            el.innerHTML = translate(key);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
            const key = el.dataset.i18nPlaceholder;
            el.setAttribute('placeholder', translate(key));
        });

        document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
            const key = el.dataset.i18nAlt;
            el.setAttribute('alt', translate(key));
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
            const key = el.dataset.i18nAriaLabel;
            el.setAttribute('aria-label', translate(key));
        });

        const floatingCta = translate('floatingCta');
        if (ELEMENTS.floatingBtn) {
            const textSpan = ELEMENTS.floatingBtn.querySelector('span[data-i18n="floatingCta"]');
            if (textSpan && floatingCta) {
                textSpan.textContent = floatingCta;
            }
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
        if (!ELEMENTS.welcomeMessage || !ELEMENTS.refIdInput) {
            return;
        }
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const refId = urlParams.get('ref_id');
            if (refId) {
                ELEMENTS.welcomeMessage.textContent = translate('form.welcomeReferred');
                ELEMENTS.refIdInput.value = refId;
            } else {
                ELEMENTS.welcomeMessage.textContent = translate('form.welcomeDefault');
                ELEMENTS.refIdInput.value = 'N/A';
            }
        } catch (error) {
            console.error('Error processing URL parameters:', error);
            ELEMENTS.welcomeMessage.textContent = translate('form.welcomeDefault');
            ELEMENTS.refIdInput.value = 'Error';
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
        currentStepFields.forEach((field) => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        if (currentStep === 1) {
            const expCheckboxes = ELEMENTS.steps[currentStep].querySelectorAll('input[name="workExperience"]:checked');
            if (expCheckboxes.length === 0) {
                isValid = false;
                alert(translate('form.workExperienceAlert'));
            }
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
        if (!validateCurrentStep()) {
            return;
        }

        if (ELEMENTS.submitBtn) {
            setDisabled(ELEMENTS.submitBtn, true);
            ELEMENTS.submitBtn.textContent = translate('form.buttons.submitting');
        }

        const workExperienceCheckboxes = ELEMENTS.form.querySelectorAll('input[name="workExperience"]:checked');
        const workExperienceValues = Array.from(workExperienceCheckboxes).map((cb) => cb.value);
        const formData = new FormData(ELEMENTS.form);
        const data = Object.fromEntries(formData.entries());
        data.workExperience = workExperienceValues;
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

        const japaneseLevel = data.japanese_level;
        if (japaneseLevel === 'JLPT N1' || japaneseLevel === 'JLPT N2') {
            hideElement(ELEMENTS.formContainer);
            showElement(ELEMENTS.redirectMessage);
            setTimeout(() => {
                window.location.href = CONFIG.jicooRedirectUrl;
            }, 1500);
        } else {
            hideElement(ELEMENTS.formContainer);
            showElement(ELEMENTS.successMessage);
        }
    }

    function handleCopyButtonClick() {
        if (!ELEMENTS.referralMessageTextarea) {
            return;
        }
        ELEMENTS.referralMessageTextarea.select();
        navigator.clipboard
            .writeText(ELEMENTS.referralMessageTextarea.value)
            .then(() => {
                ELEMENTS.copyFeedback.textContent = translate('share.copySuccess');
                ELEMENTS.copyFeedback.style.opacity = '1';
                setTimeout(() => {
                    ELEMENTS.copyFeedback.style.opacity = '0';
                }, 2000);
            })
            .catch((err) => {
                console.error('クリップボードへのコピーに失敗しました: ', err);
                ELEMENTS.copyFeedback.textContent = translate('share.copyFailure');
                ELEMENTS.copyFeedback.style.opacity = '1';
                setTimeout(() => {
                    ELEMENTS.copyFeedback.style.opacity = '0';
                }, 2000);
            });
    }

    function handleHeroShareLinkClick(event) {
        event.preventDefault();
        const shareSection = document.getElementById('share');
        if (shareSection) {
            shareSection.scrollIntoView({ behavior: 'smooth' });
        }
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
        const referralText = translate('share.referralText');
        const message = `${referralText}\n${CONFIG.referralBaseUrl}`;
        const encodedMessage = encodeURIComponent(message);
        const emailSubject = encodeURIComponent(translate('share.emailSubject'));

        if (ELEMENTS.referralMessageTextarea) {
            ELEMENTS.referralMessageTextarea.value = message;
        }
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
        updateWelcomeMessage();
        updateStepUI();
    }

    function setupGlobalEventListeners() {
        window.addEventListener('scroll', updateFloatingButtonVisibility, { passive: true });
        if (ELEMENTS.prevBtn) {
            ELEMENTS.prevBtn.addEventListener('click', handlePrevButtonClick);
        }
        if (ELEMENTS.nextBtn) {
            ELEMENTS.nextBtn.addEventListener('click', handleNextButtonClick);
        }
        if (ELEMENTS.submitBtn && ELEMENTS.form) {
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
    }

    function setLanguage(lang, options = {}) {
        if (!TRANSLATIONS[lang]) {
            lang = 'ja';
        }
        currentLanguage = lang;
        applyTranslations();
        updateStepUI();
        updateWelcomeMessage();
        updateShareSection();
        updateLanguageToggleUI();
    }

    initAnimations();
    initForm();
    setupGlobalEventListeners();
    setLanguage(currentLanguage, { skipSave: true });
    updateFloatingButtonVisibility();
});
