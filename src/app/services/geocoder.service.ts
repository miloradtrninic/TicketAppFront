import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {} from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';

declare var google: any;

@Injectable()
export class GeocoderService {
  constructor(private __loader: MapsAPILoader) {

  }

  getGeocoding(address: string) {
    return Observable.create(observer => {
        try {
            this.__loader.load().then(() => {
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ address }, (results, status) => {

                    if (status === google.maps.GeocoderStatus.OK) {
                        const place = results[0].geometry.location;
                        observer.next(place);
                        observer.complete();
                    } else {
                        console.error('Error - ', results, ' & Status - ', status);
                        if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                            observer.error('Address not found!');
                        }else {
                            observer.error(status);
                        }

                        observer.complete();
                    }
                });
            });
        } catch (error) {
            observer.error('error getGeocoding' + error);
            observer.complete();
        }

    });
  }



}
