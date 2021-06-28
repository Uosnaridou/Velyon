class maps {

    //Initialisation de la map
    initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            //On centre la map
            center: {
                lat: 45.763812,
                lng: 4.835445
            },
            //on zoom la map
            zoom: 14,
            gestureHandling: 'cooperative'

        });

    }


    // On définie la carte sur tout les marqueurs du tableau
    setMapOnAll(map) {
        for (var i = 0; i < systeme.tableauMarker.length; i++) {
            systeme.tableauMarker[i].setMap(map);
        }
    }

    // Supprime les marqueurs de la carte, mais les conserves dans le tableau
    clearMarkers() {
        this.setMapOnAll(null);
    }

    // Affiche tous les marqueurs actuellement dans le tableau
    showMarkers() {
        this.setMapOnAll(map);
    }


}
var map;
var Maps = new maps();
Maps.initMap();
