/*!
 *
 * carbon-angular v0.0.0 | modal-header.component.js
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


import { Component, Output, EventEmitter, Input } from "@angular/core";
import { I18n } from "./../i18n/i18n.module";
import { ExperimentalService } from "./../experimental.service";
/**
 * ***Inputs***
 * ```html
 * <ibm-modal-header>Header text</ibm-modal-header>
 * ```
 *
 * ***Outputs***
 * ```html
 * <ibm-modal-header (closeSelect)="closeModal()">Header text</ibm-modal-header>
 * ```
 *
 * @export
 * @class ModalHeader
 */
var ModalHeader = /** @class */ (function () {
    function ModalHeader(i18n, experimental) {
        this.i18n = i18n;
        this.experimental = experimental;
        /**
         * Sets the style on the modal heading based on its category.
         * @type {"default" | "warning" | "error"}
         */
        this.theme = "default";
        /**
         * Accessible label for the header close button.
         * Defaults to the `MODAL.CLOSE` value from the i18n service.
         */
        this.closeLabel = this.i18n.get().MODAL.CLOSE;
        /**
         * To emit the event of clicking on the close icon within the modal.
         */
        this.closeSelect = new EventEmitter();
    }
    Object.defineProperty(ModalHeader.prototype, "isExperimental", {
        get: function () {
            return this.experimental.isExperimental;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handles click for the close icon button within the `Modal`.
     */
    ModalHeader.prototype.onClose = function () {
        this.closeSelect.emit();
    };
    ModalHeader.decorators = [
        { type: Component, args: [{
                    selector: "ibm-modal-header",
                    template: "\n\t\t<header class=\"{{theme}} bx--modal-header\">\n\t\t\t<ng-content></ng-content>\n\t\t\t<button\n\t\t\t\tclass=\"bx--modal-close\"\n\t\t\t\t[attr.aria-label]=\"closeLabel\"\n\t\t\t\t(click)=\"onClose()\">\n\t\t\t\t<!-- old icon -->\n\t\t\t\t<svg\n\t\t\t\t\t*ngIf=\"!isExperimental\"\n\t\t\t\t\tclass=\"bx--modal-close__icon\"\n\t\t\t\t\tfill-rule=\"evenodd\"\n\t\t\t\t\theight=\"10\"\n\t\t\t\t\trole=\"img\"\n\t\t\t\t\tviewBox=\"0 0 10 10\"\n\t\t\t\t\twidth=\"10\"\n\t\t\t\t\t[attr.aria-label]=\"closeLabel\">\n\t\t\t\t\t<title>{{closeLabel}}</title>\n\t\t\t\t\t<path d=\"M6.32 5L10 8.68 8.68 10 5 6.32 1.32 10 0 8.68 3.68 5 0 1.32 1.32 0 5 3.68 8.68 0 10 1.32 6.32 5z\"></path>\n\t\t\t\t</svg>\n\t\t\t\t<!-- new icon -->\n\t\t\t\t<svg\n\t\t\t\t\t*ngIf=\"isExperimental\"\n\t\t\t\t\tfocusable=\"false\"\n\t\t\t\t\tpreserveAspectRatio=\"xMidYMid meet\"\n\t\t\t\t\tstyle=\"will-change: transform;\"\n\t\t\t\t\txmlns=\"http://www.w3.org/2000/svg\"\n\t\t\t\t\tclass=\"bx--modal-close__icon\"\n\t\t\t\t\twidth=\"16\"\n\t\t\t\t\theight=\"16\"\n\t\t\t\t\tviewBox=\"0 0 16 16\"\n\t\t\t\t\taria-hidden=\"true\">\n\t\t\t\t\t<path\n\t\t\t\t\t\td=\"M12 4.7l-.7-.7L8 7.3 4.7 4l-.7.7L7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8z\">\n\t\t\t\t\t</path>\n\t\t\t\t</svg>\n\t\t\t</button>\n\t\t</header>\n\n\t"
                },] },
    ];
    /** @nocollapse */
    ModalHeader.ctorParameters = function () { return [
        { type: I18n },
        { type: ExperimentalService }
    ]; };
    ModalHeader.propDecorators = {
        theme: [{ type: Input }],
        closeLabel: [{ type: Input }],
        closeSelect: [{ type: Output }]
    };
    return ModalHeader;
}());
export { ModalHeader };
//# sourceMappingURL=modal-header.component.js.map