/**
 * @By: Matheus Ramos - 30/03/2019
 * */

export class ProductsModel {

    constructor(
        // public id: number,
        public nome: string,
        public unidade_medida: number,
        public quantidade: number,
        public preco: number,
        public prod_perecivel: any,
        public data_validade: any,
        public data_fabricacao: any
    ){}

}