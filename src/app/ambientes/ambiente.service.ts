import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Ambiente } from "./ambiente.model";

@Injectable( )
export class AmbienteService{

  resourceUrl: string = environment.baseURL+"/api/ambientes"

  constructor(private http: HttpClient){
  }

  criarAmbiente(ambiente: Ambiente) : Observable<Ambiente>{
    return this.http.post<Ambiente>(this.resourceUrl, ambiente);
  }

  findAllAmbienteByUsuario(id: number) : Observable<Ambiente[]>{
    return this.http.get<Ambiente[]>(this.resourceUrl+"/usuario/"+id);
  }

  getById(id: number): Observable<Ambiente>{
    return this.http.get<Ambiente>(this.resourceUrl+"/"+id);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(this.resourceUrl+"/"+id);
  }
}
