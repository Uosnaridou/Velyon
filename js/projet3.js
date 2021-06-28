class projet3 {


    constructor() {
        this.tableauStation = []; //Tableau de station
        this.tableauMarker = []; //Tableau des marqueurs
        this.reservelo = JSON.parse(localStorage.getItem("bool"));
        this.index;
    }


    //Appel Ajax
    appelAjax() {
        var objetCourant = this;
        $.ajax({
            url: 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=87acaa4bd9887a9a00bcfe5eff681c8360bbce87;',
            type: 'GET',
            dataType: 'json',
            success: function (data) { //On récupère les informations de data
                for (var i = 0; i < data.length; i++) { //On fais une boucle qui parcours l'api
                    var recup = new station(data[i], i); //creation des stations
                    objetCourant.tableauStation.push(recup); //On rentre les informations dans le tableau
                }

                for (let i = 0; i < objetCourant.tableauStation.length; i++) { //creation des marqueurs
                    objetCourant.Marqueur(objetCourant.tableauStation[i])
                }
            },

            error: function (data) { //en cas d'erreur
                console.log('Ne fonctionne pas');
            }
        })
    }



    Marqueur(station) {

        //On crée les marqueurs
        var Marker = new google.maps.Marker({
            position: station.position,
            map: map,
            icon: ''
        })

        //On gère la bulle d'information et l'image du marqueur en fonction de l'état de la station
        if (station.status == 'CLOSED') { //Si la station est fermée
            Marker.icon = ('img/marqueur2.png'); //On change l'image du marqueur                 
            var bulleInfo = '<div id="bulle">' + '<p>Adresse:</p>' + station.adresse + '<p>N° de la station:</p>' + station.nombre + '<p>Statut:</p>' + station.status + '<p>Cette station est fermée</p>' + '</div>';
        } else if (station.velodisponible == 0) { //Si il n'y a pas de vélo disponible
            Marker.icon = ('img/marqueur3.png'); //On change l'image du marqueur                 
            var bulleInfo = '<div id="bulle">' + '<p>Adresse:</p>' + station.adresse + '<p>N° de la station:</p>' + station.nombre + '<p>Places disponibles:</p>' + station.placesdisponible + '<p>Vélos disponibles:</p>' + station.velodisponible + '<p>Statut:</p>' + station.status + '</br>' + '<p>Vous ne pouvez réserver car aucun vélo n\'est disponible</p> </div>';
            if (this.reservelo == true) { //Si il y a deja une réservation
                bulleInfo = bulleInfo + '<p>Vous avez déja une réservation en cours</p> ';
            }
        } else if (station.status == 'OPEN') { //Si la station est ouverte
            Marker.icon = ('img/marqueur1.png'); //On change l'image du marqueur                 
            var bulleInfo = '<div id="bulle">' + '<p>Adresse:</p>' + station.adresse + '<p>N° de la station:</p>' + station.nombre + '<p>Places disponibles:</p>' + station.placesdisponible + '<p>Vélos disponibles:</p>' + station.velodisponible + '<p>Statut:</p>' + station.status + '</br></div>';
            if (this.reservelo == true) { //Si il y a déja une réservation
                bulleInfo = bulleInfo + '<p>Vous avez déja une réservation en cours</p>';
            } else {
                bulleInfo = bulleInfo + '<a href="#titre" class="boutton" id="' + station.index + '">Réserver</a> ';
            }
        }


        //On crée la l'info Window
        var infowindow = new google.maps.InfoWindow({
            content: bulleInfo,
        })


        //Une s'assure la fermeture 
        Marker.addListener('click', function () {
            if (typeof (window.info) != 'undefined') info.close();
            infowindow.open(map);
            infowindow.setPosition(station.position);
            info = infowindow;

        });


        this.tableauMarker.push(Marker); //On rentre les marqueurs dans le tableau
    }


    verif() {
        if (JSON.parse(localStorage.getItem('bool')) == true) { //On verifie si il y as deja une reservation
            affiche.recap(); //si oui on ré affiche la bulle récapitulatif
            affiche.element(); //on gère différent élement de l'affichage
            affiche.changeIcon(); //On change notre icône sur la map
        }
    }



}
var info;
var systeme = new projet3;
systeme.appelAjax();
systeme.verif();
