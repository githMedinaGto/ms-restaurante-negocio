import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {UsuarioRepartidor, UsuarioRepartidorRelations} from '../models';

export class UsuarioRepartidorRepository extends DefaultCrudRepository<
  UsuarioRepartidor,
  typeof UsuarioRepartidor.prototype.id,
  UsuarioRepartidorRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(UsuarioRepartidor, dataSource);
  }
}
