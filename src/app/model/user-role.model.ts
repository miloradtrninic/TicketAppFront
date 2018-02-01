import {Privilege} from './privilege.model';

export class UserRole {
  constructor(id: number, name: string, privileges: Array<Privilege>) {}
}
