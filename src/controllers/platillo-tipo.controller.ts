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
  Tipo,
} from '../models';
import {PlatilloRepository} from '../repositories';

export class PlatilloTipoController {
  constructor(
    @repository(PlatilloRepository)
    public platilloRepository: PlatilloRepository,
  ) { }

  @get('/platillos/{id}/tipo', {
    responses: {
      '200': {
        description: 'Tipo belonging to Platillo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tipo)},
          },
        },
      },
    },
  })
  async getTipo(
    @param.path.number('id') id: typeof Platillo.prototype.id,
  ): Promise<Tipo> {
    return this.platilloRepository.tipo(id);
  }
}
