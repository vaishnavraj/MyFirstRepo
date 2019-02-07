import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { BGBean } from '../models/bgbean';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-riskcompliance',
  templateUrl: './riskcompliance.component.html',
  styleUrls: ['./riskcompliance.component.scss']
})
export class RiskcomplianceComponent implements OnInit {
  bgnames: BGBean[];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllBGNames().subscribe( data => {
      this.bgnames = data;
    });
  }

}
