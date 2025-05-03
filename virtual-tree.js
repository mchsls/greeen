document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const treeOptions = document.querySelectorAll('.tree-option');
    const plantBtn = document.getElementById('plant-btn');
    const growBtn = document.getElementById('grow-btn');
    const fertilizeBtn = document.getElementById('fertilize-btn');
    const resetBtn = document.getElementById('reset-btn');
    const treeSvg = document.getElementById('tree-svg');
    
    // Статистика дерева
    const treeStats = {
        level: document.getElementById('tree-level'),
        points: document.getElementById('tree-points'),
        health: document.getElementById('tree-health'),
        age: document.getElementById('tree-age')
    };
    
    // Состояние дерева
    let treeState = {
        type: null,
        level: 1,
        points: 0,
        health: 100,
        age: 0,
        growth: 0,
        lastWatered: null,
        lastFertilized: null,
        selected: false
    };
    
    // Загрузка сохраненного дерева
    loadTree();
    
    // Обработчики событий
    setupEventListeners();
    
    // Функция загрузки дерева из localStorage
    function loadTree() {
        const savedTree = localStorage.getItem('virtualTree');
        if (savedTree) {
            treeState = JSON.parse(savedTree);
            updateTreeDisplay();
            updateTreeStats();
            enableButtons();
            highlightSelectedTree();
        }
    }
    
    // Настройка обработчиков событий
    function setupEventListeners() {
        // Выбор дерева
        treeOptions.forEach(option => {
            option.addEventListener('click', function() {
                selectTree(this);
            });
        });
        
        // Посадка дерева
        plantBtn.addEventListener('click', plantTree);
        
        // Полив дерева
        growBtn.addEventListener('click', waterTree);
        
        // Удобрение дерева
        fertilizeBtn.addEventListener('click', fertilizeTree);
        
        // Сброс дерева
        resetBtn.addEventListener('click', resetTree);
        
        // Обновление возраста каждую минуту
        setInterval(updateTreeAge, 60000);
    }
    
    // Выбор дерева
    function selectTree(option) {
        // Снимаем выделение со всех вариантов
        treeOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Выделяем выбранный вариант
        option.classList.add('selected');
        
        // Запоминаем выбранный тип дерева
        treeState.type = option.getAttribute('data-tree');
        treeState.selected = true;
        
        // Активируем кнопку посадки
        plantBtn.disabled = false;
        
        // Показываем анимацию выбора
        option.style.transform = 'scale(1.05)';
        setTimeout(() => {
            option.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Посадка дерева
    function plantTree() {
        if (!treeState.selected) return;
        
        // Сбрасываем статистику
        treeState = {
            type: treeState.type,
            level: 1,
            points: 0,
            health: 100,
            age: 0,
            growth: 0,
            lastWatered: new Date().toISOString(),
            lastFertilized: null,
            selected: true
        };
        
        // Сохраняем и обновляем
        saveTree();
        updateTreeDisplay(true);
        updateTreeStats();
        enableButtons();
        
        // Показываем уведомление
        showNotification('Дерево посажено!');
    }
    
    // Полив дерева
    function waterTree() {
        if (!treeState.type) return;
        
        const now = new Date();
        const lastWatered = new Date(treeState.lastWatered);
        const hoursSinceWatered = (now - lastWatered) / (1000 * 60 * 60);
        
        // Проверка времени с последнего полива
        if (hoursSinceWatered < 4) {
            showNotification(`Подождите еще ${Math.ceil(4 - hoursSinceWatered)} часа до следующего полива`);
            return;
        }
        
        // Обновляем состояние
        treeState.lastWatered = now.toISOString();
        treeState.growth += 10 + Math.floor(Math.random() * 10);
        treeState.points += 5;
        treeState.health = Math.min(100, treeState.health + 5);
        
        // Проверка уровня
        checkLevelUp();
        
        // Сохраняем и обновляем
        saveTree();
        updateTreeDisplay();
        updateTreeStats();
        
        // Анимация полива
        animateTree('water');
        
        // Уведомление
        showNotification('Дерево полито! +5 очков');
    }
    
    // Удобрение дерева
    function fertilizeTree() {
        if (!treeState.type) return;
        
        const now = new Date();
        
        // Проверка времени с последнего удобрения
        if (treeState.lastFertilized) {
            const lastFertilized = new Date(treeState.lastFertilized);
            const daysSinceFertilized = (now - lastFertilized) / (1000 * 60 * 60 * 24);
            
            if (daysSinceFertilized < 1) {
                showNotification('Подождите до завтра для следующего удобрения');
                return;
            }
        }
        
        // Обновляем состояние
        treeState.lastFertilized = now.toISOString();
        treeState.growth += 20 + Math.floor(Math.random() * 15);
        treeState.points += 10;
        treeState.health = 100;
        
        // Проверка уровня
        checkLevelUp();
        
        // Сохраняем и обновляем
        saveTree();
        updateTreeDisplay();
        updateTreeStats();
        
        // Анимация удобрения
        animateTree('fertilize');
        
        // Уведомление
        showNotification('Дерево удобрено! +10 очков');
    }
    
    // Проверка повышения уровня
    function checkLevelUp() {
        if (treeState.growth >= 100) {
            treeState.level++;
            treeState.growth = 0;
            treeState.points += 50;
            showNotification(`Поздравляем! Дерево достигло уровня ${treeState.level}!`);
            
            // Специальная анимация для повышения уровня
            animateTree('levelup');
        }
    }
    
    // Сброс дерева
    function resetTree() {
        if (!treeState.type || !confirm('Вы уверены, что хотите сбросить свое дерево?')) return;
        
        // Сбрасываем состояние
        treeState = {
            type: null,
            level: 1,
            points: 0,
            health: 100,
            age: 0,
            growth: 0,
            lastWatered: null,
            lastFertilized: null,
            selected: false
        };
        
        // Удаляем из хранилища
        localStorage.removeItem('virtualTree');
        
        // Обновляем интерфейс
        updateTreeDisplay();
        updateTreeStats();
        disableButtons();
        resetTreeSelection();
        
        // Уведомление
        showNotification('Дерево сброшено. Можно посадить новое!');
    }
    
    // Обновление возраста дерева
    function updateTreeAge() {
        if (!treeState.type || !treeState.lastWatered) return;
        
        const plantedDate = new Date(treeState.lastWatered);
        const now = new Date();
        treeState.age = Math.floor((now - plantedDate) / (1000 * 60 * 60 * 24));
        
        // Уменьшение здоровья со временем
        const hoursSinceWatered = (now - new Date(treeState.lastWatered)) / (1000 * 60 * 60);
        if (hoursSinceWatered > 24) {
            treeState.health = Math.max(0, treeState.health - 0.5);
        }
        
        saveTree();
        updateTreeStats();
    }
    
    // Сохранение дерева
    function saveTree() {
        localStorage.setItem('virtualTree', JSON.stringify(treeState));
    }
    
    // Обновление отображения дерева
    function updateTreeDisplay(withAnimation = false) {
        treeSvg.innerHTML = '';
        
        if (!treeState.type) return;
        
        // Параметры дерева в зависимости от уровня
        const trunkHeight = 30 + treeState.level * 5;
        const trunkWidth = 5 + treeState.level * 0.5;
        const leavesSize = 40 + treeState.level * 10;
        
        // Рисуем ствол
        const trunk = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        trunk.setAttribute('x', 50 - trunkWidth/2);
        trunk.setAttribute('y', 200 - trunkHeight);
        trunk.setAttribute('width', trunkWidth);
        trunk.setAttribute('height', trunkHeight);
        trunk.setAttribute('fill', '#8d6e63');
        treeSvg.appendChild(trunk);
        
        // Рисуем крону в зависимости от типа дерева
        drawLeaves(treeState.type, trunkHeight, leavesSize);
        
        // Анимация при посадке
        if (withAnimation) {
            treeSvg.style.transform = 'scale(0.1)';
            setTimeout(() => {
                treeSvg.style.transform = 'scale(1)';
            }, 500);
        }
    }
    
    // Рисование кроны для разных типов деревьев
    function drawLeaves(type, trunkHeight, leavesSize) {
        switch(type) {
            case 'oak':
                // Дуб - круглая крона
                const oakLeaves = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                oakLeaves.setAttribute('cx', 50);
                oakLeaves.setAttribute('cy', 200 - trunkHeight - leavesSize/2);
                oakLeaves.setAttribute('r', leavesSize/2);
                oakLeaves.setAttribute('fill', '#4caf50');
                treeSvg.appendChild(oakLeaves);
                break;
                
            case 'birch':
                // Береза - овальная крона
                const birchLeaves = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
                birchLeaves.setAttribute('cx', 50);
                birchLeaves.setAttribute('cy', 200 - trunkHeight - leavesSize/3);
                birchLeaves.setAttribute('rx', leavesSize/2);
                birchLeaves.setAttribute('ry', leavesSize/3);
                birchLeaves.setAttribute('fill', '#aed581');
                treeSvg.appendChild(birchLeaves);
                break;
                
            case 'pine':
                // Сосна - треугольная крона
                drawPine(trunkHeight, leavesSize);
                break;
                
            case 'maple':
                // Клен - круглая крона с зубчатыми листьями
                const mapleLeaves = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                mapleLeaves.setAttribute('cx', 50);
                mapleLeaves.setAttribute('cy', 200 - trunkHeight - leavesSize/2);
                mapleLeaves.setAttribute('r', leavesSize/2);
                mapleLeaves.setAttribute('fill', '#81c784');
                treeSvg.appendChild(mapleLeaves);
                
                // Добавляем текстуру листьев
                for (let i = 0; i < 5; i++) {
                    const angle = (i * 72) * Math.PI / 180;
                    const leaf = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    leaf.setAttribute('d', `M50,${200 - trunkHeight - leavesSize/2} L${50 + Math.cos(angle) * leavesSize/2},${200 - trunkHeight - leavesSize/2 + Math.sin(angle) * leavesSize/2} L${50 + Math.cos(angle + 0.3) * leavesSize/3},${200 - trunkHeight - leavesSize/2 + Math.sin(angle + 0.3) * leavesSize/3} Z`);
                    leaf.setAttribute('fill', '#4caf50');
                    treeSvg.appendChild(leaf);
                }
                break;
                
            case 'spruce':
                // Ель - многоярусная
                drawSpruce(trunkHeight, leavesSize);
                break;
        }
        
        // Добавляем плоды/цветы для высоких уровней
        if (treeState.level > 3) {
            addFruits(type, trunkHeight, leavesSize);
        }
    }
    
    // Рисование сосны
    function drawPine(trunkHeight, leavesSize) {
        const pineLeaves = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pineLeaves.setAttribute('d', `M50,${200 - trunkHeight - leavesSize} L${50 + leavesSize/2},${200 - trunkHeight} L${50 - leavesSize/2},${200 - trunkHeight} Z`);
        pineLeaves.setAttribute('fill', '#2e7d32');
        treeSvg.appendChild(pineLeaves);
        
        // Дополнительные ярусы для высоких уровней
        if (treeState.level > 2) {
            const leaves2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            leaves2.setAttribute('d', `M50,${200 - trunkHeight - leavesSize - 20} L${50 + leavesSize/2 - 10},${200 - trunkHeight - 20} L${50 - leavesSize/2 + 10},${200 - trunkHeight - 20} Z`);
            leaves2.setAttribute('fill', '#2e7d32');
            treeSvg.appendChild(leaves2);
        }
        
        if (treeState.level > 4) {
            const leaves3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            leaves3.setAttribute('d', `M50,${200 - trunkHeight - leavesSize - 40} L${50 + leavesSize/2 - 20},${200 - trunkHeight - 40} L${50 - leavesSize/2 + 20},${200 - trunkHeight - 40} Z`);
            leaves3.setAttribute('fill', '#2e7d32');
            treeSvg.appendChild(leaves3);
        }
    }
    
    // Рисование ели
    function drawSpruce(trunkHeight, leavesSize) {
        const layers = Math.min(3 + Math.floor(treeState.level / 2), 6);
        
        for (let i = 0; i < layers; i++) {
            const layerSize = leavesSize - i * 15;
            const layerY = 200 - trunkHeight - i * 25;
            
            const layer = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            layer.setAttribute('d', `M50,${layerY - layerSize} L${50 + layerSize/2 - i*5},${layerY} L${50 - layerSize/2 + i*5},${layerY} Z`);
            layer.setAttribute('fill', '#388e3c');
            treeSvg.appendChild(layer);
        }
    }
    
    // Добавление плодов
    function addFruits(type, trunkHeight, leavesSize) {
        const fruitCount = 3 + treeState.level;
        
        for (let i = 0; i < fruitCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 10 + Math.random() * (leavesSize/2 - 10);
            
            const fruit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            fruit.setAttribute('cx', 50 + Math.cos(angle) * distance);
            fruit.setAttribute('cy', 200 - trunkHeight - leavesSize/2 + Math.sin(angle) * distance);
            fruit.setAttribute('r', 2 + Math.random() * 2);
            
            // Цвет плодов в зависимости от типа дерева
            switch(type) {
                case 'oak':
                    fruit.setAttribute('fill', '#8d6e63'); // Желуди
                    break;
                case 'maple':
                    fruit.setAttribute('fill', '#ffa000'); // Кленовые "вертолетики"
                    break;
                default:
                    fruit.setAttribute('fill', '#ffeb3b'); // Цветы/плоды
            }
            
            treeSvg.appendChild(fruit);
        }
    }
    
    // Обновление статистики
    function updateTreeStats() {
        treeStats.level.textContent = treeState.level;
        treeStats.points.textContent = treeState.points;
        treeStats.health.textContent = `${Math.round(treeState.health)}%`;
        treeStats.age.textContent = `${treeState.age} ${getDayWord(treeState.age)}`;
        
        // Цвет здоровья
        if (treeState.health > 70) {
            treeStats.health.style.color = '#4caf50';
        } else if (treeState.health > 30) {
            treeStats.health.style.color = '#ff9800';
        } else {
            treeStats.health.style.color = '#f44336';
        }
    }
    
    // Склонение слова "день"
    function getDayWord(days) {
        if (days % 10 === 1 && days % 100 !== 11) return 'день';
        if (days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20)) return 'дня';
        return 'дней';
    }
    
    // Анимация дерева
    function animateTree(action) {
        switch(action) {
            case 'water':
                treeSvg.style.transform = 'scale(1.05)';
                setTimeout(() => treeSvg.style.transform = 'scale(1)', 300);
                break;
                
            case 'fertilize':
                treeSvg.style.transform = 'scale(1.1)';
                setTimeout(() => treeSvg.style.transform = 'scale(1)', 500);
                break;
                
            case 'levelup':
                treeSvg.style.transform = 'scale(1.2)';
                setTimeout(() => treeSvg.style.transform = 'scale(1)', 800);
                break;
        }
    }
    
    // Включение кнопок ухода
    function enableButtons() {
        growBtn.disabled = false;
        fertilizeBtn.disabled = false;
    }
    
    // Отключение кнопок ухода
    function disableButtons() {
        growBtn.disabled = true;
        fertilizeBtn.disabled = true;
    }
    
    // Сброс выбора дерева
    function resetTreeSelection() {
        treeOptions.forEach(opt => opt.classList.remove('selected'));
        plantBtn.disabled = false;
    }
    
    // Подсветка выбранного дерева при загрузке
    function highlightSelectedTree() {
        if (!treeState.type) return;
        
        treeOptions.forEach(opt => {
            if (opt.getAttribute('data-tree') === treeState.type) {
                opt.classList.add('selected');
            }
        });
    }
    
    // Показ уведомлений
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'tree-notification';
        notification.textContent = message;
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
});