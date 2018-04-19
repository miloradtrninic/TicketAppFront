import {Projection} from './projection.model';

export class Termin   {

  constructor(public id: number, public projection: Projection, public hallNames: Array<String>, 
    public date : Date,  public price: number, public discount: boolean){

    }
}


