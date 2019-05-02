/*!
 *
 * carbon-angular v0.0.0 | pill.component.js
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


import { Component, EventEmitter, Output, Input, HostBinding } from "@angular/core";
/**
 * Internal component that represents a single pill/selected item
 * @export
 * @class Pill
 */
var Pill = /** @class */ (function () {
    function Pill() {
        /** emits an empty event when the close button is clicked */
        this.remove = new EventEmitter();
        this.attrClass = "pill";
    }
    /** close button handler */
    Pill.prototype.doRemove = function (ev) {
        this.item.selected = false;
        ev.stopPropagation();
        this.remove.emit(this.item);
    };
    Pill.decorators = [
        { type: Component, args: [{
                    selector: "ibm-pill",
                    template: "\n\t\t<span><ng-content></ng-content></span>\n\t\t<button class=\"pill_close\" (click)=\"doRemove($event)\" type=\"button\">\n\t\t\t<ibm-static-icon icon=\"x\" size=\"sm\" classList=\"close_icon\"></ibm-static-icon>\n\t\t</button>"
                },] },
    ];
    Pill.propDecorators = {
        item: [{ type: Input }],
        remove: [{ type: Output }],
        attrClass: [{ type: HostBinding, args: ["attr.class",] }]
    };
    return Pill;
}());
export { Pill };
//# sourceMappingURL=pill.component.js.map