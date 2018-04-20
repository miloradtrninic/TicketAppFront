import {Auditorium} from './auditorium.model';

export class Theatre extends Auditorium {

  constructor(public id: number,
              public name: string,
              public address: string,
              public description: string,
              public ratings: number,
              public fanZone: string) {
    super(id, name, address, description, 'Theatre', ratings);
  }

}
