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
  Platillo,
} from '../models';
import {TiendaRepository} from '../repositories';

export class TiendaPlatilloController {
  constructor(
    @repository(TiendaRepository) protected tiendaRepository: TiendaRepository,
  ) { }

  @get('/tiendas/{id}/platillos', {
    responses: {
      '200': {
        description: 'Array of Tienda has many Platillo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Platillo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Platillo>,
  ): Promise<Platillo[]> {
    return this.tiendaRepository.platillos(id).find(filter);
  }

  @post('/tiendas/{id}/platillos', {
    responses: {
      '200': {
        description: 'Tienda model instance',
        content: {'application/json': {schema: getModelSchemaRef(Platillo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tienda.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Platillo, {
            title: 'NewPlatilloInTienda',
            exclude: ['id'],
            optional: ['id_tienda']
          }),
        },
      },
    }) platillo: Omit<Platillo, 'id'>,
  ): Promise<Platillo> {
    return this.tiendaRepository.platillos(id).create(platillo);
  }

  @patch('/tiendas/{id}/platillos', {
    responses: {
      '200': {
        description: 'Tienda.Platillo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Platillo, {partial: true}),
        },
      },
    })
    platillo: Partial<Platillo>,
    @param.query.object('where', getWhereSchemaFor(Platillo)) where?: Where<Platillo>,
  ): Promise<Count> {
    return this.tiendaRepository.platillos(id).patch(platillo, where);
  }

  @del('/tiendas/{id}/platillos', {
    responses: {
      '200': {
        description: 'Tienda.Platillo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Platillo)) where?: Where<Platillo>,
  ): Promise<Count> {
    return this.tiendaRepository.platillos(id).delete(where);
  }
}
