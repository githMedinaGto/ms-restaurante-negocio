import {Entity, model, property} from '@loopback/repository';

@model()
export class FotoPlatillo extends Entity {
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
    type: 'number',
  })
  id_platillo?: number;

  constructor(data?: Partial<FotoPlatillo>) {
    super(data);
  }
}

export interface FotoPlatilloRelations {
  // describe navigational properties here
}

export type FotoPlatilloWithRelations = FotoPlatillo & FotoPlatilloRelations;
