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
  UsuarioRepartidor,
} from '../models';
import {RepartidorRepository} from '../repositories';

export class RepartidorUsuarioRepartidorController {
  constructor(
    @repository(RepartidorRepository) protected repartidorRepository: RepartidorRepository,
  ) { }

  @get('/repartidors/{id}/usuario-repartidor', {
    responses: {
      '200': {
        description: 'Repartidor has one UsuarioRepartidor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UsuarioRepartidor),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UsuarioRepartidor>,
  ): Promise<UsuarioRepartidor> {
    return this.repartidorRepository.usuarioRepartidor(id).get(filter);
  }

  @post('/repartidors/{id}/usuario-repartidor', {
    responses: {
      '200': {
        description: 'Repartidor model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsuarioRepartidor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Repartidor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioRepartidor, {
            title: 'NewUsuarioRepartidorInRepartidor',
            exclude: ['id'],
            optional: ['id_repartidor']
          }),
        },
      },
    }) usuarioRepartidor: Omit<UsuarioRepartidor, 'id'>,
  ): Promise<UsuarioRepartidor> {
    return this.repartidorRepository.usuarioRepartidor(id).create(usuarioRepartidor);
  }

  @patch('/repartidors/{id}/usuario-repartidor', {
    responses: {
      '200': {
        description: 'Repartidor.UsuarioRepartidor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioRepartidor, {partial: true}),
        },
      },
    })
    usuarioRepartidor: Partial<UsuarioRepartidor>,
    @param.query.object('where', getWhereSchemaFor(UsuarioRepartidor)) where?: Where<UsuarioRepartidor>,
  ): Promise<Count> {
    return this.repartidorRepository.usuarioRepartidor(id).patch(usuarioRepartidor, where);
  }

  @del('/repartidors/{id}/usuario-repartidor', {
    responses: {
      '200': {
        description: 'Repartidor.UsuarioRepartidor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UsuarioRepartidor)) where?: Where<UsuarioRepartidor>,
  ): Promise<Count> {
    return this.repartidorRepository.usuarioRepartidor(id).delete(where);
  }
}
