document.addEventListener('DOMContentLoaded', function(){
    const introImage = document.querySelector('#cat');
    const panel = document.querySelector('#comicPanel')
    const greyCat = document.querySelector('#scene1Obj1')
    const orangeCat = document.querySelector('#scene1Obj2')
    const narration  = document.querySelector('#narration')
    const bubble1  = document.querySelector('.thinkingBubble')
    const pizza  = document.querySelector('.pizza')
    const restart  = document.querySelector('#restart')

    let scene = 0;
    let catSound = new Audio('media/catSound.mp3')
    let orangeCatDeath = new Audio('media/orangeCatDeath.mp3')
    let ManDeath = new Audio('media/ManDeath.mp3')

    

    introImage.addEventListener('mouseover', function(){
        this.src = 'media/orangeCat2.jpg';
    });

    introImage.addEventListener('mouseout', function(){
        this.src = 'media/orangeCat.jpg';
    });
    
    introImage.addEventListener('click', function(){
        this.style.display = 'none';
        panel.style.display = 'block';
    });

    greyCat.addEventListener('mouseover', function(){
        if(scene === 0) this.src = 'media/scene1greyCat2.png';
        else if (scene === 1) this.src = 'media/scene2greyCat2.png';
    });


    greyCat.addEventListener('mouseout', function(){
        if(scene === 0) this.src = 'media/scene1greyCat.png';
        else if (scene === 1) this.src = 'media/scene2greyCat.png';
    });

    greyCat.addEventListener('click', function(){
        scene++;
        catSound.play();
        orangeCat.style.display = 'none';
        this.style.top = "35%";
        if (scene === 1) {
            panel.style.backgroundImage = "url('SceneBackgrounds/deadscene.png')";
            this.src = 'media/scene2greyCat.png';
            narration.innerHTML = "Pet the cat ...";
        }
        else if(scene === 2) {
            this.style.display = "none";
            panel.style.backgroundImage = "url('SceneBackgrounds/scene4greyCat.png')";
            panel.style.backgroundSize = "100% 100%";
            narration.style.display = "none";
            restart.style.display = "block";
            ManDeath.play();
        } 
    });

    orangeCat.addEventListener('mouseover', function(){
        if(scene === 0) this.src = 'media/scene1orangeCat2.png';
        else if (scene === 1) this.src = 'media/scene2orangeCat2.png';
        else if (scene === 2){
            this.src = 'media/scene3orangeCat2.png';
            bubble1.style.display = "block";
        }

    });

    orangeCat.addEventListener('mouseout', function(){
        if(scene === 0) this.src = 'media/scene1orangeCat.png';
        else if (scene === 1) this.src = 'media/scene2orangeCat.png';
        else if (scene === 2){
            this.src = 'media/scene3orangeCat.png';
            bubble1.style.display = "none";
        }
    });

    let isLocked = false;  // Flag to control click processing

    orangeCat.addEventListener('click', function() {
        if (isLocked) return;  // Check if clicking is locked and exit if true
    
        scene++;
        catSound.play();
        greyCat.style.display = 'none';
    
        if (scene === 1) {
            panel.style.backgroundImage = "url('SceneBackgrounds/c2scene1.png')";
            this.src = 'media/scene2orangeCat.png';
            narration.innerHTML = "Pet the cat ...";
        } 
        else if (scene === 2) {
            panel.style.backgroundImage = "url('SceneBackgrounds/c2scene2.png')";
            this.src = 'media/scene3orangeCat.png';
            this.style.left = '35%';
            this.style.top = '35%';
            narration.innerHTML = "Feed the cat?";
            pizza.style.display = 'block';
            isLocked = true;  // Lock clicking after processing the event for scene 2
        }
    });

    restart.addEventListener('click', function() {
        window.location.reload();
    });

    let isHovering = false; // Track hover state

    pizza.addEventListener('mousedown', function(e) {
        e.preventDefault();  // Prevent default drag behavior and text selection

        let startX = e.clientX;
        let startY = e.clientY;

        let computedStyle = window.getComputedStyle(pizza);
        let matrix = computedStyle.transform === 'none' ? 'matrix(1, 0, 0, 1, 0, 0)' : computedStyle.transform;
        let matrixValues = matrix.match(/matrix\(([^)]+)\)/)[1].split(', ');
        let translateX = parseInt(matrixValues[4]);
        let translateY = parseInt(matrixValues[5]);

        function onMouseMove(event) {
            let newX = translateX + (event.clientX - startX);
            let newY = translateY + (event.clientY - startY);
            pizza.style.transform = `translate(${newX}px, ${newY}px)`;

            // Check for collision and change the image if hovering
            if (isColliding(pizza, orangeCat)) {
                if (!isHovering) {
                    orangeCat.src = 'media/scene3orangeCat2.png'; // Change to hover image
                    isHovering = true;
                }
            } else if (isHovering) {
                orangeCat.src = 'media/scene3orangeCat.png'; // Revert to normal image
                isHovering = false;
            }
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            // Check for collision on mouse up
            if (isHovering) {
                pizza.style.display = "none";
                orangeCat.style.display = "none";
                narration.style.display = "none";
                panel.style.backgroundImage = "url('SceneBackgrounds/scene4orangeCat.png')";
                panel.style.backgroundSize = "100% 100%";
                restart.style.display = "block";
                orangeCatDeath.play();
                scene++;
                isHovering = false;
            }
            restart.addEventListener('click', function() {
                window.location.reload();
            });
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    pizza.ondragstart = function() {
        return false;
    };

    function isColliding(elem1, elem2) {
        let rect1 = elem1.getBoundingClientRect();
        let rect2 = elem2.getBoundingClientRect();

        return !(rect1.right < rect2.left || 
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    }

});


