import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //Header sticky
    window.addEventListener("scroll", function(){
    const $header = document.querySelector('header');
    const $mouse = document.querySelector('.mouse');
    $header?.classList.toggle('sticky', window.scrollY > 0);
    $mouse?.classList.toggle('none', window.scrollY > 0);
    });

    //Boton de menu
    const $btn = document.querySelector('.toggle');
    const $nav = document.querySelector('nav');

    $btn?.addEventListener('click', function(){
    $btn.classList.toggle('active');
    $nav?.classList.toggle('active');
    })
  }
  
}
