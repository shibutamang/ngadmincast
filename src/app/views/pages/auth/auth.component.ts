import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/_base/layout/layout.service';

declare var $:any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private _layoutservice: LayoutService) { }

  ngOnInit(): void {
    $('body').addClass('empty-layout bg-silver-300');
   
  }

}
