import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Media } from '../interfaces/media';

@Injectable({
  providedIn: 'root'
})
export class MediaListService {
  readonly mediaData = [
    {
      id: 1,
      title: 'img 1',
      type: 'image',
      timestamp: 234234
    },
    {
      id: 2,
      title: 'img 2',
      type: 'image',
      timestamp: 231234
    },
    {
      id: 3,
      title: 'img 3',
      type: 'image',
      timestamp: 234236
    },
    {
      id: 4,
      title: 'doc 1',
      type: 'document',
      timestamp: 344234
    },
    {
      id: 5,
      title: 'doc 2',
      type: 'document',
      timestamp: 234265
    },
    {
      id: 6,
      title: 'doc 3',
      type: 'document',
      timestamp: 274234
    },
    {
      id: 7,
      title: 'vid 1',
      type: 'video',
      timestamp: 234114
    },
    {
      id: 8,
      title: 'vid 2',
      type: 'video',
      timestamp: 235234
    },
    {
      id: 9,
      title: 'vid 3',
      type: 'video',
      timestamp: 434234
    },
    {
      id: 10,
      title: 'aud 1',
      type: 'audio',
      timestamp: 5
    },
    {
      id: 11,
      title: 'aud 2',
      type: 'audio',
      timestamp: 236234
    },
    {
      id: 12,
      title: 'aud 3',
      type: 'audio',
      timestamp: 334233
    }
  ];

  constructor(private http: HttpClient) {}

  getMediaItems(): Observable<Array<Media>> {
    return of(this.mediaData).pipe();
  }
}
