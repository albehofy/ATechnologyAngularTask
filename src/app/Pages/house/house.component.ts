import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreStepComponent } from '../../Components/pre-step/pre-step.component';
import { ProbComponent } from '../../Components/prob/prob.component';
import { SelectionComponent } from '../../Components/selection/selection.component';
import { SubmissionComponent } from '../../Components/submission/submission.component';

@Component({
  selector: 'app-house',
  standalone: true,
  imports: [PreStepComponent, ProbComponent, SelectionComponent, SubmissionComponent, CommonModule],
  templateUrl: './house.component.html',
  styleUrl: './house.component.css'
})
export class HouseComponent {
  // Intializing Data
  houseData: any = {
    process: 'start',
    progress: '10%'
  }

  // Checking Seesion Storage If Empty or not
  ngOnInit(): void {
    if (sessionStorage.getItem('houseData')) {
      let houseDataJson = sessionStorage.getItem('houseData') || '';
      this.houseData = JSON.parse(houseDataJson);
    }
  }

  // Adding Data From Child To Parent With Event 
  getingHouseData($event: any) {
    this.houseData = Object.assign(this.houseData, $event);
    sessionStorage.setItem('houseData', JSON.stringify(this.houseData))
  }

  // Reset Data and go to first Step After logout
  finshingProccess($event: any) {
    this.houseData = $event;
  }
}
