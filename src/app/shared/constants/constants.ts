export class Constants {
  /*Koristi komunikator servis*/
  public static readonly HttpMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    OPTIONS: 'OPTIONS',
    HEAD: 'HEAD',
  };

  /*Koristi bilo koja komponenta koja poziva komunikator servis*/
  public static readonly modelClassNames = {
    USER : 'User',
    USER_ROLE: 'UserRole',
    AUDITORIUM : 'Auditorium',
    BID : 'Bid',
    CINEMA : 'Cinema',
  };

  public static readonly State = {
    VIEW : 'view',
    EDIT : 'edit',
  }

  /*Tip zahteva, dodavati po zelji i menjati request komponentu*/
  public static readonly RequestType = {
    ACPTDEC: 'Accept-Decline',
  }

  public static readonly ListType = {
    COMMON : 'Common',
    REQUEST_LIST: 'Request list'
  }
}
