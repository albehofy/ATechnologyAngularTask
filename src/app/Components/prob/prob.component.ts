import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-prob',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './prob.component.html',
  styleUrl: './prob.component.css'
})
export class ProbComponent {

  locationFirstStep!: boolean;
  location: string = '';
  houseType: string = '';

  @Output() howToChoiseHouse: EventEmitter<{}> = new EventEmitter();
  // intial Value
  headerAddress: string = 'أختر المكان المفضل لسكنك';

  // check if localstorage contain data to add it i fit's existed
  // to change level If Founded
  ngOnInit(): void {
    if (sessionStorage.getItem('level2-next-step')) {
      this.locationFirstStep = JSON.parse(sessionStorage.getItem('level2-next-step') || '');
      this.location = JSON.parse(sessionStorage.getItem('location') || '');
    } else {
      this.locationFirstStep = true;
    }
  }

  // addimg data to session storage to be founded if page reloaded 
  goToNextStep(): void {
    this.locationFirstStep = false;

    // updating session storage
    sessionStorage.setItem('location', JSON.stringify(this.location));
    sessionStorage.setItem('level2-next-step', JSON.stringify(this.locationFirstStep))
    sessionStorage.setItem('progress', '40%');

    // update values and sending it to parent 
    this.headerAddress = 'أختر نوع المنزل'
    this.howToChoiseHouse.emit({
      progress: '40%',
      howToChoiseHouse: this.location,
    });
  }

  // go to next Level and emitting value from first component to parent 
  goToNextLevel(): void {
    this.howToChoiseHouse.emit({
      process: 'level3',
      howToChoiseHouse: this.location,
      housetype: this.houseType,
      progress: '60%',
    });
  }

  backToPrev() {
    if (!this.locationFirstStep) {
      // adding locationFirstStep to true to go to next component
      this.locationFirstStep = true;
      sessionStorage.setItem('level2-next-step', JSON.stringify(this.locationFirstStep));
      // sending value to parent component to set progress 25%
      this.howToChoiseHouse.emit({
        progress: '25%'
      });
    } else {
      // Back to first
      this.close()
    }
  }

  // back to first step and clear all data and clear session storage 
  close(): void {
    sessionStorage.clear();
    this.howToChoiseHouse.emit({
      process: 'start',
      progress: '10%'
    });
  }
}
