class signature {

    constructor(canvas) {
        //On récupère l'element qui possède l'id canvas
        this.canvas = document.getElementById('canvas');
        //On lui crée un contexte
        this.contexte = this.canvas.getContext('2d');
        //on déclare deux booleens
        this.dessin = false;
        this.canvasVide = false;
        //AU EVENEMENT DE LA SOURIS ET DU TACTILE ON APPEL LES METHODES
        this.canvas.addEventListener("mousedown", this.cliqueSouris.bind(this));
        this.canvas.addEventListener("mouseup", this.relachementSouris.bind(this));
        this.canvas.addEventListener("mouseleave", this.relachementSouris.bind(this))
        this.canvas.addEventListener("mousemove", this.drawline.bind(this));
        this.canvas.addEventListener("touchstart", this.toucheDoigt.bind(this));
        this.canvas.addEventListener("touchend", this.relachementSouris.bind(this))
        this.canvas.addEventListener("touchmove", this.mouvementDoigt.bind(this));
        this.reset = document.getElementById("resetcanva");
        this.reset.onclick = this.clearCanvas.bind(this);
    }


    cliqueSouris(e) {
        //on dit true aux booléens
        this.dessin = true;
        this.canvasVide = true;
        this.contexte.beginPath(); //Je place mon curseur pour la premiere fois
        this.contexte.moveTo(e.offsetX, e.offsetY); //déplacement 
        this.drawline(e); //on appel la fonction qui dessine 
    }


    relachementSouris() {
        this.dessin = false; //on dit false a la booléen de dessin
    }

    drawline(e) {
        if (this.dessin === true) {
            this.contexte.lineTo(e.offsetX, e.offsetY);
            this.contexte.stroke(); //trace le trait par raport a lineTo
        }
    }

    variable() {
        //couleur
        this.contexte.strokeStyle = "#000";
        //épaisseur du trait
        this.contexte.lineWidth = 2;
        //crée un trait aroundis
        this.contexte.lineCap = "round";
        this.contexte.lineJoin = 'round';
    }

    clearCanvas() {
        //éfface les pixels du canvas
        this.contexte.clearRect(0, 0, 304, 154);
        this.canvasVide = false;
    }


    toucheDoigt(e) {
        //coordonées
        const touchX = e.touches[0].pageX - e.touches[0].target.offsetLeft
        const touchY = e.touches[0].pageY - e.touches[0].target.offsetTop
        this.dessin = true;
        //Je place mon curseur pour la premiere fois
        this.contexte.beginPath();
        this.contexte.moveTo(touchX, touchY);
        e.preventDefault();
    }

    mouvementDoigt(e) {
        this.canvasVide = true;
        const touchX = e.touches[0].pageX - e.touches[0].target.offsetLeft
        const touchY = e.touches[0].pageY - e.touches[0].target.offsetTop
        if (this.dessin === true) {
            this.contexte.lineTo(touchX, touchY);
            this.contexte.stroke();
        }
        e.preventDefault();
    }

}


var canvas = new signature;
