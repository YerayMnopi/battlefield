import 'rxjs/add/observable/empty';
import { Observable } from 'rxjs/Observable';


export class BoardServiceStud {
  getBoardChanges(): Observable<void> {
    return Observable.empty();
  }
}
