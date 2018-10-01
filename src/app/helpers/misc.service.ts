import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor() { }

  // Create a string of random alphanumeric characters, of a given length
  createRandomString(strLength: number){

    // Define all the possible characters that could go into a string
    let possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789QWERTYUIOPASDFGHJKLZXCVBNM';

    // Start the final string
    let str = '';
    for(let i = 1; i <= strLength; i++) {
        // Get a random charactert from the possibleCharacters string
        let randomCharacter =
        possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        // Append this character to the string
        str+=randomCharacter;
    }
    // Return the final string
    return str;
  };




}
