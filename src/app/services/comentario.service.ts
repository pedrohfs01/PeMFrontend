import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Comentario, ComentarioSalvarDTO } from "../models/comentario.model";

@Injectable()
export class ComentarioService {

  private resourceUrl: string = environment.baseURL + "/api/comentarios";

  constructor(private http: HttpClient) {
  }

  salvar(comentario: ComentarioSalvarDTO): Observable<Comentario> {
    return this.http.post<Comentario>(this.resourceUrl, comentario);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(this.resourceUrl + "/" + id);
  }
}
