import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // For HTTP requests
import { HttpClientModule } from '@angular/common/http'; // To enable HttpClient
import { CommonModule } from '@angular/common'; // For structural directives like *ngIf and *ngFor
import { FormsModule } from '@angular/forms'; // For two-way data binding
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent {
  fromDate: string = '';
  toDate: string = '';
  invoices: any[] = [];
  submitted: boolean = false;
  loading: boolean = false;
  showResults: boolean = false;

  constructor(private http: HttpClient) {}

  fetchInvoices() {
    if (!this.fromDate || !this.toDate) {
      alert('Por favor, ingrese ambas fechas.');
      return;
    }

    const params = {
      from_date: this.fromDate,
      to_date: this.toDate,
    };

    this.loading = true;

    this.http
      .get(`${environment.apiUrl}/invoices`, { params })
      .subscribe(
        (data: any) => {
          this.invoices = data;
          this.submitted = true;
          this.loading = false;
          this.showResults = true;
        },
        (error) => {
          this.loading = false;
          console.error('Error fetching invoices:', error);
          alert('Ocurrió un error al obtener las facturas.');
        }
      );
  }

  resetForm() {
    this.fromDate = '';
    this.toDate = '';
    this.invoices = [];
    this.submitted = false;
    this.showResults = false;
  }
}