import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Venta,
  Platillo,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaPlatilloController {
  constructor(
    @repository(VentaRepository)
    public ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/platillo', {
    responses: {
      '200': {
        description: 'Platillo belonging to Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Platillo)},
          },
        },
      },
    },
  })
  async getPlatillo(
    @param.path.number('id') id: typeof Venta.prototype.id,
  ): Promise<Platillo> {
    return this.ventaRepository.platillo(id);
  }
}
