/**
 * @By: Matheus Ramos - 30/03/2019
 * */

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductsModel} from '../../models/products.model';
import {ProductsService} from '../../services/products.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

    id: any;
    product: ProductsModel;
    message: string;
    ptBr: any;
    unMedidaOptions: Array<any> = [
        {label: 'Litros', value: 'lt'},
        {label: 'Quilogramas', value: 'kg'},
        {label: 'Unidade', value: 'un'}
    ];
    selectedUnMedida: string;
    productExpired: boolean;
    productExpiredDate: Date;
    productFabricateError: boolean;

    public formAtualizaProduto: FormGroup = new FormGroup({
        'nome': new FormControl(null, [ Validators.required, Validators.maxLength(50)]),
        'unidade_medida': new FormControl(null, [ Validators.required ]),
        'quantidade': new FormControl(null),
        'preco': new FormControl(null, [ Validators.required ]),
        'prod_perecivel': new FormControl(null),
        'data_validade': new FormControl(null, [ Validators.required ]),
        'data_fabricacao': new FormControl(null, [ Validators.required ])
    });

  constructor(private router: ActivatedRoute, private productService: ProductsService, private navigate: Router) { }

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

    this.router.params.subscribe(params => { this.id = params['id']; });

    this.product = this.productService.find(this.id);

    this.product.data_validade = new Date(this.productService.find(this.id).data_validade);
    this.product.data_fabricacao = new Date(this.productService.find(this.id).data_fabricacao);

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

  submitAtualizaProduto(): void{

      if(this.formAtualizaProduto.status == 'INVALID') {
          this.formAtualizaProduto.get('nome').markAsTouched();
          this.formAtualizaProduto.get('unidade_medida').markAsTouched();
          this.formAtualizaProduto.get('preco').markAsTouched();
          this.formAtualizaProduto.get('data_validade').markAsTouched();
          this.formAtualizaProduto.get('data_fabricacao').markAsTouched();
      }else{
          let product: ProductsModel = new ProductsModel(
              this.formAtualizaProduto.value.nome = this.product.nome,
              this.formAtualizaProduto.value.unidade_medida = this.product.unidade_medida,
              this.formAtualizaProduto.value.quantidade = this.product.quantidade ? this.product.quantidade : 0,
              this.formAtualizaProduto.value.preco = this.product.preco,
              this.formAtualizaProduto.value.prod_perecivel = this.product.prod_perecivel,
              this.formAtualizaProduto.value.data_validade = this.product.data_validade,
              this.formAtualizaProduto.value.data_fabricacao = this.product.data_fabricacao
          );

          //limpa mensagem
          this.message = '';

          //add produto
          if(this.productService.update(this.id, product)){
              this.navigate.navigate(['/']);
          }else{
              this.message = 'Houve um erro interno!';
          }
      }

  }



}
