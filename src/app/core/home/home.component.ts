import { Subscription } from 'rxjs/Subscription';
import { PagingData } from './../pagination/pagingdata.model';
import { PaginationService } from './../pagination/pagination.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  pagingSubscription : Subscription;
  ngOnDestroy(): void {
    this.pagingSubscription.unsubscribe();
  }

  AllItems: number[] = [];
  PagingData : number[]=[];

  _page: number = 1;
  _fetchrows: number = 10;
  _total: number =50;

  constructor(private pagingService: PaginationService) { 
    this.pagingSubscription = this.pagingService.OnPagingClicked.subscribe(
        (pd:PagingData)=>{
          this.fetchDisplayData(pd);
        }
    );
  }

  ngOnInit() {
    for(var i = 0;i< this._total;i++){
      this.AllItems.push(i);
    }
    this.fetchDisplayData(
      new PagingData(1,10,0)
    );
  }

  fetchDisplayData(pagingData:PagingData){
     this.PagingData = this.AllItems.slice(
       (pagingData.currentPage-1)*pagingData.countOfDataToFetch,pagingData.currentPage * pagingData.countOfDataToFetch
     );
     this._page = pagingData.currentPage;
    //this.pagingService.refreshPagination(pagingdata);
  }

}
