import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/IUser';
import { SecurityService } from './security.service';
import { constants } from './constants.data';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly IP = constants.IP;
  readonly URL_API = 'http://' + this.IP + ':3000/api/users/user';
  readonly URL_API2 = 'http://' + this.IP + ':3000/api/users/project';

  user: IUser[];
  user2: IUser[];
  // projects:Project[];

  expreg = /^[^<>(){};,]*$/;

  constructor(private http: HttpClient, private crypto: SecurityService) { }

  loginUser(email: string, contra: string) {
    if (this.expreg.test(email) && this.expreg.test(contra)) {
      const userData2 = {
        email: email,
        password: contra
      };

      const String = this.crypto.encrypt(userData2);
      String.toString();

      const userData = { userData: String };

      return this.http.post('http://' + this.IP + ':3000/api/users/login', userData);
    } else {
      alert('Se han bloqueado algunos caracteres por cuestiones de seguridad.');
    }
  }

  postUser(User: IUser) {

    if (this.expreg.test(User.name) && this.expreg.test(User.email) &&
      this.expreg.test(User.password)) {
      let String: String;
      let userData;
      String = this.crypto.encrypt(User);
      String.toString();
      userData = { userData: String };
      return this.http.post(this.URL_API, userData);
    } else {
      alert('Se han bloqueado algunos caracteres por cuestiones de seguridad.');
    }



  }

  getUser(id: string) {

    return this.http.get(this.URL_API + '/' + id);
  }

  getResidents() {
    return this.http.get('http://' + this.IP + ':3000/api/users/residents');
  }
  getDesigners() {
    return this.http.get('http://' + this.IP + ':3000/api/users/designers');
  }
  getUsers(){
    return this.http.get('http://' + this.IP + ':3000/api/users/user');
  }

  deleteUser(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
  putUser(_id: string, email: string, mobile: number, password: string) {

    if (this.expreg.test(email) && this.expreg.test(password)) {

      const userData2 = {
        _id: _id,
        email: email,
        mobile: mobile,
        password: password
      };

      const String = this.crypto.encrypt(userData2);
      String.toString();

      const userData = { userData: String };


      return this.http.put(this.URL_API + `/${_id}`, userData);
    } else {
      alert('Se han bloqueado algunos caracteres por cuestiones de seguridad.');
    }
  }
  getUserProjects(_id: string) {
    return this.http.get(this.URL_API2 + `/${_id}`);
  }




}
