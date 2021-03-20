import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ImageUtilService } from "./img-util.service";
import { Imagem } from "./img.model";

@Injectable()
export class ImgService{
  constructor(private http: HttpClient, private imageUtil: ImageUtilService){
  }


  uploadImg(image){
    let img = this.imageUtil.dataUriToBlob(image);
    let formData: FormData = new FormData();

    formData.set("file", img, "file.png");

    return this.http.post(`${environment.baseURL}/api/imagem`, formData,
    {
      observe: 'response',
      responseType: 'text'
    })
  }

  findAllImage(): Observable<Imagem[]>{
    return this.http.get<Imagem[]>(`${environment.baseURL}/api/imagem`);
  }

  deleteImage(id: number){
    return this.http.delete(`${environment.baseURL}/api/imagem/${id}`);
  }

}
