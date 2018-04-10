import { Projection } from "./projection.model";



export class Actor {
    constructor(public id: number , public name: string, public lastName: string, projectionList:Projection) {
    }
  }