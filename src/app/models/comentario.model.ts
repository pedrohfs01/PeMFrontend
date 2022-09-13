import { Imagem } from "./img.model";
import { Usuario } from "./usuario.model";

export class Comentario {

    id?: number;
    comentario?: string;
    instante?: Date;
    autor?: Usuario;
    imagem?: Imagem;

}

export class ComentarioSalvarDTO{
    autorId?: number;
    imagemId?: number;
    comentario?: String;
}