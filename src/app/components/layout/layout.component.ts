import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, NavigationComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {

}
