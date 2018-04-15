import {Projection} from './projection.model';

export class Play extends Projection {

  constructor(id: number, name: string, ratings: number, director: string,
    durationMinutes: number, coverPath: string, description: string) {
    super(id, name, ratings, director, durationMinutes, coverPath, description);
  }
}
