import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_factura_id_venta: {
        name: 'fk_factura_id_venta',
        entity: 'Venta',
        entityKey: 'id',
        foreignKey: 'id_venta',
      }
    }
  }
})
export class Factura extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  consecutivo: number;

  @property({
    type: 'number',
    required: true,
  })
  total_venta: number;

  @property({
    type: 'number',
  })
  id_venta?: number;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
