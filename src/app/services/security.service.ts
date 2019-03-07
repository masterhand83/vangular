import { Injectable } from '@angular/core';
import * as Crypto from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  key = 'secret key 117';

  constructor() { }


  encrypt(data: any): string {
    // console.log('DATOS ANTES DE ENCRIPTAR: ', JSON.stringify(data));
    const cryptedData = Crypto.AES.encrypt(JSON.stringify(data), this.key);
    const cryptedText: string = cryptedData.toString();
    return cryptedText;
  }
  /**
   *
   * @param cryptedData datos encriptados
   */
  decrypt(cryptedData: any) {
    let decryptedData = 'Not found';
    //console.log('datos encriptados:', cryptedData);
    const textData: string = cryptedData.toString();
    const cryptedBytes = Crypto.AES.decrypt(textData, this.key);
    const cryptedString: string = cryptedBytes.toString(Crypto.enc.Utf8)

    //console.log(cryptedString) ;
    if (cryptedString) {
      decryptedData = JSON.parse(cryptedBytes.toString(Crypto.enc.Utf8));
    }
    return decryptedData;
  }
}
