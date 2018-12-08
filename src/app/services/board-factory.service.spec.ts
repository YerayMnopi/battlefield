import { TestBed, inject } from '@angular/core/testing';

import { BoardFactoryService } from './board-factory.service';
import { UtilsService } from './utils.service';

describe('BoardFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardFactoryService, UtilsService]
    });
  });

  it('should be created', inject([BoardFactoryService], (service: BoardFactoryService) => {
    expect(service).toBeTruthy();
  }));


  it('should create a board', inject([BoardFactoryService], (service: BoardFactoryService) => {
    expect(service.createSmall()).toBeTruthy();
  }));


});
