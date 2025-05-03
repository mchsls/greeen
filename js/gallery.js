document.addEventListener('DOMContentLoaded', function() {
    // Получаем категорию из URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';
    
    // Загружаем данные галереи
    loadGalleryItems(category);
    
    // Устанавливаем заголовок в зависимости от категории
    setCategoryTitle(category);
});

function setCategoryTitle(category) {
    const title = document.getElementById('gallery-title');
    const subtitle = document.getElementById('gallery-subtitle');
    const descriptions = {
        'all': {
            title: 'Наша галерея',
            subtitle: 'Ознакомьтесь с нашими лучшими предложениями и вдохновитесь красотой природы. Каждый товар в нашем магазине проходит тщательный отбор.',
            description: ''
        },
        'plants': {
            title: 'Растения',
            subtitle: 'Откройте для себя наш огромный ассортимент растений для дома и сада. Хвойные, цветущие, комнатные и экзотические растения - все для вашего зеленого уголка.',
            description: `
                <h2>Наши растения</h2>
                <p>В нашем магазине представлен широкий ассортимент растений для любого вкуса и уровня подготовки садовода. Мы тщательно отбираем каждого зеленого питомца, чтобы вы получили только здоровые и качественные растения.</p>
                
                <h3>Хвойные растения</h3>
                <p>Хвойные растения - это основа любого сада. Они радуют глаз круглый год, очищают воздух и создают уютную атмосферу. В нашем ассортименте представлены различные виды елей, сосен, пихт, туй и можжевельников. Особое внимание уделено голубым елям, которые становятся настоящим украшением участка.</p>
                
                <h3>Цветущие растения</h3>
                <p>Цветы - это праздник для души. Мы предлагаем как однолетние, так и многолетние цветущие растения, которые будут радовать вас яркими красками с ранней весны до поздней осени. Розы, пионы, лилии, гортензии - выбирайте на свой вкус!</p>
                
                <h3>Комнатные растения</h3>
                <p>Комнатные растения создают уют в доме, очищают воздух и поднимают настроение. У нас вы найдете как классические фикусы и фиалки, так и модные монстеры, замиокулькасы и орхидеи. Для каждого растения мы предоставляем подробную инструкцию по уходу.</p>
                
                <h3>Экзотические растения</h3>
                <p>Для ценителей необычного у нас есть коллекция экзотических растений: цитрусовые деревья, кофейные кусты, банановые растения и даже хищные растения. Эти зеленые экзоты станут изюминкой вашей коллекции.</p>
                
                <h3>Гарантия качества</h3>
                <p>Все наши растения проходят тщательный контроль качества перед отправкой. Мы гарантируем соответствие сорту, здоровье растений и бережную упаковку при доставке. При необходимости наши консультанты всегда готовы помочь с выбором и дать советы по уходу.</p>
            `
        },
        'animals': {
            title: 'Животные',
            subtitle: 'Наши питомцы - это не просто животные, это члены семьи. Мы предлагаем здоровых, привитых и воспитанных животных с документами.',
            description: `
                <h2>Наши животные</h2>
                <p>Мы с любовью заботимся о каждом питомце, который попадает в наш магазин. Все животные содержатся в отличных условиях, проходят регулярные ветеринарные осмотры и получают сбалансированное питание.</p>
                
                <h3>Птицы</h3>
                <p>В нашем ассортименте представлены различные виды декоративных птиц: попугаи, канарейки, амадины и другие. Особой популярностью пользуются говорящие попугаи породы Ара и Жако. Все птицы привиты и имеют ветеринарные паспорта.</p>
                
                <h3>Рыбки</h3>
                <p>Для любителей аквариумистики у нас есть большой выбор пресноводных и морских рыбок. От неприхотливых гуппи до экзотических дискусов и арованов. Мы поможем подобрать рыбок для вашего аквариума и дадим советы по уходу.</p>
                
                <h3>Грызуны и кролики</h3>
                <p>Милые и забавные грызуны - отличные питомцы для детей. Хомяки, морские свинки, декоративные кролики и шиншиллы - все они ждут своих хозяев. В комплекте с каждым животным идет стартовый набор корма.</p>
                
                <h3>Экзотические животные</h3>
                <p>Для ценителей необычного у нас есть коллекция экзотических животных: черепахи, ящерицы, змеи и даже пауки-птицееды. Все экзоты содержатся в специальных террариумах с подходящим микроклиматом.</p>
                
                <h3>Гарантия здоровья</h3>
                <p>Все наши животные проходят карантин перед продажей, имеют ветеринарные паспорта и прививки. Мы предоставляем консультации по содержанию и уходу, а также даем гарантию на здоровье животных.</p>
            `
        },
        'accessories': {
            title: 'Аксессуары',
            subtitle: 'Все необходимое для комфорта ваших питомцев и растений. Качественные аксессуары по доступным ценам.',
            description: `
                <h2>Аксессуары</h2>
                <p>Мы предлагаем широкий ассортимент аксессуаров для растений и животных от проверенных производителей. Все товары проходят контроль качества перед поступлением в продажу.</p>
                
                <h3>Горшки и кашпо</h3>
                <p>Стильные и функциональные горшки для растений различных размеров и форм. Керамические, пластиковые, подвесные и напольные - на любой вкус. Особой популярностью пользуются умные горшки с автополивом.</p>
                
                <h3>Аквариумное оборудование</h3>
                <p>Фильтры, компрессоры, обогреватели, освещение и системы CO2 для аквариумов. Мы предлагаем оборудование ведущих мировых брендов по доступным ценам.</p>
                
                <h3>Клетки и переноски</h3>
                <p>Комфортные домики для ваших питомцев: просторные клетки для птиц и грызунов, удобные переноски для кошек и собак. Все изделия изготовлены из безопасных материалов.</p>
                
                <h3>Средства по уходу</h3>
                <p>Широкий ассортимент средств для ухода за растениями и животными: удобрения, грунты, витамины, шампуни и многое другое. Только сертифицированная продукция.</p>
                
                <h3>Гарантия качества</h3>
                <p>Все аксессуары проходят тщательный отбор перед поступлением в продажу. Мы работаем только с проверенными поставщиками и даем гарантию на все товары.</p>
            `
        },
        'tools': {
            title: 'Инструменты',
            subtitle: 'Профессиональные инструменты для ухода за растениями и животными. Надежность и удобство в каждом изделии.',
            description: `
                <h2>Инструменты</h2>
                <p>Качественные инструменты - залог успешного ухода за растениями и животными. В нашем ассортименте только проверенные временем инструменты от ведущих производителей.</p>
                
                <h3>Садовые инструменты</h3>
                <p>Полный набор для работы в саду: лопаты, грабли, секаторы, сучкорезы, пилы и многое другое. Эргономичные ручки и качественная сталь делают работу в саду удовольствием.</p>
                
                <h3>Инструменты для ухода за растениями</h3>
                <p>Специальные инструменты для комнатных растений: мини-лопатки, рыхлители, опрыскиватели, ножницы для обрезки. Компактные и удобные в использовании.</p>
                
                <h3>Инструменты для ухода за животными</h3>
                <p>Все необходимое для груминга: когтерезы, щетки, расчески, фурминаторы. Инструменты из гипоаллергенных материалов, безопасные для животных.</p>
                
                <h3>Системы полива</h3>
                <p>Автоматические системы полива для сада и комнатных растений. Капельный полив, таймеры, датчики влажности - все для комфортного ухода за растениями.</p>
                
                <h3>Гарантия качества</h3>
                <p>Все инструменты изготовлены из качественных материалов, проходят контроль перед продажей. На большинство инструментов предоставляется гарантия от производителя.</p>
            `
        }
    };
    
    const categoryData = descriptions[category] || descriptions['all'];
    
    document.getElementById('gallery-title').textContent = categoryData.title;
    document.getElementById('gallery-subtitle').textContent = categoryData.subtitle;
    
    if (categoryData.description) {
        document.getElementById('category-description').innerHTML = categoryData.description;
    } else {
        document.getElementById('category-description').style.display = 'none';
    }
}

function loadGalleryItems(category) {
    const galleryGrid = document.getElementById('gallery-grid');
    const filtersContainer = document.getElementById('category-filters');
    
    // Здесь обычно будет AJAX запрос к серверу, но для примера используем мок данные
    const allItems = [
        // Растения
        {
            id: 1,
            title: 'Голубая ель',
            category: 'plants',
            subcategory: 'coniferous',
            price: '4 990 ₽',
            description: 'Прекрасная голубая ель для вашего сада. Морозоустойчива, неприхотлива в уходе. Высота саженца 1.2м.',
            image: 'image/голубаяель.jpg',
            isBest: true
        },
        {
            id: 2,
            title: 'Орхидея Фаленопсис',
            category: 'plants',
            subcategory: 'indoor',
            price: '1 290 ₽',
            description: 'Нежная орхидея с продолжительным периодом цветения. Идеально для подарка. Высота 45см.',
            image: 'image/орхидея.jpg',
            isBest: true
        },
        {
            id: 3,
            title: 'Саженцы туи',
            category: 'plants',
            subcategory: 'coniferous',
            price: '1 990 ₽',
            description: 'Набор из 5 саженцев туи для живой изгороди. Высота 40-50см. Морозоустойчивые.',
            image: 'image/туя.jpeg',
            isBest: false
        },
        {
            id: 4,
            title: 'Бонсай Фикус',
            category: 'plants',
            subcategory: 'exotic',
            price: '6 990 ₽',
            description: 'Искусственно сформированный бонсай из фикуса. Возраст 5 лет. Высота 35см.',
            image: 'image/бонсай.jpg',
            isBest: true
        },
        {
            id: 5,
            title: 'Роза кустовая',
            category: 'plants',
            subcategory: 'flowering',
            price: '1 490 ₽',
            description: 'Кустовая роза с крупными цветами. Высота 60см. Цветение с июня по сентябрь.',
            image: 'image/роза.jpg',
            isBest: false
        },
        {
            id: 6,
            title: 'Монстера',
            category: 'plants',
            subcategory: 'indoor',
            price: '3 490 ₽',
            description: 'Популярное комнатное растение с крупными резными листьями. Высота 70см.',
            image: 'image/монстера.jpg',
            isBest: true
        },
        // Животные
        {
            id: 7,
            title: 'Попугай Ара',
            category: 'animals',
            subcategory: 'birds',
            price: '89 990 ₽',
            description: 'Яркий и общительный попугай породы Ара. Отлично подходит для домашнего содержания. Возраст 1 год.',
            image: 'image/ара1.jpg',
            isBest: true
        },
        {
            id: 8,
            title: 'Золотые рыбки',
            category: 'animals',
            subcategory: 'fish',
            price: '490 ₽',
            description: 'Красивые золотые рыбки для вашего аквариума. Длина 4-5см. В упаковке 5 штук.',
            image: 'image/рыба.webp',
            isBest: false
        },
        {
            id: 9,
            title: 'Декоративные кролики',
            category: 'animals',
            subcategory: 'rodents',
            price: '3 990 ₽',
            description: 'Милые декоративные кролики карликовых пород. Возраст 2 месяца. Разные окрасы.',
            image: 'image/кролик.jpg',
            isBest: false
        },
        // Аксессуары
        {
            id: 10,
            title: 'Аквариумный набор',
            category: 'accessories',
            subcategory: 'aquarium',
            price: '12 990 ₽',
            description: 'Полный набор для начинающего аквариумиста. Включает аквариум 50л, фильтр, освещение и декор.',
            image: 'image/аквариум.webp',
            isBest: false
        },
        {
            id: 11,
            title: 'Керамическое кашпо',
            category: 'accessories',
            subcategory: 'pots',
            price: '2 390 ₽',
            description: 'Стильное керамическое кашпо ручной работы. Диаметр 25см. Несколько цветов на выбор.',
            image: 'image/КАШПО.jpg',
            isBest: true
        },
        // Инструменты
        {
            id: 12,
            title: 'Система капельного полива',
            category: 'tools',
            subcategory: 'irrigation',
            price: '5 990 ₽',
            description: 'Автоматическая система капельного полива для сада и теплиц. На 20 растений.',
            image: 'images/gallery/irrigation-system.jpg',
            isBest: true
        },
        {
            id: 13,
            title: 'Садовый опрыскиватель',
            category: 'tools',
            subcategory: 'sprayers',
            price: '2 490 ₽',
            description: 'Профессиональный садовый опрыскиватель объемом 5л. Для обработки растений от вредителей.',
            image: 'images/gallery/sprayer.jpg',
            isBest: false
        }
    ];
    
    // Фильтруем товары по категории
    let filteredItems = allItems;
    if (category !== 'all') {
        filteredItems = allItems.filter(item => item.category === category);
    }
    
    // Создаем фильтры для подкатегорий
    const subcategories = {};
    filteredItems.forEach(item => {
        if (!subcategories[item.subcategory]) {
            subcategories[item.subcategory] = true;
        }
    });
    
    // Добавляем кнопки фильтров
    filtersContainer.innerHTML = '';
    
    const allFilter = document.createElement('button');
    allFilter.className = 'filter-btn active';
    allFilter.textContent = 'Все';
    allFilter.setAttribute('data-filter', 'all');
    filtersContainer.appendChild(allFilter);
    
    Object.keys(subcategories).forEach(subcat => {
        const filterBtn = document.createElement('button');
        filterBtn.className = 'filter-btn';
        filterBtn.textContent = getSubcategoryName(subcat);
        filterBtn.setAttribute('data-filter', subcat);
        filtersContainer.appendChild(filterBtn);
    });
    
    // Рендерим товары
    renderGallery(filteredItems);
    
    // Добавляем обработчики для фильтров
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Получаем значение фильтра
            const filter = this.getAttribute('data-filter');
            
            // Фильтруем товары
            let itemsToShow = filteredItems;
            if (filter !== 'all') {
                itemsToShow = filteredItems.filter(item => item.subcategory === filter);
            }
            
            // Рендерим отфильтрованные товары
            renderGallery(itemsToShow);
        });
    });
}

function getSubcategoryName(subcategory) {
    const names = {
        'coniferous': 'Хвойные',
        'indoor': 'Комнатные',
        'exotic': 'Экзотические',
        'flowering': 'Цветущие',
        'birds': 'Птицы',
        'fish': 'Рыбки',
        'rodents': 'Грызуны',
        'aquarium': 'Аквариумы',
        'pots': 'Горшки',
        'irrigation': 'Полив',
        'sprayers': 'Опрыскиватели'
    };
    return names[subcategory] || subcategory;
}

function renderGallery(items) {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = '';
    
    items.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category} ${item.subcategory} ${item.isBest ? 'best' : ''}`;
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

function openModal(itemId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img src="" alt="" class="modal-image">
            <div class="modal-info">
                <h3 class="modal-title"></h3>
                <div class="modal-price"></div>
                <p class="modal-description"></p>
                <button class="add-to-cart">В корзину</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Здесь должен быть запрос к серверу для получения данных о товаре
    // Для примера используем мок данные
    const item = {
        id: itemId,
        title: 'Товар ' + itemId,
        price: 'X XXX ₽',
        description: 'Описание товара ' + itemId,
        image: 'images/gallery/item' + (itemId % 5 + 1) + '.jpg'
    };
    
    modal.querySelector('.modal-image').src = item.image;
    modal.querySelector('.modal-image').alt = item.title;
    modal.querySelector('.modal-title').textContent = item.title;
    modal.querySelector('.modal-price').textContent = item.price;
    modal.querySelector('.modal-description').textContent = item.description;
    modal.querySelector('.add-to-cart').setAttribute('data-id', item.id);
    
    // Показываем модальное окно
    modal.style.display = 'flex';
    
    // Закрытие модального окна
    modal.querySelector('.modal-close').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Добавление в корзину
    modal.querySelector('.add-to-cart').addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        addToCart(productId);
        showCartNotification();
        document.body.removeChild(modal);
    });
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