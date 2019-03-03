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
   * crea la sesion del proyecto utilizando la id del usuario y su tipo
   * @param res los parametros para crear
   */
  createSession(res: any) {
    const id = this.helmet.encrypt(res._id);
    const usrType = this.helmet.encrypt(res.userType);

    this.cookieService.set('UserID', id);
    this.cookieService.set('UserType', usrType); 

  }
  /**
   * crea la sesiond el proyecto
   * @param projectid id del proyecto
   */
  createProjectSession(projectid: string,projectname:string) {
    const pro = this.helmet.encrypt(projectid);
    this.cookieService.set('ActualProject', pro);
    const name = this.helmet.encrypt(projectname);
    this.cookieService.set('NameProject',name);

  }

  /**
   * elimina la sesion del proyecto 
   * @deprecated debido a problemas tecnicos, se incluye una funcionalidad de "proyecto mas reciente",asi que la sesion persiste
   */
  deleteProjectSession() {
    this.cookieService.delete('ActualProject', '/', this.IP);
    // console.log(this.cookieService.get('ActualProject'));
  }

  /**
   * valida la sesion del usuario para evitar escalabilidad mediante el buscador
   */
  validateSession() {
    const usrID = this.cookieService.get('UserID');
    if (usrID == null || usrID === '') {
      this.router.navigate(['']);
    } else {
      if (this.router.url.indexOf('login') > 0 ) {
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
   * @param key El identificador de la cookie
   * @returns Un string
   */
  getFromSession(key: string): string {
    const value = this.cookieService.get(key);
    const decipher = this.helmet.decrypt(value);
    return decipher;
  }
}
