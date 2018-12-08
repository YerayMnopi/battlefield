import { Injectable } from '@angular/core';
import { Player } from '../models/player';

@Injectable()
export class PlayerFactoryService {

  constructor() { }

  create(name: string): Player {
    return {
      name: name,
      ships: [],
      score: 0
    };
  }
}
