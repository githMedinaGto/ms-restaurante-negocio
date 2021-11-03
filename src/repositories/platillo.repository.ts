import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Platillo, PlatilloRelations, Tipo, Categoria, CategoriaPlatillo, FotoPlatillo, Tienda} from '../models';
import {TipoRepository} from './tipo.repository';
import {CategoriaPlatilloRepository} from './categoria-platillo.repository';
import {CategoriaRepository} from './categoria.repository';
import {FotoPlatilloRepository} from './foto-platillo.repository';
import {TiendaRepository} from './tienda.repository';

export class PlatilloRepository extends DefaultCrudRepository<
  Platillo,
  typeof Platillo.prototype.id,
  PlatilloRelations
> {

  public readonly tipo: BelongsToAccessor<Tipo, typeof Platillo.prototype.id>;

  public readonly categorias: HasManyThroughRepositoryFactory<Categoria, typeof Categoria.prototype.id,
          CategoriaPlatillo,
          typeof Platillo.prototype.id
        >;

  public readonly fotos: HasManyRepositoryFactory<FotoPlatillo, typeof Platillo.prototype.id>;

  public readonly tienda: BelongsToAccessor<Tienda, typeof Platillo.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoRepository') protected tipoRepositoryGetter: Getter<TipoRepository>, @repository.getter('CategoriaPlatilloRepository') protected categoriaPlatilloRepositoryGetter: Getter<CategoriaPlatilloRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('FotoPlatilloRepository') protected fotoPlatilloRepositoryGetter: Getter<FotoPlatilloRepository>, @repository.getter('TiendaRepository') protected tiendaRepositoryGetter: Getter<TiendaRepository>,
  ) {
    super(Platillo, dataSource);
    this.tienda = this.createBelongsToAccessorFor('tienda', tiendaRepositoryGetter,);
    this.registerInclusionResolver('tienda', this.tienda.inclusionResolver);
    this.fotos = this.createHasManyRepositoryFactoryFor('fotos', fotoPlatilloRepositoryGetter,);
    this.registerInclusionResolver('fotos', this.fotos.inclusionResolver);
    this.categorias = this.createHasManyThroughRepositoryFactoryFor('categorias', categoriaRepositoryGetter, categoriaPlatilloRepositoryGetter,);
    this.registerInclusionResolver('categorias', this.categorias.inclusionResolver);
    this.tipo = this.createBelongsToAccessorFor('tipo', tipoRepositoryGetter,);
    this.registerInclusionResolver('tipo', this.tipo.inclusionResolver);
  }
}
