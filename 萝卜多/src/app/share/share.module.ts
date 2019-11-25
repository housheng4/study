import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';

import { NgZorroAntdModule,NZ_I18N,zh_CN  } from 'ng-zorro-antd';

// import { NzFormModule } from 'ng-zorro-antd/form';
// import { FenyeComponent } from './components/fenye/fenye.component';
import { StrLengthPipe } from '../components/article/str-length.pipe';
import { StrLengthstatusPipe } from '../components/article/str-lengthstatus.pipe';

registerLocaleData(zh);

const components = [

];
const modules = [
  NgZorroAntdModule,
  FormsModule,
  ReactiveFormsModule,
];
const pipes = [
  StrLengthPipe,
  StrLengthstatusPipe
];
@NgModule({
  declarations: [components, pipes],
  imports: [
    CommonModule,
    modules
  ],
  providers: [FormBuilder,  { provide: NZ_I18N, useValue: zh_CN }],
  exports: [components, modules, pipes]
})
export class ShareModule { }
