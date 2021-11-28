// Uncomment these imports to begin using these cool features!

/*import {inject} from '@loopback/context';
import {post, requestBody} from '@loopback/openapi-v3';
import {RestBindings} from '@loopback/rest';*/
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors, param, post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {Keys as llaves} from '../config/keys';
import {FotoPlatillo} from '../models';
import {FotoPlatilloRepository} from '../repositories/foto-platillo.repository';



// import {inject} from '@loopback/core';

export class CargaArchicvosController {
  constructor(
    @repository(FotoPlatilloRepository)
    private fotoRepository: FotoPlatilloRepository
  ) { }


  /**
   *
   * @param response
   * @param request
   */

  @post('/cargarImagenPrincipalPlatillo', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            }
          }
        },
        description: 'Función de carga de la imagen principal de un platillo',
      },
    },
  })
  async cargarImagenPrincipalDelPlatillo(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request
  ): Promise<object | false> {
    const rutaImagenPlatillo = path.join(__dirname, llaves.carpetaImagenPlatillo);
    const res = await this.StoreFileToPath(rutaImagenPlatillo, llaves.nombreCampoImagenPlatillo, request, response, llaves.extensionesPermitidasIMG);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  @post('/cargarImagenPlatillo/{id_platillo}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            }
          }
        },
        description: 'Función de carga de la imagen de la persona',
      },
    },
  })
  async cargarImagenDelPlatillo(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number("id_platillo") id: number
  ): Promise<object | false> {
    const rutaImagenPlatillo = path.join(__dirname, llaves.carpetaImagenPlatillo);
    const res = await this.StoreFileToPath(rutaImagenPlatillo, llaves.nombreCampoImagenPlatillo, request, response, llaves.extensionesPermitidasIMG);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        const foto = new FotoPlatillo();
        foto.id_platillo = id;
        foto.nombre = nombre_archivo;
        await this.fotoRepository.save(foto);
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  @post('/CargarDocumentoPlatillo', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de documentos de la persona'
      },
    },
  })
  async DocumentosPlatillo(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const rutaDocumentoPlatillo = path.join(__dirname, llaves.carpetaDocumentoPlatillo);
    const res = await this.StoreFileToPath(rutaDocumentoPlatillo, llaves.nombreCampoDocumentoPlatillo, request, response, llaves.extensionesPermitidasDOC);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        return {filename: nombre_archivo};
      }
    }
    return res;
  }


  /**
   *
   * Return  a config for multer storage
   * @param path
   */

  private GetMulterStorageConfig(path: string) {
    let filename = '';
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, path);
      },
      filename: function (req: any, file: any, cb: any) {
        filename = `${Date.now()}-${file.originalname}`
        cb(null, filename);
      }
    });
    return storage;
  }

  /**
   *
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */

  private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req: any, file: any, callback: any) {
          const ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('El formato del archivo no es permitido.'));
        },
        limits: {
          fileSize: llaves.tamMaxImagenPlatillo
        }
      },
      ).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }


}
