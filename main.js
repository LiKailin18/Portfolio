// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // 点击导航链接时关闭移动端菜单
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // 平滑滚动到指定部分
    setupSmoothScrolling();
    
    // 添加滚动时的导航栏效果
    setupNavbarScrollEffect();
    
    // 添加滚动动画
    setupScrollAnimations();
    
    // 设置项目卡片交互
    setupProjectCards();
    
    // 设置表单提交处理
    setupContactForm();
});

// 平滑滚动功能
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 滚动到指定部分的函数（供按钮调用）
function scrollToSection(sectionId) {
    const targetSection = document.querySelector(`#${sectionId}`);
    if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// 导航栏滚动效果
function setupNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#2c3e50';
            navbar.style.backdropFilter = 'none';
        }
        
        // 隐藏/显示导航栏
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 滚动动画
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 项目卡片交互
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // 添加点击事件
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('h3').textContent;
            const projectDescription = this.querySelector('p').textContent;
            const projectImageElement = this.querySelector('.project-image img');
            const projectImage = projectImageElement ? projectImageElement.src : '';
            
            // 简单的项目详情展示
            showProjectDetails(projectTitle, projectDescription, projectImage);
        });
    });
}

// 显示项目详情
function showProjectDetails(title, description, image) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            ${image ? `<img src="${image}" alt="${title}" style="width:100%;border-radius:8px;margin-bottom:16px;" />` : ''}
            <h3>${title}</h3>
            <p>${description}</p>
            <div class="modal-buttons">
                <button onclick="window.open('#', '_blank')">查看演示</button>
                <button onclick="window.open('#', '_blank')">查看代码</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 显示模态框
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 10);
    
    // 关闭模态框
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // 点击外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// 联系表单处理
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }
}

// 表单提交处理函数
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // 获取表单数据
    const name = formData.get('name') || form.querySelector('input[type="text"]').value;
    const email = formData.get('email') || form.querySelector('input[type="email"]').value;
    const message = formData.get('message') || form.querySelector('textarea').value;
    
    // 简单的表单验证
    if (!name || !email || !message) {
        showNotification('请填写所有必填字段', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('请输入有效的邮箱地址', 'error');
        return;
    }
    
    // 模拟提交过程
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = '发送中...';
    submitButton.disabled = true;
    
    // 模拟异步提交
    setTimeout(() => {
        // 这里可以添加实际的表单提交逻辑
        console.log('表单数据:', { name, email, message });
        
        showNotification('消息发送成功！我会尽快回复您。', 'success');
        
        // 重置表单
        form.reset();
        
        // 恢复按钮状态
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// 邮箱验证函数
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 显示通知消息
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // 根据类型设置背景色
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#27ae60';
            break;
        case 'error':
            notification.style.backgroundColor = '#e74c3c';
            break;
        default:
            notification.style.backgroundColor = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 技能标签动画
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 页面加载完成后执行技能标签动画
window.addEventListener('load', () => {
    setTimeout(animateSkillTags, 500);
});

// 打字机效果（可选功能）
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 添加打字机效果到标题（可选）
function setupTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 100);
    }
}

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面不可见时暂停动画
        console.log('页面已隐藏');
    } else {
        // 页面可见时恢复动画
        console.log('页面已显示');
    }
});