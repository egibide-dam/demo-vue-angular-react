import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// AppComponent es el shell de la aplicación.
// Delega el renderizado de cada página al sistema de routing mediante <router-outlet>.
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class App {}
