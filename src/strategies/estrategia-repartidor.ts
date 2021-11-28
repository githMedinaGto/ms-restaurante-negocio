import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {Keys} from '../config/keys';
const fetch = require('node-fetch');


export class EstrategiaRepartidorStrategy implements AuthenticationStrategy {
  name = 'repartidor';

  constructor() { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (token) {
      //validarlo
      const rol_admin = Keys.rol_administrador;
      const url_token = `${Keys.url_validar_token}?${Keys.arg_token}=${token}&${Keys.arg_rol_token}=${Keys.rol_repartidor}`;
      let r = "";
      await fetch(url_token)
        .then((res: any) => {
          r = res.text();
        })
      switch (r) {
        case "OK":
          const perfil: UserProfile = Object.assign({
            admim: "OK"
          });
          return perfil;
          break;
        case "KO":
          throw new HttpErrors[401]("El rol del token no es valido");
          break;
        case "":
          throw new HttpErrors[401]("El token no es valido");
          break;
      }
    } else {
      throw new HttpErrors[401]("La request no tiene un token");
    }
  }
}
