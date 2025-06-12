import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
@Component({
    selector: 'icon-eye-lock',
    template: `
        <ng-template #template>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" [ngClass]="class">
            <g clip-path="url(#clip0_3_29)">
            <path d="M14.95 14.95C13.5255 16.0358 11.7909 16.6374 10 16.6666C4.16667 16.6666 0.833334 9.99998 0.833334 9.99998C1.86991 8.06823 3.30761 6.38049 5.05 5.04998M8.25 3.53331C8.82361 3.39905 9.41089 3.33193 10 3.33331C15.8333 3.33331 19.1667 9.99998 19.1667 9.99998C18.6608 10.9463 18.0575 11.8373 17.3667 12.6583M11.7667 11.7666C11.5378 12.0123 11.2618 12.2093 10.9551 12.3459C10.6485 12.4826 10.3174 12.556 9.98174 12.562C9.64607 12.5679 9.31264 12.5061 9.00134 12.3804C8.69005 12.2547 8.40727 12.0675 8.16987 11.8301C7.93248 11.5927 7.74533 11.3099 7.61959 10.9986C7.49385 10.6873 7.43211 10.3539 7.43803 10.0182C7.44395 9.68256 7.51742 9.35152 7.65406 9.04485C7.7907 8.73819 7.98771 8.46219 8.23333 8.23331M0.833334 0.833313L19.1667 19.1666" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_3_29">
                    <rect width="20" height="20" fill="white"/>
                </clipPath>
            </defs>
        </svg>

        </ng-template>
    `,
})
export class IconEyeLockComponent {
    @Input() class: any = '';
    @ViewChild('template', { static: true }) template: any;
    constructor(private viewContainerRef: ViewContainerRef) { }
    ngOnInit() {
        this.viewContainerRef.createEmbeddedView(this.template);
        this.viewContainerRef.element.nativeElement.remove();
    }
}
