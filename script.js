document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const container = document.querySelector('.container');
    let noClickCount = 0;
    let activeSwords = [];
    
    const swordEmojis = [
        '&#x2694;&#xFE0F;', // ??
        '&#x1F5E1;&#xFE0F;', // ???
        '&#x1F52A;',       // ??
        '&#x1F3F4;&#x200D;&#x2620;&#xFE0F;', // ?????
        '&#x1FA93;'        // ??
    ];

    // Create initial floating sparkles
    createSparkles(3);
    
    yesBtn.addEventListener('click', function() {
        document.querySelector('.buttons').classList.add('hidden');
        createSparkles(15); // Create celebration sparkles
        removeAllSwords(); // Remove all sword emojis
    });

    noBtn.addEventListener('click', function() {
        noClickCount++;
        if (noClickCount >= 3) {
            createSwords(5); // Create 5 swords (each will be randomly selected)
        }
        moveNoButton();
    });

    function moveNoButton() {
        const containerRect = container.getBoundingClientRect();
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        
        const maxX = containerRect.width - btnWidth - 30;
        const maxY = containerRect.height - btnHeight - 30;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        noBtn.style.position = 'absolute';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    }

    function createSparkles(count) {
        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.innerHTML = '✨';
            
            // Random starting position
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const delay = Math.random() * 5;
            
            sparkle.style.setProperty('--x-start', `${startX}%`);
            sparkle.style.setProperty('--y-start', `${startY}%`);
            sparkle.style.setProperty('--animation-delay', `${delay}s`);
            
            document.body.appendChild(sparkle);
            
            // Remove sparkle after animation completes
            setTimeout(() => {
                sparkle.remove();
            }, 15000 * (delay + 1));
        }
    }

    function createSwords(count) {
        for (let i = 0; i < count; i++) {
            const sword = document.createElement('div');
            sword.className = 'sword';
            
            // Randomly select a sword emoji
            const randomSword = swordEmojis[Math.floor(Math.random() * swordEmojis.length)];
            sword.innerHTML = randomSword;
            
            // Random starting position
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const delay = Math.random() * 3;
            
            sword.style.setProperty('--x-start', `${startX}%`);
            sword.style.setProperty('--y-start', `${startY}%`);
            sword.style.setProperty('--animation-delay', `${delay}s`);
            
            document.body.appendChild(sword);
            activeSwords.push(sword); // Add to active swords array
            
            // Remove sword after animation completes
            setTimeout(() => {
                sword.remove();
                activeSwords = activeSwords.filter(s => s !== sword); // Remove from array
            }, 8000 * (delay + 1));
        }
    }

    function removeAllSwords() {
        activeSwords.forEach(sword => {
            sword.remove();
        });
        activeSwords = []; // Clear the array
    }
});