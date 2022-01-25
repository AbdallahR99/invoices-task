import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FacadeService } from '@services/facade.service';
import { ExportAsConfig, ExportAsService, SupportedExtensions } from 'ngx-export-as';
import { Pagination } from '@models/search/pagination.model';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@models/user/user.model';
import { UserFormComponent } from './user-form/user-form.component';
import { ConfirmDialogData } from '@models/dialog/dialog.model';
// import { User } from './../../core/models/user/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  host: {'class': 'd-flex h-100 align-items-center justify-content-center'},
})
export class MainComponent implements OnInit, AfterViewInit {

  totalCount!: number;
  pagination = new Pagination();
  isError = false;
  isLoading = true;
  users: User[] = [];
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

  displayedColumns: string[] = [ 'fullName', 'email', 'phone', 'createdDate', 'actions'];
  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.isLoading = true;

    this.facadeService.userService.listByPagination(this.pagination).toPromise().then(
      data => {
      if (data) {
        // debugger;
        this.users = data.Result;
        this.dataSource.data = this.users;

        this.totalCount = data.TotalCount;
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
    this.getUsers();
  }

  paginating(page: PageEvent): void {
    this.pagination.PageSize = page.pageSize;
    this.pagination.PageNumber = page.pageIndex + 1;
    this.getUsers();
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
    this.exportAsService.save(this.config, 'Users').subscribe(() => {
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

  edit(user: User): void {
    this.facadeService.dialogService.openDialog<User, User>(UserFormComponent, user).then(data => {
      if (data) {
        this.users.push(data);
      }
    });
  }

  add(): void {
    this.facadeService.dialogService.openDialog<User, User>(UserFormComponent).then(data => {
    if (data) {
      this.users.push(data);
    }
  });
  }

  async delete(user: User): Promise<void>{
    const data: ConfirmDialogData = {content: this.translate('you will delete') + ' ' + user.Username};
    const isConfirmed = await this.facadeService.dialogService.confirmDialog(data);
    if (isConfirmed) {
      this.isLoading = true;
      await this.facadeService.userService.delete(user.ID).toPromise().then(
        () => {
          this.facadeService.snackbarService.success(this.translate('done successfully'));
          this.getUsers();
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
