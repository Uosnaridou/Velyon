class evenement {

    bouton() {
        this.recap = document.getElementById("recap"); //Récupère l'id du bouton recap
        this.recap.onclick = affiche.centreStation.bind(); //On appel la fonction centreStation dans la class affiche

        this.reserva = document.getElementById("map"); //Récupère l'id du bouton map
        this.reserva.onclick = affiche.bulleReservation.bind(); //On appel la fonction bullReservation dans la class affiche

        this.valide = document.getElementById("boutonValider"); //Récupère l'id du bouton boutonValider
        this.valide.onclick = function () {
            if (document.getElementById("nom").value == "" || document.getElementById("prenom").value == "" || !canvas.canvasVide) { //je bloque la validation si les 3 champs remplis
                alert("Les champs Nom, Prénom et Signature sont obligatoire"); //Message d'alerte
            } else { //sinon j'appel mes différentes fonctions
                affiche.LS();
                affiche.majvelo();
                systeme.verif();
                Timer.temps();
            }
        }

        this.annule = document.getElementById("annuler"); //Récupère l'id du bouton annuler
        this.annule.onclick = affiche.reset.bind(); //On appel la fonction reset dans la class affiche
    }
}

var clique = new evenement();
clique.bouton();
