// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {inject} from '@loopback/core';
import {
  get,
  HttpErrors,
  oas,
  param,
  Response,
  RestBindings
} from '@loopback/rest';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import {Keys as llaves} from '../config/keys';

const readdir = promisify(fs.readdir);

/**
 * A controller to handle file dowloads using multipart/
 */

export class DescargarArchivosController {
  constructor() { }

  /**
   *
   * @param type
   * @param id
   */
  @get('/archivos/{type}', {
    responses: {
      200: {
        content: {
          //String[]
          'aplication/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'A list of files',
      },
    },
  })
  async listArchivos(
    @param.path.number('type') type: number,) {
    const rutaCarpeta = this.ObtenerRutaCarpetaPorTipo(type);
    const archivos = await readdir(rutaCarpeta);
    return archivos;
  }

  /**
   *
   * @param type
   * @param recordId
   * @param response
   */
  @get('/archivo/{type}/{filename}')
  @oas.response.file()
  async descargarArchivo(
    @param.path.number('type') type: number,
    @param.path.string('filename') filename: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const rutaCarpeta = this.ObtenerRutaCarpetaPorTipo(type);
    const archivo = this.ValidarNombreArchivo(rutaCarpeta, filename);

    //console.log("folder: " + folder)
    //console.log("fname: " + filename)
    response.download(archivo, rutaCarpeta);
    return response;
  }

  /**
   * Get the folder when files are uploaded by type
   * @param type
   */
  private ObtenerRutaCarpetaPorTipo(type: number) {
    let ruta = '';
    switch (type) {
      //mascota
      case 1:
        ruta = path.join(__dirname, llaves.carpetaImagenPlatillo);
        break;
      case 2:
        ruta = path.join(__dirname, llaves.carpetaDocumentoPlatillo);
    }
    return ruta;
  }

  /**
   * Validate file names to prevent them goes beyond the default file
   * @param filename - File name
   */

  private ValidarNombreArchivo(archivo: string, folder: string) {
    const resolved = path.resolve(archivo, folder);
    if (resolved.startsWith(archivo)) return resolved;
    //The resolved file is outside sandbox
    throw new HttpErrors[400](`La ruta del archivo es inválida: ${folder}`)
  }

}
