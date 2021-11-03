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
CategoriaPlatillo,
Categoria,
} from '../models';
import {PlatilloRepository} from '../repositories';

export class PlatilloCategoriaController {
  constructor(
    @repository(PlatilloRepository) protected platilloRepository: PlatilloRepository,
  ) { }

  @get('/platillos/{id}/categorias', {
    responses: {
      '200': {
        description: 'Array of Platillo has many Categoria through CategoriaPlatillo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categoria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Categoria>,
  ): Promise<Categoria[]> {
    return this.platilloRepository.categorias(id).find(filter);
  }

  @post('/platillos/{id}/categorias', {
    responses: {
      '200': {
        description: 'create a Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Categoria)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Platillo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {
            title: 'NewCategoriaInPlatillo',
            exclude: ['id'],
          }),
        },
      },
    }) categoria: Omit<Categoria, 'id'>,
  ): Promise<Categoria> {
    return this.platilloRepository.categorias(id).create(categoria);
  }

  @patch('/platillos/{id}/categorias', {
    responses: {
      '200': {
        description: 'Platillo.Categoria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {partial: true}),
        },
      },
    })
    categoria: Partial<Categoria>,
    @param.query.object('where', getWhereSchemaFor(Categoria)) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.platilloRepository.categorias(id).patch(categoria, where);
  }

  @del('/platillos/{id}/categorias', {
    responses: {
      '200': {
        description: 'Platillo.Categoria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Categoria)) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.platilloRepository.categorias(id).delete(where);
  }
}
