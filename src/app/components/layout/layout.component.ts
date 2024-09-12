import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PrimengModules } from '../../modules/primeng-modules';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [CommonModule, PrimengModules],
  standalone: true
})
export class AppLayoutComponent implements OnInit {

  sidebarOpen = true;

  constructor() { }

  ngOnInit() {
  }

  onSidebarToggle(open: boolean) {
    this.sidebarOpen = open;
  }

}
