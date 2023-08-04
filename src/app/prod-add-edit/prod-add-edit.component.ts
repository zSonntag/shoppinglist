import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-prod-add-edit',
  templateUrl: './prod-add-edit.component.html',
  styleUrls: ['./prod-add-edit.component.scss']
})
export class ProdAddEditComponent {

  prodForm: FormGroup;

  
  constructor(
    private _fb: FormBuilder, 
    private _prodService: ProductService, 
    private _dialogRef: MatDialogRef<ProdAddEditComponent>,
    private _coreService: CoreService
    ){
      
    this.prodForm = this._fb.group({
      produktname:['', Validators.required],
      masseinheit: '',
      anzahl: '',
      laden: '',
      ort: '',
      preis: ''
    })
  }

  masseinheit = new FormControl();
  produktname = new FormControl();

  onFormSubmit() {
    if (this.prodForm.valid) {
      const formData = {
        produktname: this.prodForm.get('produktname')?.value,
        masseinheit: this.prodForm.get('masseinheit')?.value,
        anzahl: this.prodForm.get('anzahl')?.value,
        laden: this.prodForm.get('laden')?.value,
        ort: this.prodForm.get('ort')?.value,
        preis: this.prodForm.get('preis')?.value,
      };
  
      this._prodService.addProduct(formData).subscribe(
        (val: any) => {
          this._coreService.openSnackBar('Produkt erfolgreich hinzugefügt')
          this._dialogRef.close(true);
        },
        (err: any) => {
          console.error(err);
        }
      );
    }
  }

  onCancelClick() {
    this._dialogRef.close();
  }
  
}
