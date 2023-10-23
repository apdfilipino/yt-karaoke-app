import { Component, Input } from '@angular/core';
import { Video } from '../model/video';
import { YoutubeService } from '../service/youtube.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent {
  @Input() video: Video = {
    title: '',
    videoId: '',
    thumbnailUrl: ''
  }

  constructor(private youtubeService: YoutubeService) {}

  addToQueue() {
    this.youtubeService.addToPlaylist(this.video);
  }

  priorityAdd() {
    this.youtubeService.addToPlaylist(this.video, true);
  }
}
