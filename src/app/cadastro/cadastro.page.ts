import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';//ALEX--------
import { Router } from '@angular/router';//ALEX-------

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  constructor(public http: HttpClient, private router: Router) { }


  formulario: any = {email: '', senha: '', telefone: '', nome: ''};

  ngOnInit() {
  }

  lista: any = [];
  cadastro(){
    
    this.http.get("https://petshopkta.000webhostapp.com/ionic/login/jsoninserir.php?nome="+this.formulario.nome+"&telefone="+this.formulario.telefone+"&email="+this.formulario.email+"&senha="+this.formulario.senha).subscribe(  data => {
       this.lista =  data;
       if(this.lista[0]=="certo"){
          alert("Cadastro realizado com sucesso. Efetue o login.");
          this.router.navigate(['login']);
       }else{
          alert("Ocorreu um problema ao realizar o cadastro.");
       }
       } )
  
    
  }

}
