// Imports
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Chapter } from '../model/chapter';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Service to provide quran data.
*/
@Injectable()
export class QuranService {

  // private instance variable to hold base url
  private chaptersUrl = 'http://meezanapi.azurewebsites.net/v1/jwt/chapters';

  // Resolve AuthHttp using the constructor
  constructor(private http: AuthHttp) { }

  // Fetch all existing chapters
  getChapterInfoListAsync(): Observable<Chapter[]> {

    // ...using get request
    return this.http.get(this.chaptersUrl)
      // ...and calling .json() on the response to return data
      .map((res) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Fetch details about a chapter
  getChapterDetailsAsync(chapterId: number): Observable<Chapter> {

    // ...using get request
    return this.http.get(this.chaptersUrl + '/' + chapterId + '/details')
      // ...and calling .json() on the response to return data
      .map((res) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
