document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных галереи
    loadGalleryItems();
    
    // Инициализация фильтров
    initFilters();
    
    // Инициализация модального окна
    initModal();
});

function loadGalleryItems() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    // Здесь обычно будет AJAX запрос к серверу, но для примера используем мок данные
    const galleryItems = [
        {
            id: 1,
            title: 'Голубая ель',
            category: 'plants',
            price: '4 990 ₽',
            description: 'Прекрасная голубая ель для вашего сада. Морозоустойчива, неприхотлива в уходе. Высота саженца 1.2м.',
            image: 'image/forest.jpg',
            isBest: true
        },
        {
            id: 2,
            title: 'Попугай Ара',
            category: 'animals',
            price: '89 990 ₽',
            description: 'Яркий и общительный попугай породы Ара. Отлично подходит для домашнего содержания. Возраст 1 год.',
            image: 'images/gallery/ara-parrot.jpg',
            isBest: true
        },
        {
            id: 3,
            title: 'Набор садовых инструментов',
            category: 'tools',
            price: '3 490 ₽',
            description: 'Полный набор качественных садовых инструментов из нержавеющей стали. В комплекте 5 предметов.',
            image: 'images/gallery/garden-tools.jpg',
            isBest: false
        },
        {
            id: 4,
            title: 'Орхидея Фаленопсис',
            category: 'plants',
            price: '1 290 ₽',
            description: 'Нежная орхидея с продолжительным периодом цветения. Идеально для подарка. Высота 45см.',
            image: 'images/gallery/orchid.jpg',
            isBest: true
        },
        {
            id: 5,
            title: 'Аквариумный набор',
            category: 'accessories',
            price: '12 990 ₽',
            description: 'Полный набор для начинающего аквариумиста. Включает аквариум 50л, фильтр, освещение и декор.',
            image: 'images/gallery/aquarium-set.jpg',
            isBest: false
        },
        {
            id: 6,
            title: 'Золотые рыбки',
            category: 'animals',
            price: '490 ₽',
            description: 'Красивые золотые рыбки для вашего аквариума. Длина 4-5см. В упаковке 5 штук.',
            image: 'images/gallery/goldfish.jpg',
            isBest: false
        },
        {
            id: 7,
            title: 'Керамическое кашпо',
            category: 'accessories',
            price: '2 390 ₽',
            description: 'Стильное керамическое кашпо ручной работы. Диаметр 25см. Несколько цветов на выбор.',
            image: 'images/gallery/ceramic-pot.jpg',
            isBest: true
        },
        {
            id: 8,
            title: 'Саженцы туи',
            category: 'plants',
            price: '1 990 ₽',
            description: 'Набор из 5 саженцев туи для живой изгороди. Высота 40-50см. Морозоустойчивые.',
            image: 'images/gallery/thuja.jpg',
            isBest: false
        },
        {
            id: 9,
            title: 'Система капельного полива',
            category: 'tools',
            price: '5 990 ₽',
            description: 'Автоматическая система капельного полива для сада и теплиц. На 20 растений.',
            image: 'images/gallery/irrigation-system.jpg',
            isBest: true
        },
        {
            id: 10,
            title: 'Декоративные кролики',
            category: 'animals',
            price: '3 990 ₽',
            description: 'Милые декоративные кролики карликовых пород. Возраст 2 месяца. Разные окрасы.',
            image: 'images/gallery/rabbits.jpg',
            isBest: false
        },
        {
            id: 11,
            title: 'Бонсай Фикус',
            category: 'plants',
            price: '6 990 ₽',
            description: 'Искусственно сформированный бонсай из фикуса. Возраст 5 лет. Высота 35см.',
            image: 'images/gallery/bonsai.jpg',
            isBest: true
        },
        {
            id: 12,
            title: 'Садовый опрыскиватель',
            category: 'tools',
            price: '2 490 ₽',
            description: 'Профессиональный садовый опрыскиватель объемом 5л. Для обработки растений от вредителей.',
            image: 'images/gallery/sprayer.jpg',
            isBest: false
        }
    ];
    
    renderGallery(galleryItems);
}

function renderGallery(items) {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = '';
    
    items.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category} ${item.isBest ? 'best' : ''}`;
        galleryItem.setAttribute('data-id', item.id);
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="gallery-item-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
            <div class="gallery-item-price">${item.price}</div>
        `;
        galleryGrid.appendChild(galleryItem);
    });
    
    // Добавляем обработчики кликов на элементы галереи
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            openModal(itemId);
        });
    });
}

function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Получаем значение фильтра
            const filter = this.getAttribute('data-filter');
            
            // Применяем фильтр
            applyFilter(filter);
        });
    });
}

function applyFilter(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.style.display = 'none';
        
        if (filter === 'all' || 
            item.classList.contains(filter) || 
            (filter === 'best' && item.classList.contains('best'))) {
            item.style.display = 'block';
        }
    });
}

function initModal() {
    const modal = document.getElementById('gallery-modal');
    const modalClose = document.getElementById('modal-close');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
    const modalAddToCart = document.getElementById('modal-add-to-cart');
    
    let currentItemId = null;
    let currentItems = [];
    
    // Закрытие модального окна
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Закрытие при клике вне контента
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Навигация
    modalPrev.addEventListener('click', showPrevItem);
    modalNext.addEventListener('click', showNextItem);
    
    // Добавление в корзину
    modalAddToCart.addEventListener('click', function() {
        if (currentItemId) {
            addToCart(currentItemId);
            showCartNotification();
        }
    });
}

function openModal(itemId) {
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const modalAddToCart = document.getElementById('modal-add-to-cart');
    
    // Получаем все видимые элементы галереи
    const visibleItems = Array.from(document.querySelectorAll('.gallery-item[style*="display: block"], .gallery-item:not([style])'));
    
    // Находим текущий элемент и его индекс
    const currentIndex = visibleItems.findIndex(item => parseInt(item.getAttribute('data-id')) === itemId);
    const currentItem = visibleItems[currentIndex];
    
    if (!currentItem) return;
    
    // Заполняем модальное окно данными
    const itemData = {
        id: itemId,
        title: currentItem.querySelector('h3').textContent,
        price: currentItem.querySelector('.gallery-item-price').textContent,
        description: currentItem.querySelector('p').textContent,
        image: currentItem.querySelector('img').getAttribute('src')
    };
    
    modalImage.src = itemData.image;
    modalImage.alt = itemData.title;
    modalTitle.textContent = itemData.title;
    modalPrice.textContent = itemData.price;
    modalDescription.textContent = itemData.description;
    modalAddToCart.setAttribute('data-id', itemData.id);
    
    // Сохраняем текущее состояние
    currentItemId = itemId;
    currentItems = visibleItems.map(item => parseInt(item.getAttribute('data-id')));
    
    // Показываем модальное окно
    modal.style.display = 'flex';
}

function showPrevItem() {
    const currentIndex = currentItems.indexOf(currentItemId);
    const prevIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    const prevItemId = currentItems[prevIndex];
    
    openModal(prevItemId);
}

function showNextItem() {
    const currentIndex = currentItems.indexOf(currentItemId);
    const nextIndex = (currentIndex + 1) % currentItems.length;
    const nextItemId = currentItems[nextIndex];
    
    openModal(nextItemId);
}

function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
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