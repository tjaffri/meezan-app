import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { QuranService } from '../../providers/quran-service';
import { AnalyticsService } from '../../providers/analytics-service';

import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  items: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public quranService: QuranService,
    public analytics: AnalyticsService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  ionViewDidEnter() {
    this.analytics.ReportPageNavigation(this.constructor.name);
  }

  ionViewDidLoad() {
    // Load chapters list
    this.loadChapters()
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  loadChapters() {
    // Get all chapters
    this.quranService.getChapterInfoListAsync()
      .subscribe(
      chapters => this.items = chapters, // Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
  }
}
