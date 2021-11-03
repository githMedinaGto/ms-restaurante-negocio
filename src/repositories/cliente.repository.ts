import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, UsuarioCliente, Repartidor, Venta} from '../models';
import {UsuarioClienteRepository} from './usuario-cliente.repository';
import {RepartidorRepository} from './repartidor.repository';
import {VentaRepository} from './venta.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly usuarioCliente: HasOneRepositoryFactory<UsuarioCliente, typeof Cliente.prototype.id>;

  public readonly repartidor: BelongsToAccessor<Repartidor, typeof Cliente.prototype.id>;

  public readonly compras: HasManyRepositoryFactory<Venta, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioClienteRepository') protected usuarioClienteRepositoryGetter: Getter<UsuarioClienteRepository>, @repository.getter('RepartidorRepository') protected repartidorRepositoryGetter: Getter<RepartidorRepository>, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Cliente, dataSource);
    this.compras = this.createHasManyRepositoryFactoryFor('compras', ventaRepositoryGetter,);
    this.registerInclusionResolver('compras', this.compras.inclusionResolver);
    this.repartidor = this.createBelongsToAccessorFor('repartidor', repartidorRepositoryGetter,);
    this.registerInclusionResolver('repartidor', this.repartidor.inclusionResolver);
    this.usuarioCliente = this.createHasOneRepositoryFactoryFor('usuarioCliente', usuarioClienteRepositoryGetter);
    this.registerInclusionResolver('usuarioCliente', this.usuarioCliente.inclusionResolver);
  }
}
