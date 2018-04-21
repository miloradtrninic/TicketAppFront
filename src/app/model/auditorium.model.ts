import {Fanzone} from './fanzone.model';

export class Auditorium {
  constructor(public id: number, public name: string, public address: string, public description: string,
              public type: string, public ratings: number, fanZone: Fanzone) {
  }
}
