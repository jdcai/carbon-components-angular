/*!
 *
 * carbon-angular v0.0.0 | tooltip-icon.component.js
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


import { Component, Input, HostBinding } from "@angular/core";
var TooltipIcon = /** @class */ (function () {
    function TooltipIcon() {
        /**
         * The placement in which the `TooltipIcon` appears.
         * Set to `"top"` to have it positioned above the icon
         */
        this.placement = "bottom";
        this.className = true;
    }
    TooltipIcon.decorators = [
        { type: Component, args: [{
                    selector: "ibm-tooltip-icon",
                    template: "\n\t\t<button\n\t\t\tclass=\"bx--tooltip__trigger\"\n\t\t\t[ngClass]=\"{\n\t\t\t\t'bx--tooltip--icon__bottom' : placement === 'bottom',\n\t\t\t\t'bx--tooltip--icon__top' : placement === 'top'\n\t\t\t}\"\n\t\t\t[attr.aria-label]=\"content\">\n\t\t\t<ng-content></ng-content>\n\t\t</button>\n\t"
                },] },
    ];
    TooltipIcon.propDecorators = {
        content: [{ type: Input }],
        placement: [{ type: Input }],
        className: [{ type: HostBinding, args: ["class.bx--tooltip-icon",] }]
    };
    return TooltipIcon;
}());
export { TooltipIcon };
//# sourceMappingURL=tooltip-icon.component.js.map