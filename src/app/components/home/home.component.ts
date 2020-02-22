import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

// Maps
import {  } from 'googlemaps';
import { default as optsMap } from './../../utils/optionsMap';

// services
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  // Mapa
  mapOptions: any;
  private mapLocation: any;

  listaDeContagios: any[] = [];
  contagioSeleccionado: any = null;

  constructor(
    private _mainService: MainService
  ) { }

  ngOnInit() {
    this.mapOptions = optsMap;
    this.obtenerListaDeContagios();
  }

  obtenerListaDeContagios(): void {
    this._mainService.listaDeContagios().pipe(take(1)).subscribe(
      data => {
        this.listaDeContagios = data;
        this.createPrizesMap()
      },
      err => { console.log('Error al traer los datos: ' + err); }
    );
  }

  createPrizesMap(): void {
    this.listaDeContagios.map(contagio => {
      
      var position = new google.maps.LatLng(
        parseFloat(contagio.ciudad.latitud),
        parseFloat(contagio.ciudad.longitud)
      );
      let markerLocation = new google.maps.Marker({
        position: position,
        map: this.mapLocation
      });
      markerLocation.addListener("click", () => {
        this.contagioSeleccionado = contagio
      });
    });
  }

  ngAfterViewInit(): void {
    this.initMapGs();
  }

  initMapGs(): void {
    let map: any = document.getElementById('map_location');
    if (map) this.mapLocation = new google.maps.Map(map, this.mapOptions);
  }

}
