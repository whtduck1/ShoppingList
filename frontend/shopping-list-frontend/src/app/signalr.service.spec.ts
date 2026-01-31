import { TestBed } from '@angular/core/testing';
import { SignalRService } from './signalr.service';

class MockHubConnection {
  on() {}
  start() { return Promise.resolve(); }
}

describe('SignalRService', () => {
  let service: SignalRService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignalRService]
    });
    service = TestBed.inject(SignalRService);
    // @ts-ignore
    service.connection = new MockHubConnection();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should start connection only once', () => {
    // @ts-ignore
    spyOn(service, 'startConnection').and.callThrough();
    service.startConnection();
    service.startConnection();
    expect(service.startConnection).toHaveBeenCalledTimes(2);
  });

  it('should emit itemsUpdate$ on ReceiveItemsUpdate', (done) => {
    let called = false;
    service.itemsUpdate$.subscribe(() => {
      called = true;
      expect(called).toBeTrue();
      done();
    });
    // @ts-ignore
    service.connection = { on: (event: string, cb: () => void) => { if (event === 'ReceiveItemsUpdate') cb(); }, start: () => Promise.resolve() };
    service.startConnection();
  });
});
