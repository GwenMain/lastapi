import { Component } from '@angular/core';
import { LastfmService } from '../services/places/places.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  artistInfo: any;
  similarArtists: any[] = [];
  topTracks: any[] = [];
  artistTags: any[] = [];
  playcount: number = 0;
  listeners: number = 0;
  topAlbums: any[] = [];
  albumImages: { [albumId: string]: string } = {};
  bioExpanded: boolean = false;
  searchQuery: string = '';
  topArtists: any[] = [];
  overallTopTracks: any[] = [];
  showTopTracks: boolean = true;
  showTopArtists: boolean = true;


  constructor(private lastfmService: LastfmService) { }

  searchArtist() {
    if (this.searchQuery.trim() !== '') {
      this.clearResults();
      this.fetchLastfmData(this.searchQuery);
    }
  }



  ngOnInit() {
    this.fetchTopArtists();
    this.fetchOverallTopTracks();
  }

  fetchTopArtists() {
    this.lastfmService.getTopArtists().subscribe(
      (data) => {
        console.log('Top Artists Data:', data);
        if (data && data.artists && data.artists.artist) {
          this.topArtists = data.artists.artist.slice(0, 5);
        } else {
          console.error('Invalid data structure:', data);
        }
      },
      (error) => {
        console.error('Error fetching top artists:', error);
      }
    );
  }

  fetchOverallTopTracks() {
    this.lastfmService.getOverallTopTracks().subscribe(
      (data) => {
        console.log('Overall Top Tracks Data:', data);

        // Check if the necessary properties exist in the API response
        if (data && data.tracks && data.tracks.track) {
          this.overallTopTracks = data.tracks.track.slice(0, 5);
        } else {
          console.error('Invalid data structure:', data);
        }
      },
      (error) => {
        console.error('Error fetching overall top tracks:', error);
      }
    );
  }


  hideOverallTopArtists(){
    this.showTopArtists = false;
  }

  showOverallTopArtists() {
    this.showTopArtists = true;
  }

  hideOverallTopTracks() {
    this.showTopTracks = false;
  }

  showOverallTopTracks() {
    this.showTopTracks = true;
  }

  getArtistUrl(artist: any): string {
    return artist.url;
  }

  clearResults() {
    this.artistInfo = null;
    this.similarArtists = [];
    this.topTracks = [];
    this.artistTags = [];
    this.playcount = 0;
    this.listeners = 0;
    this.topAlbums = [];
    this.albumImages = {};
    this.bioExpanded = false;
    this.showOverallTopTracks();
    this.showOverallTopArtists();
  }

  encodeArtistName(name: string): string {
    console.log("URICOM", encodeURIComponent(name))
    return encodeURIComponent(name);
  }

  fetchLastfmData(artist: string) {
    this.lastfmService.getArtistInfo(artist).subscribe((data) => {
      this.artistInfo = data.artist;
      this.hideOverallTopTracks();
      this.hideOverallTopArtists();
      console.log("INFO: ", this.artistInfo);

      if (this.artistInfo && this.artistInfo.mbid) {
        this.lastfmService.getSimilar(this.artistInfo.mbid).subscribe((similarData) => {
          this.similarArtists = similarData.similarartists.artist.slice(0, 5);
        });

        this.lastfmService.getTopTracks(this.artistInfo.mbid).subscribe((topTracksData) => {
          this.topTracks = topTracksData.toptracks.track.slice(0, 5);
          console.log("INFO: ", this.artistInfo);
        });

        this.lastfmService.getArtistTags(this.artistInfo.name).subscribe((tagsData) => {
          this.artistTags = tagsData.toptags.tag.slice(0, 5);
        });

        this.lastfmService.getTopAlbums(this.artistInfo.mbid).subscribe((topAlbumsData) => {
          this.topAlbums = topAlbumsData.topalbums.album.slice(0, 5);
          console.log("Album info: ", this.topAlbums);
        });

        this.lastfmService.getPlaycount(this.artistInfo.name).subscribe((playcount) => {
          this.playcount = playcount;
        });

        this.lastfmService.getListeners(this.artistInfo.name).subscribe((listeners) => {
          this.listeners = listeners;
        });
      }
    });
  }

  toggleBio() {
    this.bioExpanded = !this.bioExpanded;
  }
}
