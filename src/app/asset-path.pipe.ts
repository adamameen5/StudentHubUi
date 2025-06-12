import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../environments/environment';

@Pipe({
    name: 'assetPath'
})
export class AssetPathPipe implements PipeTransform {
    transform(path: string): string {
        if (!path) return `${environment.assetBasePath}/assets/images/no-profilepic.png`; // Fallback
        // Remove leading slashes to prevent // in URLs
        path = path.replace(/^\/+/, '');
        // Handle API images (e.g., images/profiles/unique-id.jpg)
        if (path.startsWith('images/')) {
            return `${environment.apiURL}/${path}`; // e.g., https://zolaprep.zolatik.com/images/profiles/...
        }
        // Handle Angular assets (e.g., assets/images/no-profilepic.png)
        return `${environment.assetBasePath}/${path}`; // e.g., /clientapp/assets/images/...
    }
}