import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ContactMe } from '../../modules/home/modules/contaceMeModel';

// Web3Forms delivers form submissions straight to your inbox — no backend needed.
// Get a free key at https://web3forms.com (enter your email, the key is mailed to you).
// The key is safe to keep in frontend code: it can only send mail to your own address.
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '7a80ca67-840d-4249-8f1a-0f7a242641e3';

@Injectable({
  providedIn: 'root',
})
export class DataGatewayService {
  constructor(private http: HttpClient) {}

  contactMe(data: ContactMe): Observable<any> {
    return this.http
      .post(WEB3FORMS_URL, {
        access_key: WEB3FORMS_ACCESS_KEY,
        from_name: 'Portfolio Contact Form',
        name: data.name,
        email: data.email,
        subject: `Portfolio: ${data.subject}`,
        message: data.message,
      })
      .pipe(
        map((res: any) => {
          if (!res?.success) throw new Error(res?.message || 'Message not sent');
          return res;
        })
      );
  }
}
