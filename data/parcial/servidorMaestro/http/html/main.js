document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const scoreDisplay = document.getElementById('score');
    const levelDisplay = document.getElementById('level');
    const progressBar = document.getElementById('progress');
    const character = document.querySelector('.pixel-character');
    const inventoryItems = document.querySelectorAll('.inventory-item');
    
    let score = 0;
    let level = 1;
    let gameStarted = false;
    let progressValue = 0;
    let progressInterval;
    let characterPosition = { x: 0, y: 0 };
    let collectibles = [];
    let gameSpeed = 1000;
    let activeCollectible = null;
    let inventory = [false, false, false, false];
    
    const gameAudio = {
        background: new Audio(),
        collect: new Audio(),
        levelUp: new Audio(),
        gameOver: new Audio()
    };
    
    gameAudio.background.loop = true;
    gameAudio.background.volume = 0.5;
    
    function initGame() {
        score = 0;
        level = 1;
        progressValue = 0;
        gameSpeed = 1000;
        inventory = [false, false, false, false];
        
        scoreDisplay.textContent = score;
        levelDisplay.textContent = level;
        progressBar.style.width = '0%';
        
        clearInterval(progressInterval);
        
        inventoryItems.forEach((item, index) => {
            item.style.opacity = '0.3';
            item.style.boxShadow = 'none';
        });
        
        createPixelEffects();
        updateInventoryDisplay();
    }
    
    function startGame() {
        if (gameStarted) return;
        
        gameStarted = true;
        startBtn.disabled = true;
        
        progressInterval = setInterval(updateProgress, gameSpeed / 100);
        
        spawnCollectibles();
        enableCharacterMovement();
        
        startBtn.textContent = 'En Curso';
        startBtn.style.backgroundColor = 'var(--dark-blue)';
        startBtn.style.color = 'var(--light-blue)';
        
        tryPlayBackgroundMusic();
    }
    
    function resetGame() {
        gameStarted = false;
        clearInterval(progressInterval);
        
        if (collectibles.length > 0) {
            collectibles.forEach(item => {
                if (item.element) {
                    item.element.remove();
                }
            });
            collectibles = [];
        }
        
        if (activeCollectible) {
            activeCollectible.remove();
            activeCollectible = null;
        }
        
        startBtn.disabled = false;
        startBtn.textContent = 'Iniciar';
        startBtn.style.backgroundColor = 'var(--primary-yellow)';
        startBtn.style.color = 'var(--dark-blue)';
        
        stopBackgroundMusic();
        initGame();
    }
    
    function updateProgress() {
        if (!gameStarted) return;
        
        progressValue += 0.1;
        progressBar.style.width = `${progressValue}%`;
        
        if (progressValue >= 100) {
            levelComplete();
        }
    }
    
    function levelComplete() {
        level++;
        levelDisplay.textContent = level;
        progressValue = 0;
        gameSpeed = Math.max(300, gameSpeed - 100);
        
        clearInterval(progressInterval);
        progressInterval = setInterval(updateProgress, gameSpeed / 100);
        
        playSound(gameAudio.levelUp);
        
        const levelUpMsg = document.createElement('div');
        levelUpMsg.className = 'level-up-message';
        levelUpMsg.textContent = `¡Nivel ${level}!`;
        document.querySelector('.game-container').appendChild(levelUpMsg);
        
        setTimeout(() => {
            levelUpMsg.remove();
        }, 2000);
        
        if (level % 3 === 0) {
            unlockRandomInventoryItem();
        }
    }
    
    function unlockRandomInventoryItem() {
        const emptySlots = inventory.map((state, index) => (!state ? index : null)).filter(i => i !== null);
        
        if (emptySlots.length > 0) {
            const randomSlot = emptySlots[Math.floor(Math.random() * emptySlots.length)];
            inventory[randomSlot] = true;
            updateInventoryDisplay();
        }
    }
    
    function updateInventoryDisplay() {
        inventory.forEach((state, index) => {
            if (state) {
                inventoryItems[index].style.opacity = '1';
                inventoryItems[index].style.boxShadow = '0 0 10px var(--light-blue)';
            } else {
                inventoryItems[index].style.opacity = '0.3';
                inventoryItems[index].style.boxShadow = 'none';
            }
        });
    }
    
    function createPixelEffects() {
        const container = document.querySelector('.game-container');
        
        for (let i = 0; i < 20; i++) {
            const pixelEffect = document.createElement('div');
            pixelEffect.className = 'pixel-effect';
            pixelEffect.style.left = `${Math.random() * 100}%`;
            pixelEffect.style.top = `${Math.random() * 100}%`;
            pixelEffect.style.width = `${2 + Math.random() * 3}px`;
            pixelEffect.style.height = pixelEffect.style.width;
            pixelEffect.style.backgroundColor = i % 2 === 0 ? 'var(--light-blue)' : 'var(--light-yellow)';
            pixelEffect.style.position = 'absolute';
            pixelEffect.style.borderRadius = '50%';
            pixelEffect.style.opacity = '0.6';
            pixelEffect.style.filter = 'blur(1px)';
            pixelEffect.style.animation = `floatEffect ${3 + Math.random() * 5}s infinite linear`;
            pixelEffect.style.animationDelay = `${Math.random() * 5}s`;
            
            container.appendChild(pixelEffect);
        }
        
        const styleSheet = document.styleSheets[0];
        const keyframes = `
            @keyframes floatEffect {
                0% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
                50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
                100% { transform: translateY(-40px) rotate(360deg); opacity: 0.2; }
            }
        `;
        
        if (!styleSheetHasRule('@keyframes floatEffect')) {
            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        }
    }
    
    function styleSheetHasRule(rule) {
        for (let i = 0; i < document.styleSheets[0].cssRules.length; i++) {
            if (document.styleSheets[0].cssRules[i].cssText.includes(rule)) {
                return true;
            }
        }
        return false;
    }
    
    function spawnCollectibles() {
        if (!gameStarted) return;
        
        const contentElement = document.querySelector('.pixel-content');
        const contentRect = contentElement.getBoundingClientRect();
        
        const collectible = document.createElement('div');
        collectible.className = 'collectible';
        collectible.style.position = 'absolute';
        collectible.style.width = '20px';
        collectible.style.height = '20px';
        collectible.style.backgroundColor = getRandomColor();
        collectible.style.borderRadius = '4px';
        collectible.style.cursor = 'pointer';
        collectible.style.zIndex = '10';
        collectible.style.boxShadow = '0 0 5px var(--light-blue)';
        
        const maxX = contentRect.width - 30;
        const maxY = contentRect.height - 30;
        
        const posX = 10 + Math.floor(Math.random() * maxX);
        const posY = 10 + Math.floor(Math.random() * maxY);
        
        collectible.style.left = `${posX}px`;
        collectible.style.top = `${posY}px`;
        
        collectible.addEventListener('click', () => {
            collectItem(collectible);
        });
        
        contentElement.appendChild(collectible);
        activeCollectible = collectible;
        
        const lifespan = 2000 + Math.random() * 2000;
        
        collectible.style.animation = `pulse ${lifespan / 1000}s ease-in-out`;
        
        if (!styleSheetHasRule('@keyframes pulse')) {
            const styleSheet = document.styleSheets[0];
            const keyframes = `
                @keyframes pulse {
                    0% { transform: scale(0); opacity: 0; }
                    10% { transform: scale(1.2); opacity: 1; }
                    20% { transform: scale(1); opacity: 1; }
                    90% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(0); opacity: 0; }
                }
            `;
            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        }
        
        setTimeout(() => {
            if (collectible && collectible.parentNode) {
                collectible.remove();
                spawnCollectibles();
            }
        }, lifespan);
    }
    
    function getRandomColor() {
        const colors = [
            'var(--primary-yellow)',
            'var(--light-blue)',
            'var(--light-yellow)',
            'var(--primary-blue)'
        ];
        
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function collectItem(element) {
        if (!gameStarted) return;
        
        score += 10 * level;
        scoreDisplay.textContent = score;
        
        playSound(gameAudio.collect);
        
        element.remove();
        
        createCollectEffect(element);
        
        setTimeout(() => {
            spawnCollectibles();
        }, 500);
    }
    
    function createCollectEffect(element) {
        const rect = element.getBoundingClientRect();
        const contentElement = document.querySelector('.pixel-content');
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'collect-particle';
            particle.style.position = 'absolute';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.backgroundColor = element.style.backgroundColor;
            particle.style.borderRadius = '2px';
            particle.style.zIndex = '5';
            
            particle.style.left = `${rect.left - contentElement.getBoundingClientRect().left + rect.width / 2}px`;
            particle.style.top = `${rect.top - contentElement.getBoundingClientRect().top + rect.height / 2}px`;
            
            const angle = (i / 8) * Math.PI * 2;
            const velocityX = Math.cos(angle) * 5;
            const velocityY = Math.sin(angle) * 5;
            
            particle.style.animation = `particleFly 0.5s ease-out forwards`;
            particle.style.transform = `translate(${velocityX * 10}px, ${velocityY * 10}px)`;
            
            contentElement.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 500);
        }
        
        if (!styleSheetHasRule('@keyframes particleFly')) {
            const styleSheet = document.styleSheets[0];
            const keyframes = `
                @keyframes particleFly {
                    0% { transform: translate(0, 0) scale(1); opacity: 1; }
                    100% { transform: translate(var(--tx, 50px), var(--ty, 50px)) scale(0); opacity: 0; }
                }
            `;
            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        }
    }
    
    function enableCharacterMovement() {
        document.addEventListener('keydown', handleKeyPress);
    }
    
    function handleKeyPress(e) {
        if (!gameStarted) return;
        
        const character = document.querySelector('.pixel-character');
        const characterContainer = document.querySelector('.character-container');
        
        switch(e.key) {
            case 'ArrowUp':
                characterPosition.y = Math.max(characterPosition.y - 10, 0);
                character.style.transform = `translate(${characterPosition.x}px, ${characterPosition.y}px)`;
                break;
            case 'ArrowDown':
                characterPosition.y = Math.min(characterPosition.y + 10, characterContainer.offsetHeight - character.offsetHeight);
                character.style.transform = `translate(${characterPosition.x}px, ${characterPosition.y}px)`;
                break;
            case 'ArrowLeft':
                characterPosition.x = Math.max(characterPosition.x - 10, -10);
                character.style.transform = `translate(${characterPosition.x}px, ${characterPosition.y}px) scaleX(-1)`;
                break;
            case 'ArrowRight':
                characterPosition.x = Math.min(characterPosition.x + 10, characterContainer.offsetWidth - character.offsetHeight + 10);
                character.style.transform = `translate(${characterPosition.x}px, ${characterPosition.y}px) scaleX(1)`;
                break;
            case ' ':
                if (activeCollectible) {
                    collectItem(activeCollectible);
                }
                break;
        }
    }
    
    function playSound(audioElement) {
        if (audioElement.src) {
            audioElement.currentTime = 0;
            audioElement.play().catch(() => {});
        }
    }
    
    function tryPlayBackgroundMusic() {
        if (gameAudio.background.src) {
            gameAudio.background.play().catch(() => {});
        }
    }
    
    function stopBackgroundMusic() {
        gameAudio.background.pause();
        gameAudio.background.currentTime = 0;
    }
    
    function preloadImagesFallback() {
        const img = new Image();
        img.src = 'assets/imagen.png';
        img.style.display = 'none';
        document.body.appendChild(img);
        
        setTimeout(() => {
            if (img.parentNode) {
                img.remove();
            }
        }, 1000);
    }
    
    inventoryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (inventory[index]) {
                activateInventoryItem(index);
            }
        });
    });
    
    function activateInventoryItem(index) {
        if (!gameStarted || !inventory[index]) return;
        
        switch(index) {
            case 0:
                slowDownTime();
                break;
            case 1:
                collectAllItems();
                break;
            case 2:
                doublePoints();
                break;
            case 3:
                skipProgress();
                break;
        }
        
        inventory[index] = false;
        updateInventoryDisplay();
    }
    
    function slowDownTime() {
        const originalSpeed = gameSpeed;
        gameSpeed *= 2;
        
        clearInterval(progressInterval);
        progressInterval = setInterval(updateProgress, gameSpeed / 100);
        
        setTimeout(() => {
            gameSpeed = originalSpeed;
            clearInterval(progressInterval);
            progressInterval = setInterval(updateProgress, gameSpeed / 100);
        }, 5000);
        
        showEffect('¡Tiempo lento!', 'var(--light-yellow)');
    }
    
    function collectAllItems() {
        if (activeCollectible) {
            collectItem(activeCollectible);
        }
        
        showEffect('¡Todos recogidos!', 'var(--light-blue)');
    }
    
    function doublePoints() {
        const originalScore = score;
        score *= 2;
        scoreDisplay.textContent = score;
        
        showEffect('¡Puntos dobles!', 'var(--primary-yellow)');
    }
    
    function skipProgress() {
        progressValue = Math.min(progressValue + 20, 99);
        progressBar.style.width = `${progressValue}%`;
        
        showEffect('¡Progreso +20%!', 'var(--primary-blue)');
    }
    
    function showEffect(text, color) {
        const effect = document.createElement('div');
        effect.className = 'game-effect';
        effect.textContent = text;
        effect.style.position = 'absolute';
        effect.style.top = '50%';
        effect.style.left = '50%';
        effect.style.transform = 'translate(-50%, -50%)';
        effect.style.color = color;
        effect.style.fontSize = '2rem';
        effect.style.fontFamily = 'PixelFont, monospace';
        effect.style.textShadow = '2px 2px 0 var(--dark-blue)';
        effect.style.zIndex = '100';
        effect.style.pointerEvents = 'none';
        effect.style.animation = 'effectAnimation 2s forwards';
        
        document.querySelector('.game-container').appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 2000);
        
        if (!styleSheetHasRule('@keyframes effectAnimation')) {
            const styleSheet = document.styleSheets[0];
            const keyframes = `
                @keyframes effectAnimation {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                    10% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                    20% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    80% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                }
            `;
            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        }
    }
    
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
    
    initGame();
    preloadImagesFallback();
});
