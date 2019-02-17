import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from './constants.data';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  readonly IP = constants.IP;

  information: any;


  constructor(
    private http: HttpClient
  ) { }

  /**
   **Obtiene la informacion GENERAL del proyecto
   * @param id identificador del proyecto
   */
  getProject(id: string) {
    return this.http.get(`http://${this.IP}:3000/api/projects/info/${id}`);
  }


  createProject(name: string, description: string, idUser1: string, idUser2: string, idUser3: string) {
      return this.http.post(`http://${this.IP}:3000/api/projects/project`, {
        name: name,
        description: description,
        idUser1: idUser1,
        idUser2: idUser2,
        idUser3: idUser3
      });
  }

  /**
   ** Obtiene todos los projyectos del usuario
   * @param user_id identificador del usuario
   */
  getUserProjects(user_id: string) {
    // console.log(`http://${this.IP}:3000/api/users/project/${user_id}`);
    return this.http.get(`http://${this.IP}:3000/api/users/project/${user_id}`);
  }
   /**
   ** Obtiene todos los projyectos del usuario
   * @param project_id identificador del projecto
   */
  getActivities(project_id: string) {
    return this.http.get(`http://${this.IP}:3000/api/projects/activity/${project_id}`);
  }
  /**
   * Edita el proyecto actual
   * @param project_id identificador del projecto
   */
  setInformation(project_id: string, body: any) {
    return this.http.put(`http://${this.IP}:3000/api/projects/project/${project_id}`, {
      storeName: body.nombre_tienda,
      storeNumber: body.numero_tienda,
      m2: body.metraje_tienda,
      location: body.posicion_tienda,
      localReception: body.fecha_recepcion,
      openingDate: body.fecha_apertura,
      furnitureDate: body.fecha_pedido

    });
  }
}
