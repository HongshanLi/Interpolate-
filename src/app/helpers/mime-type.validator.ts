import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";

// simple mimetype check for MVP
export const mimeType = (file: File) => {
  //const file = control.value as File;

  const admissibleTypes = [
    "application/pdf",
  //  "image/png",
  //  "image/jpeg",
  ]

  if(admissibleTypes.indexOf(file.type)>-1){
    return true;
  }else{
    return false;
  }
}


/*
export const mimeType = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  if (typeof(control.value) === 'string') {
    return of(null);
  }
  const file = control.value as File;
  console.log("from line 11 mimetype", file);
  const fileReader = new FileReader();
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      fileReader.addEventListener("loadend", () => {
        const arr = new Uint8Array(fileReader.result).subarray(0, 4);
        let header = "";
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        switch (header) {
          case "25504446":
            isValid = true;
            break;
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }
        //console.log("The mimetype of the file is ", head)
        if (isValid) {
          observer.next(null);
        } else {
          console.log("file tyle is not in pdf");
          observer.next({ invalidMimeType: true });
        }
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    }
  );
  return frObs;
};



export const mimeType = (
  control: AbstractControl
): Observable<{ [key: string]: any }> => {
  if (typeof(control.value) === 'string') {
    return of(null);
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      fileReader.addEventListener("loadend", () => {
        const arr = new Uint8Array(
          control.value.result
        ).subarray(0, 4);
        let header = "";
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        switch (header) {
          case "25504446":
            isValid = true;
            break;
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }
        //console.log("The mimetype of the file is ", head)
        if (isValid) {
          observer.next({validMimeType: true});
        } else {
          observer.next({validMimeTyle: false});
        }
        observer.complete();
      });
      //fileReader.readAsArrayBuffer(file);
    }
  );
  return frObs;
};

*/
