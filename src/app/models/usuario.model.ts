import { Ambiente } from "./ambiente.model";
import { Imagem } from "./img.model";
import { Comentario } from "./comentario.model";
import { Notificacao } from "./notificacao.model";

export class Usuario{

  id?: number;
  nome?: string;
  email?: string;
  login?: string;
  senha?: string;

  comentarios?: Comentario[] = [];
  imagens?: Imagem[] = [];
  ambientesCriador?: Ambiente[] = [];
  ambientes?: Ambiente[] = [];
  notificacoes?: Notificacao[] = [];
}


export class CredenciaisDTO{

  login?: string;
  senha?: string;

}



