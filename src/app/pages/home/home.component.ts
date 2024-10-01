import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { PrimengModules } from '../../modules/primeng-modules';
import { TerminalService } from 'primeng/terminal';
import { Subscription } from 'rxjs';
import { WorkManagerComponent } from "../work-manager/work-manager.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [PrimengModules, WorkManagerComponent],
  providers: [TerminalService],
  standalone: true,
})
export class HomeComponent implements OnInit, OnDestroy {
  displayWhoAmI = false;
  displayWorkManager = false;
  subs: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private terminalService: TerminalService
  ) {}

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  ngOnInit() {
    this.subs.push(
      this.terminalService.commandHandler.subscribe((command) =>
        this.commandHandler(command)
      )
    );
  }

  showWhoAmI() {
    this.displayWhoAmI = true;
  }
  showWorkManager() {
    this.displayWorkManager = true;
  }
  commandHandler(text: any) {
    let response;
    let argsIndex = text.indexOf(' ');
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

    switch (command) {
      case 'whoami':
        response =
          'Hello there! my name is Christian Decembrana (Frontend Developer)';
        break;

      case 'secrets':
        response = 'I love ************ *** *** ***';
        break;

      case 'hobbies':
        response =
          'Playing Basketball, Guitar, & Video Games... especially Coding </>';
        break;

      case 'motto':
        response = 'Sasageyo!!! sasageyooooooooooo!';
        break;

      default:
        response = 'Unknown command: ' + command;
        break;
    }

    if (response) {
      this.terminalService.sendResponse(response as string);
    }
  }
}
