import { Component, OnInit } from "@angular/core";
import { IBusyConfig } from "ng-busy";
import { delay } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";
import { Observable } from "rxjs";

interface SampleUser {
  id: number;
  name: string;
  emai: string;
  phone: string;
}

@Component({
  selector: "app-sample-content",
  templateUrl: "./sample-content.component.html",
  styleUrls: ["./sample-content.component.css"]
})
export class SampleContentComponent implements OnInit {
  /**
   * ng-busyの設定です。
   */
  partialBusy: IBusyConfig = { template: LoadingSpinnerComponent };
  allBusy: IBusyConfig = { template: LoadingSpinnerComponent };

  /**
   * テーブル用の設定です。
   */
  displayedColumns: string[] = ["id", "name", "email", "phone"];
  dataSource: SampleUser[];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onPartialButtonClick() {
    const subscription = this.getUsers().subscribe(x => (this.dataSource = x));
    this.partialBusy.busy = [subscription];
  }

  onAllButtonClick() {
    const subscription = this.getUsers().subscribe(x => (this.dataSource = x));
    this.allBusy.busy = [subscription];
  }

  /**
   * サンプルユーザ情報を取得します。
   */
  getUsers(): Observable<Array<SampleUser>> {
    return this.http
      .get<Array<SampleUser>>("https://jsonplaceholder.typicode.com/users")
      .pipe(delay(2000));
  }
}
