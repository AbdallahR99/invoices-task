import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FacadeService } from '@services/facade.service';
import { ExportAsConfig, ExportAsService, SupportedExtensions } from 'ngx-export-as';
import { Pagination } from '@models/search/pagination.model';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { Invoice } from '@models/invoice/invoice.model';
import { ConfirmDialogData } from '@models/dialog/dialog.model';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
  host: {'class': 'd-flex h-100 align-items-center justify-content-center'},
})
export class InvoicesComponent implements OnInit {

  totalCount!: number;
  pagination = new Pagination();
  isError = false;
  isLoading = true;
  invoices: Invoice[] = [];
  get currentLang(): string {
    return this.facadeService.translatorService.getCurrentLang()!;
  }
  get isEn(): boolean {
    return this.facadeService.translatorService.getCurrentLang() === 'en';
  }
  get isAdmin(): boolean {
    return this.facadeService.authService.user?.IsAdmin ?? false;
  }
  constructor(private facadeService: FacadeService,
    private exportAsService: ExportAsService,
    public dialog: MatDialog,
    // public exportDocumentService: ExportDocumentService,
    @Inject(DOCUMENT) private document: Document
    ) { }
    config: ExportAsConfig = {
      type: 'pdf',
      elementIdOrContent: 'mytable',
      options: {
        jsPDF: {
          orientation: 'landscape'
        },
        pdfCallbackFn: this.pdfCallbackFn // to add header and footer
      }
    };

  displayedColumns: string[] = [ 'product', 'price', 'quantity', 'createdDate', 'actions'];
  dataSource = new MatTableDataSource<Invoice>(this.invoices);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices(): void {
    this.isLoading = true;

    this.facadeService.invoicesService.list().toPromise().then(
      data => {
      if (data) {
        this.dataSource.data = this.invoices = data;
        this.totalCount = data.length;
        this.pagination.PageNumber++;
      }
      this.isLoading = false;
    },
    error => {
      this.isLoading = false;
      this.facadeService.snackbarService.error(error?.error?.message ?? 'Error');
      console.error(error);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  searchBy(): void {
    this.pagination.PageNumber = 1;
    this.dataSource.data = this.invoices.filter(invoice => invoice?.Product?.toLowerCase().includes((this.pagination?.SearchBy?? '').toLowerCase()));

  }

  paginating(page: PageEvent): void {
    this.pagination.PageSize = page.pageSize;
    this.pagination.PageNumber = page.pageIndex + 1;
    this.getInvoices();

  }



  exportAsString(type: SupportedExtensions, opt?: string) {
    this.config.elementIdOrContent = '<div> test string </div>';
    this.exportAs(type, opt);
    setTimeout(() => {
      this.config.elementIdOrContent = 'mytable';
    }, 1000);
  }

  exportAs(type: SupportedExtensions, opt?: string) {
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;
    }
    this.exportAsService.save(this.config, 'invoices').subscribe(() => {
      // save started
    });
    // this.exportAsService.get(this.config).subscribe(content => {
    //   const link = document.createElement('a');
    //   const fileName = 'export.pdf';

    //   link.href = content;
    //   link.download = fileName;
    //   link.click();
    //   console.log(content);
    // });
  }

  pdfCallbackFn (pdf: any) {
    // example to add page number as footer to every page of pdf
    const noOfPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= noOfPages; i++) {
      pdf.setPage(i);
      // pdf.text('Page ' + i + ' of ' + noOfPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
    }
  }

  edit(invoice: Invoice): void {
    this.facadeService.dialogService.openDialog<Invoice, Invoice>(InvoiceFormComponent, invoice).then(data => {
      if (data) {
        this.getInvoices();
      this.pagination.PageNumber--;
      }
    });
  }

  add(): void {
    this.facadeService.dialogService.openDialog<Invoice, never>(InvoiceFormComponent).then(data => {

    if (data) {
      this.getInvoices();
      this.pagination.PageNumber--;

    }
  });
  }

  async delete(invoice: Invoice): Promise<void>{
    const data: ConfirmDialogData = {content: this.translate('you will delete') + ' ' + invoice.Product};
    const isConfirmed = await this.facadeService.dialogService.confirmDialog(data);
    if (isConfirmed) {
      this.isLoading = true;
      await this.facadeService.invoicesService.delete(invoice.ID).toPromise().then(
        () => {
          this.facadeService.snackbarService.success(this.translate('done successfully'));
          this.getInvoices();
        },
        (error: any) => {
          this.isLoading = false;
          this.facadeService.snackbarService.error(this.translate(error.toString()));
          console.log(error);
        }
      );
    }
  }

  translate(word: string): string {
    return this.facadeService.translatorService.translateWord(word);
  }

}
