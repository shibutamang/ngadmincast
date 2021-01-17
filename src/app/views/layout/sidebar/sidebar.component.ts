import { Component, ElementRef, OnInit } from '@angular/core';

declare var $: any; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuElement: any;

  constructor(private   _elementRef: ElementRef){}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

}
