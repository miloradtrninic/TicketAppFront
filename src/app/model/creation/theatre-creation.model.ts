import { AuditoriumCreation } from "./auditorium-creation.model";


export class TheatreCreation extends AuditoriumCreation {

    constructor(public name: string, public address: string,
        public description: string, public ratings: number) {
            super(name, address, description, ratings);      
   }
}