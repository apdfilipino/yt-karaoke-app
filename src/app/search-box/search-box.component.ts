import { Component } from '@angular/core';
import { YoutubeService } from '../service/youtube.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  value: string = "";

  constructor(private youtubeService: YoutubeService) {}

  public async search() {
    const res = await this.youtubeService.searchVideo(this.value);
  }

}
