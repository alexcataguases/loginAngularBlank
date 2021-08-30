import { Component} from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';//ALEX--------
import { Storage } from '@capacitor/storage';//ALEX------
import { Router } from '@angular/router';//ALEX-------

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  lista: any = [];
  logado : any;

  constructor(public http: HttpClient, private router: Router) { 
        this.conferirLogin();
        this.escreveDados();
   } 

 

   escreveDados(){
    this.http.get("https://petshopkta.000webhostapp.com/ionic/login/jsonexibir.php").subscribe( data => {
     this.lista = data;
     //console.log(data); 
     } )
}

async conferirLogin() {
  const { value } = await Storage.get({ key: 'nome' });
  //alert(`Hello ${value}!`);
  if(value==null){
    this.router.navigate(['login']);
  }else{
    this.logado=value.split(' ')[0]; 
  }
 
}

async sair() {
  //alert("Deslogado com sucesso!");
  await Storage.remove({ key: 'nome' });
  await Storage.remove({ key: 'telefone' });
  //this.router.navigate(['home']);
  this.router.navigate(['home']).then(() => {
    window.location.reload();
    });
}

}
