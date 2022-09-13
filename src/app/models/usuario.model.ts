import { Ambiente } from "./ambiente.model";
import { Imagem } from "./img.model";
import { Comentario } from "./comentario.model";

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



