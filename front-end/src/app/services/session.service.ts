import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SecurityService } from './security.service';
import { constants} from './constants.data';
import { Key } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  IP: string = constants.IP;
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private helmet: SecurityService) { }

  /**
   *
   * @param res los parametros para crear
   */
  createSession(res: any) {
    const id = this.helmet.encrypt(res._id);
    const usrType = this.helmet.encrypt(res.userType);
    // const name = this.helmet.encrypt(res.name); // !  Despreciado, ya no se necesita el nombre
    this.cookieService.set('UserID', id);
    this.cookieService.set('UserType', usrType); // TODO: Activarlo cuando Quintero termine de inicializarlo
    // this.cookieService.set('Name', name); // !  Despreciado, ya no se necesita el nombre

  }
  createProjectSession(projectid: string) {
    const pro = this.helmet.encrypt(projectid);
    this.cookieService.set('ActualProject', pro);
    // localStorage.setItem('ActualProject',projectid);

  }
  deleteProjectSession() {
    this.cookieService.delete('ActualProject', '/', this.IP);
    // console.log(this.cookieService.get('ActualProject'));
  }

  validateSession() {
    const usrID = this.cookieService.get('UserID');
    if (usrID == null || usrID === '') {
      this.router.navigate(['']);
    } else {
      if (this.router.url.indexOf('') > 0 ) {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  validateProject() {
    const actProject = this.cookieService.get('ActualProject');
    if (actProject.length > 0) {
      this.router.navigate(['/dashboard']);
    }
  }
  deleteSession() {
    this.cookieService.deleteAll();
    this.router.navigate(['../login']);
  }
  /**
   * Retorna la cookie seleccionada
   * Argumentos validos actualmente:
   * - UserType
   * - UserID
   * TODO: adaptar a proyectos en caso de usarlo
   * @param key El identificador de la cooki
   * @returns Un string
   */
  getFromSession(key: string): string {
    const value = this.cookieService.get(key);
    const decipher = this.helmet.decrypt(value);
    return decipher;
  }
}
