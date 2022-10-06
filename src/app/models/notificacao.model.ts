import { Ambiente } from "./ambiente.model";
import { Imagem } from "./img.model";
import { Comentario } from "./comentario.model";
import { Usuario } from "./usuario.model";

export class Notificacao{

  id?: number;
  aceitavel?: boolean;
  descricao?: string;

  criador?: Usuario;
  usuarioNotificado?: Usuario;
  idObjeto?: number;

  tipoNotificacao?: TipoNotificacao;

  imagem?: Imagem;
}

export class NotificacaoDTO{
  criadorId?: number;
  usuarioNotificadoId?: number;
  aceitavel?: boolean;
  descricao?: string;
  idObjeto?: number;
  tipoNotificacao?: TipoNotificacao;
}

export enum TipoNotificacao{
  CONVITE = "CONVITE",
  DENUNCIA = "DENUNCIA"
}