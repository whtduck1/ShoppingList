import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShoppingService, ShoppingItem } from './shopping.service';

describe('ShoppingService', () => {
  let service: ShoppingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShoppingService]
    });
    service = TestBed.inject(ShoppingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch items', () => {
    const mockItems: ShoppingItem[] = [
      { id: 1, name: 'Milk', isBought: false }
    ];
    service.getItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].name).toBe('Milk');
    });
    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });

  it('should add item', () => {
    const newItem: ShoppingItem = { name: 'Bread', isBought: false };
    service.addItem(newItem).subscribe(item => {
      expect(item.name).toBe('Bread');
    });
    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush({ ...newItem, id: 2 });
  });

  it('should update item', () => {
    const item: ShoppingItem = { id: 1, name: 'Eggs', isBought: true };
    service.updateItem(item).subscribe(updated => {
      expect(updated.isBought).toBe(true);
    });
    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(item);
  });

  it('should delete item', () => {
    service.deleteItem(1).subscribe(result => {
      expect(result).toBeUndefined();
    });
    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
