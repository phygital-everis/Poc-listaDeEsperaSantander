import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Cliente } from 'src/app/model/cliente-model';

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
    "hrChegada": 0,
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

  constructor(public firebaseService: FirebaseService) {
    
  }

  ngOnInit() {
    this.getClientes()
    this.myDateTimer()
  }

  myDateTimer() {
    this.timer = new Date();
    this.relogio = this.timer.toLocaleTimeString();
    this.day =this.timer.toLocaleDateString();
    this.santander="-Santander"
    document.getElementById("relogio").innerHTML = this.relogio;
    document.getElementById("day").innerHTML = this.day;
    document.getElementById("santander").innerHTML = this.santander;
  }

  getClientes() {
    this.firebaseService.getClientes().subscribe(resp => {
      this.listClients = resp
      this.listClients.sort(this.compare)
    })

  }



  compare(a, b) {
    const genreA = a.tempo;
    const genreB = b.tempo;

    let comparison = 0;
    if (genreA > genreB) {
      comparison = 1;
    } else if (genreA < genreB) {
      comparison = -1;
    }
    return comparison;
  }
}
