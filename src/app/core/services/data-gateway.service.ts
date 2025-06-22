import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { ContactMe } from '../../modules/home/modules/contaceMeModel';
import { Routes } from './models/routes';

@Injectable({
  providedIn: 'root',
})
export class DataGatewayService {
  constructor(private apiService: ApiService) {}

  contactMe(data: ContactMe): Observable<any> {
    return this.apiService
      .sendPostRequest<ContactMe>(Routes.contactMe, data)
      .pipe(
        map((responseData: any) => {
          return responseData;
        })
      );
  }
}
