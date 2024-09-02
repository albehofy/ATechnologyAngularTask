import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css'
})
export class SelectionComponent {
  selectionFirstStep!: boolean;

  shortDesc!: string;
  longDesc!: string;
  design:string='';

  @Output() howToChoiseHouse: EventEmitter<{}> = new EventEmitter();

  ngOnInit(): void {
    if (sessionStorage.getItem('level3-next-step')) {
      this.selectionFirstStep = JSON.parse(sessionStorage.getItem('level3-next-step') || '');
      this.shortDesc = JSON.parse(sessionStorage.getItem('shortDesc') || '');
      this.longDesc = JSON.parse(sessionStorage.getItem('longDesc') || '');
      
    } else {
      this.selectionFirstStep = true;
      this.shortDesc = 'فيلا قريبة من التجمع الخامس';
      this.longDesc = `عزيزي [اسم العميل]،
نحن في [اسم الشركة] نسعى دائمًا لتقديم أفضل الحلول التي تلبي احتياجاتك وتجعل حياتك أسهل. لذلك، يسعدنا أن نعلن عن إطلاق ميزات جديدة ومثيرة في منصتنا!
ما الجديد؟
ميزة X: التي تتيح لك [وصف مختصر للميزة وفائدتها].
ميزة Y: لتمكينك من [وصف مختصر للميزة وفائدتها].
ميزة Z: التي تساعدك على [وصف مختصر للميزة وفائدتها].
لماذا تختار [اسم الشركة]؟
خدمة عملاء متميزة: نحن هنا لدعمك على مدار الساعة.
أسعار تنافسية: احصل على أفضل قيمة مقابل ما تدفعه.
أمان وثقة: نحن نحافظ على سرية معلوماتك وأمانها.
عرض خاص! احصل على خصم بنسبة [نسبة الخصم]% عند استخدام الكود NEWFEATURES أثناء عملية الشراء. العرض ساري حتى [تاريخ انتهاء العرض].
لا تفوت الفرصة! انقر هنا للاكتشاف الآن: [رابط الموقع]
إذا كان لديك أي استفسارات أو تحتاج إلى مساعدة، لا تتردد في الاتصال بنا على [بيانات الاتصال].
شكرًا لاختيارك [اسم الشركة]. نحن نتطلع إلى خدمتك وتقديم أفضل تجربة ممكنة لك.
مع أطيب التحيات، فريق [اسم الشركة]`

    }
  }

  goToNextLevel() {
    this.howToChoiseHouse.emit({
      process: 'level4',
      shortDesc: this.shortDesc,
      longDesc: this.longDesc,
      design: this.design, 
      progress:'100%',
    });
  }

  goToNextStep(): void {
    this.howToChoiseHouse.emit({
      progress:'85%',
    });
    this.selectionFirstStep = false;
    sessionStorage.setItem('shortDesc',JSON.stringify(this.shortDesc));
    sessionStorage.setItem('longDesc',JSON.stringify(this.longDesc));
    sessionStorage.setItem('level3-next-step',JSON.stringify(this.selectionFirstStep))
  }
  
  backToPrev(){
    if(!this.selectionFirstStep){
      this.selectionFirstStep = true;
      sessionStorage.setItem('level2-next-step',JSON.stringify(this.selectionFirstStep))
    }else {
      this.howToChoiseHouse.emit({
        process:'level2',
      }); 
    }
  }
  
  close():void{
    sessionStorage.clear();
    this.howToChoiseHouse.emit({
      process:'start',

    }); 
  }
}
