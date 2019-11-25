import { Component, OnInit } from "@angular/core";
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
@Component({
  selector: "app-my-article",
  templateUrl: "./my-article.component.html",
  styleUrls: ["./my-article.component.less"]
})
export class MyArticleComponent implements OnInit {
  loading = true;
  validateForm: FormGroup;
  navigationSubscription: any;
  public listData: [];

  public size: number;
  data: any;
  public params = {
    size: 10,
    total: 0,
    page: 1
  };

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

  i = 1; //单纯记下数，发现初始进入页面请求了2次数据
  public getList() {
    //请求数据

    console.log(this.i++);
    let params = this.validateForm.value;
    params.startAt = params.startAt == 0 ? "" : params.startAt.valueOf();
    params.endAt =
      params.endAt == 0 ? "" : params.endAt.valueOf() + 86400000 - 1;

    this.article.getData(params).subscribe((res: any) => {
      this.listData = res.data.articleList; //数据列表articleList

      this.params.total = res.data.total; //数据总数
      this.loading = false;
    });
  }
  public reset(): void {
    //清空搜索项
    this.params.size = 10;
    this.params.page = 1;
    this.validateForm.reset(""); //表单控件重置
    this.data = this.validateForm.value;
    this.router.navigate(["home/article"], { queryParams: this.data });
  }
  search() {
    //搜索数据
    this.validateForm.value.startAt = this.validateForm.value.startAt
      ? new Date(new Date(this.validateForm.value.startAt).toLocaleDateString())
      : "";
    this.validateForm.value.endAt = this.validateForm.value.endAt
      ? new Date(new Date(this.validateForm.value.endAt).toLocaleDateString())
      : "";
    this.data = this.validateForm.value;
    this.data.startAt = this.data.startAt.valueOf()
      ? this.data.startAt.valueOf()
      : ""; //发布时间按照这一天的00：00开始计算
    this.data.endAt = this.data.endAt.valueOf()
      ? this.data.endAt.valueOf() + 86400000 - 1
      : ""; //更新时间按这一天的24：00计算这里时间戳加一天-1得到今天23:59
    this.data.page = ""; //初始化页数为‘’
    this.params.page = 1; //按下搜索键表格页数初始为1
    this.params.size = 10;
    console.log("搜索数据", this.data);
    this.router.navigate(["home/article"], {
      queryParams: this.data
    });
  }
  paging(event) {
    //页码改变
    this.validateForm.get("page").setValue(event);
    this.validateForm.value.startAt = this.validateForm.value.startAt
      ? this.validateForm.value.startAt.valueOf()
      : "";
    this.validateForm.value.endAt = this.validateForm.value.endAt
      ? this.validateForm.value.endAt.valueOf() + 86400000 - 1
      : "";
    console.log("页码改变", this.validateForm.value);
    this.router.navigate(["home/article"], {
      queryParams: this.validateForm.value
    });
  }
  sizing(e) {
    //更改每页条目数
    console.log(e);
    this.params.page = 1; //更改每页条目数时候把页数变为1
    this.validateForm.get("size").setValue(e);
    this.validateForm.value.startAt = this.validateForm.value.startAt
      ? this.validateForm.value.startAt.valueOf()
      : "";
    this.validateForm.value.endAt = this.validateForm.value.endAt
      ? this.validateForm.value.endAt.valueOf() + 86400000 - 1
      : "";
    console.log("更改每页条目数", this.validateForm.value);
    this.router.navigate(["home/article"], {
      queryParams: this.validateForm.value
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((res: any) => {
      this.validateForm = this.fb.group({
        startAt: [
          res.startAt
            ? new Date(new Date(+res.startAt).toLocaleDateString())
            : ""
        ], //发布时间按照这一天的00：00开始计算
        endAt: [
          res.endAt ? new Date(new Date(+res.endAt).toLocaleDateString()) : ""
        ], //new Date(new Date().toLocaleDateString()把时分秒全变为0
        type: [res.type || ""],
        status: [res.status || ""],
        page: [res.page || ""],
        size: [res.size || ""]
      });
    });
    this.getList();
  }

  public state(id, status) {
    // 修改状态
    this.article.changeContentStatus(id, status).subscribe((res: any) => {
      if (res.code == 0) {
        this.getList();
        setTimeout(() => {
          alert("修改成功");
        }, 500);
      } else {
        alert("失败");
      }
    });
  }
  eidt(id, status) {
    //编辑数据
    if (status == 2) {
      alert("上线状态不能编辑");
      return;
    } else {
      this.router.navigate(["home/addarticle"], {
        queryParams: {
          id: id
        }
      });
    }
  }
  delData(id, status) {
    //删除数据
    if (status == 2) {
      alert("上线状态不能删除");
      return;
    } else {
      this.article.delete(id).subscribe((res: any) => {
        console.log("删了", res);
        this.getList();
        setTimeout(() => {
          alert("删除成功");
        }, 500);
      });
    }
  }

  //时间控件
  startValue: Date | null = null;
  endValue: Date | null = null;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime(); //这里必须使用getTime使用getDate会导致之前的不在这个范围的天数还是可以选的
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  onStartChange(date: Date): void {
    this.startValue = date;
  }

  onEndChange(date: Date): void {
    this.endValue = date;
  }
}
