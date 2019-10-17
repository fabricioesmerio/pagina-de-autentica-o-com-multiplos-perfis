import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { SingInService } from 'src/app/sing-in.service';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-med-auth',
  templateUrl: './med-auth.component.html',
  styleUrls: ['./med-auth.component.scss'],
})
export class MedAuthComponent implements OnInit, AfterViewInit {

  @ViewChild('login') login: ElementRef;
  @ViewChild('senha') senha: ElementRef;
  model: any = {};
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
    this.singInService.login('auth', this.model)
      .subscribe(response => {
        if (response.auth) {
          this.toastr.success('Login efetuado com sucesso.', 'Sucesso!');
          this.localStorage.setTokenLocalStorage(response);
          setTimeout(() => {
            this.loading = false;
            window.location.href = this.env.dashboard + 'app/principal';
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
