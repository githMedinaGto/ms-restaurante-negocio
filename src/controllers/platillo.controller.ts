import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Platillo} from '../models';
import {PlatilloRepository} from '../repositories';

export class PlatilloController {
  constructor(
    @repository(PlatilloRepository)
    public platilloRepository : PlatilloRepository,
  ) {}

  @post('/platillos')
  @response(200, {
    description: 'Platillo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Platillo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Platillo, {
            title: 'NewPlatillo',
            exclude: ['id'],
          }),
        },
      },
    })
    platillo: Omit<Platillo, 'id'>,
  ): Promise<Platillo> {
    return this.platilloRepository.create(platillo);
  }

  @get('/platillos/count')
  @response(200, {
    description: 'Platillo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Platillo) where?: Where<Platillo>,
  ): Promise<Count> {
    return this.platilloRepository.count(where);
  }

  @get('/platillos')
  @response(200, {
    description: 'Array of Platillo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Platillo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Platillo) filter?: Filter<Platillo>,
  ): Promise<Platillo[]> {
    return this.platilloRepository.find(filter);
  }

  @patch('/platillos')
  @response(200, {
    description: 'Platillo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Platillo, {partial: true}),
        },
      },
    })
    platillo: Platillo,
    @param.where(Platillo) where?: Where<Platillo>,
  ): Promise<Count> {
    return this.platilloRepository.updateAll(platillo, where);
  }

  @get('/platillos/{id}')
  @response(200, {
    description: 'Platillo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Platillo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Platillo, {exclude: 'where'}) filter?: FilterExcludingWhere<Platillo>
  ): Promise<Platillo> {
    return this.platilloRepository.findById(id, filter);
  }

  @patch('/platillos/{id}')
  @response(204, {
    description: 'Platillo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Platillo, {partial: true}),
        },
      },
    })
    platillo: Platillo,
  ): Promise<void> {
    await this.platilloRepository.updateById(id, platillo);
  }

  @put('/platillos/{id}')
  @response(204, {
    description: 'Platillo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() platillo: Platillo,
  ): Promise<void> {
    await this.platilloRepository.replaceById(id, platillo);
  }

  @del('/platillos/{id}')
  @response(204, {
    description: 'Platillo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.platilloRepository.deleteById(id);
  }
}
