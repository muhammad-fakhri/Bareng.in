import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Data } from './datasource';
import 'rxjs/add/operator/map';

@Injectable()
export class Servers {

  constructor(public http: Http,public datasource: Data) {}

  getData(){

    return this.http.get('http://localhost:8000/park-lot/get')
    .map(res => res);
 
  }

  create(item):any {
    let result:any;
    let headers = new Headers();
    
    headers.append('Content-Type','application/json');

    let option = new RequestOptions({headers: headers});

    this.http.post('http://localhost:8000/api/park-lot/create',JSON.stringify(item),option)
    .map(res => res )
    .subscribe(data =>{
          //console.log(data);  
          // this.datasource.source.push(data.json());
     });

    //return result;
  }

  update(item):any {
    let result:any;
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    this.http.put('http://localhost:8000/api/park-lot/update',JSON.stringify(item), { headers: headers })
    .map(res => res)
    .subscribe(data =>{
          result = data;  
     });

    return result;
  }


  delete(item):any {
    let result:any;
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    this.http.delete('http://localhost:8000/api/park-lot/delete/'+item,{headers: headers})
    .map(res => res)
    .subscribe(data =>{
          result = data;  
     });

    return result;
  }

}