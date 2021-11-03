import {Entity, model, property, hasMany} from '@loopback/repository';
import {Platillo} from './platillo.model';

@model()
export class Tipo extends Entity {
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

  @hasMany(() => Platillo, {keyTo: 'id_tipo'})
  platillos: Platillo[];

  constructor(data?: Partial<Tipo>) {
    super(data);
  }
}

export interface TipoRelations {
  // describe navigational properties here
}

export type TipoWithRelations = Tipo & TipoRelations;
