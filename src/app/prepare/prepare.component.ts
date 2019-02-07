import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import {DataService} from '../data.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort,MatTableDataSource} from '@angular/material';
import {RiskDisplay} from '../models/riskdisplay';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { RiskPrepareDisplay } from '../models/riskpreparedisplay';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';



@Component({
  selector: 'app-prepare',
  templateUrl: './prepare.component.html',
  styleUrls: ['./prepare.component.scss']
})
export class PrepareComponent implements OnInit {
  prepareData: RiskPrepareDisplay[];
  displayedColumns = ['assetTypes', 'notApplicable','repository', 'userAssetLocation', 
  'dataOwner', 'dataCustodian', 'actions'];
  dataSource = new MatTableDataSource<RiskPrepareDisplay>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public httpClient: HttpClient,public dataService: DataService,private route:ActivatedRoute, private router:Router) { }


  ngOnInit() {
    this.dataService.getAllPreparePageData().subscribe( data => {
      this.dataSource.data = data;
    });
    this.dataSource.paginator = this.paginator;
    console.log("this.prepareData ",this.prepareData);
  }

  

  sendMeRAHome(){
    this.router.navigate(['riskassessmenthome']);
 }


}
