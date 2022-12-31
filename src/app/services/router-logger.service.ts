// import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class RouterLoggerService {
//   private httpClient:HttpClient| any = null;
//   currentUserName:string | any=null;
//   private urlPrefix: string = "";
//   constructor(private httpBackend:HttpBackend) {
   
//    }

//   public log(logMsg:string):Observable<any>{
    
//     this.httpClient=new HttpClient(this.httpBackend);
//     return this.httpClient.post(this.urlPrefix+"/api/routerlogger", { log: logMsg },{ headers: new HttpHeaders().set("content-type", "text/plain") }
//     );
//    // return this.httpClient.post("/api/routerlogger",logMsg,{headers:new HttpHeaders().set("content-type","text/plain")});
//   }
  
// }
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RouterLoggerService {
  private httpClient: HttpClient | any = null;
  currentUserName: string | null = null;
  private urlPrefix: string = '';

  constructor(private httpBackend: HttpBackend) {
  }

  public log(logMsg: string): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post(this.urlPrefix + "/api/routerlogger", { log: logMsg },
      //{ headers: new HttpHeaders().set("content-type", "text/plain") }
    );
  }
}
