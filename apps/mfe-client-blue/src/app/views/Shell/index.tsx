import './styles.scss';

import React, { Fragment, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { Container } from '@material-ui/core';
import { ClientAppDetails } from '@microfr/shared/model/app-interface';
import * as fromCommonUtils from '@microfr/shared/util/common';

import { appInterface } from '../../core/helpers';
import FooMain from '../../features/foo/views/FooMain';
import AppHeader from '../../layout/AppHeader/Header';
import { appRouteConfig } from '../../root/app-route-config.constant';
import AppDetails from '../../shared/components/AppDetails';

interface ShellViewProps {}

export default function ShellView(props: ShellViewProps) {
  const unsubscriber: Subject<unknown> = new Subject();
  const [appName, setAppName] = useState(null);
  const [appDescription, setAppDescription] = useState(null);

  useEffect(() => {
    subscribeToAppDetails();
    return () => {
      unsubscribe();
    };
  }, []);

  function subscribeToAppDetails() {
    appInterface.appDetails$
      .pipe(
        takeUntil(unsubscriber),
        filter((details: ClientAppDetails) => details != null)
      )
      .subscribe(setAppDetails);
  }

  function setAppDetails(details: ClientAppDetails) {
    const { name, description } = details;
    setAppName(name);
    setAppDescription(description);
  }

  function unsubscribe() {
    fromCommonUtils.destroy(unsubscriber);
  }

  const featureFooRoutePath: string = appRouteConfig.featureFoo.name;
  return (
    <div className="app-root">
      <AppHeader appName={appName} />
      <div className="app-content">
        <AppDetails appDescription={appDescription} />
        <Route path={featureFooRoutePath}>
          <FooMain />
        </Route>
      </div>
    </div>
  );
}
