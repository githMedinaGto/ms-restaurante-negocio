import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Repartidor,
  Cliente,
} from '../models';
import {RepartidorRepository} from '../repositories';

export class RepartidorClienteController {
  constructor(
    @repository(RepartidorRepository) protected repartidorRepository: RepartidorRepository,
  ) { }

  @get('/repartidors/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Repartidor has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.repartidorRepository.clientes(id).find(filter);
  }

  @post('/repartidors/{id}/clientes', {
    responses: {
      '200': {
        description: 'Repartidor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Repartidor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInRepartidor',
            exclude: ['id'],
            optional: ['id_repartidor']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.repartidorRepository.clientes(id).create(cliente);
  }

  @patch('/repartidors/{id}/clientes', {
    responses: {
      '200': {
        description: 'Repartidor.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.repartidorRepository.clientes(id).patch(cliente, where);
  }

  @del('/repartidors/{id}/clientes', {
    responses: {
      '200': {
        description: 'Repartidor.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.repartidorRepository.clientes(id).delete(where);
  }
}
