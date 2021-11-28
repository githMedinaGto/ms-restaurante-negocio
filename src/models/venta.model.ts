import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Factura} from './factura.model';
import {Platillo} from './platillo.model';

@model({
  settings: {
    foreignKeys: {
      fk_factura_id_platillo: {
        name: 'fk_factura_id_platillo',
        entity: 'Platillo',
        entityKey: 'id',
        foreignKey: 'id_platillo',
      },
      fk_repartidor_id_repartidor: {
        name: 'fk_repartidor_id_repartidor',
        entity: 'Repartidor',
        entityKey: 'id',
        foreignKey: 'id_vendedor',
      },
      fk_cliente_id_cliente: {
        name: 'fk_cliente_id_cliente',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'id_cliente',
      }
    }
  }
})
export class Venta extends Entity {
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
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
  })
  id_vendedor?: number;

  @property({
    type: 'number',
  })
  id_cliente?: number;

  @belongsTo(() => Platillo, {name: 'platillo'})
  id_platillo: number;

  @hasOne(() => Factura, {keyTo: 'id_venta'})
  factura: Factura;

  constructor(data?: Partial<Venta>) {
    super(data);
  }
}

export interface VentaRelations {
  // describe navigational properties here
}

export type VentaWithRelations = Venta & VentaRelations;
