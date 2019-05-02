/*!
 *
 * carbon-angular v0.0.0 | tooltip.component.js
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


var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, TemplateRef, HostBinding } from "@angular/core";
import { getFocusElementList } from "./../../common/tab.service";
import { Dialog } from "./../dialog.component";
/**
 * Extend the `Dialog` component to create a tooltip for exposing content.
 */
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = "inline-block";
        /**
         * Value is set to `true` if the `Tooltip` is to display a `TemplateRef` instead of a string.
         */
        _this.hasContentTemplate = false;
        /**
         * Sets the role of the tooltip. If there's no focusable content we leave it as a `tooltip`,
         * if there _is_ focusable content we switch to the interactive `dialog` role.
         */
        _this.role = "tooltip";
        return _this;
    }
    /**
     * Check whether there is a template for the `Tooltip` content.
     */
    Tooltip.prototype.onDialogInit = function () {
        this.hasContentTemplate = this.dialogConfig.content instanceof TemplateRef;
    };
    Tooltip.prototype.afterDialogViewInit = function () {
        var focusableElements = getFocusElementList(this.dialog.nativeElement);
        if (focusableElements.length > 0) {
            this.role = "dialog";
            focusableElements[0].focus();
        }
    };
    Tooltip.decorators = [
        { type: Component, args: [{
                    selector: "ibm-tooltip",
                    template: "\n\t\t<div\n\t\t\t#dialog\n\t\t\t[id]=\"dialogConfig.compID\"\n\t\t\t[attr.role]=\"role\"\n\t\t\tclass=\"bx--tooltip bx--tooltip--shown\">\n\t\t\t<span class=\"bx--tooltip__caret\" aria-hidden=\"true\"></span>\n\t\t\t<ng-template\n\t\t\t\t\t*ngIf=\"hasContentTemplate\"\n\t\t\t\t\t[ngTemplateOutlet]=\"dialogConfig.content\"\n\t\t\t\t\t[ngTemplateOutletContext]=\"{tooltip: this}\">\n\t\t\t</ng-template>\n\t\t\t<p\n\t\t\t\t*ngIf=\"!hasContentTemplate\">\n\t\t\t\t{{dialogConfig.content}}\n\t\t\t</p>\n\t\t</div>\n\t\t"
                },] },
    ];
    Tooltip.propDecorators = {
        style: [{ type: HostBinding, args: ["style.display",] }]
    };
    return Tooltip;
}(Dialog));
export { Tooltip };
//# sourceMappingURL=tooltip.component.js.map