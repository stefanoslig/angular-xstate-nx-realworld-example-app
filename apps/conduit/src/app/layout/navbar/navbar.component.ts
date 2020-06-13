import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'conduit-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() user;
  @Input() isLoggedIn: boolean;
}
