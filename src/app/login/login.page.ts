import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';//ALEX--------
import { Router } from '@angular/router';//ALEX-------

import { Storage } from '@capacitor/storage';//ALEX------

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

formulario: any = {email: '', senha: ''};

constructor(public http: HttpClient, private router: Router) {  
  this.gravarUsuario(null,null)
}//ALEX-----

  ngOnInit() {
  }


  async gravarUsuario(n,t) {
    //alert(`Gravado!`);
    await Storage.set({
      key: 'nome',
      value: n,
    });
    await Storage.set({
      key: 'telefone',
      value: t,
    });
  }


  lista: any = [];
  verifica(){
    
    this.http.get("https://petshopkta.000webhostapp.com/ionic/login/jsonlogin.php?email="+this.formulario.email+"&senha="+this.formulario.senha).subscribe(  data => {
       this.lista =  data;
       if(this.lista[0]!=undefined){
        this.gravarUsuario(this.lista[0].nome,this.lista[0].telefone);
        //alert("Login efetuado com sucesso!");
        //this.router.navigate(['home']);
        this.router.navigate(['home']).then(() => {
        window.location.reload();
        });


       }else{
         alert("Login ou senha inválido");
       }

       } )
  
    
  }

  async ver() {
    const { value } = await Storage.get({ key: 'nome' });
    alert(`Hello ${value}!`);
    //alert("Simples: "+localStorage.getItem("nome"));
  }

}
