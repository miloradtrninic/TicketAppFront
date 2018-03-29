import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx'


export abstract class AbstractService<Entity, Key> {
  constructor(protected http: Http, protected actionUrl: string) {
  }
  getAll(): Observable<Entity[]> {
    return this.http.get(this.actionUrl).map(resp => resp.json() as Entity[]);
  }
  getOne(id: Key): Observable<Entity> {
    return this.http.get(`${this.actionUrl}${id}`).map(resp => resp.json() as Entity);
  }
  insert(toInsert: Entity): Observable<Entity> {
    return this.http.post(this.actionUrl, toInsert).map(resp => resp.json() as Entity);
  }
  delete(toDelete: string): Observable<any> {
    return this.http.delete(this.actionUrl + '/delete' + toDelete);
  }
}
