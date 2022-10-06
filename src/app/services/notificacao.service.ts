import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Notificacao, NotificacaoDTO } from '../models/notificacao.model';
import { StorageService } from './storage.service';

@Injectable()
export class NotificacaoService {

  resourceUrl: string = environment.baseURL + "/api/notificacoes";

  constructor(private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {
  }

  salvar(notificacao: NotificacaoDTO): Observable<Notificacao> {
    return this.http.post<Notificacao>(this.resourceUrl, notificacao);
  }
  
  findAllByUsuario(id: number) : Observable<Notificacao[]>{
    return this.http.get<Notificacao[]>(this.resourceUrl+"/usuario/"+id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.resourceUrl+"/"+id);
  }

  verificarSeExisteNotificacao(notificacao: NotificacaoDTO): Observable<boolean> {
    return this.http.post<boolean>(this.resourceUrl+"/verificar-notificacao-existe", notificacao);
  }
}
