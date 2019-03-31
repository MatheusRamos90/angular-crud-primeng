/**
 * @By: Matheus Ramos - 30/03/2019
 * */

import { Routes } from '@angular/router';

import { ListProductComponent } from './componentsRoutes/list-product/list-product.component';
import { NewProductComponent } from './componentsRoutes/new-product/new-product.component';
import { EditProductComponent } from './componentsRoutes/edit-product/edit-product.component';

export const ROUTES: Routes = [
    { path: '',component: ListProductComponent },
    { path: 'produtos/criar',component: NewProductComponent },
    { path: 'produtos/editar/:id',component: EditProductComponent },
    { path: 'produtos/editar',component: ListProductComponent }
];