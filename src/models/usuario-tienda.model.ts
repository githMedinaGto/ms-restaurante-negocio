import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_tienda_id_tienda: {
        name: 'fk_tienda_id_tienda',
        entity: 'Tienda',
        entityKey: 'id',
        foreignKey: 'id_tienda',
      }
    }
  }
})
export class UsuarioTienda extends Entity {
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
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'number',
  })
  id_tienda?: number;

  constructor(data?: Partial<UsuarioTienda>) {
    super(data);
  }
}

export interface UsuarioTiendaRelations {
  // describe navigational properties here
}

export type UsuarioTiendaWithRelations = UsuarioTienda & UsuarioTiendaRelations;
