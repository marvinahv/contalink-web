import { Component } from '@angular/core';
import { InvoicesComponent } from './invoices/invoices.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InvoicesComponent],
  template: '<app-invoices></app-invoices>',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}