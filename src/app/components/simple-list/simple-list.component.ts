import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Cliente } from 'src/app/model/cliente-model';
import { I18nPluralPipe } from '@angular/common';
import { MessagingService } from 'src/app/services/messaging-service.ts.service';

@Component({
  selector: 'app-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.css']
})

export class SimpleListComponent implements OnInit {

  clientChamado: Cliente = {
    "setor":"",
    "name": "",
    "service": "",
    "timestamp": new Date (),
    "chamado":false
  }

  listClients: Cliente[] = [];
  listHistorico: any[] = [];
  count = 0
  relogio = '';
  day
  month
  year
  timer: Date;
  myVar = setInterval(this.myDateTimer, 1000);
  santander
  alertMessage: any;
  hrChegada :Date;
  token: any;
  userId: string;
 

  constructor(public firebaseService: FirebaseService,  private messagingService: MessagingService) {
    
  }

  ngOnInit() {
    this.getClientes()
    this.myDateTimer()
     this.getClientesHistorico()


    this.userId = '941668828183';
    this.token = this.messagingService.requestPermission(this.userId)
    this.messagingService.receiveMessage()
    this.alertMessage = this.messagingService.currentMessage
   
  
  }

  getColor(setor:string){
if(setor!=''){


    switch(setor){

      case 'Pagar uma conta': return '#739E4B';
      case 'TED/DOC': return  '#5F82FF';
      case 'Dúvidas sobre os Canais': return  '#B15D85';
      case 'Falar com o Gerente': return '#7CC6D5';
      case 'Comprar maquininha GetNet' : return '#F4C137';
      case 'Comprar cartão de crédito': return '#D8232D';
      case 'Videochat Investimento': return '#F14C4C';
      case 'Usar Sala de Ações': return '#F88200';
      default:'black'
    }
  }else{
    return '#999999'
  }
  
  }

  myDateTimer() {
    this.timer = new Date();
    this.relogio = this.timer.toLocaleTimeString();
    this.day =this.timer.toLocaleDateString();
    this.santander="Santander"
    document.getElementById("relogio").innerHTML = this.relogio;
  
  }

  getClientes() {
    this.firebaseService.getClientes().subscribe(resp => {
      this.listClients = resp
      this.listClients.sort(this.compare)
    
     
 
    
    })

  }

  
  getClientesHistorico() {
    this.firebaseService.getClientesHistorico().subscribe(resp => {
      this.listHistorico = resp
      this.listHistorico.sort(this.compareTwo)
    
    })

  }

addToHistorico(client:Cliente){
  console.log(client)

  this.firebaseService.addHistorico(client, this.hrChegada)

 //@ts-ignore
 .then(this.firebaseService.deleteClient(client.id))

}


compare(a, b) {
  const genreA = a.timestamp;
  const genreB = b.timestamp;

  let comparison = 0;
  if (genreA > genreB) {
    comparison = 1;
  } else if (genreA < genreB) {
    comparison = -1;
  }
  return comparison;
}

compareTwo(a, b) {
  const genreA = b.timestamp;
  const genreB = a.timestamp;

  let comparison = 0;
  if (genreA > genreB) {
    comparison = 1;
  } else if (genreA < genreB) {
    comparison = -1;
  }
  return comparison;
}

sendToken(){
   this.token=this.messagingService.token
   console.log(this.token)


  }
}


