import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SingInService } from 'src/app/sing-in.service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-pat-auth',
  templateUrl: './pat-auth.component.html',
  styleUrls: ['./pat-auth.component.scss']
})
export class PatAuthComponent implements OnInit, AfterViewInit {

  @ViewChild('login') login: ElementRef;
  @ViewChild('senha') senha: ElementRef;
  model: any = { login: null, senha: null };
  loading = false;
  env = environment;

  constructor(
    private toastr: ToastrService,
    private singInService: SingInService,
    private render: Renderer2,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.render.selectRootElement(this.login.nativeElement).focus();
  }

  signIn() {
    this.render.removeClass(this.login.nativeElement, 'invalid');
    this.render.removeClass(this.senha.nativeElement, 'invalid');

    if (!this.model || !this.model.login || !this.model.senha) {
      this.toastr.error('Preencha todos os campos antes de prosseguir.', 'Sucesso!');
      if (!this.model.login) {
        this.render.addClass(this.login.nativeElement, 'invalid');
        this.render.selectRootElement(this.login.nativeElement).focus();
      }

      if (!this.model.senha) {
        this.render.addClass(this.senha.nativeElement, 'invalid');
        if (this.model.login) {
          this.render.selectRootElement(this.senha.nativeElement).focus();
        }
      }
      return;
    }
    this.loading = true;
    this.singInService.login('authPatient', this.model)
      .subscribe(response => {
        if (response.auth) {
          this.toastr.success('Login efetuado com sucesso.', 'Sucesso!');
          this.localStorage.setTokenLocalStorage(response);
          setTimeout(() => {
            this.loading = false;
            window.location.href = this.env.dashboard + 'app/acesso-paciente';
          }, 500);
        }
      }, err => {
        this.toastr.error(err.error.message, 'Erro!');
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
  }

}
