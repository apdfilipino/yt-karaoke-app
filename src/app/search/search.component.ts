import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Video } from '../model/video';
import { YoutubeService } from '../service/youtube.service';
import { SearchListState } from '../video-store/search.reducers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchQuery: string = "";
  videos: Observable<Video[]>;

  constructor(private youtubeService: YoutubeService) {
    this.videos = this.youtubeService.getVideos().pipe(map((y: SearchListState) => y.videos));
  }
}
