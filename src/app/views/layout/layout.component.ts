import { Component, OnInit } from '@angular/core';
import { LayoutHelper } from './helper';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    // initialize layout: handlers, menu ...
    LayoutHelper.initLayout();

  }
}
