import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPassword: boolean;
  loginForm: FormGroup;
  public usuario: string;
  public senha: string;
  public value: any;
  public type: string;

  constructor(
    private router: Router,
    private util: UtilService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private loading: LoadingController
  ) { }

  ngOnInit() {
    this.InitializeForms();
  }

  // Botão mostrar senha
  mostrarSenha(){
    this.showPassword = !this.showPassword;
  }

  // Função login
  InitializeForms() {
    this.loginForm = this.formBuilder.group({
        usuario: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(20),
        ])],
        senha: ['', Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(45)
        ])]
    });
  }

  async login() {
    const loading = await this.loading.create({
      cssClass: 'loading-class',
      message: 'Aguarde por favor',
      animated: true,
    });
    await loading.present();

    const params = {
      usuario: this.loginForm.value.usuario,
      senha: this.loginForm.value.senha,
    };

    if (this.loginForm.valid) {
        this.http.post('servidorapi:3045/api/auth/login', params)
          .subscribe((data: any) => {
            switch (data.error) {
              case(false):
                this.router.navigate(['home']);
                loading.dismiss();
                break;
              case(true):
                loading.dismiss();
                this.util.PresentToast(data.msg, 'top');
                break;
            }
        });
    } else {
        loading.dismiss();
        this.util.PresentToast('Por favor, certifique-se de preencher todos os campos corretamente!', 'top');
    }
  }

}
