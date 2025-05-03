document.addEventListener('DOMContentLoaded', function() {
    // Создаем птиц для анимации
    createBirds(5);
    
    // Загружаем рекомендуемые товары
    loadFeaturedProducts();
    
    // Инициализация других элементов
    initAnimations();
});

function createBirds(count) {
    const container = document.querySelector('.bird-animation');
    
    for (let i = 0; i < count; i++) {
        const bird = document.createElement('div');
        bird.classList.add('bird');
        
        // Рандомные параметры для птиц
        const size = 30 + Math.random() * 30;
        const delay = Math.random() * 15;
        const duration = 10 + Math.random() * 10;
        const startY = Math.random() * 80;
        
        bird.style.width = `${size}px`;
        bird.style.height = `${size}px`;
        bird.style.animationDelay = `${delay}s`;
        bird.style.animationDuration = `${duration}s`;
        bird.style.top = `${startY}%`;
        
        container.appendChild(bird);
    }
}

function loadFeaturedProducts() {
    const grid = document.querySelector('.featured-grid');
    
    // В реальном приложении здесь был бы запрос к API
    const products = [
        {
            id: 1,
            name: "Ель голубая",
            category: "Хвойные",
            price: 3490,
            image: "images/products/blue-spruce.jpg",
            description: "Красивая голубая ель для вашего сада"
        },
        {
            id: 2,
            name: "Волнистый попугай",
            category: "Птицы",
            price: 1990,
            image: "images/products/budgie.jpg",
            description: "Яркий и общительный питомец"
        },
        {
            id: 3,
            name: "Аквариумный набор",
            category: "Рыбки",
            price: 5990,
            image: "images/products/aquarium-set.jpg",
            description: "Все необходимое для начинающего аквариумиста"
        }
    ];
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card', 'card', 'fade-in');
        card.style.animationDelay = `${Math.random() * 0.5}s`;
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="card-content">
                <h4>${product.name}</h4>
                <p class="category">${product.category}</p>
                <p class="description">${product.description}</p>
                <div class="price">${product.price.toLocaleString()} ₽</div>
                <button class="add-to-cart">В корзину</button>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function initAnimations() {
    // Инициализация Intersection Observer для анимаций при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка хитов продаж
    loadFeaturedProducts();
    
    // Анимация чисел в статистике
    animateStats();
    
    // Параллакс эффект для героя
    setupParallax();
    
    // Инициализация корзины
    initCart();
    
    // Инициализация слушателей событий
    initEventListeners();
});

function loadFeaturedProducts() {
    const productsGrid = document.querySelector('.products-grid');
    
    // Здесь обычно будет AJAX запрос к серверу, но для примера используем мок данные
    const featuredProducts = [
        {
            id: 1,
            name: 'Ель голубая',
            category: 'Хвойные',
            price: '4 990 ₽',
            rating: '★★★★★',
            image: 'image/голубаяель.jpg',
            description: 'Прекрасная голубая ель для вашего сада. Морозоустойчива, неприхотлива в уходе.'
        },
        {
            id: 2,
            name: 'Попугай Ара',
            category: 'Птицы',
            price: '89 990 ₽',
            rating: '★★★★☆',
            image: 'image/ара1.jpg',
            description: 'Яркий и общительный попугай породы Ара. Отлично подходит для домашнего содержания.'
        },
        {
            id: 3,
            name: 'Набор садовых инструментов',
            category: 'Инструменты',
            price: '3 490 ₽',
            rating: '★★★★★',
            image: 'images/products/garden-tools.jpg',
            description: 'Полный набор качественных садовых инструментов из нержавеющей стали.'
        },
        {
            id: 4,
            name: 'Орхидея Фаленопсис',
            category: 'Комнатные растения',
            price: '1 290 ₽',
            rating: '★★★★☆',
            image: 'image/орхидея.jpg',
            description: 'Нежная орхидея с продолжительным периодом цветения. Идеально для подарка.'
        }
    ];
    
    productsGrid.innerHTML = '';
    
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <div class="product-rating">${product.rating}</div>
                <button class="add-to-cart" data-id="${product.id}">В корзину</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 секунды
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(interval);
                stat.textContent = target.toLocaleString();
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

function setupParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
}

function initCart() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

function initEventListeners() {
    // Добавление в корзину
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.getAttribute('data-id');
            addToCart(productId);
            showCartNotification();
        }
    });
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const counter = document.querySelector('.cart-counter');
    if (counter) {
        counter.textContent = cart.length;
    }
}

function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Товар добавлен в корзину!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Добавляем cart-counter в хедер
document.addEventListener('DOMContentLoaded', function() {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        const cartLink = document.createElement('a');
        cartLink.href = '#';
        cartLink.className = 'cart-link';
        cartLink.innerHTML = `
            <img src="images/cart-icon.png" alt="Корзина">
            <span class="cart-counter">0</span>
        `;
        authButtons.insertBefore(cartLink, authButtons.firstChild);
        updateCartCounter();
    }
});