import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
//import {  Geocoder } from '@ionic-native/google-maps';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map-nonative',
  templateUrl: 'map-nonative.html',
})
export class MapNonativePage {

  map: any;

  myLatLng : any;
  destination: string; 

  directionsService = new google.maps.DirectionsService;   //s
  directionsDisplay = new google.maps.DirectionsRenderer;  //a

  constructor(public navCtrl: NavController,
              public geolocation: Geolocation, 
              public navParams: NavParams
             ) {
  }

  ionViewDidLoad() {
    this.getPosition();    
  }



  
  getPosition():any{
    this.geolocation.getCurrentPosition()
    .then(response => {
      this.myLatLng = { lat: response.coords.latitude , lng: response.coords.longitude} ;
      this.loadMap();
    })
    .catch(error =>{
      console.log(error);
    })
  }

  loadMap(){
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 15
    });

    this.directionsDisplay.setMap(this.map);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
 
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }

  calculateRoute(){
    
    this.directionsService.route({
      origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      destination: this.destination,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true
    }, (response, status)=> {
      if(status === google.maps.DirectionsStatus.OK) {
        console.log(response);
        this.directionsDisplay.setDirections(response);
      }else{
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  onInput($event) {
    this.calculateRoute();
  }

}
