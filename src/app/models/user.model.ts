export class UserModel {   //eb2a zawad ba2i ashya2 el user
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _expiresIn: Date,
    public name?: string,
    public photo?: string
  ) {}
 
  get token(): string | null{
 
    if(! this._expiresIn || this._expiresIn < new Date() ){
        return null;
    }
 
    return this._token;
  }
 
}
