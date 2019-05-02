/*!
 *
 * carbon-angular v0.0.0 | tooltip-definition.component.js
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
var TooltipDefinition = /** @class */ (function () {
    function TooltipDefinition() {
        this.id = "definition-tooltip-" + TooltipDefinition.tooltipItemCount++;
        /**
         * The placement in which the `TooltipDefinition` appears.
         * Set to `"top"` to have it positioned above the trigger text
         */
        this.placement = "bottom";
        this.className = true;
    }
    TooltipDefinition.tooltipItemCount = 0;
    TooltipDefinition.decorators = [
        { type: Component, args: [{
                    selector: "ibm-tooltip-definition",
                    template: "\n\t\t<button class=\"bx--tooltip__trigger\" [attr.aria-describedby]=\"id\">\n\t\t\t<ng-content></ng-content>\n\t\t</button>\n\t\t<div\n\t\t\t[id]=\"id\"\n\t\t\t[ngClass]=\"{\n\t\t\t\t'bx--tooltip--definition__bottom' : placement === 'bottom',\n\t\t\t\t'bx--tooltip--definition__top' : placement === 'top'\n\t\t\t}\"\n\t\t\trole=\"tooltip\"\n\t\t\t[attr.aria-label]=\"content\">\n\t\t\t<span class=\"bx--tooltip__caret\"></span>\n\t\t\t<p>{{content}}</p>\n\t\t</div>\n\t"
                },] },
    ];
    TooltipDefinition.propDecorators = {
        id: [{ type: Input }],
        content: [{ type: Input }],
        placement: [{ type: Input }],
        className: [{ type: HostBinding, args: ["class.bx--tooltip--definition",] }]
    };
    return TooltipDefinition;
}());
export { TooltipDefinition };
//# sourceMappingURL=tooltip-definition.component.js.map