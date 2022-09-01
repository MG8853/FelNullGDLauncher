import * as localForage from 'localforage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

localForage.config({
  driver: localForage.INDEXEDDB,
  name: 'felnullgdlauncher',
  version: 1.0,
  storeName: 'felnullgdlauncher_persist'
});

export default {
  key: 'root',
  storage: localForage,
  whitelist: ['settings', 'app'],
  stateReconciler: autoMergeLevel2
};
