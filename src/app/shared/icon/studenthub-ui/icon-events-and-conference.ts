﻿import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
@Component({
    selector: 'icon-events-and-conference',
    template: `
        <ng-template #template>
        <svg width="2" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5" d="M10.5371 21.6744C11.4657 22.1085 12.5343 22.1085 13.4629 21.6744C17.4467 19.8124 20 14.6055 20 10.1433C20 5.64588 16.4183 2 12 2C7.58172 2 4 5.64588 4 10.1433C4 14.6055 6.55332 19.8124 10.5371 21.6744Z" fill="#1C274C"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0334 5.9318C12.3698 5.6894 11.6301 5.6894 10.9666 5.9318L8.62471 6.78733C8.08368 6.98498 7.75 7.46742 7.75 7.99999C7.75 8.53256 8.08368 9.01501 8.62471 9.21265L8.75 9.25843V11.7002C8.75 12.3732 9.14396 13.0287 9.83069 13.2821C10.3558 13.4759 11.221 13.75 12 13.75C12.779 13.75 13.6442 13.4759 14.1693 13.2821C14.856 13.0287 15.25 12.3732 15.25 11.7002V9.25844L15.3753 9.21267C15.9163 9.01502 16.25 8.53258 16.25 8.00001C16.25 7.46744 15.9163 6.98499 15.3753 6.78735L13.0334 5.9318ZM10.25 9.8064V11.7002C10.25 11.805 10.3069 11.859 10.35 11.8749C10.8512 12.0598 11.5041 12.25 12 12.25C12.4959 12.25 13.1488 12.0598 13.65 11.8749C13.6931 11.859 13.75 11.805 13.75 11.7002V9.80641L13.0334 10.0682C12.3699 10.3106 11.6302 10.3106 10.9666 10.0682L10.25 9.8064ZM12.5187 7.34073C12.1875 7.21976 11.8125 7.21976 11.4813 7.34073L9.67667 7.99999L11.4813 8.65927C11.8125 8.78024 12.1875 8.78024 12.5187 8.65927L14.3233 8.00001L12.5187 7.34073Z" fill="#1C274C"/>
        </svg>

        </ng-template>
    `,
})
export class IconEventsAndConference {
    @Input() class: any = '';
    @ViewChild('template', { static: true }) template: any;
    constructor(private viewContainerRef: ViewContainerRef) { }
    ngOnInit() {
        this.viewContainerRef.createEmbeddedView(this.template);
        this.viewContainerRef.element.nativeElement.remove();
    }
}
