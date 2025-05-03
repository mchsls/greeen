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
            image: 'images/gallery/blue-spruce.jpg',
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
       