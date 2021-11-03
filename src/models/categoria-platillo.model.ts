import {Entity, model, property} from '@loopback/repository';

@model()
export class CategoriaPlatillo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_platillo?: number;

  @property({
    type: 'number',
  })
  id_categoria?: number;

  constructor(data?: Partial<CategoriaPlatillo>) {
    super(data);
  }
}

export interface CategoriaPlatilloRelations {
  // describe navigational properties here
}

export type CategoriaPlatilloWithRelations = CategoriaPlatillo & CategoriaPlatilloRelations;
