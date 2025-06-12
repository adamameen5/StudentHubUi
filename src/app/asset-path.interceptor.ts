import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class AssetPathInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('/assets/')) {
      const modifiedUrl = `${environment.assetBasePath}${request.url}`;
      console.log(`Intercepting asset request: ${request.url} -> ${modifiedUrl}`); // Debug log
      const modifiedRequest = request.clone({ url: modifiedUrl });
      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }
}