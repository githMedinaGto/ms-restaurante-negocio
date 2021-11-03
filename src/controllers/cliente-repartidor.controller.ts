import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Repartidor,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteRepartidorController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/repartidor', {
    responses: {
      '200': {
        description: 'Repartidor belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Repartidor)},
          },
        },
      },
    },
  })
  async getRepartidor(
    @param.path.number('id') id: typeof Cliente.prototype.id,
  ): Promise<Repartidor> {
    return this.clienteRepository.repartidor(id);
  }
}
