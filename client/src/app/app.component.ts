import { Component } from '@angular/core';
import {TaskDataService} from './services/task-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  listRefreshSwitch = false;

  constructor() {}

  refreshTaskList(): void {
    this.listRefreshSwitch = !this.listRefreshSwitch;
  }

}
