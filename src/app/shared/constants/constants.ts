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

  public static readonly ReservationType = {
    THEATRE: 'Theatre',
    CINEMA: 'Cinema',
    ALLFORUSER: 'All_For_User',
    AFU_THEATRE: 'All_For_User_Theatre',
    AFU_CINEMA: 'All_For_User_Cinema',
    CREATE: 'Create'
  }

  public static readonly AuditoriumType = {
    THEATRE: 'Theatre',
    CINEMA: 'Cinema'
  }
}
