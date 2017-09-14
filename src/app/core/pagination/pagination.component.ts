import { PagingData } from './pagingdata.model';
import { PaginationService } from './pagination.service';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit
{
  
  @Input() maxNumberofPaginationToShow:number = 15;
  @Input() _total: number;
  @Input() _currentpage: number;
  @Input() _count: number;//number of rows to fetch

  constructor(private pagingService: PaginationService) { 
    // this.pagingService.refreshPaginationEvent.subscribe(
    //   (pagingdata:{page:number,count:number})=>{
    //     console.log(pagingdata);
    //     this._currentpage = pagingdata.page;
    //   }
    // );
  }

  ngOnInit() {
    //calculate maximum number of paging controls
    if(this.maxNumberofPaginationToShow%2!=1){
      this.maxNumberofPaginationToShow = this.maxNumberofPaginationToShow+1;
    }
  }

  //get page numbers in array to display as pagination
  GetPages() {
    var maxpages = this.GetMaxPage();
    var numbers: number[] = [];

    var mid = Math.ceil(this.maxNumberofPaginationToShow / 2);

    //more than mid page
    if (this._currentpage > Math.floor(this.maxNumberofPaginationToShow / 2)) {
      //towards the ending
      if (this._currentpage > (maxpages - mid)) {
        for(var i = (maxpages-this.maxNumberofPaginationToShow+1),j=0; i <= maxpages;i++,j++){
          numbers[j]=i;
        }
      }
      //in between mid
      else {
        //set first 7 page on the left decreasing from current page to page-1
        numbers[(mid-1)] = this._currentpage;
        for (var i = (mid-1), j = 1; i > 0; i-- , j++) {
          numbers[i - 1] = this._currentpage - j;
        }

        //set later 7 page on the right increasing from current page to maxPage
        for (var i = mid, j = 1; i < this.maxNumberofPaginationToShow; i++ , j++) {
          numbers[i] = this._currentpage + j;
        }
      }
    }
    //towards the front
    else {
      for (var i = 0, j = 1; i < this.maxNumberofPaginationToShow; i++ , j++) {
        numbers[i] = j;
      }
    }
    return numbers;
  }

  GoToPage(pageno) {
    this.pagingService.paging_clicked(
      new PagingData(pageno,this._count,0)
    );
  }

  GetMaxPage(){
    return  Math.ceil(this._total / this._count);
  }
}
