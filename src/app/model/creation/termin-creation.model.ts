

export class TerminCreation   {

  constructor(public projFK: number, public hallFKs: Array<number>, 
    public date : Date, public price: number, public discount: boolean){

    }
}

