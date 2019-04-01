import {Component, OnInit} from '@angular/core';
import {EventService} from './event.service';
import {GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'test-app';
  myService;
  pageSize:number=10;
  pages: Array<number>;
  gridApi: GridApi;
  gridColumnApi ;



  constructor(service: EventService) {
     this.myService = service;
  }

  gridOptions: GridOptions = {
    pagination: true,
    rowModelType: 'infinite',
    cacheBlockSize: this.pageSize,
    paginationPageSize: this.pageSize,
    enableServerSideFilter: true
  };


  columnDefs = [
    {headerName: 'ID', field: 'id'},
    {headerName: 'Created At', field: 'createdAt', sortable: true },
     {headerName: 'Type', field: 'type',filter: "agTextColumnFilter", sortable: true},
    {headerName: 'Source', field: 'source',sortable: true},
    {headerName: 'Details', field: 'details',sortable:true}
  ];


dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      console.log(params);

      const valParam = <IValueParam> {
        startRow : params.startRow,
        pageSize : this.pageSize,
      }
/*      let valParam = {
         startRow : params.startRow,
         pageSize : this.pageSize,
        paramValue?: null,
        paramOperator?: null
     } */
     if(params.filterModel.type) {
        valParam.paramValue = params.filterModel.type.filter;
        valParam.paramOperator = params.filterModel.type.type;
     }
      this.myService.getEventList(valParam)
        .subscribe( response => {
       //   console.log(response);
          params.successCallback(
            response.content,
            response.totalElements
          );
        });
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDatasource(this.dataSource);
  }

}

export interface IValueParam {
  startRow: number,
  pageSize: number,
  paramValue?: string,
  paramOperator?: string
}
