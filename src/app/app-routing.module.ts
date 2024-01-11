import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LastfmComponent } from './lastfm/lastfm.component';

const routes: Routes = [
  { path: 'lastfm', component: LastfmComponent },
  { path: '', component: HomePage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/*
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page'; 
import { LastfmComponent } from './lastfm/lastfm.component'; 

const routes: Routes = [
  { path: 'lastfm', component: LastfmComponent },
  { path: '', component: HomePage },
  {
    path: 'artists',
    loadChildren: () => import('./artists/artists.module').then( m => m.ArtistsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
*/