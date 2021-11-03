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
  Tienda,
  UsuarioTienda,
} from '../models';
import {TiendaRepository} from '../repositories';

export class TiendaUsuarioTiendaController {
  constructor(
    @repository(TiendaRepository) protected tiendaRepository: TiendaRepository,
  ) { }

  @get('/tiendas/{id}/usuario-tienda', {
    responses: {
      '200': {
        description: 'Tienda has one UsuarioTienda',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UsuarioTienda),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UsuarioTienda>,
  ): Promise<UsuarioTienda> {
    return this.tiendaRepository.usuarioTienda(id).get(filter);
  }

  @post('/tiendas/{id}/usuario-tienda', {
    responses: {
      '200': {
        description: 'Tienda model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsuarioTienda)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tienda.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioTienda, {
            title: 'NewUsuarioTiendaInTienda',
            exclude: ['id'],
            optional: ['id_tienda']
          }),
        },
      },
    }) usuarioTienda: Omit<UsuarioTienda, 'id'>,
  ): Promise<UsuarioTienda> {
    return this.tiendaRepository.usuarioTienda(id).create(usuarioTienda);
  }

  @patch('/tiendas/{id}/usuario-tienda', {
    responses: {
      '200': {
        description: 'Tienda.UsuarioTienda PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioTienda, {partial: true}),
        },
      },
    })
    usuarioTienda: Partial<UsuarioTienda>,
    @param.query.object('where', getWhereSchemaFor(UsuarioTienda)) where?: Where<UsuarioTienda>,
  ): Promise<Count> {
    return this.tiendaRepository.usuarioTienda(id).patch(usuarioTienda, where);
  }

  @del('/tiendas/{id}/usuario-tienda', {
    responses: {
      '200': {
        description: 'Tienda.UsuarioTienda DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UsuarioTienda)) where?: Where<UsuarioTienda>,
  ): Promise<Count> {
    return this.tiendaRepository.usuarioTienda(id).delete(where);
  }
}
