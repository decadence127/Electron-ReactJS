export default class UserStore{
  constructor(){
    this._isAuth = false;
    this._user = {}
  }
  set isAuth(bool){
    this._isAuth = bool;
  }
  set setUserData(user){
    this._user = user
  }
  get isAuth(){
    return this._isAuth;
  }
  get userData(){
    return this._user;
  }
}