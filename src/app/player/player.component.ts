import { Component, OnInit, ElementRef, OnChanges } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Video } from '../model/video';
import { YoutubeService } from '../service/youtube.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  
  private domElement: HTMLScriptElement | null;
  private lastPlaylist: Video[] = [];
  private lastActiveVideo: Video;

  height: number;
  width: number;
  playerVars: YT.PlayerVars = {
    autoplay: 1
  };

  activeVideo: Observable<Video>;

  constructor(private youtubeService: YoutubeService, private el: ElementRef) {
    this.height = this.el.nativeElement.offsetHeight;
    this.width = this.el.nativeElement.offsetWidth;
  }

  ngOnInit(): void {
    this.createElement();
    this.activeVideo = this.youtubeService.getPlaylist().pipe(map(v => {
      if (this.lastPlaylist.length > v.playlist.length && v.activeVideo.videoId !== this.lastActiveVideo.videoId) {
        this.resetElement();
      }
      this.lastActiveVideo = v.activeVideo;
      this.lastPlaylist = v.playlist;
      return v.activeVideo;
    }));
  }

  private resetElement() {
    if(this.domElement) {
      this.domElement.remove();
    }
    this.createElement();
  }

  private createElement() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.domElement = tag;
    this.playerVars = {
      autoplay: 1
    };
  }
}

