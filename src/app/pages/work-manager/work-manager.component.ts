import { Component, OnInit } from '@angular/core';
import { PrimengModules } from '../../modules/primeng-modules';
import { TaskItem } from './models/task-item.model';
import { TaskService } from '../../services/work-manager/task/task.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';

@Component({
  selector: 'app-work-manager',
  templateUrl: './work-manager.component.html',
  styleUrls: ['./work-manager.component.scss'],
  imports: [PrimengModules, ReactiveFormsModule],
  providers: [ConfirmationService, MessageService, DialogService],
  standalone: true,
})
export class WorkManagerComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  public isLoading: boolean;
  public gridData: TaskItem[] = [];
  public bugtrackerListViewModel: any;
  taskForm: FormGroup;
  // public expandedElement: BugTrackerListModel | null;
  // public workItems: WorkItem[] | null;

  pageSize = 10;
  pageNumber = 1;
  totalItems = 0;

  selectedWorkItem: any;
  index: number;
  id: number;
  selectedFilters: any;

  expandedRows = {};

  // PRIMENG TESTS
  // productDialog: boolean = false;
  // products!: Product[];
  item!: TaskItem | any;
  isCreateEditDialogOpen = false;
  selectedItem!: TaskItem[] | null;
  selectedItems!: TaskItem[] | null;
  submitted: boolean = false;
  statuses!: any[];

  constructor(
    private taskService: TaskService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  // ngOnDestroy(): void {
  //   if (this.refreshSubscription) {
  //     this.refreshSubscription.unsubscribe();
  //   }
  // }

  ngOnInit(): void {
    // this.getBreadcrumbs();
    this.getMockData();
    this.initForm();
    // this.getDatasource();

    // FOR FILTER TABLE
    // this.refreshSubscription = this.bRefreshGrid$
    //   // .pipe(finalize(() => (this.isLoading = this.bugTrackerService.bRefreshGrid$.getValue())))
    //   .subscribe(
    //     (res) => {
    //       if (res) {
    //         this.isLoading = true;
    //         this.selectedFilters = res;
    //         this.getDatasource();
    //       }

    //       setTimeout(() => {
    //         this.isLoading = false;
    //       }, 1000);
    //     },
    //     (error) => {
    //       this.isLoading = false;
    //     }
    //   );
  }

  initForm() {
    this.taskForm = this.fb.group({
      id: [''],
      todo: ['', Validators.required],
      tasks: [[]],
      date: ['', Validators.required],
    });
  }

  //#region Mock UI Grid
  getMockData() {
    this.taskService.getTasks().subscribe((res) => {
      // this.gridData = res;
    });
  }

  openNew() {
    this.item = {};
    this.submitted = false;
    this.isCreateEditDialogOpen = true;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected item/s?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.gridData = this.gridData.filter(
          (val) => !this.selectedItems?.includes(val)
        );
        this.selectedItems = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  handleEditItem(item: TaskItem) {
    this.item = { ...item };
    this.isCreateEditDialogOpen = true;
  }

  deleteItem(item: TaskItem) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete tasks on ' + item.date + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.gridData = this.gridData.filter((val) => val.id !== item.id);
        this.item = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Item Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.isCreateEditDialogOpen = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    // if (this.item.name?.trim()) {
    //   if (this.product.id) {
    //     this.products[this.findIndexById(this.product.id)] = this.product;
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Product Updated',
    //       life: 3000,
    //     });
    //   } else {
    //     this.product.id = this.createId();
    //     this.product.image = 'product-placeholder.svg';
    //     this.products.push(this.product);
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Product Created',
    //       life: 3000,
    //     });
    //   }

    this.gridData = [...this.gridData];
    this.isCreateEditDialogOpen = false;
    this.item = {};
    // }
  }

  onFormSubmit(): void {
    if (this.taskForm.valid) {
      const taskItem: TaskItem = {
        id: uuidv4(),
        todo: this.taskForm.value.todo,
        tasks: this.taskForm.value.tasks, // No need to split, it’s already an array
        date: this.taskForm.value.date,
      };
      this.gridData.push(taskItem);
      this.getMockData();
      this.isCreateEditDialogOpen = false;
    }
  }

  exportData(): void {
    const json = JSON.stringify(this.gridData, null, 2); // Convert data to JSON format
    const blob = new Blob([json], { type: 'application/json' }); // Create a Blob from the JSON string
    const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
  
    const currentDate = new Date();
  
    // Options for formatting the date and time in Philippine Time
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
  
    // Format the date using toLocaleString with the Philippine time zone
    const formattedDate = currentDate.toLocaleString('en-US', { ...options, timeZone: 'Asia/Manila' });
  
    // Split into date and time components
    const [date, timeWithPeriod] = formattedDate.split(', '); // Example: "10/01/2024, 3:29:07 PM"
    const [time, period] = timeWithPeriod.split(' '); // Split time and period
  
    // Replace colons with hyphens in the time
    const formattedTime = time.replace(/:/g, '-');
  
    // Construct the filename
    const filename = `ChristianDecembrana_WorkLog_${date.replace(/\//g, '-')}_${formattedTime}-${period}.json`;
  
    const a = document.createElement('a'); // Create an anchor element
    a.href = url;
    a.download = filename; // Set the file name
    a.click(); // Trigger the download
  
    window.URL.revokeObjectURL(url); // Clean up the URL object
  }
  

  onFileSelect(event: any): void {
    const file = event.files[0]; // Get the first file from PrimeNG event
    const reader = new FileReader();

    reader.onload = (e: any) => {
      try {
        const json = JSON.parse(e.target.result); // Parse JSON string
        this.gridData = json; // Store the imported data
        console.log('Imported Data:', json);
      } catch (error) {
        console.error('Error parsing JSON', error);
      }
    };

    reader.readAsText(file); // Read the file as text
  }
  // findIndexById(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.products.length; i++) {
  //     if (this.products[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }

  //   return index;
  // }

  // createId(): string {
  //   let id = '';
  //   var chars =
  //     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   for (var i = 0; i < 5; i++) {
  //     id += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return id;
  // }

  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'INSTOCK':
  //       return 'success';
  //     case 'LOWSTOCK':
  //       return 'warning';
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //   }
  // }
  //#endregion

  // getBreadcrumbs() {
  //   this.breadcrumbItems = [
  //     {
  //       icon: 'pi pi-home',
  //     },
  //     {
  //       label: 'Applications',
  //     },
  //     {
  //       label: 'Common',
  //     },
  //     {
  //       label: 'Bugtracker',
  //     },
  //   ];
  // }

  // hasAccess(item: any) {
  //   return this.roleHelperService.isFullAccess() || this.roleHelperService.isCurrentUser(item.submittedBy);
  // }

  pageChange(args) {
    this.pageSize = args.rows;
    this.pageNumber = args.first / this.pageSize + 1;
    this.getDatasource();
  }

  // onRowExpand(event: TableRowExpandEvent) {
  //   this.messageService.add({
  //     severity: 'info',
  //     summary: 'Product Expanded',
  //     detail: event.data.name,
  //     life: 3000,
  //   });
  // }

  // onRowCollapse(event: TableRowCollapseEvent) {
  //   this.messageService.add({
  //     severity: 'success',
  //     summary: 'Product Collapsed',
  //     detail: event.data.name,
  //     life: 3000,
  //   });
  // }

  getDatasource() {
    this.isLoading = true;
    this.getMockData();
    // let sub = this.bugTrackerService
    //   .GetAll(
    //     this.pageNumber,
    //     this.pageSize
    //     // this.selectedFilters?.search,
    //     // this.selectedFilters?.userPriority,
    //     // this.selectedFilters?.smkeState,
    //     // this.selectedFilters?.application
    //   )
    //   .subscribe(
    //     (res) => {
    //       if (!!res) {
    //         if (!res?.workItems) res.workItems = [];

    //         // var dataMapped = res.workItems.map((bugTrack) =>
    //         //   this.getDataMapped(bugTrack)
    //         // );

    //         this.totalItems = res.totalCount; // Fetch the totalCount from backend

    //         if (this.totalItems < (this.pageNumber - 1) * this.pageSize) {
    //           this.pageNumber = 1;
    //           // this.paginator.pageIndex = 0;
    //         }

    //         this.workItems = res.workItems;
    //         console.log(this.workItems);
    //         // this.bugTableData.data = dataMapped;

    //         // this.bugtrackerListViewModel = new MatTableDataSource(dataMapped);
    //         // this.bugtrackerListViewModel.sort = this.sort;
    //         // this.bugtrackerListViewModel.paginator = this.paginator;

    //         // // Set the paginator's length to totalItems
    //         // this.paginator.length = this.totalItems;

    //         this.isLoading = false;
    //         sub.unsubscribe();
    //       }
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
  }
}
