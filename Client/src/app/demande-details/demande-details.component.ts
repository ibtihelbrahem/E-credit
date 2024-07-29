import { Component, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DemandeCredit } from '../entities/DemandeCredit';
import { DemandeCreditService } from '../services/demande-credit.service';
import { Echeance } from '../entities/echeance';
import { EcheancesDetailsComponent } from '../echeances-details/echeances-details.component';

@Component({
  selector: 'app-demande-details',
  templateUrl: './demande-details.component.html',
  styleUrls: ['./demande-details.component.css']
})
export class DemandeDetailsComponent {
  
  isDialogOpen = true;
  data: any;
  echeances: Echeance[] = [];
  showEcheances = true; // Flag to control the display of echeances


  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any, // Replace with appropriate type
    private demandeCreditService: DemandeCreditService,
    private dialogRef: MatDialogRef<DemandeDetailsComponent>,
    private dialog: MatDialog // Import MatDialog service

  ) { 
    this.data = dialogData;
  }


  viewEcheancier(): void {
    this.demandeCreditService.generateEcheances(this.data.montant, this.data.duree, this.data.typeCredit)
      .subscribe({
        next: (res) => {
          this.dialogRef.close();
          this.openEcheanceDetailsDialog(res);
        },
        error: (error) => {
          console.error('Error fetching échéances', error);
        }
      });
  }

  openEcheanceDetailsDialog(echeances: Echeance[]): void {
    this.dialog.open(EcheancesDetailsComponent, {
      data: { echeances },
      width: '80%',
      maxHeight: '80vh'
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
