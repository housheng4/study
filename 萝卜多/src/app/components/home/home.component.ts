import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  
  constructor(
    private Router:Router
  ) { }

  Exit() {
    // [routerLink]="['/login']"
    this.Router.navigate(['/login'])
    // let x = sessionStorage.getItem('isLogin')
    sessionStorage.setItem('isLogin','unLogin')
  }
  
  ngOnInit() {
    
  
  }
  
  isHidden1:boolean = true;
  isHidden2:boolean = true;
  isHidden3:boolean = true;
  onClick1() {
    this.isHidden1= !this.isHidden1;
    this.isHidden2=true;
    this.isHidden3=true;
  }
  onClick2() {
    this.isHidden2= !this.isHidden2;
    this.isHidden1=true;
    this.isHidden3=true;
  }
  onClick3() {
    this.isHidden3= !this.isHidden3;
    this.isHidden2= true;
    this.isHidden1= true;
  }
  

}
