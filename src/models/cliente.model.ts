import {Entity, model, property, hasOne, belongsTo, hasMany} from '@loopback/repository';
import {UsuarioCliente} from './usuario-cliente.model';
import {Repartidor} from './repartidor.model';
import {Venta} from './venta.model';

@model()
export class Cliente extends Entity {
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
  primer_nombre: string;

  @property({
    type: 'string',
    default: "",
  })
  otros_nombres?: string;

  @property({
    type: 'string',
    required: true,
  })
  primer_apellido: string;

  @property({
    type: 'string',
    default: "",
  })
  segundo_apellido?: string;

  @property({
    type: 'string',
    required: true,
  })
  domicilio: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @hasOne(() => UsuarioCliente, {keyTo: 'id_cliente'})
  usuarioCliente: UsuarioCliente;

  @belongsTo(() => Repartidor, {name: 'repartidor'})
  id_repartidor: number;

  @hasMany(() => Venta, {keyTo: 'id_cliente'})
  compras: Venta[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
