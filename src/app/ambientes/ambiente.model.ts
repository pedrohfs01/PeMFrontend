import { Usuario } from "../auth/usuario.model";
import { Imagem } from "../imagens/img.model";

export class Ambiente{

  id?: number;
  nome?: string;
  descricao?: string;

  criador?: Usuario;
  usuarios?: Usuario[];
  imagens?: Imagem[];

}

export class AmbienteDTO {
  nome?: string;
  descricao?: string;
  usuarioId?: number;
}
