export class Constants {
  /*Koristi komunikator servis*/
  public static methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    OPTIONS: 'OPTIONS',
    HEAD: 'HEAD',
  };

  /*Koristi bilo koja komponenta koja poziva komunikator servis*/
  public static modelClassNames = {
    USER : 'User',
    USER_ROLE: 'UserRole',
    AUDITORIUM : 'Auditorium',
    BID : 'Bid',
    CINEMA : 'Cinema',
  };
}
