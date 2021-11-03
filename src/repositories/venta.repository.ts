import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Venta, VentaRelations, Platillo, Factura} from '../models';
import {PlatilloRepository} from './platillo.repository';
import {FacturaRepository} from './factura.repository';

export class VentaRepository extends DefaultCrudRepository<
  Venta,
  typeof Venta.prototype.id,
  VentaRelations
> {

  public readonly platillo: BelongsToAccessor<Platillo, typeof Venta.prototype.id>;

  public readonly factura: HasOneRepositoryFactory<Factura, typeof Venta.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlatilloRepository') protected platilloRepositoryGetter: Getter<PlatilloRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Venta, dataSource);
    this.factura = this.createHasOneRepositoryFactoryFor('factura', facturaRepositoryGetter);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
    this.platillo = this.createBelongsToAccessorFor('platillo', platilloRepositoryGetter,);
    this.registerInclusionResolver('platillo', this.platillo.inclusionResolver);
  }
}
