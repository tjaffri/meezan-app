import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { QuranService } from '../../providers/quran-service';
import { AnalyticsService } from '../../providers/analytics-service';

import { Verse } from '../../model/verse';

const bismillah: string = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  itemDetails: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public quranService: QuranService,
    public analytics: AnalyticsService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  ionViewDidEnter() {
    this.analytics.ReportPageNavigation('ItemDetailsPage');
  }

  ionViewDidLoad() {
    // Load chapter details
    this.loadChapterDetails(this.selectedItem.id)
  }

  loadChapterDetails(id: number) {
    // Get all chapters
    this.quranService.getChapterDetailsAsync(id)
      .subscribe(
      itemDetails => {
        // check if the first verse includes bismillah (unless this is chapter 1)
        if (itemDetails.id != 1 && itemDetails.verses && itemDetails.verses.length > 0 && itemDetails.verses[0].ar) {
          if (itemDetails.verses[0].ar.startsWith(bismillah)) {
            // remove bismillah from the first verse
            itemDetails.verses[0].ar = itemDetails.verses[0].ar.substr(bismillah.length + 1);

            // push bismillah as a separate first verse
            itemDetails.verses.unshift(new Verse(bismillah, ''));
          }
        }
        this.itemDetails = itemDetails
      }, // Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
  }
}
