import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotSupportedBrowserMsgComponent } from './not-supported-browser-msg/not-supported-browser-msg.component';


@NgModule({
    declarations: [NotSupportedBrowserMsgComponent],
    imports: [
        CommonModule
    ],
    exports: [
        NotSupportedBrowserMsgComponent
    ]
})
export class SharedModule {
}
