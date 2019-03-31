/**
 * @By: Matheus Ramos - 30/03/2019
 * */

/** Angular's dependencies */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

/** Services */
import { ProductsService } from './services/products.service';

/** APP Routes */
import { ROUTES } from './app.routes';

import {MenuModule} from 'primeng/components/menu/menu';
import {MenubarModule} from 'primeng/components/menubar/menubar';
import {ToolbarModule} from 'primeng/components/toolbar/toolbar';
import {SidebarModule} from 'primeng/components/sidebar/sidebar';
import {PanelModule} from 'primeng/components/panel/panel';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {ButtonModule} from 'primeng/components/button/button';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {CheckboxModule} from 'primeng/components/checkbox/checkbox';
import {CalendarModule} from 'primeng/components/calendar/calendar';
import {MessagesModule} from 'primeng/components/messages/messages';
import {MessageModule} from 'primeng/components/message/message';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';
import {DropdownModule} from 'primeng/components/dropdown/dropdown';
import {InputMaskModule} from 'primeng/components/inputmask/inputmask';
import {SpinnerModule} from 'primeng/components/spinner/spinner';

/** APP Components */
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TableDefaultComponent } from './components/table-default/table-default.component';
import { NewProductComponent } from './componentsRoutes/new-product/new-product.component';
import { EditProductComponent } from './componentsRoutes/edit-product/edit-product.component';
import { ListProductComponent } from './componentsRoutes/list-product/list-product.component';
import { ContainerComponent } from './components/container/container.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TableDefaultComponent,
    NewProductComponent,
    EditProductComponent,
    ListProductComponent,
    ContainerComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(ROUTES),
      ReactiveFormsModule,
      MenuModule,
      MenubarModule,
      ToolbarModule,
      SidebarModule,
      PanelModule,
      DataTableModule,
      ButtonModule,
      InputTextModule,
      CheckboxModule,
      CalendarModule,
      MessagesModule,
      MessageModule,
      TooltipModule,
      DropdownModule,
      InputMaskModule,
      SpinnerModule
  ],
  providers: [
      ProductsService,
      { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
