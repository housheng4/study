import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ShareModule } from "./share/share.module";
// import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
// import { HomeComponent } from './components/home/home.component';
// import { LoginComponent } from './components/login/login.component';
// import { ArticleComponent } from './components/article/article.component';
// import { StrLengthPipe } from './components/article/str-length.pipe';
// import { StrLengthstatusPipe } from './components/article/str-lengthstatus.pipe';
// import { WelcomeComponent } from './components/welcome/welcome.component';
// import { AddarticleComponent } from './components/addarticle/addarticle.component';

// import { registerLocaleData } from '@angular/common';
// import zh from '@angular/common/locales/zh';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { NgZorroAntdModule,NZ_I18N,zh_CN  } from 'ng-zorro-antd';
// import { NzFormModule } from 'ng-zorro-antd/form';
// import { FenyeComponent } from './components/fenye/fenye.component';
// import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { MyArticleComponent } from './components/my-article/my-article.component';
// import { HomeModule } from './components/home/home.module';

// registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
    // HomeComponent,
    // LoginComponent,
    // ArticleComponent,
    // StrLengthPipe,
    // StrLengthstatusPipe,
    // WelcomeComponent,
    // AddarticleComponent,
    // FenyeComponent,
    // MyArticleComponent,
  ],
  imports: [
    BrowserModule,
    ShareModule,
    // HomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // NgZorroAntdModule,
    // FormsModule,
    // NzFormModule,
    // ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    // CookieService,
    // { provide: NZ_I18N, useValue: zh_CN },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
