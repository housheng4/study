import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpUtil } from './common-service.service';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(
    public http: HttpClient,
    private Httpss:HttpUtil
  ) { }
  
  getData(params): Observable<any> {//数据列表
    return this.http.get("/a/article/search",{params:params},)
   }

  getID(id): Observable<any> {//获取单个数据
    return this.http.get(`a/article/${id}`)
  }

  changeContentStatus(id,status): Observable<any> {//改变上下架状态

    return this.Httpss.put( `/a/u/article/status?id=${id}&status=${status}`)
  }


  add(params) {//新增内容
    return this.Httpss.post("a/u/article",params)
  }
  
  change(id,params) {//编辑内容

    return this.Httpss.put(`a/u/article/${id}`,params)
  }

  delete(id) {//删除数据
    return this.Httpss.delete(`/a/u/article/${id}`)
  }

  load(params) {
    return this.Httpss.post(`a/login`,params)
  }

  

  
}
