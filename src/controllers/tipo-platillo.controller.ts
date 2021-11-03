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
  Tipo,
  Platillo,
} from '../models';
import {TipoRepository} from '../repositories';

export class TipoPlatilloController {
  constructor(
    @repository(TipoRepository) protected tipoRepository: TipoRepository,
  ) { }

  @get('/tipos/{id}/platillos', {
    responses: {
      '200': {
        description: 'Array of Tipo has many Platillo',
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
    return this.tipoRepository.platillos(id).find(filter);
  }

  @post('/tipos/{id}/platillos', {
    responses: {
      '200': {
        description: 'Tipo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Platillo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tipo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Platillo, {
            title: 'NewPlatilloInTipo',
            exclude: ['id'],
            optional: ['id_tipo']
          }),
        },
      },
    }) platillo: Omit<Platillo, 'id'>,
  ): Promise<Platillo> {
    return this.tipoRepository.platillos(id).create(platillo);
  }

  @patch('/tipos/{id}/platillos', {
    responses: {
      '200': {
        description: 'Tipo.Platillo PATCH success count',
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
    return this.tipoRepository.platillos(id).patch(platillo, where);
  }

  @del('/tipos/{id}/platillos', {
    responses: {
      '200': {
        description: 'Tipo.Platillo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Platillo)) where?: Where<Platillo>,
  ): Promise<Count> {
    return this.tipoRepository.platillos(id).delete(where);
  }
}
