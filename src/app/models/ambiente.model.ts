import { Usuario } from "./usuario.model";
import { Imagem } from "./img.model";

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
