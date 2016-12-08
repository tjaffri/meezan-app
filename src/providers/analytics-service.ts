import { Injectable } from '@angular/core';

// Avoid name not found warnings
declare var ga: any;

@Injectable()
export class AnalyticsService {
  public ReportPageNavigation(pageName) {
    console.log('Page Navigation: ' + pageName);
    ga('send', 'pageview', pageName);
  }
}
