import { ProjectionUpdate } from "./projection-update.model";


export class PlayUpdate extends ProjectionUpdate {
    constructor(public id: number, public name: string, public description: string,
         public durationMinutes: number, public coverPath: string) {
            super(id, name, description, durationMinutes, coverPath);      
    }
}









