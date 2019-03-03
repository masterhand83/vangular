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
   * Obtiene la informacion GENERAL del proyecto
   * @param id identificador del proyecto
   */
  getProject(id: string) {
    return this.http.get(`http://${this.IP}:3000/api/projects/info/${id}`);
  }

  /**
   * Crea un proyecto nuevo
   * @param name nombre del proyecto
   * @param description descripcion del proyecto
   * @param idUser1 id de algun usuario (cualquiera)
   * @param idUser2 id de algun usuario (cualquiera)
   * @param idUser3 id de algun usuario (cualquiera)
   */
  createProject(name: string, description: string, idUser1: string, idUser2: string, idUser3: string) {
    // console.log(idUser1,idUser2,idUser3);
      return this.http.post(`http://${this.IP}:3000/api/projects/project`, {
        name: name,
        description: description,
        idUser1: idUser1,
        idUser2: idUser2,
        idUser3: idUser3
      });
  }

  /**
   * Obtiene todos los projyectos del usuario
   * @param user_id identificador del usuario
   */
  getUserProjects(user_id: string) {
    // console.log(`http://${this.IP}:3000/api/users/project/${user_id}`);
    return this.http.get(`http://${this.IP}:3000/api/users/project/${user_id}`);
  }
   /**
   * Obtiene todos los proyectos del usuario
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

  getActivity(id: string) {
    return this.http.get(`http://${this.IP}:3000/api/activities/activity/${id}`);
  }

  putActivity(id: string, data: any, objectives: any[], deliverables: any[]) {
    return this.http.put(`http://${this.IP}:3000/api/activities/activity/${id}`, {
      name: data.nombre,
      description: 'falta descripcion',
      start: data.inicio,
      end: data.final,
      priority: data.prioridad,
      objective: objectives,
      deliverable: deliverables
    });
  }

  deleteProject(_id: string) {
    return this.http.delete(`http://${this.IP}:3000/api/projects/project/${_id}`);
  }

  changeResident(_id: string, idNewUser: string) {

    return this.http.put(`http://${this.IP}:3000/api/projects/resident/${_id}`, {
      _id: _id,
      idNewResident: idNewUser,

    });
  }
  changeDesigner(_id: string, idNewUser: string) {
    return this.http.put(`http://${this.IP}:3000/api/projects/designer/${_id}`, {
      _id: _id,
      idNewDesigner: idNewUser,

    });
  }


  verifyObjectives(_id: string) {
    return this.http.put(`http://${this.IP}:3000/api/activities/verifyObjectives/${_id}`, {});
  }
  verifyDeliverables(_id: string) {
    return this.http.put(`http://${this.IP}:3000/api/activities/verifyDeliverables/${_id}`, {});
  }

  commentActivity(body: {authorName: string, comment: string}, _id: string) {
    return this.http.post(`http://${this.IP}:3000/api/activities/comment/${_id}`, body);
  }

  setActivityStatus(status: number, _id: string,data:boolean) {
    switch (status) {
      case 0:
        return this.http.put(`http://${this.IP}:3000/api/activities/start/${_id}`, {started: data});
        break;
      case 1:
        return this.http.put(`http://${this.IP}:3000/api/activities/finish/${_id}`, { });
        break;
      default:
        break;
    }
  }

  addActivity(data: {
    name:string,
    description: string,
    start: string,
    end:string,
    priority:number,
    deliverable:string[],
    objective: string[]
  }, _id:string){
    
    return this.http.put(`http://${this.IP}:3000/api/projects/activity/${_id}`,data);
  }

  addAlert(_id:string,description:string){
    return this.http.post(`http://${this.IP}:3000/api/projects/alert/${_id}`,  {
      link:"link",
      description: description,
    });
  }
}
