
import {  AuditoriumUpdate } from "./auditorium-update.model";


export class CinemaUpdate extends AuditoriumUpdate{

    constructor(public id: number,public name: string, public address: string,
        public description: string, public ratings: number) {
            super(id,name, address, description, ratings);      
   }
}