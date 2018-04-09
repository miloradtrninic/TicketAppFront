import { Fanzone } from "./fanzone.model";

export class Cinema {

  constructor(public id: number, public name: string, public address: string, public description: string,
  public ratings: number, public fanZone: Fanzone, public poster: string) {
    
  }
}
