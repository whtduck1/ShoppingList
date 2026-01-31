import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignalRService {
    private hubUrl = 'http://localhost:XXXX/shoppingHub'; // Ustaw właściwy port
    private connection: signalR.HubConnection | null = null;
    private itemsUpdateSubject = new Subject<void>();
    itemsUpdate$ = this.itemsUpdateSubject.asObservable();

    startConnection() {
        if (!this.connection) {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(this.hubUrl)
                .withAutomaticReconnect()
                .build();

            this.connection.on('ReceiveItemsUpdate', () => {
                this.itemsUpdateSubject.next();
            });

            this.connection.start().catch(err => console.error('SignalR error:', err));
        }
    }
}
