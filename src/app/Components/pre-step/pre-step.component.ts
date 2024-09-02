import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pre-step',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './pre-step.component.html',
  styleUrl: './pre-step.component.css'
})
export class PreStepComponent {
  choise:string = '';
  projectName:string = 'اسم مشروع مقترح'
  @Output() howToChoiseHouse:EventEmitter<{}> = new EventEmitter(); 

  goToNextLevel(){
    this.howToChoiseHouse.emit({
      process:'level2',
      howToChoiseHouse:this.choise, 
      projectName: this.projectName, 
      progress:'25%',
    }); 
  }
}
