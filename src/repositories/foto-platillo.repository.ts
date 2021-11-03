import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {FotoPlatillo, FotoPlatilloRelations} from '../models';

export class FotoPlatilloRepository extends DefaultCrudRepository<
  FotoPlatillo,
  typeof FotoPlatillo.prototype.id,
  FotoPlatilloRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(FotoPlatillo, dataSource);
  }
}
