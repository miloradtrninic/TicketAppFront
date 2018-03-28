export class HelperFunctions {
  /*Moze biti bilo sta. Ako treba dodati jos nesto, slobodno prosirite.*/
  public static isEmptyValue(toCheck:any):boolean {
    let isEmpty = false;

    isEmpty = toCheck === null || toCheck === undefined;
    console.log('Tip provere: ' + typeof toCheck);

    if(typeof toCheck === 'string' && isEmpty !== true) {
      isEmpty = toCheck.length <= 0 || toCheck === '';
    }
    else if(typeof toCheck === 'object' && !Array.isArray(toCheck) && isEmpty !== true) {
      isEmpty = Object.keys(toCheck).length <= 0;
    }
    else if(typeof toCheck === 'object' && Array.isArray(toCheck) && isEmpty !== true) {
      isEmpty = toCheck.length <= 0;
    }

    return isEmpty;
  }

  /*Mora biti Array ili Object, inace baca gresku*/
  public static containsEmptyValues(toCheck:any):boolean {
    let hasEmpty = false;

    hasEmpty = toCheck === null || toCheck === undefined;

    if(Array.isArray(toCheck)) {
      for(let i = 0; i<toCheck.length; i++){
        hasEmpty = this.isEmptyValue(toCheck[i]);
        if(hasEmpty === true){
          break;
        }
      }
    }
    else if(typeof toCheck === 'object') {
      for(const key in toCheck) {
        if(toCheck.hasOwnProperty(key)) {
          hasEmpty = this.isEmptyValue(toCheck[key]);
          if(hasEmpty === true){
            break;
          }
        }
      }
    }

    return hasEmpty;
  }
}
