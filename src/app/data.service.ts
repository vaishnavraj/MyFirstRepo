import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {RiskDisplay} from './models/riskdisplay';
import {BGBean} from './models/bgbean';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataService {
  private readonly API_URL = 'https://wwwin-iap-dev.cisco.com/IAP/v1/getRiskAssessmentDataForProduct?buName=Raju+Sharma+BG1&portfolioName=Raj&productName=Alpha Beta Test 2';
  private readonly API_URL_BG='https://wwwin-iap-dev.cisco.com/IAP/v1/getRoleAndBU?userId=rajusha&pmo=true&showAll=false';


  dataChange: BehaviorSubject<RiskDisplay[]> = new BehaviorSubject<RiskDisplay[]>([]);
  bgChange: BehaviorSubject<BGBean[]> = new BehaviorSubject<BGBean[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): RiskDisplay[] {
    return this.dataChange.value;
  }

  get bgdata(): BGBean[] {
    return this.bgChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllRiskData(): void {
    this.httpClient.get<RiskDisplay[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  /** CRUD METHODS */
 

  public getAllBGNames() {
    console.log(" getAllBGNames got called");
    return this.httpClient.get<BGBean[]>(this.API_URL_BG);
  }


  // DEMO ONLY, you can find working methods below
  addIssue (riskDisplay: RiskDisplay): void {
    this.dialogData = riskDisplay;
  }

  updateIssue (riskDisplay: RiskDisplay): void {
    this.dialogData = riskDisplay;
  }

  deleteIssue (productName: string): void {
    console.log(productName);
  }
}



/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




