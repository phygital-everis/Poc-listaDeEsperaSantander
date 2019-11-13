import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente-model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private clientes: Observable<Cliente[]>;
  private historicoCollection: AngularFirestoreCollection<Cliente>;
  private clienteCollection: AngularFirestoreCollection<Cliente>;
  private historico: Observable<Cliente[]>;

  constructor(private afs: AngularFirestore) {
    this.clienteCollection = this.afs.collection<Cliente>('clientes');
    this.historicoCollection = this.afs.collection<Cliente>('historico');

    this.clientes = this.clienteCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  
  this.historico = this.historicoCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );

}

  updateClientTime(client: Cliente): Promise<void> {
    return this.clienteCollection.doc(client.id).update({ timestamp: client.timestamp });
  }

  getClientes(): Observable<Cliente[]> {
    return this.clientes;
  }

  getClientesHistorico(): Observable<Cliente[]>  {
    return this.historico;
  }

  getCliente(id: string): Observable<Cliente> {
    return this.clienteCollection.doc<Cliente>(id).valueChanges().pipe(
      take(1),
      map(cliente => {
        cliente.id = id;
        return cliente;
      })
    );
  }

  addCliente(cliente: Cliente): Promise<DocumentReference> {
    return this.clienteCollection.add(cliente);
  }

  addHistorico(cliente: Cliente): Promise<DocumentReference> {
    return this.historicoCollection.add(cliente);
  }

  updateIdea(cliente: Cliente): Promise<void> {
    return this.clienteCollection.doc(cliente.id).update({ name: cliente.name });
  }

  deleteIdea(id: string): Promise<void> {
    return this.clienteCollection.doc(id).delete();
  }
  
  deleteClient(id: string): Promise<void> {
    return this.clienteCollection.doc(id).delete();
  }
}
