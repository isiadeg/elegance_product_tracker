import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './index/index.component.css']
})
export class AppComponent {
  title = 'Elegance Tools';
  color:ThemePalette ="accent"
}
