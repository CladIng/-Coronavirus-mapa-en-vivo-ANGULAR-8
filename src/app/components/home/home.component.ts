import { Component, OnInit } from '@angular/core';

// Maps
import {  } from 'googlemaps';
import { default as optsMap } from './../../utils/optionsMap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  mapOptions: any;
  private mapLocation: any;

  constructor() { }

  ngOnInit() {
    this.mapOptions = optsMap;
  }

  ngAfterViewInit(): void {
    this.initMapGs();
  }

  initMapGs(): void {
    let map: any = document.getElementById('map_location');
    if (map) this.mapLocation = new google.maps.Map(map, this.mapOptions);
  }

}
