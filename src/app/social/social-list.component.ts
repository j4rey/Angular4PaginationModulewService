import { PagingData } from './../core/pagination/pagingdata.model';
import { PaginationService } from './../core/pagination/pagination.service';
import {
    Component, OnInit, OnDestroy
} from '@angular/core';

import { SocialService } from './social.service';
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "social-list",
    templateUrl: './social-list.component.html',
    styleUrls: ['./social-list.component.css']
})
export class SocialListComponent implements OnInit, OnDestroy{

    pagingSubscription : Subscription;

    ngOnDestroy(): void {
        this.pagingSubscription.unsubscribe();
    }
    _page: number = 1;
    _fetchrows: number = 10;
    _total: number;
    private isCallingApi = false;

    socials = [];

    ngOnInit(): void {
        this.getData(
            new PagingData(1,10,0)
        );
    }
    constructor(private socialService: SocialService,
        private pagingService: PaginationService
    ) { 
        this.pagingSubscription = this.pagingService.OnPagingClicked.subscribe(
            (pd: PagingData)=>{
                this.getData(pd);
            }
        );
    }

    getData(pagingdata:PagingData){
        this.socialService.getSocialList(pagingdata.currentPage-1,pagingdata.countOfDataToFetch).subscribe((lst)=>{
            this.socials = lst.json().SSD;
            this._page = lst.json().currentPage+1;
            this._total  = lst.json().totalRows;
            console.log(lst.json());
            //this.pagingService.refreshPagination(pagingdata);
            this.isCallingApi = false;
        },(err)=>{
            console.log(err);
        })
    }
}