import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {UsuarioTienda, UsuarioTiendaRelations} from '../models';

export class UsuarioTiendaRepository extends DefaultCrudRepository<
  UsuarioTienda,
  typeof UsuarioTienda.prototype.id,
  UsuarioTiendaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(UsuarioTienda, dataSource);
  }
}
