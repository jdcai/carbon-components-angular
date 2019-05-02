/*!
 *
 * carbon-angular v0.0.0 | clickable-tile.component.js
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


import { Component, Input } from "@angular/core";
/**
 * Build application's clickable tiles using this component.
 *
 * ## Basic usage
 *
 * ```html
 * <ibm-clickable-tile>
 * 		tile content
 * </ibm-clickable-tile>
 * ```
 *
 * @export
 * @class ClickableTile
 * @implements {OnInit}
 */
var ClickableTile = /** @class */ (function () {
    function ClickableTile() {
        /**
         * Set to `true` to disable the clickable tile.
         * @type {boolean}
         * @memberof ClickableTile
         */
        this.disabled = false;
        this.clicked = false;
    }
    ClickableTile.prototype.onClick = function (event) {
        this.clicked = !this.clicked;
    };
    ClickableTile.prototype.onKeyDown = function (event) {
        if (event.key === "Enter" || event.key === " ") {
            this.clicked = !this.clicked;
        }
    };
    ClickableTile.decorators = [
        { type: Component, args: [{
                    selector: "ibm-clickable-tile",
                    template: "\n\t<a\n\t\tclass=\"bx--tile bx--tile--clickable\"\n\t\t[ngClass]=\"{\n\t\t\t'bx--tile--is-clicked': clicked\n\t\t}\"\n\t\ttabindex=\"0\"\n\t\t(click)=\"onClick($event)\"\n\t\t(keydown)=\"onKeyDown($event)\"\n\t\t[href]=\"href\"\n\t\t[target]=\"target\"\n\t\t[attr.aria-disabled]=\"disabled\">\n\t\t<ng-content></ng-content>\n\t</a>"
                },] },
    ];
    ClickableTile.propDecorators = {
        href: [{ type: Input }],
        target: [{ type: Input }],
        disabled: [{ type: Input }]
    };
    return ClickableTile;
}());
export { ClickableTile };
//# sourceMappingURL=clickable-tile.component.js.map