import { TestBed, inject } from '@angular/core/testing';

import { PlayerFactoryService } from './player-factory.service';
import { Player } from '../models/player';

describe('PlayerFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerFactoryService]
    });
  });

  it('should be created', inject([PlayerFactoryService], (service: PlayerFactoryService) => {
    expect(service).toBeTruthy();
  }));


  it('should create a player', inject([PlayerFactoryService], (service: PlayerFactoryService) => {
    const player: Player = service.create('Pepito');
    expect(player).toBeTruthy();
  }));
});
