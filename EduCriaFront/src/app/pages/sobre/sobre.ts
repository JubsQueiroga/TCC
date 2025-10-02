import { Component } from '@angular/core';
import { Menu } from '../../shared/menu/menu';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-sobre',
  imports: [Menu, Footer],  
  templateUrl: './sobre.html',
  styleUrl: './sobre.css'
})
export class Sobre {

}
