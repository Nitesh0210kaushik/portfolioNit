import { Injectable } from '@angular/core';
import { DataGatewayService } from '../../../core/services/data-gateway.service';
import { map, Observable } from 'rxjs';
import { ContactMe } from '../modules/contaceMeModel';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private dataGatewayService: DataGatewayService) {}

  contactMe(data: ContactMe): Observable<any> {
    return this.dataGatewayService.contactMe(data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
