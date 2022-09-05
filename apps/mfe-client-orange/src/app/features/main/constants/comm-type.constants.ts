import { CommType } from '@microfr/shared/model/app-interface';
import { PropStringMap } from '@microfr/shared/model/common';

export const commTypeLabelsMap: PropStringMap = {
  [CommType.EvtBusDom]: 'DOM API Custom Events Event Bus',
  [CommType.EvtBusObs]: 'RxJS Observer Event Bus',
  // [CommType.ComponentProp]: 'Native Web Component Properties',
};
