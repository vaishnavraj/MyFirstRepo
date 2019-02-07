import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {RiskDisplay} from './models/riskdisplay';
import {BGBean} from './models/bgbean';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { RiskPrepareDisplay } from './models/riskpreparedisplay';

@Injectable()
export class DataService {
  private readonly API_URL = 'https://wwwin-iap-stage.cisco.com/IAP/v1/getRiskAssessmentDataForProduct?buName=%21P+%26+G+%7E%21%40%23%24%25%5E%26*%28%29_%2B%7B%7D%7C%3A%22%3C%3E%3F%60-%3D%5B%5D%5C%3B%27%2C.%2F&portfolioName=!P%20%26%20G%20~!%40%23%24%25%5E%26*()_%2B%7B%7D%7C%3A%22%3C%3E%3F%60-%3D%5B%5D%5C%3B%27%2C.%2F_1&productName=!P%20%26%20G%20~!%40%23%24%25%5E%26*()_%2B%7B%7D%7C%3A%22%3C%3E%3F%60-%3D%5B%5D%5C%3B%27%2C.%2F1';
  private readonly API_URL_BG='https://wwwin-iap-stage.cisco.com/IAP/v1/getRoleAndBU?userId=rajusha&pmo=true&showAll=false';
  private readonly API_URL_PREPARE_PAGE='https://wwwin-iap-stage.cisco.com/IAP/v1/dataDisplayForRisk?buName=%21P+%26+G+%7E%21%40%23%24%25%5E%26*%28%29_%2B%7B%7D%7C%3A%22%3C%3E%3F%60-%3D%5B%5D%5C%3B%27%2C.%2F&portfolioName=!P%20%26%20G%20~!%40%23%24%25%5E%26*()_%2B%7B%7D%7C%3A%22%3C%3E%3F%60-%3D%5B%5D%5C%3B%27%2C.%2F_1&productName=!P%20%26%20G%20~!%40%23%24%25%5E%26*()_%2B%7B%7D%7C%3A%22%3C%3E%3F%60-%3D%5B%5D%5C%3B%27%2C.%2F1';


  dataChange: BehaviorSubject<RiskDisplay[]> = new BehaviorSubject<RiskDisplay[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): RiskDisplay[] {
    return this.dataChange.value;
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

  public getAllPreparePageData(){
    console.log(" getAllPreparePageData got called");
    return this.httpClient.get<RiskPrepareDisplay[]>(this.API_URL_PREPARE_PAGE);
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




