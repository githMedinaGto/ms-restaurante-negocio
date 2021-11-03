import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Repartidor, RepartidorRelations, UsuarioRepartidor, Cliente, Venta} from '../models';
import {UsuarioRepartidorRepository} from './usuario-repartidor.repository';
import {ClienteRepository} from './cliente.repository';
import {VentaRepository} from './venta.repository';

export class RepartidorRepository extends DefaultCrudRepository<
  Repartidor,
  typeof Repartidor.prototype.id,
  RepartidorRelations
> {

  public readonly usuarioRepartidor: HasOneRepositoryFactory<UsuarioRepartidor, typeof Repartidor.prototype.id>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Repartidor.prototype.id>;

  public readonly ventas: HasManyRepositoryFactory<Venta, typeof Repartidor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioRepartidorRepository') protected usuarioRepartidorRepositoryGetter: Getter<UsuarioRepartidorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Repartidor, dataSource);
    this.ventas = this.createHasManyRepositoryFactoryFor('ventas', ventaRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.usuarioRepartidor = this.createHasOneRepositoryFactoryFor('usuarioRepartidor', usuarioRepartidorRepositoryGetter);
    this.registerInclusionResolver('usuarioRepartidor', this.usuarioRepartidor.inclusionResolver);
  }
}
