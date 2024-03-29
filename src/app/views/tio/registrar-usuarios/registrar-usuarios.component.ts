import { Component, OnInit } from '@angular/core';
import { Tio } from 'src/app/commons/models/tio';
import { TioService } from '../tio.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Usertoken } from 'src/app/models/usertoken';
import { TokenService } from '../../../services/token.service';
import { TioDto } from 'src/app/commons/request/tioDto';
import { MenuService } from 'src/app/services/menu.service';



@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.css']
})
export class RegistrarUsuariosComponent implements OnInit {
  login: Usertoken | null;
  tio: TioDto;
  nombre = '';
  email = 'zddfdfdsfd';
  password = '';
  registerForm: FormGroup;
  usuariologeado = false;
  constructor(
    private tioService: TioService, 
    private tokenService: TokenService,
    private menuService: MenuService, 
    private fb: FormBuilder, 
    private router: Router) {
      this.tio = new TioDto("", "", "");
      this.registerForm = this.fb.group({ 
        id:0,
        nombre: ['', Validators.required], 
        email: ['', Validators.maxLength(32)],
        password: ['', Validators.required]
      }); 
      this.login = null;
      //this.login = this.store.select('login');
    if(localStorage.getItem('login')){
      const json: string  | null = localStorage.getItem('login');
      if(json != null){
        const usuario:Usertoken = JSON.parse(json);
        this.login = usuario;
        if(usuario.nombre != 'error'){
          this.usuariologeado = true;
        }else{
          this.usuariologeado = false; 
          console.log('location')
          //console.log(this.router.url)
          //console.log(this.activatedRoute.url);
          //this.router.navigate(['/login']);
        }
      }
    }
  }

  ngOnInit() {
  }

  async onCreate() {
    if(!this.registerForm.valid){
      return;
    }
    try{
      //const nombre = this.registerForm.get('nombre').value;
        //const email = this.registerForm.get('email').value
        //const password = this.registerForm.get('password').value
        const nombre = this.registerForm.getRawValue().nombre;
        const email = this.registerForm.getRawValue().email;
        const password = this.registerForm.getRawValue().password;
        this.tio = new TioDto(nombre, email, password);
        var response = await this.tioService.registrar(this.tio);
        console.log('response.data');
        console.log(response.data);
        if(response.status==201 || response.status==200){
          var data = response.data;
          const usertoken: Usertoken = {
            token: data.token,
            id: data.id,
            nombre: data.nombre,
            email: data.email,
            role: data.role,
            status:data.status
          };
          this.tokenService.setUser(usertoken);
          this.tokenService.setToken(usertoken.token);
          await this.menuService.setMenus();
          this.router.navigate(['/tarjeta']);
        }else{
          console.log('ocurrio un error')
        }
    }catch(e){
      console.log(e);
    }
    
  }
}
