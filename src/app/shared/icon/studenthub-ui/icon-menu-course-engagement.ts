﻿import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
@Component({
    selector: 'icon-menu-course-engagement',
    template: `
        <ng-template #template>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.75 13C9.75 11.7574 10.7574 10.75 12 10.75C13.2426 10.75 14.25 11.7574 14.25 13C14.25 14.2426 13.2426 15.25 12 15.25C10.7574 15.25 9.75 14.2426 9.75 13Z" fill="#1C274D"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 18.6943V4.69434C4 5.24662 4.44772 5.69434 5 5.69434H17C18.6569 5.69434 20 7.03748 20 8.69434V18.6943C20 20.3512 18.6569 21.6943 17 21.6943H7C5.34315 21.6943 4 20.3512 4 18.6943ZM8.25 13C8.25 10.9289 9.92893 9.25 12 9.25C14.0711 9.25 15.75 10.9289 15.75 13C15.75 15.0711 14.0711 16.75 12 16.75C9.92893 16.75 8.25 15.0711 8.25 13ZM9.25 19C9.25 18.5858 9.58579 18.25 10 18.25H14C14.4142 18.25 14.75 18.5858 14.75 19C14.75 19.4142 14.4142 19.75 14 19.75H10C9.58579 19.75 9.25 19.4142 9.25 19Z" fill="#1C274D"/>
            <path opacity="0.5" d="M18 4.00038V5.86504C17.6872 5.75449 17.3506 5.69434 17 5.69434H5C4.44772 5.69434 4 5.24662 4 4.69434V4.62329C4 4.09027 4.39193 3.63837 4.91959 3.56299L15.7172 2.02048C16.922 1.84835 18 2.78328 18 4.00038Z" fill="#1C274D"/>
        </svg>
        </ng-template>
    `,
})
export class IconMenuCourseEngagement {
    @Input() class: any = '';
    @ViewChild('template', { static: true }) template: any;
    constructor(private viewContainerRef: ViewContainerRef) { }
    ngOnInit() {
        this.viewContainerRef.createEmbeddedView(this.template);
        this.viewContainerRef.element.nativeElement.remove();
    }
}
