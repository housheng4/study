import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddarticleComponent } from '../addarticle/addarticle.component';
import { HomeComponent } from './home.component';
import { MyArticleComponent } from '../my-article/my-article.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { AuthGuard } from '../../auth/auth.guard';


const routes: Routes = [
  {
    path:'home',component:HomeComponent,canActivate:[AuthGuard],
    children:[
        {path:'article',component:MyArticleComponent,canActivate:[AuthGuard]},
        {path:'addarticle',component:AddarticleComponent,canActivate:[AuthGuard]},
        {path:'welcome',component:WelcomeComponent,canActivate:[AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class HomeRoutingModule { }
