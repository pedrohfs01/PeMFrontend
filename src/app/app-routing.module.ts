import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'imagens/:id',
    loadChildren: () => import('./imagens/imagens.module').then( m => m.ImagensPageModule)
  },
  {
    path: 'imagens/:id/gerenciar-usuarios',
    loadChildren: () => import('./imagens/gerenciar-usuarios/gerenciar-usuarios.module').then( m => m.GerenciarUsuariosPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'ambientes',
    loadChildren: () => import('./ambientes/ambientes.module').then( m => m.AmbientesPageModule)
  },
  {
    path: 'alterar-senha',
    loadChildren: () => import('./auth/alterar-senha/alterar-senha.module').then( m => m.AlterarSenhaModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
