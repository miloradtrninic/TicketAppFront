import {Projection} from './projection.model';
import { Genre } from './genre.model';
import { Director } from './director.model';
import { Actor } from './actor.model';
import { Termin } from './termin.model';

export class Movie extends Projection {

  constructor(id: number,
              name: string,
              ratings: number,
              actors: Array<Actor>,
              genres: Array<Genre> ,
              director: Director,
              durationMinutes: number,
              coverPath: string,
              description: string,
              projectionTime: Array<Termin>) {
    super(id, name, ratings, actors, genres,  director, durationMinutes, coverPath, description, projectionTime );
  }

}

