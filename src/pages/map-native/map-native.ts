import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';





@IonicPage()
@Component({
  selector: 'page-map-native',
  templateUrl: 'map-native.html',
})
export class MapNativePage {

  destiny: string = '';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public launchNavigator: LaunchNavigator
            ) {
  }

  ionViewDidLoad() {

  }

  openMap(){
    let options: LaunchNavigatorOptions = {
      //start: 'Convencion 1343, Montevideo, UY',
      app: this.launchNavigator.APP.GOOGLE_MAPS,
      transportMode: "driving"
    };

    this.launchNavigator.navigate(this.destiny, options )
      .then(
        success => console.log('Launched navigator: ', success),
        error => console.log('Error launching navigator', error)
      );
  }

}
