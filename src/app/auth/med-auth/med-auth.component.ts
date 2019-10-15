import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-med-auth',
  templateUrl: './med-auth.component.html',
  styleUrls: ['./med-auth.component.scss'],
  providers: [AuthService]
})
export class MedAuthComponent implements OnInit {

  model: any = {};
  loading = false;
  env = environment;

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = false;
    // document.querySelector('body').style.backgroundImage = 'url(assets/images/bg_1.jpg)';
    // document.querySelector('body').style.backgroundSize = 'cover';
  }

  click() {
    this.loading = true;
    if (!this.model.login || !this.model.senha) {
      return;
    }
    this.auth.loginMed(this.model)
      .subscribe(response => {
        if (response.auth) {
          this.toastr.success('Login realizado com sucesso!', 'Sucesso!');
          setTimeout(() => {
            this.router.navigate([this.env.dashboard]);
          }, 3000);
        } else {
          this.toastr.error('Erro na autenticação', 'Erro!');
        }
        console.log('data login => ', response);
        this.loading = false;
      }, err => {
        console.log('erro login ', err);
        this.toastr.error('Erro na autenticação', 'Erro!');
        this.loading = false;
      });
  }

}
