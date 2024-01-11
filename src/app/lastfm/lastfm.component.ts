import { Component } from '@angular/core';
import { LastfmService } from '../services/places/places.service';

@Component({
  selector: 'app-lastfm',
  templateUrl: 'lastfm.component.html',
  styleUrls: ['lastfm.component.scss'],
})
export class LastfmComponent {
  artistInfo: any;

  constructor(private lastfmService: LastfmService) {}


  fetchArtistInfo(artist: string) {
    this.lastfmService.getArtistInfo(artist).subscribe((data) => {
      this.artistInfo = data;
      console.log(data);
    });
  }
}