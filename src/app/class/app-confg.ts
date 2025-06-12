import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppConfig {

  private config: any = null;

  constructor(private http: HttpClient) {
  }

  public getConfig(key: any) {
    return this.config[key];
  }

  public async load() {
    let request: any = null;
    if (environment.production) {
      request = this.http.get('./assets/env/env.prod.json');
    } else {
      request = this.http.get('./assets/env/env.dev.json');
    }
    
    this.config = await request.toPromise();
  }
}
