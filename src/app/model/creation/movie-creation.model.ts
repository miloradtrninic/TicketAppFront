import { ProjectionCreation } from "./projection-creation.model";


export class MovieCreation extends ProjectionCreation {

    constructor(public name: string, public ratings: number, public director: string,
                public duration: number,public coverImage: string, public description: string) {
      super(name, ratings, director, duration, coverImage, description);
    }
  
  }