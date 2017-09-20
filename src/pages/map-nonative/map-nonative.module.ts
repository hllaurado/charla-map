import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapNonativePage } from './map-nonative';

@NgModule({
  declarations: [
    MapNonativePage,
  ],
  imports: [
    IonicPageModule.forChild(MapNonativePage),
  ],
})
export class MapNonativePageModule {}
