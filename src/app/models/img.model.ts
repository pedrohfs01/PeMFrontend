import { Ambiente } from "./ambiente.model";
import { Usuario } from "./usuario.model";
import { Comentario } from "./comentario.model";

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
