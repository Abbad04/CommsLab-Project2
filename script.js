document.addEventListener('DOMContentLoaded', function(){
    const image = document.querySelector('#cat');

    image.addEventListener('mouseover', function(){
        this.src = 'orangeCat2.svg';
    });

    image.addEventListener('mouseout', function(){
        this.src = 'orangeCat.svg';
    });
    
})