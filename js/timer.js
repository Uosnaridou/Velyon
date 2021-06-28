class timer {


    //On crée un timer de 20 minutes
    temps() {
        var maintenant = $.now(); //TIMESTAMP
        var fin = maintenant + 1200000; //On déclare la fin
        localStorage.setItem('final', fin); //On sauvegarde le temps restant TR dans le LS
        Timer.boucle();
    }

    boucle() {
        setInterval(function () {
            if (systeme.reservelo === true) { //Si il y a une réservation
                var debut = $.now();
                var final = localStorage.getItem('final');
                var tempsrestant = final - debut; //On déclare le temps qu'il reste
                //On enregistre dans le LocalStorage le timer    
                var date = new Date(tempsrestant);
                var minutes = date.getMinutes();
                var secondes = date.getSeconds();
                localStorage.setItem('m', minutes);
                localStorage.setItem('s', secondes);

                //On affiche
                $('#timer').text("Votre réservation n'est plus valide dans " + localStorage.getItem('m') + ' minutes et ' + localStorage.getItem('s') + ' secondes');

                //On vide a la fin du timer
                if (tempsrestant <= 0) {
                    localStorage.clear();
                    location.reload();
                    clearInterval(Timer.timer());
                    affichage.finTimer();
                }
            }
        }, 1000)
    }

}

var Timer = new timer();
