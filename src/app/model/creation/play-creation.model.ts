import { ProjectionCreation } from "./projection-creation.model";


export class PlayCreation extends ProjectionCreation {

  constructor( name: string, ratings: number, director: string,
              duration: number, coverImage: string, description: string) {
    super(name, ratings, director, duration, coverImage, description);
  }
}