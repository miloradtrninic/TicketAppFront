import { Fanzone } from './fanzone.model';
import {Auditorium} from './auditorium.model';

export class Cinema extends Auditorium {

  constructor(id: number, name: string, address: string, description: string,
              ratings: number, fanZone: Fanzone, poster: string) {
    super(id, name, address, description, ratings, fanZone, poster);
  }
}
