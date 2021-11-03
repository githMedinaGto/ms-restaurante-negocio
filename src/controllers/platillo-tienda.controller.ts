import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Platillo,
  Tienda,
} from '../models';
import {PlatilloRepository} from '../repositories';

export class PlatilloTiendaController {
  constructor(
    @repository(PlatilloRepository)
    public platilloRepository: PlatilloRepository,
  ) { }

  @get('/platillos/{id}/tienda', {
    responses: {
      '200': {
        description: 'Tienda belonging to Platillo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tienda)},
          },
        },
      },
    },
  })
  async getTienda(
    @param.path.number('id') id: typeof Platillo.prototype.id,
  ): Promise<Tienda> {
    return this.platilloRepository.tienda(id);
  }
}
