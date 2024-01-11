import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LastfmService {
  private apiKey = '9ba1e120fd84d676245fced0e6e6ce23';
  private apiUrl = 'http://ws.audioscrobbler.com/2.0/';

  constructor(private http: HttpClient) { }

  getArtistTags(artist: string): Observable<any> {
    const method = 'artist.getTopTags';
    const url = `${this.apiUrl}?method=${method}&artist=${artist}&api_key=${this.apiKey}&format=json`;

    return this.http.get(url);
  }

  getArtistInfo(artist: string): Observable<any> {
    const method = 'artist.getinfo';
    const url = `${this.apiUrl}?method=${method}&artist=${artist}&api_key=${this.apiKey}&format=json`;

    return this.http.get(url);
  }

  getSimilar(artistId: string): Observable<any> {
    const params = `?method=artist.getSimilar&mbid=${artistId}&api_key=${this.apiKey}&format=json`;
    const url = `${this.apiUrl}${params}`;

    return this.http.get(url);
  }

  getTopTracks(artistId: string): Observable<any> {
    const params = `?method=artist.getTopTracks&mbid=${artistId}&api_key=${this.apiKey}&format=json`;
    const url = `${this.apiUrl}${params}`;

    return this.http.get(url);
  }


  getPlaycount(artist: string): Observable<any> {
    const method = 'artist.getinfo';
    const url = `${this.apiUrl}?method=${method}&artist=${artist}&api_key=${this.apiKey}&format=json`;

    return this.http.get(url).pipe(map((data: any) => data.artist.stats.playcount));
  }


  getListeners(artist: string): Observable<any> {
    const method = 'artist.getinfo';
    const url = `${this.apiUrl}?method=${method}&artist=${artist}&api_key=${this.apiKey}&format=json`;

    return this.http.get(url).pipe(map((data: any) => data.artist.stats.listeners));
  }

  getTopAlbums(artistId: string): Observable<any> {
    const params = `?method=artist.getTopAlbums&mbid=${artistId}&api_key=${this.apiKey}&format=json`;
    const url = `${this.apiUrl}${params}`;

    return this.http.get(url);
  }



  getTopArtists(): Observable<any> {
    const method = 'chart.getTopArtists';
    const url = `${this.apiUrl}?method=${method}&api_key=${this.apiKey}&format=json`;

    return this.http.get(url);
  }


  getOverallTopTracks(): Observable<any> {
    const method = 'chart.getTopTracks';
    const url = `${this.apiUrl}?method=${method}&api_key=${this.apiKey}&format=json`;

    return this.http.get(url);
  }

}


