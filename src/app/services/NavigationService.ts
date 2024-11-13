import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private history: string[] = [];
  private forwardHistory: string[] = [];

  constructor(private router: Router, private location: Location) {
    this.startSaveHistory();
  }

  public startSaveHistory(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.history.length === 0 || this.history[this.history.length - 1] !== event.urlAfterRedirects) {
          this.history.push(event.urlAfterRedirects);
          this.forwardHistory = [];
        }
      }
    });
  }

  public goBack(): void {
    if (this.history.length > 1) {
      const currentUrl = this.history.pop();
      if (currentUrl) {
        this.forwardHistory.push(currentUrl);
        const previousUrl = this.history[this.history.length - 1];
        this.router.navigateByUrl(previousUrl);
      }
    } else {
      this.router.navigateByUrl("/");
    }
  }

  public goNext(): void {
    if (this.forwardHistory.length > 0) {
      const nextUrl = this.forwardHistory.pop();
      if (nextUrl) {
        this.history.push(nextUrl);
        this.router.navigateByUrl(nextUrl);
      }
    }
  }

  public getPreviousUrl(): string {
    if (this.history.length > 1) {
      return this.history[this.history.length - 2];
    }
    return '';
  }

  public getNextUrl(): string {
    if (this.forwardHistory.length > 0) {
      return this.forwardHistory[this.forwardHistory.length - 1];
    }
    return '';
  }
}
