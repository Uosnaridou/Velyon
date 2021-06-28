class station { 

 constructor(infostation, index) {
        this.nom = infostation.name,
        this.nombre = infostation.number;
        this.adresse = infostation.address;
        this.position = infostation.position;
        this.bancaire = infostation.banking;
        this.bonus = infostation.bonus;
        this.status = infostation.status;
        this.contrat = infostation.contract_name;
        this.places = infostation.bike_stands;
        this.placesdisponible = infostation.available_bike_stands;
        this.velodisponible = infostation.available_bikes;
        this.latitude = infostation.lat;
        this.longitude = infostation.lng;
        this.position = infostation.position;
        this.index = index;
        return this;
            } 

}