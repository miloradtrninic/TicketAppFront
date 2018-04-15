import { ProjectionCreation } from "./projection-creation.model";


export class PlayCreation extends ProjectionCreation {

  constructor(public name: string, public ratings: number,public directorId: number,public actorIds: Array<Number>,
              public genreIds: Array<Number>, public durationMinutes: number,public coverPath: string,public description: string) {
    super(name, ratings, directorId, actorIds, genreIds, durationMinutes, coverPath, description);
  }
}

