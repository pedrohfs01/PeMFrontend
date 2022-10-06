import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StorageService } from "./storage.service";
import { CredenciaisDTO, Usuario } from "../models/usuario.model";

@Injectable()
export class UsuarioService {

  resourceUrl: string = environment.baseURL + "/api/usuarios";

  constructor(private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {
  }

  registrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.resourceUrl, usuario);
  }

  login(creds: CredenciaisDTO): Observable<void> {
    return this.http.post<void>(this.resourceUrl + "/login", creds);
  }

  getAllUsuariosByAmbiente(id: number): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.resourceUrl}/ambiente/${id}`);
  }

  getUsuarioLogado(): Observable<Usuario> {
    let login: string = this.storageService.getLocalUser().login;
    return this.http.get(`${this.resourceUrl}/login/${login}`);
  }

  findByNome(nome: string) : Observable<Usuario[]>{
    let params: HttpParams = new HttpParams();
    params = params.append("nome", nome);
    return this.http.get<Usuario[]>(this.resourceUrl+"/search", {params});
  }

  findByLogin(login: string) : Observable<Usuario>{
    let params: HttpParams = new HttpParams();
    params = params.append("login", login);
    return this.http.get<Usuario>(this.resourceUrl+"/login", {params});
  }

  adicionarUsuarioEmAmbiente(idAmbiente: number, usuario: Usuario): Observable<void>{
    return this.http.put<void>(`${this.resourceUrl}/adicionar-ambiente/${idAmbiente}`, usuario);
  }

  removerUsuarioEmAmbiente(idAmbiente: number, usuario: Usuario): Observable<void>{
    return this.http.put<void>(`${this.resourceUrl}/remover-ambiente/${idAmbiente}`, usuario);
  }


  logout(){
    this.storageService.setLocalUser(null);
    this.router.navigate(["/login"])
  }
}
