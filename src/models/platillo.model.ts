import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Tipo} from './tipo.model';
import {Categoria} from './categoria.model';
import {CategoriaPlatillo} from './categoria-platillo.model';
import {FotoPlatillo} from './foto-platillo.model';
import {Tienda} from './tienda.model';

@model()
export class Platillo extends Entity {
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
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    default: 0,
  })
  descuento?: number;

  @property({
    type: 'number',
    default: 1,
  })
  estado?: number;

  @belongsTo(() => Tipo, {name: 'tipo'})
  id_platillo: number;

  @property({
    type: 'number',
  })
  id_tipo?: number;

  @hasMany(() => Categoria, {through: {model: () => CategoriaPlatillo, keyFrom: 'id_platillo', keyTo: 'id_categoria'}})
  categorias: Categoria[];

  @hasMany(() => FotoPlatillo, {keyTo: 'id_platillo'})
  fotos: FotoPlatillo[];

  @belongsTo(() => Tienda, {name: 'tienda'})
  id_tienda: number;

  constructor(data?: Partial<Platillo>) {
    super(data);
  }
}

export interface PlatilloRelations {
  // describe navigational properties here
}

export type PlatilloWithRelations = Platillo & PlatilloRelations;
