import { Director } from "./director.model";

import { Actor } from "./actor.model";
import { Genre } from "./genre.model";
import { Termin } from "./termin.model";

export abstract class Projection {
  constructor(public id: number, public name: string, public ratings: number, public actors : Array<Actor>,
    public genres : Array<Genre> , public director: Director, public durationMinutes: number,
     public coverPath: string, public description: string, public projectionTime : Array<Termin>) {}
}

