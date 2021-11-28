
import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Tipo} from '../models';
import {TipoRepository} from '../repositories';

export class TipoController {
  constructor(
    @repository(TipoRepository)
    public tipoRepository: TipoRepository,
  ) { }

  @authenticate("admin")
  @post('/tipos')
  @response(200, {
    description: 'Tipo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tipo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipo, {
            title: 'NewTipo',
            exclude: ['id'],
          }),
        },
      },
    })
    tipo: Omit<Tipo, 'id'>,
  ): Promise<Tipo> {
    return this.tipoRepository.create(tipo);
  }

  @authenticate.skip()
  @get('/tipos/count')
  @response(200, {
    description: 'Tipo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tipo) where?: Where<Tipo>,
  ): Promise<Count> {
    return this.tipoRepository.count(where);
  }

  @authenticate.skip()
  @get('/tipos')
  @response(200, {
    description: 'Array of Tipo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tipo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tipo) filter?: Filter<Tipo>,
  ): Promise<Tipo[]> {
    return this.tipoRepository.find(filter);
  }

  @patch('/tipos')
  @response(200, {
    description: 'Tipo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipo, {partial: true}),
        },
      },
    })
    tipo: Tipo,
    @param.where(Tipo) where?: Where<Tipo>,
  ): Promise<Count> {
    return this.tipoRepository.updateAll(tipo, where);
  }

  @authenticate.skip()
  @get('/tipos/{id}')
  @response(200, {
    description: 'Tipo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tipo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tipo, {exclude: 'where'}) filter?: FilterExcludingWhere<Tipo>
  ): Promise<Tipo> {
    return this.tipoRepository.findById(id, filter);
  }

  @patch('/tipos/{id}')
  @response(204, {
    description: 'Tipo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipo, {partial: true}),
        },
      },
    })
    tipo: Tipo,
  ): Promise<void> {
    await this.tipoRepository.updateById(id, tipo);
  }

  @put('/tipos/{id}')
  @response(204, {
    description: 'Tipo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipo: Tipo,
  ): Promise<void> {
    await this.tipoRepository.replaceById(id, tipo);
  }
  @authenticate("admin")
  @del('/tipos/{id}')
  @response(204, {
    description: 'Tipo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoRepository.deleteById(id);
  }
}
