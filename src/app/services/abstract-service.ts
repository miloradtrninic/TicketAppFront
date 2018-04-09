import { HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';



export abstract class AbstractService<Entity, Key> {
  actionUrl: string = 'http://localhost:8080/api';
  constructor(protected http: HttpClient, protected url: string, protected authService: AuthService) {
    this.actionUrl = this.actionUrl + url + '/';
  }
  getAll(): Observable<Entity[]> {
    return this.http.get(this.actionUrl).map(resp => resp as Entity[]);
  }
  getOne(id: Key): Observable<Entity> {
    return this.http.get(`${this.actionUrl}${id}`).map(resp => resp as Entity);
  }
  insert(toInsert: Entity): Observable<Entity> {
    console.log(toInsert);
    return this.http.post(this.actionUrl + 'new', toInsert).map(resp => resp as Entity);
  }
  delete(toDelete: string): Observable<any> {
    return this.http.delete(this.actionUrl + 'delete' + toDelete);
  }
}
