import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { ArticleService } from "../../services/article.service";
import {
  Router,
  RouterModule,
  ActivatedRoute,
  NavigationEnd
} from "@angular/router";
import { element } from "protractor";
@Component({
  selector: "app-addarticle",
  templateUrl: "./addarticle.component.html",
  styleUrls: ["./addarticle.component.less"]
})
export class AddarticleComponent implements OnInit {
  industry: any;
  type: any;
  // @ViewChild ('list',{static:true}) list :any
  constructor(
    private fb: FormBuilder,
    private article: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }
  public required;
  public imgList: any = {
    img: []
  };
  // fileList
  change(e) {
    //上传图片的回调
    if (e.type == "success") {
      // console.log(e);
      // this.fileList = e
      this.imgList.img[0] = e.file.response.data;
      console.log(this.imgList);
      console.log("成功");
      console.log(this.validateForm.value.required);

      // this.validateForm.value.required = 1
      // console.log(this.validateForm.value.required);
      // this.validateForm.get('required')!.setValidators(Validators.);
      this.required = 1;
    } else {
      this.required = null;
    }
  }

  validateForm: FormGroup;
  navigationSubscription: any;
  id: number | string; //id来判断是新增还是编辑
  text: string; //标题

  paramseter() {
    //判断编辑还是新增
    this.route.queryParams.subscribe((res: any) => {
      if (res.id != 0) {
        this.text = "编辑";
        this.id = res.id;
        this.edit();
        this.required = 1;
      } else {
        this.text = "新增";
        this.id = 0;
      }
    });
  }
  edit() {
    //编辑回显
    this.article.getID(this.id).subscribe((res: any) => {
      if (res.code == 0) {
        this.validateForm.get("title").setValue(res.data.article.title);
        this.validateForm
          .get("type")
          .setValue(res.data.article.type.toString()); //这里返回来的是数字，但是匹配需要字符串匹配，需要转成字符串
        // this.a = this.validateForm.value.type
        this.validateForm.get("content").setValue(res.data.article.content);
        this.validateForm.get("url").setValue(res.data.article.url);
        this.validateForm
          .get("industry")
          .setValue(res.data.article.industry.toString());
        //在是行业大图的时候显示行业大图的下拉框
        this.imgList.img = [{ url: res.data.article.img }];
      }
    });
  }
  //图片预览组件内置方法
  previewImage: string | undefined = ""; //图片预览
  previewVisible = false;
  handlePreview = file => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  back() {
    //返回
    this.router.navigate(["home/article"], {});
  }
  submitForm() {
    //立即上线
    let params = this.validateForm.value;
    params.status = "2";
    let createAt = new Date();
    params.createAt = createAt.valueOf(); //时间
    params.type = Number(params.type);
    params.img = this.imgList.img[0].url; //图片
    if (params.type == 3) {
      params.industry = Number(params.industry);
    } else {
      delete params.industry;
    }
    // params = JSON.stringify(params)
    if (this.id != 0) {
      //编辑
      // this.required = 1
      this.article.change(this.id, params).subscribe((res: any) => {
        console.log("编辑成功立即上线", res);
        alert("编辑成功立即上线");
        this.router.navigate(["home/article"]);
      });
    } else {
      //新增

      params.status = 2;
      delete params.createAt;
      this.article.add(params).subscribe((res: any) => {
        console.log("新增成功立即上线", res);
        alert("新增成功立即上线");
        this.router.navigate(["home/article"]);
      });
    }
  }
  submitForm2() {
    //存为草稿
    // console.log(this.fileList)
    // return
    let params = this.validateForm.value;
    params.status = "1";
    let createAt = new Date();
    params.createAt = createAt.valueOf(); //时间
    params.img = this.imgList.img[0].url; //图片
    params.type = Number(params.type);
    if (params.type == 3) {
      params.industry = Number(params.industry);
    } else {
      delete params.industry;
    }
    // params = JSON.stringify(params)
    if (this.id != 0) {
      // 编辑
      // this.required = 1
      this.article.change(this.id, params).subscribe((res: any) => {
        console.log("编辑成功存为草稿", res);
        alert("编辑成功存为草稿");
        this.router.navigate(["home/article"]);
      });
    } else {
      // 新增

      params.status = 1;
      delete params.createAt;
      this.article.add(params).subscribe((res: any) => {
        console.log("新增成功存为草稿", res);
        alert("新增成功存为草稿");
        this.router.navigate(["home/article"]);
      });
    }
  }
  idsty(e) {
    console.log(e);

    if (e == 3) {
      this.validateForm.get("industry")!.setValidators(Validators.required);
    } else {
      this.validateForm.get("industry")!.clearValidators();
    }
  }
  ngOnInit() {
    this.paramseter();
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      type: [null, [Validators.required]],
      content: [null],
      url: [null, [Validators.required]],
      status: [null],
      industry: [null], // 缺少功能：必填选项//功能完善了，通过新增一个隐藏的input添加requried属性来达到目的
      required: [null, [Validators.required]]
    });
  }
}
