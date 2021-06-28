class affichage {

    //ON CREE LE BANDEAU POUR FAIRE UNE RESERVATION
    bulleReservation() {
        var attributId = $('.boutton').attr('id'); //On récupère l'id de la station 
        $('#reservation').empty(); //On vide d'abord la reservation
        $('#reservation').append('<p>Adresse:</p>' + systeme.tableauStation[attributId].adresse + '<p>N° de la station:</p>' + systeme.tableauStation[attributId].nombre);
        if (localStorage.getItem("Nom") == null) {
            $('#reservation').append('<div id="formulaire"><label for="nom">Nom :</label>' + '<input type="text" name="nom" id="nom" required />' + '<label for="prenom">Prenom : </label>' + '<input type="text" name="prenom" id="prenom" required /></div>');
        } else {
            $('#reservation').append('<div id="formulaire"><label for="nom">Nom :</label>' + '<input type="text" name="nom" id="nom" value="' + localStorage.getItem("Nom") + '" required />' + '<label for="prenom">Prenom : </label>' + '<input type="text" name="prenom" id="prenom"  value="' + localStorage.getItem("Prenom") + '" required /></div>');
        }

        //On gère plusieurs élément pour l'affichage de la réservation
        $('#recap').css('display', 'none');
        $('#footer').css('display', 'none');
        $('#signature').css('display', 'block');
        $('footer').css('display', 'block');
        $('#resetcanva').css('display', 'block');
        $('h5').css('display', 'block');
        $('#canvas').css('visibility', 'visible');
        $('#boutonValider').css('visibility', 'visible');
        $('h4').css('display', 'none');
    }


    //LOCAL STORAGE ET SESSION STORAGE
    LS() {
        //On récupère ce que l'ont veux enregistrés
        systeme.reservelo = true;
        var canvas = document.getElementById('canvas');
        var url = canvas.toDataURL();
        var nom = document.getElementById("nom").value;
        var prenom = document.getElementById("prenom").value;
        var indexstation = $('.boutton').attr('id');
        var adresse = systeme.tableauStation[indexstation].adresse;
        var numeros = systeme.tableauStation[indexstation].nombre;

        //On sauvegarde dans le LocalStorage et SessionStorage
        localStorage.setItem("bool", JSON.stringify(systeme.reservelo));
        localStorage.setItem('Canva', url);
        localStorage.setItem('Nom', nom);
        localStorage.setItem('Prenom', prenom);
        sessionStorage.setItem('Adresse', adresse);
        sessionStorage.setItem('Numeros', numeros);
        sessionStorage.setItem('idx', indexstation);
    }


    //ON CREE LE BANDEAU RECAPITULATIF D'UNE RESERVATION
    recap() {
        Timer.boucle(); //On appel le timer
        //On affiche les informations enregistrées
        $('#footer').append('<div id="image">' + '<h6>Signature</h6>' + '<img src="' + localStorage.getItem("Canva") + '" alt="imagecanva" />');
        $('#recap').append('<h6>Récapitulatif</h6>' + '<a href="#map"><button id="station">Votre Station</button></a>' + '<p>Nom : </p>' + localStorage.getItem("Nom") + '<p>Prenom : </p>' + localStorage.getItem("Prenom") + '</br>' + '<p>Adresse : </p>' + sessionStorage.getItem("Adresse") + '<p>N° de la station : </p>' + sessionStorage.getItem("Numeros") + '</br>');
        $('footer').css('display', 'block');
    }


    //ON RECUPERE L'ID ENREGISTREE DANS LE LOCAL STORAGE POUR CHANGER DE MARQUEURS SI IL Y A UNE RESERVATION    
    changeIcon() {
        window.setTimeout(function () { //On crée un setTimeout pour erte sur que les marqueurs soient chargés
            var id = sessionStorage.getItem('idx');
            systeme.tableauMarker[id].icon = ('img/punaise.png'); //On change l'image du marqueur
            systeme.tableauMarker[id].setMap(null); //On lui enlève la map par defaut
            systeme.tableauMarker[id].setMap(map); //On lui remet la map
        }, 2000);
    }


    //FONCTION POUR RECENTREE LA CARTE SUR UNE RESERVATION 
    centreStation() {
        var id = sessionStorage.getItem('idx');
        map.setCenter(systeme.tableauMarker[id].getPosition()); //On recentre la carte sur la station ou il y a eu une réservation
        map.setZoom(16); //On re zoom 
    }

    //FONCTION QUI ENLEVE 1 VELO LORSQU'IL Y A EU UNE RESERVATION
    majvelo() {
        var attributId = $('.boutton').attr('id'); //On récupère l'id de la station
        systeme.tableauStation[attributId].velodisponible = systeme.tableauStation[attributId].velodisponible - 1; //On enlève 1
        Maps.setMapOnAll(null);
        systeme.tableauMarker = [];
        if (typeof (window.info) != 'undefined') info.close();
        for (let i = 0; i < systeme.tableauStation.length; i++) {
            systeme.Marqueur(systeme.tableauStation[i])
        }
    }

    //ON CREE LA FONCTION QUI PERMET D'ANNULER UNE RESERVATION
    reset() {
        //On vide le localStorage et sessionStorage de certain éléments
        localStorage.removeItem('bool');
        localStorage.removeItem('Canva');
        sessionStorage.removeItem('Adresse');
        sessionStorage.removeItem('Nuneros');
        sessionStorage.removeItem('idx');
        location.reload(); //On reload la page 
        clearInterval(Timer.timer()); //on vide/nettoie le timer
    }

    //ON AFFICHE OU FAIT DISPARAITTRE CERTAIN ELEMENTS LORS DES 20 MINUTES DU TIMER
    finTimer() {
        $('#reservation').css('display', 'none');
        $('#formulaire').css('display', 'none');
        $('#recap').css('display', 'none');
        $('footer').css('display', 'none');
        $('h5').css('display', 'none');
        $('#image').css('display', 'none');
        $('#bulle').css('display', 'none');
    }

    //ON AFFICHE OU FAIS DISPARAITRES DES ELEMENTS POUR L'AFFICHAGE
    element() {
        $('#recap').css('display', 'block');
        $('#footer').css('display', 'flex');
        $('#signature').css('display', 'none');
        $('a').css('display', 'initial');
        $('h5').css('display', 'none');
        $('h4').css('display', 'flex');
        $('#reservation').css('display', 'none');
        $('#formulaire').css('display', 'none');
        $('#canvas').css('display', 'none');
        $('#boutonValider').css('display', 'none');
        $('#resetcanva').css('visibility', 'hidden');
    }

}

var affiche = new affichage;
