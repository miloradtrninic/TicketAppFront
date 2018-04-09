import { HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Rx'


export abstract class AbstractService<Entity, Key> {
  constructor(protected http: HttpClient, protected actionUrl: string) {
  }
  getAll(): Observable<Entity[]> {
    return this.http.get(this.actionUrl).map(resp => resp as Entity[]);
  }
  getOne(id: Key): Observable<Entity> {
    return this.http.get(`${this.actionUrl}${id}`).map(resp => resp as Entity);
  }
  insert(toInsert: Entity): Observable<Entity> {
    return this.http.post(this.actionUrl, toInsert).map(resp => resp as Entity);
  }
  delete(toDelete: string): Observable<any> {
    return this.http.delete(this.actionUrl + '/delete' + toDelete);
  }
}
