import {Entity, model, property} from '@loopback/repository';

@model()
export class UsuarioRepartidor extends Entity {
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
  id_repartidor?: number;

  constructor(data?: Partial<UsuarioRepartidor>) {
    super(data);
  }
}

export interface UsuarioRepartidorRelations {
  // describe navigational properties here
}

export type UsuarioRepartidorWithRelations = UsuarioRepartidor & UsuarioRepartidorRelations;
