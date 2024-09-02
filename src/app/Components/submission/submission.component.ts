import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-submission',
  standalone: true,
  imports: [],
  templateUrl: './submission.component.html',
  styleUrl: './submission.component.css'
})
export class SubmissionComponent {
  @ViewChild('completeImage', { static: false }) imageElement!: ElementRef;
  progress: number = 0;
  @Output() houseData: EventEmitter<{}> = new EventEmitter();
  ngAfterViewInit() {
    let a: any;
    a = setInterval(() => {
      if (this.progress < 101) {
        this.progress++;
      } else {
        clearInterval(a);
        setTimeout(() => {
          this.handleImage();
          // this.houseData.emit({
          //   progress: '100%',
          // })
        }, 2000)
      }
    }, 50)

  }

  logout(): void {
    sessionStorage.clear();
    this.houseData.emit({
      process: 'start',
      progress: '10%',
    })
  }

  handleImage() {
    if (this.imageElement) {
      this.imageElement.nativeElement.childNodes[0].src = '/assets/images/complete.png';
      this.imageElement.nativeElement.classList.add('complete')
      console.log(this.imageElement)

    } else {
      console.warn('Image element is not yet available.');
    }
  }

}
