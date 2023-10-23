import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Video } from '../model/video';
import { YoutubeService } from '../service/youtube.service';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.css']
})
export class PlaylistItemComponent {

  @Input() video: Video = {
    title: "",
    thumbnailUrl: "",
    videoId: ""
  };

  @Input() first: boolean;
  @Input() last: boolean;
  @Input() index: number;

  @Output() removeClick = new EventEmitter<Video>();
  @Output() moveUpClick = new EventEmitter<Video>();
  @Output() moveDownClick = new EventEmitter<Video>();
  @Output() playClick = new EventEmitter<Video>();

  constructor(private youtubeService: YoutubeService) {

  }

  remove() {
    this.removeClick.emit(this.video);
  }

  moveUp() {
    this.moveUpClick.emit(this.video);
  }

  moveDown() {
    this.moveDownClick.emit(this.video);
  }

  play() {
    this.playClick.emit(this.video);
  }

}
