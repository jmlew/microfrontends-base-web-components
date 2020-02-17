import { Component } from '@angular/core';

import { appRouteConfig } from './../../../../root/app-route-config.constant';
import { RouteItem } from './../../../../shared/models/routes.model';

@Component({
  templateUrl: './main.view.html',
  styleUrls: ['./main.view.scss'],
})
export class FooMainView {
  routes: RouteItem[] = [appRouteConfig.featureFooA, appRouteConfig.featureFooB];

  constructor() {}
}