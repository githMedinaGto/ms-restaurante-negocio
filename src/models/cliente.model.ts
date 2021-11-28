import {belongsTo, Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Repartidor} from './repartidor.model';
import {UsuarioCliente} from './usuario-cliente.model';
import {Venta} from './venta.model';

@model({
  settings: {
    /*foreignKeys: {
      fk_cliente_id_repartidor: {
        name: 'fk_cliente_id_repartidor',
        entity: 'Repartidor',
        entityKey: 'id',
        foreignKey: 'id_repartidor',
      }
    }*/
  }
})
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
