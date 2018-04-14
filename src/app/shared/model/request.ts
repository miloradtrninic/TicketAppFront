export class Request {
  constructor(public text: string, public type: string, public acceptFn: any, public declineFn: any) {}
}
