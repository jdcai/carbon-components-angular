/*!
 *
 * carbon-angular v0.0.0 | file.component.js
 *
 * Copyright 2014, 2019 IBM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import { Component, Input, Output, EventEmitter, HostBinding } from "@angular/core";
import { I18n } from "../i18n/i18n.module";
var File = /** @class */ (function () {
    function File(i18n) {
        this.i18n = i18n;
        /**
         * Accessible translations for the close and complete icons
         */
        this.translations = this.i18n.get().FILE_UPLOADER;
        this.remove = new EventEmitter();
        this.selectedFile = true;
    }
    File.decorators = [
        { type: Component, args: [{
                    selector: "ibm-file",
                    template: "\n\t\t<p class=\"bx--file-filename\">{{fileItem.file.name}}</p>\n\t\t<span *ngIf=\"fileItem.state === 'edit'\" class=\"bx--file__state-container\" (click)=\"remove.emit()\">\n\t\t\t<svg class=\"bx--file-close\" fill-rule=\"evenodd\" role=\"img\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" tabindex=\"0\"\n\t\t\t\t[attr.aria-label]=\"translations.REMOVE_BUTTON\">\n\t\t\t\t<title>{{translations.REMOVE_TITLE}}</title>\n\t\t\t\t<path d=\"M8 6.586L5.879 4.464 4.464 5.88 6.586 8l-2.122 2.121 1.415 1.415L8 9.414l2.121 2.122 1.415-1.415L9.414\n\t\t\t\t8l2.122-2.121-1.415-1.415L8 6.586zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z\"></path>\n\t\t\t</svg>\n\t\t</span>\n\t\t<span *ngIf=\"fileItem.state === 'upload'\">\n\t\t\t<ibm-loading size=\"sm\"></ibm-loading>\n\t\t</span>\n\t\t<span *ngIf=\"fileItem.state === 'complete'\" class=\"bx--file__state-container\">\n\t\t\t<svg class=\"bx--file-complete\" fill-rule=\"evenodd\" role=\"img\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" tabindex=\"0\"\n\t\t\t\t[attr.aria-label]=\"translations.CHECKMARK\">\n\t\t\t\t<title>{{translations.CHECKMARK_TITLE}}</title>\n\t\t\t\t<path d=\"M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.293-11.332L6.75 9.21 4.707 7.168 3.293 8.582 6.75\n\t\t\t\t12.04l5.957-5.957-1.414-1.414z\"></path>\n\t\t\t</svg>\n\t\t</span>\n\t"
                },] },
    ];
    /** @nocollapse */
    File.ctorParameters = function () { return [
        { type: I18n }
    ]; };
    File.propDecorators = {
        translations: [{ type: Input }],
        fileItem: [{ type: Input }],
        remove: [{ type: Output }],
        selectedFile: [{ type: HostBinding, args: ["class.bx--file__selected-file",] }]
    };
    return File;
}());
export { File };
//# sourceMappingURL=file.component.js.map