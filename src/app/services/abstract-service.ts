import { HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';



export abstract class AbstractService<Entity, Key> {
  actionUrl = 'http://localhost:8080/api';

  constructor(protected http: HttpClient, protected url: string, protected authService: AuthService) {
    this.actionUrl = this.actionUrl + url;
    this.authService.init();
  }
  getAll(): Observable<any[]> {
    return this.http.get(this.actionUrl, {headers: this.authService.getJSONAuthHeader()})
      .map(resp => resp as Entity[]);
  }
  
  getOne(id: Key): Observable<any> {
    return this.http.get(`${this.actionUrl}/${id}`, {headers: this.authService.getJSONAuthHeader()})
      .map(resp => resp as Entity);
  }

  insert(toInsert: any): Observable<Entity> {
    console.log(toInsert);
    return this.http.post(this.actionUrl + 'new', toInsert, {headers: this.authService.getJSONAuthHeader()})
      .map(resp => resp as Entity);
  }
  
  delete(toDelete: Key): Observable<any> {
    return this.http.delete(this.actionUrl + 'delete/' + toDelete, {headers: this.authService.getJSONAuthHeader()});
  }

  update(toUpdate: any): Observable<any> {

    return this.http.put(this.actionUrl + 'update/', toUpdate, {headers: this.authService.getJSONAuthHeader()});

  }

}
