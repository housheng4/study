import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MyArticleComponent } from '../my-article/my-article.component';
import { ShareModule } from '../../share/share.module';

import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { AddarticleComponent } from '../addarticle/addarticle.component';
import { WelcomeComponent } from '../welcome/welcome.component';


@NgModule({
  declarations: [
    MyArticleComponent,
    AddarticleComponent,//
    WelcomeComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShareModule,
    FormsModule
  ]
})
export class HomeModule { }
