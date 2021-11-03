import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Platillo} from './platillo.model';
import {Factura} from './factura.model';

@model()
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
