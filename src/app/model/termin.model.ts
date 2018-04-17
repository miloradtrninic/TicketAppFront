import {Projection} from './projection.model';
import { Hall } from './hall.model';

export class Termin   {

  constructor(public id: number, public projection: Projection, public hallList: Array<Hall>, 
    public date : Date, public time: string, public price: number, public discount: boolean){

    }
}

