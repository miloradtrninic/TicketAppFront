import { Fanzone } from './fanzone.model';
import {Auditorium} from './auditorium.model';

export class Cinema extends Auditorium {

  constructor(public id: number,
              public name: string,
              public address: string,
              public description: string,
              public ratings: number,
              public fanZone: Fanzone) {
    super(id, name, address, description, 'Cinema', ratings);
  }
}
