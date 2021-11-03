import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Platillo} from './platillo.model';
import {UsuarioTienda} from './usuario-tienda.model';

@model()
export class Tienda extends Entity {
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
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @hasMany(() => Platillo, {keyTo: 'id_tienda'})
  platillos: Platillo[];

  @hasOne(() => UsuarioTienda, {keyTo: 'id_tienda'})
  usuarioTienda: UsuarioTienda;

  constructor(data?: Partial<Tienda>) {
    super(data);
  }
}

export interface TiendaRelations {
  // describe navigational properties here
}

export type TiendaWithRelations = Tienda & TiendaRelations;
