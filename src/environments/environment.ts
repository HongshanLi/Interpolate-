// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: "http://localhost:3000/api",
  frontEndUrl: "http://localhost:4200",
  production: false,
  userIdLength: 30,
  groupIdLength: 50,
  threadIdLength: 10,
  responseIdLength: 10,
  passwordMinLength:6,
  strokeStyle: "#00b8e6",
  globalAlpha: 0.2,
  lineWidth : 20,

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
