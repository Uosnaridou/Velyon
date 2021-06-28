class slide {


    constructor() {
        this.slides = document.querySelectorAll('#slides .slide');
        this.currentSlide = 0;
        this.playing = true;
        this.slideInterval = setInterval(this.nextSlide.bind(this), 5000); //on crée un setInterval qui va permettre le changement de slide automatique 

        this.pauseButton = document.getElementById('pause'); //on recupere l'id pause
        this.pauseButton.onclick = this.pauseSlideshow.bind(this);

        //Au click du bouton play on appel la fonction
        this.playButton = document.getElementById('play'); //on recupere l'id play
        this.playButton.onclick = this.playSlideshow.bind(this);


        this.flecheDroite = document.getElementById('flechedroite'); //on recupere l'id play
        this.flecheDroite.onclick = this.nextSlide.bind(this);


        this.flecheGauche = document.getElementById('flechegauche'); //on recupere l'id play
        this.flecheGauche.onclick = this.previewSlide.bind(this);

        document.addEventListener("keydown", this.clavier.bind(this));//on appel la méthode pour le clavier

    }


    previewSlide() {
        this.slides[this.currentSlide].className = 'slide'; //On donne la class Slide a l'élément courant dans le tableau
        if (this.currentSlide == 0) {
            this.currentSlide = this.slides.length //length renvoie le nombre l'element présent dans le tableau
        }
        this.currentSlide = (this.currentSlide - 1) % this.slides.length; //On change l'element courrant a -1 donc on recule
        this.slides[this.currentSlide].className = 'slide showing'; //On donne la class Slide Showing a l'élement courant du tableau
    }

    //On crée la fonction qui passe a la slide suivante
    nextSlide() {
        this.slides[this.currentSlide].className = 'slide'; //On donne la classe Slide a l'élément courant dans le tableau
        this.currentSlide = (this.currentSlide + 1) % this.slides.length; //On change l'élément courrant a +1 donc on avance
        this.slides[this.currentSlide].className = 'slide showing'; //On donne la class Slide Showing a l'element courant du tableau
    }

    //on crée la fonction pause
    pauseSlideshow() {
        this.pauseButton.innerHTML = 'Play';
        this.playing = false; //On dit que playing = false pour arreter le slider
        clearInterval(this.slideInterval); //On nettoie setInterval
    }

    //On crée la fonction play
    playSlideshow() {
        this.pauseButton.innerHTML = 'Pause';
        this.playing = true; //On dit que playing = true 
        this.slideInterval = setInterval(this.nextSlide.bind(this), 5000); //On re crée notre setInterval a 5 secondes
    }

    clavier(e) {
        //Au click de la touche du clavier 37 ( touche de la flèche de gauche ) On appel la fonction previewSlide

        if (e.keyCode === 37) {
            this.previewSlide();
        }

        //Au click de la touche du clavier 39 ( touche de la flèche de droite ) On appel la fonction nextSlide
        else if (e.keyCode === 39) {
            this.nextSlide();
        }

    }
}

var slider = new slide();
