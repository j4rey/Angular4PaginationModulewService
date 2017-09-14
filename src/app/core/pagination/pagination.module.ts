import { PagingData } from './pagingdata.model';
import { PaginationComponent } from './pagination.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/*
Need to declare current-page, number-of-items-to-fetch, total-number-of-items, number-of-paging-number
    maxNumberofPaginationToShow
    private _page: number = 1;
    private _fetchrows: number = 10;
    private _total: number =50;

PaginationComponent injects PaginationService and calls PaginationService.paging_clicked(PagingData) method, 
which in turns emits an Event which is subcribed by Components using PagingComponents.
Components which are using PagingComponents must subscribe to OnPagingClicked event and
call the service to fetch relevant data/ create relevant data & update current page variable which is passed
as @Input() variable to PagingComponent.

Add these tag to your component.html file and set the value.
You must map the values to your component.ts file variables.
As changes in your variable would trigger the refresh of the paginations.
    <app-pagination
        [_total]="_total"
        [_currentpage]="_page"
        [_count]="_fetchrows"
        [maxNumberofPaginationToShow]="5"
    ></app-pagination>
 */

@NgModule({
    declarations:[
        PaginationComponent
    ],
    imports:[
        CommonModule,
        
    ],
    exports:[PaginationComponent]
})
export class PaginationModule{
    
}