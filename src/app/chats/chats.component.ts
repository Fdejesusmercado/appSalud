import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit{

  chats= [
    {
      idUser: '1',
      nameUser : 'Juan Babilonia',
      ultimoMsg : '¿Como estas?',
      cargo: 'doc',
      Notification : '1'
    },
    {
      idUser : '2',
      nameUser : 'Luis Mercado',
      ultimoMsg : 'Hola Evelyn...',
      cargo: 'doc',
      Notification : '5'
    },
    {
      idUser : '3',
      nameUser : 'Hayder Babilonia',
      ultimoMsg : 'Hola Evelyn...',
      cargo: 'user',
      Notification : '5'
    },
  ]





  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  clickChat(){
    
  }
}
