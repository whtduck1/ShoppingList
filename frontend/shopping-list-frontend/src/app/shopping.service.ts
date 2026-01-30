import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ShoppingItem {
    id?: number;
    name: string;
    isBought: boolean;
}

@Injectable({ providedIn: 'root' })
export class ShoppingService {
    private apiUrl = 'http://localhost:XXXX/api/shopping'; // Ustaw właściwy port

    constructor(private http: HttpClient) { }

    getItems(): Observable<ShoppingItem[]> {
        return this.http.get<ShoppingItem[]>(this.apiUrl);
    }

    addItem(item: ShoppingItem): Observable<ShoppingItem> {
        return this.http.post<ShoppingItem>(this.apiUrl, item);
    }

    updateItem(item: ShoppingItem): Observable<ShoppingItem> {
        const url = `${this.apiUrl}/${item.id}`;
        return this.http.put<ShoppingItem>(url, item);
    }

    deleteItem(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}
