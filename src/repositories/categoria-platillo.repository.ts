import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CategoriaPlatillo, CategoriaPlatilloRelations} from '../models';

export class CategoriaPlatilloRepository extends DefaultCrudRepository<
  CategoriaPlatillo,
  typeof CategoriaPlatillo.prototype.id,
  CategoriaPlatilloRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(CategoriaPlatillo, dataSource);
  }
}
