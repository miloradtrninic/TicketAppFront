export abstract class Projection {
  constructor(public id: number, public name: string, public ratings: number, public director: string,
              public durationMinutes: number, public coverPath: string, public description: string) {}
}
