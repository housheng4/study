
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': ' application/x-www-form-urlencoded ' }),
};
@Injectable({providedIn: 'root'})
export class HttpUtil {
  public HttpUtil: any;

  constructor(private modalService: NzModalService, private message: NzMessageService, private http: HttpClient) {
  }

  public post(url: string, data?: any) {
    const params = typeof (data) === 'object' && String(data) !== '[object File]' ? this.paramFormat(data) : data;
    return this.http.post(url, params, httpOptions);
  }
  public put(url: string, data?: any) {
    const params = typeof (data) === 'object' && String(data) !== '[object File]' ? this.paramFormat(data) : data;
    return this.http.put(url, params, httpOptions);
  }
  public delete(url: string, data?: any) {
    const params = typeof (data) === 'object' && String(data) !== '[object File]' ? this.paramFormat(data) : data;
    return this.http.delete(url, params);
  }
  
  // 序列化参数
  private paramFormat(data: any): string {
    let paramStr = '', name, value, subName, innerObj;
    for (name in data) {
      value = data[name];
      if (value instanceof Array) {
        for (const i of value) {
          subName = name;
          innerObj = {};
          innerObj[subName] = i;
          paramStr += this.paramFormat(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        Object.keys(value).forEach(function (key) {
          subName = name + '[' + key + ']';
          innerObj = {};
          innerObj[subName] = value[key];
          paramStr += this.paramFormat(innerObj) + '&';
        });
      } else if (value !== undefined && value !== null) {
        paramStr += encodeURIComponent(name) + '='
          + encodeURIComponent(value) + '&';
      }
    }
    return paramStr.length ? paramStr.substr(0, paramStr.length - 1) : paramStr;
  }

}

