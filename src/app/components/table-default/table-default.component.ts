/**
 * @By: Matheus Ramos - 30/03/2019
 * */

import { Component, OnInit  } from '@angular/core';

import { ProductsModel } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-table-default',
  templateUrl: './table-default.component.html',
  styleUrls: ['./table-default.component.css']
})

export class TableDefaultComponent implements OnInit {

    products: ProductsModel[];
    message: string;

    constructor(private productsService: ProductsService, private router: Router) { }

    ngOnInit() {
        var values = localStorage.getItem('databaseProd');

        if(values === null){
            this.products = [];
        }else{
            this.products = this.productsService.getAll();
        }
    }

    public editar(key): void{

        this.router.navigate([`/produtos/editar/${key}`]);

    }

    public remover(key): void{

        this.message = '';
        var remove = confirm("Deseja realmente remover este item?");
        if (remove) {
            if(this.productsService.remove(this.products.indexOf(key))){
                this.products.splice(this.products.indexOf(key), 1);
                this.products = [...this.products];
                this.message = 'Item removido com sucesso!';
                setTimeout(() => {
                    this.message = null;
                }, 3000)
            }else{
                this.message = 'Houve um erro interno!';
            }
        }

    }

}
