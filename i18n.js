// 多语言支持系统
const translations = {
    zh: {
        nav_portfolio: "我的作品集",
        loading_text: "加载中...",
        nav_home: "首页",
        nav_about: "关于我",
        nav_projects: "项目",
        nav_contact: "联系",
        
        hero_title: "你好，我是Alex Chen",
        hero_subtitle: "一名充满激情的全栈开发者，专注于创造优雅且高效的数字解决方案",
        hero_cta: "查看我的作品",
        
        about_title: "关于我",
        about_role: "全栈开发者",
        about_description: "我是一名充满激情的全栈开发者，拥有5年的Web开发经验。我专注于创建用户友好且高效的数字解决方案。",
        about_education1: "计算机科学学士学位",
        about_education2: "清华大学",
        about_experience1: "5年Web开发经验",
        about_experience2: "多个成功项目",
        about_achievement1: "React & Node.js专家",
        about_achievement2: "UI/UX设计经验",
        about_achievement3: "敏捷开发方法",
        about_achievement4: "团队协作",
        
        projects_title: "我的项目",
        project_title1: "电商平台",
        project_desc1: "一个功能齐全的电商平台，具有用户认证、产品管理和支付集成等功能",
        project_title2: "任务管理应用",
        project_desc2: "一个协作式任务管理工具，帮助团队提高工作效率和组织能力",
        project_title3: "天气仪表板",
        project_desc3: "一个实时天气监控应用，具有交互式图表和基于位置的服务",
        project_demo: "查看演示",
        project_code: "查看代码",
        
        contact_title: "联系我",
        contact_subtitle: "让我们一起合作",
        contact_description: "有项目想法或想讨论合作机会？我很乐意听取您的意见。",
        contact_quick: "快速联系",
        contact_website: "个人网页",
        contact_email: "邮箱",
        contact_form_title: "发送消息",
        contact_name: "姓名",
        contact_email_field: "邮箱",
        contact_subject: "主题",
        contact_message: "留言",
        contact_submit: "发送消息",
        contact_placeholder_name: "您的姓名",
        contact_placeholder_email: "您的邮箱地址",
        contact_placeholder_subject: "消息主题",
        contact_placeholder_message: "您的留言",
        
        footer_copyright: "© 2024 我的作品集. 保留所有权利。"
    },
    en: {
        nav_portfolio: "My Portfolio",
        loading_text: "Loading...",
        nav_home: "Home",
        nav_about: "About Me",
        nav_projects: "Projects",
        nav_contact: "Contact",
        
        hero_title: "Hi, I'm Alex Chen",
        hero_subtitle: "A passionate full-stack developer focused on creating elegant and efficient digital solutions",
        hero_cta: "View My Work",
        
        about_title: "About Me",
        about_role: "Full Stack Developer",
        about_description: "I'm a passionate full-stack developer with 5 years of experience in web development. I specialize in creating user-friendly and efficient digital solutions.",
        about_education1: "Bachelor's Degree in Computer Science",
        about_education2: "Tsinghua University",
        about_experience1: "5 Years of Web Development",
        about_experience2: "Multiple Successful Projects",
        about_achievement1: "React & Node.js Expert",
        about_achievement2: "UI/UX Design Experience",
        about_achievement3: "Agile Development Methods",
        about_achievement4: "Team Collaboration",
        
        projects_title: "My Projects",
        project_title1: "E-commerce Platform",
        project_desc1: "A full-featured e-commerce platform with user authentication, product management, and payment integration",
        project_title2: "Task Management App",
        project_desc2: "A collaborative task management tool that helps teams improve productivity and organization",
        project_title3: "Weather Dashboard",
        project_desc3: "A real-time weather monitoring application with interactive charts and location-based services",
        project_demo: "View Demo",
        project_code: "View Code",
        
        contact_title: "Contact Me",
        contact_subtitle: "Let's Work Together",
        contact_description: "Have a project idea or want to discuss collaboration opportunities? I'd love to hear from you.",
        contact_quick: "Quick Contact",
        contact_website: "Personal Website",
        contact_email: "Email",
        contact_form_title: "Send Message",
        contact_name: "Name",
        contact_email_field: "Email",
        contact_subject: "Subject",
        contact_message: "Message",
        contact_submit: "Send Message",
        contact_placeholder_name: "Your Name",
        contact_placeholder_email: "Your Email Address",
        contact_placeholder_subject: "Message Subject",
        contact_placeholder_message: "Your Message",
        
        footer_copyright: "© 2024 My Portfolio. All rights reserved."
    }
};

// 当前语言
let currentLanguage = 'zh';

// 切换语言
function switchLanguage(lang) {
    if (lang === currentLanguage) {
        return;
    }
    
    currentLanguage = lang;
    
    // 更新HTML lang属性
    document.documentElement.lang = lang;
    
    // 更新所有带有data-i18n属性的元素
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // 更新占位符
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // 更新页面标题
    const pageTitle = document.querySelector('title');
    if (pageTitle) {
        pageTitle.textContent = lang === 'en' ? 'My Portfolio' : '我的作品集';
    }
    
    // 更新导航logo
    const navLogo = document.querySelector('.nav-logo h1');
    if (navLogo) {
        navLogo.textContent = lang === 'en' ? 'My Portfolio' : '我的作品集';
    }
    
    // 更新meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = lang === 'en' 
            ? 'Personal portfolio website - showcasing my projects and skills' 
            : '个人作品集网站 - 展示我的项目和技能';
    }
    
    // 更新语言切换按钮状态
    updateLanguageButtons();
    
    // 保存语言偏好到localStorage
    localStorage.setItem('preferredLanguage', lang);
}

// 更新语言切换按钮状态
function updateLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        if (button.getAttribute('data-lang') === currentLanguage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// 初始化语言
function initLanguage() {
    // 检查localStorage中的语言偏好
    const savedLang = localStorage.getItem('preferredLanguage');
    
    if (savedLang && translations[savedLang]) {
        currentLanguage = savedLang;
    } else {
        // 检测浏览器语言
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('zh')) {
            currentLanguage = 'zh';
        } else {
            currentLanguage = 'en';
        }
    }
    
    switchLanguage(currentLanguage);
}

// 绑定语言切换按钮事件
function bindLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        // 移除之前的事件监听器（如果存在）
        button.removeEventListener('click', handleLanguageClick);
        // 添加新的事件监听器
        button.addEventListener('click', handleLanguageClick);
    });
}

// 处理语言按钮点击的独立函数
function handleLanguageClick() {
    const lang = this.getAttribute('data-lang');
    if (lang) {
        switchLanguage(lang);
    }
}

// 主题切换功能
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
    
    // 绑定主题切换事件
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    });
}

// 更新主题图标
function updateThemeIcon(isDark) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
}

// 页面加载完成后初始化
function initializeApp() {
    initLanguage();
    bindLanguageButtons();
    initTheme();
}

// 确保在DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// 导出函数供全局使用
window.switchLanguage = switchLanguage;

// 额外确保语言按钮绑定事件（处理可能的时序问题）
document.addEventListener('DOMContentLoaded', function() {
    // 延迟一点再绑定，确保所有元素都已加载
    setTimeout(bindLanguageButtons, 100);
});