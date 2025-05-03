document.addEventListener('DOMContentLoaded', function() {
    // Анимация птиц и листьев уже в CSS
    
    // Анимация при скролле
    setupScrollAnimations();
    
    // Интерактивные элементы
    setupInteractiveElements();
});

function setupScrollAnimations() {
    const animateOnScroll = (elements, className) => {
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add(className);
            }
        });
    };
    
    const animatedElements = document.querySelectorAll('.product-card, .category-card, .stat-item');
    
    window.addEventListener('scroll', () => {
        animateOnScroll(animatedElements, 'animated');
    });
    
    // Инициализация при загрузке
    animateOnScroll(animatedElements, 'animated');
}

function setupInteractiveElements() {
    // Эффект при наведении на карточки
    const cards = document.querySelectorAll('.product-card, .category-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const x = e.clientX - card.getBoundingClientRect().left;
            const y = e.clientY - card.getBoundingClientRect().top;
            
            const centerX = card.offsetWidth / 2;
            const centerY = card.offsetHeight / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Параллакс для героя
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            hero.style.backgroundPosition = `${x * 50}px ${y * 50}px`;
        });
    }
    
    // Анимация кнопок
    const buttons = document.querySelectorAll('.cta-button, .add-to-cart, .login-btn, .register-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Эффект пульсации
            const circle = document.createElement('span');
            circle.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            circle.style.width = circle.style.height = `${size}px`;
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;
            
            this.appendChild(circle);
            
            setTimeout(() => {
                circle.remove();
            }, 1000);
        });
    });
}

// Дополнительные эффекты для галереи
if (document.querySelector('.gallery')) {
    document.addEventListener('DOMContentLoaded', function() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                this.classList.toggle('zoomed');
            });
        });
    });
}