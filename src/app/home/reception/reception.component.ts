import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  isAuth(){
    /*
    return this.authService.isAuth();*/
  }
}
