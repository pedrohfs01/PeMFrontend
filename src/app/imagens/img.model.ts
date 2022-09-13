import { Ambiente } from "../ambientes/ambiente.model";
import { Comentario, Usuario } from "../auth/usuario.model";

export class Imagem{
  id?: number;
  imageUrl?: string;
  legenda?: string;
  instante?: Date;
  autor?: Usuario;
  ambiente?: Ambiente;
  comentarios?: Comentario[];
  showComments?: boolean = false;
}

export class ImagemDTO{

  legenda?: string;
  autorId?: number;
  ambienteId?: number;

}
