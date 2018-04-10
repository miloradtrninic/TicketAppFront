import {Projection} from './projection.model';

export class Movie extends Projection {

  constructor(id: number, name: string, ratings: number, director: string,
              duration: number, coverImage: string, description: string) {
    super(id, name, ratings, director, duration, coverImage, description);
  }

}
