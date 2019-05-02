/*!
 *
 * carbon-angular v0.0.0 | switch.component.js
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
import { Checkbox } from "../checkbox/checkbox.component";
import { ChangeDetectorRef, Component, Input, Output, EventEmitter } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
/**
 * Deprecated in favour of `ToggleState` (to be removed in v3.0).
 * Defines the set of states for a switch component.
 * @deprecated
 */
export var SwitchState;
(function (SwitchState) {
    SwitchState[SwitchState["Init"] = 0] = "Init";
    SwitchState[SwitchState["Indeterminate"] = 1] = "Indeterminate";
    SwitchState[SwitchState["Checked"] = 2] = "Checked";
    SwitchState[SwitchState["Unchecked"] = 3] = "Unchecked";
})(SwitchState || (SwitchState = {}));
/**
 * Deprecated in favour of `ToggleChange` (to be removed in v3.0).
 * Used to emit changes performed on switch components.
 * @deprecated
 */
var SwitchChange = /** @class */ (function () {
    function SwitchChange() {
    }
    return SwitchChange;
}());
export { SwitchChange };
/**
 * Deprecated in favour of `Toggle` (to be removed in v3.0).
 * ```html
 * <ibm-switch [(ngModel)]="switchState">Switch</ibm-switch>
 * ```
 * @deprecated
 */
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    /**
     * Creates an instance of Switch.
     */
    function Switch(changeDetectorRef) {
        var _this = _super.call(this, changeDetectorRef) || this;
        _this.changeDetectorRef = changeDetectorRef;
        /**
         * Size of the switch component.
         */
        _this.size = "md";
        /**
         * The unique id allocated to the `Switch`.
         */
        _this.id = "switch-" + Switch.switchCount;
        /**
         * Emits event notifying other classes when a change in state occurs on a switch after a
         * click.
         */
        _this.change = new EventEmitter();
        Switch.switchCount++;
        console.warn("`ibm-switch` has been deprecated in favour of `ibm-toggle`");
        return _this;
    }
    /**
     * Creates instance of `SwitchChange` used to propagate the change event.
     * @memberof To
     */
    Switch.prototype.emitChangeEvent = function () {
        var event = new SwitchChange();
        event.source = this;
        event.checked = this.checked;
        this.propagateChange(this.checked);
        this.change.emit(event);
    };
    /**
     * Variable used for creating unique ids for switch components.
     */
    Switch.switchCount = 0;
    Switch.decorators = [
        { type: Component, args: [{
                    selector: "ibm-switch",
                    template: "\n\t\t<input\n\t\t\tclass=\"bx--toggle\"\n\t\t\ttype=\"checkbox\"\n\t\t\t[ngClass]=\"{\n\t\t\t\t'bx--toggle--small': size === 'sm'\n\t\t\t}\"\n\t\t\t[id]=\"id\"\n\t\t\t[value]=\"value\"\n\t\t\t[name]=\"name\"\n\t\t\t[required]=\"required\"\n\t\t\t[checked]=\"checked\"\n\t\t\t[disabled]=\"disabled\"\n\t\t\t[attr.aria-checked]=\"checked\"\n\t\t\t(change)=\"onChange($event)\"\n\t\t\t(click)=\"onClick($event)\">\n\t\t<label *ngIf=\"size === 'md'\" class=\"bx--toggle__label\" [for]=\"id\">\n\t\t\t<span class=\"bx--toggle__text--left\">Off</span>\n\t\t\t<span class=\"bx--toggle__appearance\"></span>\n\t\t\t<span class=\"bx--toggle__text--right\">On</span>\n\t\t</label>\n\t\t<label *ngIf=\"size === 'sm'\" class=\"bx--toggle__label\" [for]=\"id\">\n\t\t\t<span class=\"bx--toggle__appearance\">\n\t\t\t\t<svg class=\"bx--toggle__check\" width=\"6px\" height=\"5px\" viewBox=\"0 0 6 5\">\n\t\t\t\t\t<path d=\"M2.2 2.7L5 0 6 1 2.2 5 0 2.7 1 1.5z\"/>\n\t\t\t\t</svg>\n\t\t\t</span>\n\t\t</label>\n\t",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: Switch,
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    Switch.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    Switch.propDecorators = {
        size: [{ type: Input }],
        change: [{ type: Output }]
    };
    return Switch;
}(Checkbox));
export { Switch };
//# sourceMappingURL=switch.component.js.map