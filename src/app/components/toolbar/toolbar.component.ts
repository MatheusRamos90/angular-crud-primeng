/**
 * @By: Matheus Ramos - 30/03/2019
 * */

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

    items = [];
    sidebar: boolean;

    ngOnInit() {
        this.items = [
            {label: 'Novo Produto', link: 'produtos/criar', icon: 'fa fa-plus'},
            {label: 'Produtos', link: '', icon: 'fa fa-list'}
        ];
    }

}
