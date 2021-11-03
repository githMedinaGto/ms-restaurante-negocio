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
  Venta,
} from '../models';
import {RepartidorRepository} from '../repositories';

export class RepartidorVentaController {
  constructor(
    @repository(RepartidorRepository) protected repartidorRepository: RepartidorRepository,
  ) { }

  @get('/repartidors/{id}/ventas', {
    responses: {
      '200': {
        description: 'Array of Repartidor has many Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Venta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Venta>,
  ): Promise<Venta[]> {
    return this.repartidorRepository.ventas(id).find(filter);
  }

  @post('/repartidors/{id}/ventas', {
    responses: {
      '200': {
        description: 'Repartidor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Venta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Repartidor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {
            title: 'NewVentaInRepartidor',
            exclude: ['id'],
            optional: ['id_vendedor']
          }),
        },
      },
    }) venta: Omit<Venta, 'id'>,
  ): Promise<Venta> {
    return this.repartidorRepository.ventas(id).create(venta);
  }

  @patch('/repartidors/{id}/ventas', {
    responses: {
      '200': {
        description: 'Repartidor.Venta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {partial: true}),
        },
      },
    })
    venta: Partial<Venta>,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.repartidorRepository.ventas(id).patch(venta, where);
  }

  @del('/repartidors/{id}/ventas', {
    responses: {
      '200': {
        description: 'Repartidor.Venta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.repartidorRepository.ventas(id).delete(where);
  }
}
