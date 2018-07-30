import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Slides } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController) {

  }

  @ViewChild(Slides) slides: Slides;

  dateArray: Date[];
  slideOptions: any;

  ionSlideDidChangeSubject = new BehaviorSubject<number>(0);
  ionSlideDragSubject = new BehaviorSubject<number>(0);

  onSlideDragging($event: any) {
    this.ionSlideDragSubject.next(this.ionSlideDragSubject.getValue() + 1);
    console.log('onSlideDragging', $event, this.slides.getActiveIndex());
  }

  onSlideChange($event: any): void {
    this.ionSlideDidChangeSubject.next(this.ionSlideDragSubject.getValue() + 1);
    console.log('onSlideChange', $event, this.slides.getActiveIndex());
  }

  ngOnInit(): void {
    const today = new Date();
    this.dateArray = new Array(7).fill(0).map((_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - i);
      return date;
    }).reverse();
    this.slideOptions = { initialSlide: this.dateArray.length - 1 };
  }

}
