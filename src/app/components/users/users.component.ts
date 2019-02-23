import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../../services/users.service.1';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private usersService:UsersService) { }
  name:string;
  lastname:string;
  email:string;
  mobile:string;
  password:string;
  userType:string

  ngOnInit() {
  }

  addUser(form: NgForm){
    
    

    if(form.value.name!="" && form.value.lastname!="" && form.value.email!="" && form.value.mobile!=""
      && form.value.password!="" && form.value.userType!=null &&
      form.value.name!=undefined && form.value.lastname!=undefined && form.value.email!=undefined && form.value.mobile!=undefined
      && form.value.password!=undefined && form.value.userType!=undefined 
    
    ){
      
      this.usersService.postUser(form.value)
        .subscribe(res=>{
          console.log(res); 
            
          form.reset();
          alert("Usuario guardado exitosamente");
          
        });
 
      
    }
    else{
      alert('Favor de completar todos los campos');
    } 

  }

}
