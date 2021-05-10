import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'content',
    loadChildren: () => import('./pages/content/content.module').then( m => m.ContentPageModule)
  },
  {
    path: 'editor',
    loadChildren: () => import('./pages/editor/editor.module').then( m => m.EditorPageModule)
  },
  {
    path: 'favroite',
    loadChildren: () => import('./pages/favroite/favroite.module').then( m => m.FavroitePageModule)
  },
  {
    path: 'download',
    loadChildren: () => import('./pages/download/download.module').then( m => m.DownloadPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
