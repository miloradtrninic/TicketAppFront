import {ActorPreview} from './actor-preview';
import {GenrePreview} from './genre-preview';
import {DirectorPreview} from './director-preview';

export class ProjectionPreview {
  constructor(
    public id: number,
    public name: string,
    public ratings: number,
    public actors: ActorPreview[],
    public genres: GenrePreview[],
    public director: DirectorPreview,
    public durationMinutes: number,
    public coverPath: string,
    public description: string
  ) { }
}
