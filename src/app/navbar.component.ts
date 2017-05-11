import { Component } from '@angular/core';

import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

  constructor(public authService: AuthService) { }

}
