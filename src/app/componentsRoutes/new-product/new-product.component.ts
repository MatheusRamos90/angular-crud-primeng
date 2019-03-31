/**
 * @By: Matheus Ramos - 30/03/2019
 * */

import {Component, Injectable, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import {ProductsModel} from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})

@Injectable()
export class NewProductComponent implements OnInit {

    ptBr: any;
    message: string;
    unMedidaOptions: Array<any> = [
        {label: 'Litros', value: 'lt'},
        {label: 'Quilogramas', value: 'kg'},
        {label: 'Unidade', value: 'un'}
    ];
    selectedUnMedida: string;
    productExpired: boolean;
    productExpiredDate: Date;
    productFabricateError: boolean;

    public formCriarProduto: FormGroup = new FormGroup({
        'nome': new FormControl(null, [ Validators.required, Validators.maxLength(50)]),
        'unidade_medida': new FormControl(null, [ Validators.required ]),
        'quantidade': new FormControl(null),
        'preco': new FormControl(null, [ Validators.required ]),
        'prod_perecivel': new FormControl(null),
        'data_validade': new FormControl(null, [ Validators.required ]),
        'data_fabricacao': new FormControl(null, [ Validators.required ])
    });

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
      this.ptBr = {
          firstDayOfWeek: 0,
          dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabádo"],
          dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
          dayNamesMin: ["Do","Se","Te","Qa","Qi","Se","Sa"],
          monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
          monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
          today: 'Hoje',
          clear: 'Limpar'
      };
  }

  public changeMedida(e): void{
      this.selectedUnMedida = e.value;
  }

  public verificaValidade(e): void{

      let date = new Date();

      this.productExpiredDate = e;
      this.productExpired = e < date ? this.productExpired = true : this.productExpired = false;

  }

  public verificaFabricacao(e): void{

      this.productFabricateError = this.productExpiredDate < e ? this.productFabricateError = true : this.productFabricateError = false;

  }

  public submitCriarProduto(): void{

      if(this.formCriarProduto.status == 'INVALID') {
          this.formCriarProduto.get('nome').markAsTouched();
          this.formCriarProduto.get('unidade_medida').markAsTouched();
          this.formCriarProduto.get('preco').markAsTouched();
          this.formCriarProduto.get('data_validade').markAsTouched();
          this.formCriarProduto.get('data_fabricacao').markAsTouched();
      }else{
          let produto: ProductsModel = new ProductsModel(
              // this.getPK,
              this.formCriarProduto.value.nome,
              this.formCriarProduto.value.unidade_medida,
              this.formCriarProduto.value.quantidade ? this.formCriarProduto.value.quantidade : 0,
              this.formCriarProduto.value.preco,
              this.formCriarProduto.value.prod_perecivel,
              this.formCriarProduto.value.data_validade,
              this.formCriarProduto.value.data_fabricacao
          );

          //limpa mensagem
          this.message = '';

          //add produto
          if(this.productsService.create(produto)){
              this.router.navigate(['/']);
          }else{
              this.message = 'Houve um erro interno!';
          }

      }
  }

}
