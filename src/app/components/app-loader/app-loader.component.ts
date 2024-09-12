import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AppLoaderComponent implements OnInit {
  @Input() isLoading = false;
  @Input() statusMessage = 'Loading...';

  constructor() {}

  ngOnInit() {}
}
