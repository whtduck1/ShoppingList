
import { Component, OnInit } from '@angular/core';
import { ShoppingService, ShoppingItem } from './shopping.service';
import { SignalRService } from './signalr.service';



@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss'],
    standalone: false
})
export class ShoppingListComponent implements OnInit {
    newItemName = '';
    items: ShoppingItem[] = [];

    constructor(
        private shoppingService: ShoppingService,
        private signalRService: SignalRService
    ) { }

    ngOnInit() {
        this.loadItems();
        this.signalRService.startConnection();
        this.signalRService.itemsUpdate$.subscribe(() => {
            this.loadItems();
        });
    }

    loadItems() {
        this.shoppingService.getItems().subscribe({
            next: items => this.items = items,
            error: err => console.error('Błąd pobierania listy', err)
        });
    }

    addItem() {
        if (this.newItemName.trim()) {
            const newItem: ShoppingItem = {
                name: this.newItemName,
                isBought: false
            };
            this.shoppingService.addItem(newItem).subscribe({
                next: () => {
                    this.newItemName = '';
                    this.loadItems();
                },
                error: err => console.error('Błąd dodawania', err)
            });
        }
    }

    onToggleBought(item: ShoppingItem) {
        item.isBought = !item.isBought;
        this.shoppingService.updateItem(item).subscribe({
            next: () => this.loadItems(),
            error: err => console.error('Błąd aktualizacji', err)
        });
    }

    removeItem(item: ShoppingItem) {
        if (item.id) {
            this.shoppingService.deleteItem(item.id).subscribe({
                next: () => this.loadItems(),
                error: err => console.error('Błąd usuwania', err)
            });
        }
    }
}
