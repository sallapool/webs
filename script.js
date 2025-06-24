// Language translations
const translations = {
    ar: {
        // Navigation
        'الرئيسية': 'الرئيسية',
        'من نحن': 'من نحن',
        'خدماتنا': 'خدماتنا',
        'رؤيتنا': 'رؤيتنا',
        'سير العمل': 'سير العمل',
        'اتصل بنا': 'اتصل بنا',
        'تسجيل الدخول': 'تسجيل الدخول',
        'العربية': 'العربية',
        
        // Hero section
        'منصة موردك': 'منصة موردك',
        'بوابتك الآمنة للاستيراد من الصين': 'بوابتك الآمنة للاستيراد من الصين',
        
        // Services
        'الاستيراد': 'الاستيراد',
        'الفحص': 'الفحص',
        'التمثيل': 'التمثيل',
        'الامتثال': 'الامتثال',
        'التوثيق': 'التوثيق',
        'الشحن': 'الشحن',
        'خطة تسعيرية': 'خطة تسعيرية',
        'خطة تسويقية': 'خطة تسويقية',
        'دراسة جدوى': 'دراسة جدوى',
        
        // Buttons
        'استكشف خدماتنا': 'استكشف خدماتنا',
        'استشارة مجانية': 'استشارة مجانية',
        
        // Chat
        'واتساب': 'واتساب',
        'إيميل': 'إيميل',
        'استشارة': 'استشارة'
    },
    en: {
        // Navigation
        'الرئيسية': 'Home',
        'من نحن': 'About Us',
        'خدماتنا': 'Our Services',
        'رؤيتنا': 'Our Vision',
        'سير العمل': 'Process',
        'اتصل بنا': 'Contact Us',
        'تسجيل الدخول': 'Login',
        'العربية': 'English',
        
        // Hero section
        'منصة موردك': 'Mourdak Platform',
        'بوابتك الآمنة للاستيراد من الصين': 'Your Secure Gateway to Import from China',
        
        // Services
        'الاستيراد': 'Import',
        'الفحص': 'Inspection',
        'التمثيل': 'Representation',
        'الامتثال': 'Compliance',
        'التوثيق': 'Documentation',
        'الشحن': 'Shipping',
        'خطة تسعيرية': 'Pricing Plan',
        'خطة تسويقية': 'Marketing Plan',
        'دراسة جدوى': 'Feasibility Study',
        
        // Buttons
        'استكشف خدماتنا': 'Explore Our Services',
        'استشارة مجانية': 'Free Consultation',
        
        // Chat
        'واتساب': 'WhatsApp',
        'إيميل': 'Email',
        'استشارة': 'Consultation'
    },
    zh: {
        // Navigation
        'الرئيسية': '首页',
        'من نحن': '关于我们',
        'خدماتنا': '我们的服务',
        'رؤيتنا': '我们的愿景',
        'سير العمل': '工作流程',
        'اتصل بنا': '联系我们',
        'تسجيل الدخول': '登录',
        'العربية': '中文',
        
        // Hero section
        'منصة موردك': 'Mourdak平台',
        'بوابتك الآمنة للاستيراد من الصين': '您从中国进口的安全门户',
        
        // Services
        'الاستيراد': '进口',
        'الفحص': '检验',
        'التمثيل': '代表',
        'الامتثال': '合规',
        'التوثيق': '文档',
        'الشحن': '运输',
        'خطة تسعيرية': '价格计划',
        'خطة تسويقية': '营销计划',
        'دراسة جدوى': '可行性研究',
        
        // Buttons
        'استكشف خدماتنا': '探索我们的服务',
        'استشارة مجانية': '免费咨询',
        
        // Chat
        'واتساب': '微信',
        'إيميل': '邮箱',
        'استشارة': '咨询'
    }
};

// Service details data
const serviceDetails = {
    import: {
        ar: {
            title: 'خدمة الاستيراد',
            description: 'نبسط عملية الاستيراد للأفراد والشركات لضمان حصولك على منتجاتك بسرعة وكفاءة، مع تأكيد التزامنا بتنفيذ كل خطوة بدقة.',
            features: [
                'البحث عن أفضل الموردين في الصين',
                'التفاوض على الأسعار والشروط',
                'إدارة الطلبات والمتابعة',
                'تتبع الشحنات لحظة بلحظة',
                'التخليص الجمركي السريع',
                'ضمان الجودة والمطابقة',
                'خدمة عملاء متاحة 24/7'
            ],
            image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        en: {
            title: 'Import Service',
            description: 'We simplify the import process for individuals and companies to ensure you get your products quickly and efficiently, with our commitment to executing every step accurately.',
            features: [
                'Finding the best suppliers in China',
                'Price and terms negotiation',
                'Order management and follow-up',
                'Real-time shipment tracking',
                'Fast customs clearance',
                'Quality assurance and compliance',
                '24/7 customer service'
            ],
            image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        zh: {
            title: '进口服务',
            description: '我们为个人和公司简化进口流程，确保您快速高效地获得产品，我们承诺准确执行每一步。',
            features: [
                '寻找中国最佳供应商',
                '价格和条款谈判',
                '订单管理和跟进',
                '实时货物跟踪',
                '快速清关服务',
                '质量保证和合规',
                '24/7客户服务'
            ],
            image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
    },
    inspection: {
        ar: {
            title: 'خدمة الفحص',
            description: 'نتعاقد مع مفتشين محليين لفحص منتجك بنسبة 100%، مرفقًا بصور وتقرير مفصل. نضمن الجودة، السلامة، ومطابقة المواصفات.',
            features: [
                'فحص شامل للمنتجات قبل الشحن',
                'تقارير مصورة مفصلة',
                'فحص الجودة والسلامة',
                'التأكد من مطابقة المواصفات',
                'شهادات الفحص المعتمدة',
                'فحص التعبئة والتغليف',
                'تقييم المخاطر والعيوب'
            ],
            image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        en: {
            title: 'Inspection Service',
            description: 'We contract with local inspectors to inspect your product 100%, accompanied by photos and detailed reports. We guarantee quality, safety, and specification compliance.',
            features: [
                'Comprehensive pre-shipment inspection',
                'Detailed photo reports',
                'Quality and safety inspection',
                'Specification compliance verification',
                'Certified inspection certificates',
                'Packaging and labeling inspection',
                'Risk and defect assessment'
            ],
            image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        zh: {
            title: '检验服务',
            description: '我们与当地检验员签约，对您的产品进行100%检验，附带照片和详细报告。我们保证质量、安全和规格合规。',
            features: [
                '发货前全面检验',
                '详细图片报告',
                '质量安全检验',
                '规格合规验证',
                '认证检验证书',
                '包装标签检验',
                '风险缺陷评估'
            ],
            image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
    },
    representation: {
        ar: {
            title: 'خدمة التمثيل',
            description: 'نعمل كوكلاء معتمدين مع المصانع الصينية لإتمام العقود التجارية نيابة عنك، مما يضمن الشفافية والموثوقية في جميع عملياتك التجارية.',
            features: [
                'التمثيل القانوني المعتمد',
                'إتمام العقود التجارية',
                'التفاوض مع المصانع',
                'ضمان الشفافية الكاملة',
                'المتابعة المستمرة',
                'حماية حقوقك التجارية',
                'إدارة العلاقات طويلة الأمد'
            ],
            image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        en: {
            title: 'Representation Service',
            description: 'We work as authorized agents with Chinese factories to complete commercial contracts on your behalf, ensuring transparency and reliability in all your business operations.',
            features: [
                'Certified legal representation',
                'Commercial contract completion',
                'Factory negotiations',
                'Complete transparency guarantee',
                'Continuous follow-up',
                'Business rights protection',
                'Long-term relationship management'
            ],
            image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        zh: {
            title: '代表服务',
            description: '我们作为授权代理与中国工厂合作，代表您完成商业合同，确保您所有业务操作的透明度和可靠性。',
            features: [
                '认证法律代表',
                '商业合同完成',
                '工厂谈判',
                '完全透明保证',
                '持续跟进',
                '商业权利保护',
                '长期关系管理'
            ],
            image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
    },
    compliance: {
        ar: {
            title: 'خدمة الامتثال',
            description: 'نضمن أن جميع الاتفاقيات التجارية والإجراءات تتوافق مع أعلى معايير الصناعة وأفضل الممارسات العالمية.',
            features: [
                'التوافق مع معايير الصناعة',
                'أفضل الممارسات العالمية',
                'مراجعة الاتفاقيات القانونية',
                'ضمان الامتثال القانوني',
                'التدقيق المنتظم',
                'إدارة المخاطر',
                'التحديث المستمر للمعايير'
            ],
            image: 'https://images.pexels.com/photos/3194519/pexels-photo-3194519.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        en: {
            title: 'Compliance Service',
            description: 'We ensure that all commercial agreements and procedures comply with the highest industry standards and best global practices.',
            features: [
                'Industry standards compliance',
                'Global best practices',
                'Legal agreement review',
                'Legal compliance guarantee',
                'Regular auditing',
                'Risk management',
                'Continuous standards updates'
            ],
            image: 'https://images.pexels.com/photos/3194519/pexels-photo-3194519.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        zh: {
            title: '合规服务',
            description: '我们确保所有商业协议和程序都符合最高的行业标准和全球最佳实践。',
            features: [
                '行业标准合规',
                '全球最佳实践',
                '法律协议审查',
                '法律合规保证',
                '定期审计',
                '风险管理',
                '标准持续更新'
            ],
            image: 'https://images.pexels.com/photos/3194519/pexels-photo-3194519.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
    },
    documentation: {
        ar: {
            title: 'خدمة التوثيق',
            description: 'نقدم حلول توثيق كاملة تشمل وثائق الجودة والضمان لجميع مشترياتك، مما يوفر لك الطمأنينة في كل صفقة تجارية.',
            features: [
                'وثائق الجودة الشاملة',
                'شهادات الضمان المعتمدة',
                'التوثيق القانوني الكامل',
                'أرشفة المستندات الآمنة',
                'خدمات الترجمة المعتمدة',
                'إدارة الوثائق الرقمية',
                'النسخ الاحتياطية الآمنة'
            ],
            image: 'https://images.pexels.com/photos/4386472/pexels-photo-4386472.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        en: {
            title: 'Documentation Service',
            description: 'We provide complete documentation solutions including quality and guarantee documents for all your purchases, giving you peace of mind in every business deal.',
            features: [
                'Comprehensive quality documents',
                'Certified warranty certificates',
                'Complete legal documentation',
                'Secure document archiving',
                'Certified translation services',
                'Digital document management',
                'Secure backup copies'
            ],
            image: 'https://images.pexels.com/photos/4386472/pexels-photo-4386472.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        zh: {
            title: '文档服务',
            description: '我们为您的所有采购提供完整的文档解决方案，包括质量和保证文件，让您在每笔商业交易中都安心。',
            features: [
                '全面质量文件',
                '认证保修证书',
                '完整法律文档',
                '安全文档归档',
                '认证翻译服务',
                '数字文档管理',
                '安全备份副本'
            ],
            image: 'https://images.pexels.com/photos/4386472/pexels-photo-4386472.jpeg?auto=compress&cs=tinysrgb&w=800 '
        }
    },
    shipping: {
        ar: {
            title: 'خدمة الشحن',
            description: 'ندير جميع خدمات الشحن اللوجستية، مع ضمان التخليص الجمركي السلس والتسليم في الوقت المحدد، مما يجعل عملية الاستيراد أكثر سلاسة.',
            features: [
                'إدارة الشحن الدولي',
                'التخليص الجمركي السريع',
                'التسليم في الوقت المحدد',
                'تتبع الشحنات المباشر',
                'التأمين على البضائع',
                'خيارات شحن متعددة',
                'دعم لوجستي متكامل'
            ],
            image: 'gallery.jpg'
        },
        en: {
            title: 'Shipping Service',
            description: 'We manage all logistical shipping services, ensuring smooth customs clearance and on-time delivery, making the import process smoother.',
            features: [
                'International shipping management',
                'Fast customs clearance',
                'On-time delivery',
                'Real-time shipment tracking',
                'Cargo insurance',
                'Multiple shipping options',
                'Integrated logistics support'
            ],
            image: 'gallery.jpg'
        },
        zh: {
            title: '运输服务',
            description: '我们管理所有物流运输服务，确保顺利的清关和准时交付，使进口过程更加顺畅。',
            features: [
                '国际运输管理',
                '快速清关服务',
                '准时交付',
                '实时货物跟踪',
                '货物保险',
                '多种运输选择',
                '综合物流支持'
            ],
            image: ' gallery.jpg'
        }
    },
    pricing: {
        ar: {
            title: 'خدمة الخطة التسعيرية',
            description: 'نساعدك في إنشاء خطة تسعيرية متكاملة تشمل تحليل التكاليف، دراسة المنافسين، واستراتيجيات التسعير المتقدمة.',
            features: [
                'تحليل التكاليف الشامل',
                'دراسة المنافسين المفصلة',
                'استراتيجيات التسعير المتقدمة',
                'حساب هامش الربح الأمثل',
                'سياسات الخصم والدفع',
                'تحليل السوق المستهدف',
                'نمذجة السيناريوهات المالية'
            ],
            image: 'https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        en: {
            title: 'Pricing Plan Service',
            description: 'We help you create a comprehensive pricing plan including cost analysis, competitor study, and advanced pricing strategies.',
            features: [
                'Comprehensive cost analysis',
                'Detailed competitor study',
                'Advanced pricing strategies',
                'Optimal profit margin calculation',
                'Discount and payment policies',
                'Target market analysis',
                'Financial scenario modeling'
            ],
            image: 'https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        zh: {
            title: '价格计划服务',
            description: '我们帮助您制定全面的价格计划，包括成本分析、竞争对手研究和先进的定价策略。',
            features: [
                '全面成本分析',
                '详细竞争对手研究',
                '先进定价策略',
                '最优利润率计算',
                '折扣付款政策',
                '目标市场分析',
                '财务情景建模'
            ],
            image: 'https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
    },
    marketing: {
        ar: {
            title: 'خدمة الخطة التسويقية',
            description: 'نساعدك على وضع خطة تسويقية فعالة لجذب العملاء وزيادة المبيعات في السوق المستهدف.',
            features: [
                'استراتيجيات التسويق الرقمي',
                'تحليل السوق المستهدف',
                'إنشاء المحتوى التسويقي',
                'إدارة وسائل التواصل الاجتماعي',
                'حملات إعلانية مستهدفة',
                'تحليل سلوك المستهلك',
                'قياس الأداء والتحسين'
            ],
            image: 'hot.jpg'
        },
        en: {
            title: 'Marketing Plan Service',
            description: 'We help you develop an effective marketing plan to attract customers and increase sales in the target market.',
            features: [
                'Digital marketing strategies',
                'Target market analysis',
                'Marketing content creation',
                'Social media management',
                'Targeted advertising campaigns',
                'Consumer behavior analysis',
                'Performance measurement and optimization'
            ],
            image:' hot.jpg'
        },
        zh: {
            title: '营销计划服务',
            description: '我们帮助您制定有效的营销计划，在目标市场吸引客户并增加销售。',
            features: [
                '数字营销策略',
                '目标市场分析',
                '营销内容创作',
                '社交媒体管理',
                '定向广告活动',
                '消费者行为分析',
                '绩效测量和优化'
            ],
            image: 'hot.jpg'
        }
    },
    feasibility: {
        ar: {
            title: 'خدمة دراسة الجدوى',
            description: 'تقييم جدوى المشروع التجاري أو الاستيرادي من النواحي المالية، السوقية، والفنية قبل البدء فيه لضمان اتخاذ قرار مستنير.',
            features: [
                'التقييم المالي الشامل',
                'دراسة السوق والمنافسة',
                'التحليل الفني المتخصص',
                'تقييم المخاطر والفرص',
                'توصيات الاستثمار',
                'تحليل التدفق النقدي',
                'خطة التنفيذ المرحلية'
            ],
            image: ' https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        en: {
            title: 'Feasibility Study Service',
            description: 'Evaluating the feasibility of a commercial or import project from financial, market, and technical aspects before starting it to ensure making an informed decision.',
            features: [
                'Comprehensive financial evaluation',
                'Market and competition study',
                'Specialized technical analysis',
                'Risk and opportunity assessment',
                'Investment recommendations',
                'Cash flow analysis',
                'Phased implementation plan'
            ],
            image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        zh: {
            title: '可行性研究服务',
            description: '在开始之前从财务、市场和技术方面评估商业或进口项目的可行性，确保做出明智的决定。',
            features: [
                '全面财务评估',
                '市场竞争研究',
                '专业技术分析',
                '风险机会评估',
                '投资建议',
                '现金流分析',
                '分阶段实施计划'
            ],
            image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
    }
};

// Global variables
let currentLang = 'ar';
let users = JSON.parse(localStorage.getItem('mourdakUsers')) || [];
let consultations = JSON.parse(localStorage.getItem('mourdakConsultations')) || [];
let currentUser = JSON.parse(localStorage.getItem('mourdakCurrentUser')) || null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    initializeApp();
    setupEventListeners();
    
    // Hide loading screen after 2 seconds
    setTimeout(hideLoadingScreen, 2000);
});

// Initialize application
function initializeApp() {
    // Set initial language
    const savedLang = localStorage.getItem('mourdakLang') || 'ar';
    changeLang(savedLang, false);
    
    // Initialize scroll animations
    setupScrollAnimations();
    
    // Initialize intersection observer for animations
    setupIntersectionObserver();
    
    // Initialize counter animations
    initializeCounters();
}

// Hide loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
    
    // Language dropdown
    const langBtn = document.getElementById('langBtn');
    const langMenu = document.getElementById('langMenu');
    
    langBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('active');
    });
    
    // Close language menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!langBtn?.contains(e.target) && !langMenu?.contains(e.target)) {
            langMenu?.classList.remove('active');
        }
    });
    
    // Floating action button
    const fabMain = document.getElementById('fabMain');
    const fabMenu = document.getElementById('fabMenu');
    
    fabMain?.addEventListener('click', () => {
        fabMenu.classList.toggle('active');
    });
    
    // Close FAB menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!fabMain?.contains(e.target) && !fabMenu?.contains(e.target)) {
            fabMenu?.classList.remove('active');
        }
    });
    
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn?.classList.add('visible');
        } else {
            scrollTopBtn?.classList.remove('visible');
        }
        
        // Header scroll effect
        const header = document.getElementById('header');
        if (window.pageYOffset > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });
    
    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Modal close events
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for header height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup intersection observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger counter animation for stat numbers
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.service-card, .feature-card, .process-step, .vision-item, .feature-item, .goal-item, .stat-number').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Initialize counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
        counter.textContent = '0';
    });
}

// Animate counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Language switching
function changeLang(lang, save = true) {
    currentLang = lang;
    
    if (save) {
        localStorage.setItem('mourdakLang', lang);
    }
    
    // Update document direction and language
    const html = document.documentElement;
    if (lang === 'ar') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
    } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', lang);
    }
    
    // Update all translatable elements
    document.querySelectorAll('[data-ar]').forEach(element => {
        const key = element.getAttribute('data-ar');
        if (element.hasAttribute(`data-${lang}`)) {
            element.textContent = element.getAttribute(`data-${lang}`);
        }
    });
    
    // Update language selector
    updateLanguageSelector(lang);
    
    // Update placeholders and values
    updateFormElements(lang);
    
    // Close language menu
    document.getElementById('langMenu')?.classList.remove('active');
}

// Update language selector display
function updateLanguageSelector(lang) {
    const currentFlag = document.getElementById('currentFlag');
    const currentLangText = document.getElementById('currentLang');
    
    const langConfig = {
        ar: { flag: 'https://flagcdn.com/w20/sa.png', text: 'العربية' },
        en: { flag: 'https://flagcdn.com/w20/us.png', text: 'English' },
        zh: { flag: 'https://flagcdn.com/w20/cn.png', text: '中文' }
    };
    
    if (currentFlag && currentLangText && langConfig[lang]) {
        currentFlag.src = langConfig[lang].flag;
        currentLangText.textContent = langConfig[lang].text;
    }
}

// Update form elements
function updateFormElements(lang) {
    // Update select options
    document.querySelectorAll('select option[data-ar]').forEach(option => {
        if (option.hasAttribute(`data-${lang}`)) {
            option.textContent = option.getAttribute(`data-${lang}`);
        }
    });
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openLoginModal() {
    openModal('loginModal');
}

function openConsultationModal() {
    openModal('consultationModal');
}

// Service modal
function openServiceModal(serviceKey) {
    const modal = document.getElementById('serviceModal');
    const content = document.getElementById('serviceModalContent');
    
    if (modal && content && serviceDetails[serviceKey]) {
        const service = serviceDetails[serviceKey][currentLang];
        
        content.innerHTML = `
            <div class="service-detail">
                <div class="service-detail-header">
                    <img src="${service.image}" alt="${service.title}" class="service-detail-image">
                    <h2>${service.title}</h2>
                </div>
                <div class="service-detail-content">
                    <p class="service-description">${service.description}</p>
                    <div class="service-features">
                        <h3>${currentLang === 'ar' ? 'المميزات والخدمات' : currentLang === 'en' ? 'Features & Services' : '特点和服务'}</h3>
                        <ul>
                            ${service.features.map(feature => `<li><i class="fas fa-check"></i>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="service-actions">
                        <button class="btn-primary" onclick="openConsultationModal(); closeModal('serviceModal');">
                            <i class="fas fa-paper-plane"></i>
                            ${currentLang === 'ar' ? 'طلب الخدمة الآن' : currentLang === 'en' ? 'Request Service Now' : '立即申请服务'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        openModal('serviceModal');
    }
}

// Auth functions
function switchTab(tab) {
    // Remove active class from all tabs and forms
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    // Add active class to selected tab and form
    event.target.classList.add('active');
    document.getElementById(tab + 'Form').classList.add('active');
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    // Check for admin login
    if (username === 'MO' && password === '9090') {
        localStorage.setItem('mourdakAdmin', 'true');
        window.location.href = 'admin.html';
        return;
    }
    
    // Check regular user login
    const user = users.find(u => u.email === username && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('mourdakCurrentUser', JSON.stringify(user));
        closeModal('loginModal');
        showNotification(currentLang === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Login successful', 'success');
    } else {
        showNotification(currentLang === 'ar' ? 'بيانات دخول خاطئة' : 'Invalid credentials', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        showNotification(currentLang === 'ar' ? 'المستخدم موجود بالفعل' : 'User already exists', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        phone,
        password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('mourdakUsers', JSON.stringify(users));
    
    // Auto login
    currentUser = newUser;
    localStorage.setItem('mourdakCurrentUser', JSON.stringify(newUser));
    
    closeModal('loginModal');
    showNotification(currentLang === 'ar' ? 'تم إنشاء الحساب بنجاح' : 'Account created successfully', 'success');
}

function handleConsultation(event) {
    event.preventDefault();
    
    const consultation = {
        id: Date.now(),
        name: document.getElementById('consultName').value,
        email: document.getElementById('consultEmail').value,
        phone: document.getElementById('consultPhone').value,
        service: document.getElementById('consultService').value,
        message: document.getElementById('consultMessage').value,
        createdAt: new Date().toISOString(),
        status: 'pending'
    };
    
    consultations.push(consultation);
    localStorage.setItem('mourdakConsultations', JSON.stringify(consultations));
    
    closeModal('consultationModal');
    showNotification(currentLang === 'ar' ? 'تم إرسال طلب الاستشارة بنجاح. سنتواصل معك قريباً!' : 'Consultation request sent successfully. We will contact you soon!', 'success');
    
    // Reset form
    event.target.reset();
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles if not exist
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                max-width: 400px;
                box-shadow: var(--shadow-lg);
            }
            .notification-success { background: var(--success-color); }
            .notification-error { background: var(--error-color); }
            .notification-info { background: var(--primary-color); }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'en-US');
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString(currentLang === 'ar' ? 'ar-SA' : 'en-US');
}

// Export functions for global access
window.changeLang = changeLang;
window.scrollToSection = scrollToSection;
window.openLoginModal = openLoginModal;
window.openConsultationModal = openConsultationModal;
window.openServiceModal = openServiceModal;
window.closeModal = closeModal;
window.switchTab = switchTab;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.handleConsultation = handleConsultation;