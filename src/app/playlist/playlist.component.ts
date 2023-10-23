import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Video } from '../model/video';
import { YoutubeService } from '../service/youtube.service';
import { VideoState } from '../video-store/video.reducers';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
  videos: Observable<Video[]>;

  constructor(private youtubeService: YoutubeService) {
    this.videos = this.youtubeService.getPlaylist().pipe(map((y: VideoState) => y.playlist));
  }

  remove(event: any, index: number) {
    this.youtubeService.remove(event, index);
  }

  move(event: any, index: number, upDown: number) {
    this.youtubeService.move(event, index, upDown);
  }

  play(event: any, index: number) {
    this.youtubeService.play(event, index);
  }
}


