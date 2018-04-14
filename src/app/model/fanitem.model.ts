import {Projection} from './projection.model';
import {Fanzone} from './fanzone.model';

export class Fanitem {
  constructor(public id: number, public name: string, public description: string,
              public imagePath: string) {}
}
