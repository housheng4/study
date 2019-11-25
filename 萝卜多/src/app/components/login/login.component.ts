import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { Router, RouterModule, ActivatedRoute,NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  
  public error:boolean = false
  constructor(
    private fb:FormBuilder,
    private article:ArticleService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    delete this.validateForm.value.remember
    let params = this.validateForm.value;
    this.article.load(params).subscribe((res:any)=> {
      if (res.code === 0) {
        console.log(res)
        let isLogin = "isLogin"
        sessionStorage.setItem('isLogin',isLogin)
        this.router.navigate(['/home/welcome']);
      } else {
        this.error = true
      }
    })
  }

  ngOnInit(): void {  
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      pwd: [null, [Validators.required]],
      remember: [true]
    });
  }

}
