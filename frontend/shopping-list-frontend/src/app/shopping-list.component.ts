import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ShoppingItem {
    id: number;
    name: string;
    isBought: boolean;
}

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})

export class ShoppingListComponent {
    newItemName = '';
    items: ShoppingItem[] = [
        { id: 1, name: 'Mleko', isBought: false },
        { id: 2, name: 'Chleb', isBought: true },
        { id: 3, name: 'Jajka', isBought: false }
    ];

    addItem() {
        if (this.newItemName.trim()) {
            this.items.push({
                id: Date.now(),
                name: this.newItemName,
                isBought: false
            });
            this.newItemName = '';
        }
    }

    toggleBought(item: ShoppingItem) {
        item.isBought = !item.isBought;
    }

    removeItem(item: ShoppingItem) {
        this.items = this.items.filter(i => i.id !== item.id);
    }
}
