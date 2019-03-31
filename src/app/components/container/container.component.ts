/**
 * @By: Matheus Ramos - 30/03/2019
 * */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  template: `
    <div class="container_"><ng-content></ng-content></div>
  `,
  styles: [
      `.container_ {
          width: 1140px;
          margin: auto;
          padding: 0 15px 0 15px;
      }
      @media only screen and (max-width: 1120px) {
          .container_{
              width: auto;
              overflow: auto;
          }
      }
    `
  ]
})
export class ContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
