import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ConfigService } from 'src/app/service/config.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user = this.auth.lastUser

  mainMenu = this.config.mainMenu


  constructor(
    private auth: AuthService,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.auth.logout()
  }

}
