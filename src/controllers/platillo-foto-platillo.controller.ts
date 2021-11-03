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
  Platillo,
  FotoPlatillo,
} from '../models';
import {PlatilloRepository} from '../repositories';

export class PlatilloFotoPlatilloController {
  constructor(
    @repository(PlatilloRepository) protected platilloRepository: PlatilloRepository,
  ) { }

  @get('/platillos/{id}/foto-platillos', {
    responses: {
      '200': {
        description: 'Array of Platillo has many FotoPlatillo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FotoPlatillo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<FotoPlatillo>,
  ): Promise<FotoPlatillo[]> {
    return this.platilloRepository.fotos(id).find(filter);
  }

  @post('/platillos/{id}/foto-platillos', {
    responses: {
      '200': {
        description: 'Platillo model instance',
        content: {'application/json': {schema: getModelSchemaRef(FotoPlatillo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Platillo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoPlatillo, {
            title: 'NewFotoPlatilloInPlatillo',
            exclude: ['id'],
            optional: ['id_platillo']
          }),
        },
      },
    }) fotoPlatillo: Omit<FotoPlatillo, 'id'>,
  ): Promise<FotoPlatillo> {
    return this.platilloRepository.fotos(id).create(fotoPlatillo);
  }

  @patch('/platillos/{id}/foto-platillos', {
    responses: {
      '200': {
        description: 'Platillo.FotoPlatillo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoPlatillo, {partial: true}),
        },
      },
    })
    fotoPlatillo: Partial<FotoPlatillo>,
    @param.query.object('where', getWhereSchemaFor(FotoPlatillo)) where?: Where<FotoPlatillo>,
  ): Promise<Count> {
    return this.platilloRepository.fotos(id).patch(fotoPlatillo, where);
  }

  @del('/platillos/{id}/foto-platillos', {
    responses: {
      '200': {
        description: 'Platillo.FotoPlatillo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FotoPlatillo)) where?: Where<FotoPlatillo>,
  ): Promise<Count> {
    return this.platilloRepository.fotos(id).delete(where);
  }
}
