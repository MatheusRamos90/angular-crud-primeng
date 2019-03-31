/**
 * @By: Matheus Ramos - 30/03/2019
 * */

import {Injectable} from '@angular/core';
import { ProductsModel } from '../models/products.model';

@Injectable()
export class ProductsService{

    database: any = JSON.parse(localStorage.getItem('databaseProd'));

    constructor(){}

    public getAll(): ProductsModel[]{
        return JSON.parse(localStorage.getItem('databaseProd'));
    }

    public create(produto: ProductsModel): boolean{

        var database = this.database || [];

        var novoProduto = produto;

        database.push(novoProduto);

        localStorage.setItem('databaseProd', JSON.stringify(database));

        return true;

    }

    public remove(key: number): boolean{

        this.database.splice(key, 1);

        localStorage.setItem("databaseProd", JSON.stringify(this.database));

        return true;

    }

    public find(id: any){

        for (var i = 0; i < this.database.length; i++) {
            if (i == id) {
                return this.database[i];
            }
        }

    }

    update(key: any,product: ProductsModel): boolean{

        this.database.map(obj => {
            if(obj === this.database[key]){
                obj.nome = product.nome;
                obj.unidade_medida = product.unidade_medida;
                obj.quantidade = product.quantidade;
                obj.preco = product.preco;
                obj.prod_perecivel = product.prod_perecivel;
                obj.data_validade = product.data_validade;
                obj.data_fabricacao = product.data_fabricacao;

                this.database.push(obj);
                this.remove(key);
            }
        });

        return true;

    }

}