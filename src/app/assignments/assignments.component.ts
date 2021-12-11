import {  Inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ignoreElements } from 'rxjs';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthInterceptor } from '../interceptors/auth-interceptor';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit,   AfterViewInit {
  couleur = 'orange';
  ajoutActive = false;
  assignmentToEdit?:Assignment = new Assignment();
  assignments: Assignment[] = [];
  // slider pour changer la limite
  sliderLimit:number=10;

  // Pour pagination
  page: number = 1;
  limit: number = 5;
  totalDocs:number=0;
  totalPages: number=0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;

  length:number = 0;
  pageSize:number=0;

  hasNextPage: boolean=false;
  nextPage: number = 0;
  displayedColumns = ['id', 'nom', 'dateDeRendu', 'rendu'];
  displayedColumns2 = ['id', 'nom', 'dateDeRendu', 'rendu','details', 'supprimer'];
  dataSource:any;
  dataSource2:any;
  constructor(private assignmentsService: AssignmentsService,
              private router:Router,
              private _liveAnnouncer: LiveAnnouncer, 
              private _snackBar: MatSnackBar,
              public dialog: MatDialog, 
              private auth: AuthService) {
    
  }

  ngOnInit(): void {
    console.log('Appelé avant affichage');
    this.getAssignments();
    this.dataSource = new MatTableDataSource();
    this.dataSource2 = new MatTableDataSource();
    this.dataSource.data = this.assignments;
    this._snackBar.open("Assignments recupérés avec success", "clear");
    
  }
  @ViewChild(MatSort) sort?: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
/** Announce the change in sort state for assistive technology. */
announceSortChange(sortState: Sort) {
  // This example uses English messages. If your application supports
  // multiple language, you would internationalize these strings.
  // Furthermore, you can customize the message to add additional
  // details about the values being sorted.
  this._snackBar.open("Assignments triés avec success", "clear");
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}
  getAssignments() {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe((data) => {
      this.assignments = data.docs;
      this.assignments = this.assignments.sort(() => Math.random() - 0.5);
      this.dataSource.data = data.docs;
      this.page = data.page;
       this.limit = data.limit;

       this.length = data.totalPages;
       this.pageSize = 5;

       this.totalDocs = data.totalDocs;
       this.totalPages = data.totalPages;
       this.hasPrevPage = data.hasPrevPage;
       this.prevPage = data.prevPage;
       this.hasNextPage = data.hasNextPage;
       this.nextPage = data.nextPage;
       console.log("données reçues");
    });

    this.assignmentsService.getAssignments().subscribe((data)=>{
      this.dataSource2.data = data;
    });
  }
  genererDonneesDeTest() {
    this.assignmentsService.peuplerBDAvecForkJoin()
    .subscribe(() => {
      // ok, les 1000 données ont bien été insérées...
      console.log("TOUTES LES DONNEES ONT BIEN ETE INSEREES");
      this._snackBar.open("le peuplement des donnes a reussi", "clear");
      this.router.navigate(["/assignments"]);
    });
  }
  getPaginatorData($event:PageEvent) {
    console.log($event)
    this.page =  $event.pageIndex;
    this.limit =  $event.pageSize;
    this.getAssignments();
  }
  changeLimit() {
    console.log("change limit")
    this.limit = this.sliderLimit;
    this.getAssignments();
  }

  pagePrecedente() {
      this.page = this.prevPage ;
      this.getAssignments();
  }

  pageSuivante() {
      this.page = this.nextPage ;
      this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }
  onDelete(id:number) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '550px',
      data: {name: 'this.name', animal: 'this.animal'},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result== true){
        this.assignmentsService.getAssignment(id).subscribe((rep)=>{
          this.assignmentToEdit=rep;
          if (this.assignmentToEdit) {
            this.assignmentsService
              .deleteAssignment(this.assignmentToEdit)
              .subscribe((reponse) => {
                console.log(reponse.message);
                // on retourne à la page d'accueil APRES qu'on soit sur
                // que la suppression ait bien été effectuée
                //////this.router.navigate(['/home']);
                this._snackBar.open("L'assignement a bien été supprimé", "clear");
                this.getAssignments();
              });
            
          }
        });
      }else{
        this._snackBar.open("Penser bienavant de supprimer des données!", "clear");
      }
    });
    
    
  }
  isAdmin(){
    return this.auth.isAdmin();
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onVerifyClick():void{

  }
  
}