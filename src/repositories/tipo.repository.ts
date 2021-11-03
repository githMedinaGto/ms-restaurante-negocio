import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Tipo, TipoRelations, Platillo} from '../models';
import {PlatilloRepository} from './platillo.repository';

export class TipoRepository extends DefaultCrudRepository<
  Tipo,
  typeof Tipo.prototype.id,
  TipoRelations
> {

  public readonly platillos: HasManyRepositoryFactory<Platillo, typeof Tipo.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlatilloRepository') protected platilloRepositoryGetter: Getter<PlatilloRepository>,
  ) {
    super(Tipo, dataSource);
    this.platillos = this.createHasManyRepositoryFactoryFor('platillos', platilloRepositoryGetter,);
    this.registerInclusionResolver('platillos', this.platillos.inclusionResolver);
  }
}
