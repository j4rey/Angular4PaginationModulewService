import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';

@Injectable()
export class SocialService{
    constructor(private http:Http){}

    getSocialList(page,count){
        const header = new Headers({'Content-Type':'application/json'});
        return this.http.get(environment.apiUrl+'Employee/GetList?count='+count+'&page='+page);
    }

    getNumberRows(){
        const header = new Headers({'Content-Type':'application/json'});
        return this.http.get(environment.apiUrl+'Employee/GetCount');
    }
}