import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../services/auth-services';

@Component({
  selector: 'app-navi-bar-home',
  imports: [RouterLink,RouterLinkActive,],
  templateUrl: './navi-bar-home.html',
  styleUrl: './navi-bar-home.css'
})
export class NaviBarHome {
public authServices=inject(AuthServices);

}
