import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_platillo_id_platillo: {
        name: 'fk_platillo_id_platillo',
        entity: 'Platillo',
        entityKey: 'id',
        foreignKey: 'id_platillo',
      }
    }
  }
})
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
