import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Video } from '../model/video';
import { SetList } from '../video-store/search.actions';
import { SearchListState } from '../video-store/search.reducers';
import { Move, Play, Queue, Remove } from '../video-store/video.actions';
import { VideoState } from '../video-store/video.reducers';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
   
  constructor(private store: Store<{ searchList: SearchListState, playlist: VideoState }>, private httpClient: HttpClient) {}

  public async searchVideo(keyword: string) {
    const url = [
      'http://localhost:1026/results?search_query=',
      encodeURI(keyword),
      '&sp=EgIQAQ%253D%253D'
    ].join('');
    this.httpClient.get(url).subscribe((v: any) => {
      this.store.dispatch(new SetList({ videos: v as Video[] }));
    });
  }

  public getVideos(): Observable<SearchListState> {
    return this.store.select('searchList');
  }

  public getPlaylist(): Observable<VideoState> {
    return this.store.select('playlist');
  }

  public addToPlaylist(video: Video, isPriority?: boolean) {
    this.store.dispatch(new Queue({ video, isPriority }));
  }

  public remove(video: Video, index: number) {
    this.store.dispatch(new Remove({ video, removeIndex: index }));
  }

  public move(video: Video, index: number, upDown: number) {
    this.store.dispatch(new Move({ video, moveIndex: index, upDown }));
  }

  public play(video: Video, index: number) {
    this.store.dispatch(new Play({ video, removeIndex: index }));
  }
}
