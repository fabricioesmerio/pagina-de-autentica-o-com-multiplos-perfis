import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigate(route: string) {
    switch (route) {
      case 'medico':
        this.router.navigate(['auth/med']);
        break;
      case 'paciente':
        this.router.navigate(['auth/pat']);
        break;
    
      default:
        break;
    }
  }

}
