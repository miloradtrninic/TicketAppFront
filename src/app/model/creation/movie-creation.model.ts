import { ProjectionCreation } from "./projection-creation.model";


export class MovieCreation extends ProjectionCreation {

    constructor(name: string, ratings: number, director: string,
                duration: number, coverImage: string, description: string) {
      super(name, ratings, director, duration, coverImage, description);
    }
  
  }