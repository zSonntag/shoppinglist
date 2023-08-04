import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProdAddEditComponent } from './prod-add-edit/prod-add-edit.component';
import { ProductService } from './services/product.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'shopping';

  displayedColumns: string[] = ['id', 'produktname', 'masseinheit', 'anzahl', 'laden', 'ort', 'preis', 'aktionen'];
  dataSource = new MatTableDataSource<any>;
  products: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
  private _dialog: MatDialog, 
  private _prodServie: ProductService,
  private _coreService: CoreService
  ) {}


  ngOnInit(): void {
    this.getProductList();
 
  }

  openAddEditProdForm() {
    const dialogRef = this._dialog.open(ProdAddEditComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if (val) {
          this.getProductList()
        }
      }
    })
  }

  getProductList(){
    this._prodServie.getProductList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.products = res;
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  deleteProduct(id: number){
    this._prodServie.deleteProduct(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Produkt gelöscht!')
        this.getProductList()
      },
      error: console.log
    })
  }

  getSumOfAllProducts(){
    let sum = 0;
    for(const product in this.products){
      const price = Number(this.products[product].preis*this.products[product].anzahl)
      sum += price;
    }
    return sum;
  }

  getTotalPriceForElement(element: any): number {
    return element.preis * element.anzahl;
  }
}

