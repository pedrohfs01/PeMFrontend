import { Ambiente } from "../ambientes/ambiente.model";
import { Imagem } from "../imagens/img.model";

export class Usuario{

  id?: number;
  nome?: string;
  login?: string;
  senha?: string;

  comentarios?: Comentario[];
  imagens?: Imagem[];
  ambientesCriador?: Ambiente[];
  ambientes?: Ambiente[];
}


export class CredenciaisDTO{

  login?: string;
  senha?: string;

}


export class Comentario{

  id?: number;
  comentario?: string;
  instante?: Date;
  autor?: Usuario;
  imagem?: Imagem;

}
