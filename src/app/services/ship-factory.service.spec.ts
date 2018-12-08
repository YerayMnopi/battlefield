import { TestBed, inject } from '@angular/core/testing';

import { ShipFactoryService } from './ship-factory.service';
import { UtilsService } from './utils.service';

describe('ShipFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShipFactoryService, UtilsService]
    });
  });

  it('should be created', inject([ShipFactoryService], (service: ShipFactoryService) => {
    expect(service).toBeTruthy();
  }));

  it('should create a ship', inject([ShipFactoryService], (service: ShipFactoryService) => {
    expect(service.createSmall()).toBeTruthy();
  }));

  it('should create a small ship', inject([ShipFactoryService], (service: ShipFactoryService) => {
    expect(service.createSmall().dimensions.width).toBeGreaterThanOrEqual(service.smallRange[0]);
    expect(service.createSmall().dimensions.width).toBeLessThanOrEqual(service.smallRange[1]);
  }));
});
