import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import {DataService} from '../data.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {RiskDisplay} from '../models/riskdisplay';
import {DataSource} from '@angular/cdk/collections';
import {AddDialogComponent} from '../dialogs/add/add.dialog.component';
import {EditDialogComponent} from '../dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete/delete.dialog.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { BGBean } from '../models/bgbean';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';


@Component({
  selector: 'app-riskassessmenthome',
  templateUrl: './riskassessmenthome.component.html',
  styleUrls: ['./riskassessmenthome.component.scss']
})
export class RiskassessmenthomeComponent implements OnInit {
  displayedColumns = ['productName', 'assetTypes', 'repository', 'userAssetLocation', 
  'dataOwner', 'dataCustodian','vulnerabilityGap','secureStatus','lastSecuredOnDate','action', 'actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  productName: string;
  bgnames: BGBean[];
  

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService,private route:ActivatedRoute, private router:Router) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
    this.exampleDatabase = new DataService(this.httpClient);
    this.dataService.getAllBGNames().subscribe( data => {
      this.bgnames = data;
    });
  }

  sendMeRiskAssessment(){
    this.router.navigate(['riskcompliance']);
  }

  refresh() {
    this.loadData();
  }

  addNew(riskDisplay: RiskDisplay) {
   // alert("Add Not Enabled");
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {riskDisplay: riskDisplay }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, productName: string, assetTypes: string, repository: string, userAssetLocation: string, 
    dataOwner: string, dataCustodian: string, vulnerabilityGap: string, secureStatus: string, lastSecuredOnDate: string, action: string) {
    
    //alert("Edit Not Enabled");
    this.productName = productName;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {productName: productName, assetTypes: assetTypes, repository: repository, userAssetLocation: userAssetLocation, 
        dataOwner: dataOwner, dataCustodian: dataCustodian, vulnerabilityGap: vulnerabilityGap, secureStatus: secureStatus, lastSecuredOnDate: lastSecuredOnDate
        , action: action}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        //const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.productName === this.productName);
        const foundIndex =1;
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, productName: string, assetTypes: string, repository: string, userAssetLocation: string) {
    //alert("Delete Not Enabled");
    this.index = i;
    this.productName = productName;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {productName: productName, assetTypes: assetTypes, repository: repository, userAssetLocation: userAssetLocation}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        //const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.productName === this.productName);
        const foundIndex =1;
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  /*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }*/



  public loadData() {
    this.exampleDatabase = new DataService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}




export class ExampleDataSource extends DataSource<RiskDisplay> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: RiskDisplay[] = [];
  renderedData: RiskDisplay[] = [];

  constructor(public _exampleDatabase: DataService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<RiskDisplay[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllRiskData();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((riskDisplay: RiskDisplay) => {
          const searchStr = (riskDisplay.productName + riskDisplay.assetTypes + riskDisplay.repository + riskDisplay.userAssetLocation+
            riskDisplay.dataOwner+riskDisplay.dataCustodian+riskDisplay.vulnerabilityGap+riskDisplay.secureStatus
            +riskDisplay.lastSecuredOnDate+riskDisplay.action).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: RiskDisplay[]): RiskDisplay[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'productName': [propertyA, propertyB] = [a.productName, b.productName]; break;
        case 'assetTypes': [propertyA, propertyB] = [a.assetTypes, b.assetTypes]; break;
        case 'repository': [propertyA, propertyB] = [a.repository, b.repository]; break;
        case 'userAssetLocation': [propertyA, propertyB] = [a.userAssetLocation, b.userAssetLocation]; break;
        case 'dataOwner': [propertyA, propertyB] = [a.dataOwner, b.dataOwner]; break;
        case 'dataCustodian': [propertyA, propertyB] = [a.dataCustodian, b.dataCustodian]; break;
        case 'vulnerabilityGap': [propertyA, propertyB] = [a.vulnerabilityGap, b.vulnerabilityGap]; break;
        case 'secureStatus': [propertyA, propertyB] = [a.secureStatus, b.secureStatus]; break;
        case 'lastSecuredOnDate': [propertyA, propertyB] = [a.lastSecuredOnDate, b.lastSecuredOnDate]; break;
        case 'action': [propertyA, propertyB] = [a.action, b.action]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}