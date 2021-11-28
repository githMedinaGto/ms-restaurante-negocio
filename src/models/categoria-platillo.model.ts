import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_cat_pla_id_platillo: {
        name: 'fk_cat_pla_id_platillo',
        entity: 'Platillo',
        entityKey: 'id',
        foreignKey: 'id_platillo',
      },
      fk_cat_pla_id_categoria: {
        name: 'fk_cat_pla_id_categoria',
        entity: 'Categoria',
        entityKey: 'id',
        foreignKey: 'id_categoria',
      }
    }
  }
})
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
