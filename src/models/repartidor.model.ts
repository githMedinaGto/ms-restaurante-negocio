import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {UsuarioRepartidor} from './usuario-repartidor.model';
import {Cliente} from './cliente.model';
import {Venta} from './venta.model';

@model()
export class Repartidor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @hasOne(() => UsuarioRepartidor, {keyTo: 'id_repartidor'})
  usuarioRepartidor: UsuarioRepartidor;

  @hasMany(() => Cliente, {keyTo: 'id_repartidor'})
  clientes: Cliente[];

  @hasMany(() => Venta, {keyTo: 'id_vendedor'})
  ventas: Venta[];

  constructor(data?: Partial<Repartidor>) {
    super(data);
  }
}

export interface RepartidorRelations {
  // describe navigational properties here
}

export type RepartidorWithRelations = Repartidor & RepartidorRelations;
