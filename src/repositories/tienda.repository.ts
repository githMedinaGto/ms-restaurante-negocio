import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Tienda, TiendaRelations, Platillo, UsuarioTienda} from '../models';
import {PlatilloRepository} from './platillo.repository';
import {UsuarioTiendaRepository} from './usuario-tienda.repository';

export class TiendaRepository extends DefaultCrudRepository<
  Tienda,
  typeof Tienda.prototype.id,
  TiendaRelations
> {

  public readonly platillos: HasManyRepositoryFactory<Platillo, typeof Tienda.prototype.id>;

  public readonly usuarioTienda: HasOneRepositoryFactory<UsuarioTienda, typeof Tienda.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlatilloRepository') protected platilloRepositoryGetter: Getter<PlatilloRepository>, @repository.getter('UsuarioTiendaRepository') protected usuarioTiendaRepositoryGetter: Getter<UsuarioTiendaRepository>,
  ) {
    super(Tienda, dataSource);
    this.usuarioTienda = this.createHasOneRepositoryFactoryFor('usuarioTienda', usuarioTiendaRepositoryGetter);
    this.registerInclusionResolver('usuarioTienda', this.usuarioTienda.inclusionResolver);
    this.platillos = this.createHasManyRepositoryFactoryFor('platillos', platilloRepositoryGetter,);
    this.registerInclusionResolver('platillos', this.platillos.inclusionResolver);
  }
}
