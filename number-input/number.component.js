/*!
 *
 * carbon-angular v0.0.0 | number.component.js
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


import { Component, Input, HostBinding, EventEmitter, Output } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { isNullOrUndefined } from "util";
/**
 * Used to emit changes performed on number input components.
 * @export
 * @class NumberChange
 */
var NumberChange = /** @class */ (function () {
    function NumberChange() {
    }
    return NumberChange;
}());
export { NumberChange };
/**
 * @export
 * @class Number
 * @implements {ControlValueAccessor}
 */
var Number = /** @class */ (function () {
    /**
     * Creates an instance of `Number`.
     * @memberof Number
     */
    function Number() {
        this.containerClass = true;
        /**
         * `light` or `dark` number input theme.
         */
        this.theme = "dark";
        /**
         * Set to `true` for a disabled number input.
         */
        this.disabled = false;
        /**
         * Set to `true` for a loading number component.
         */
        this.skeleton = false;
        /**
         * Set to `true` for an invalid number component.
         */
        this.invalid = false;
        /**
         * The unique id for the number component.
         */
        this.id = "number-" + Number.numberCount;
        /**
         * Sets the value attribute on the `input` element.
         */
        this.value = 0;
        /**
         * Emits event notifying other classes when a change in state occurs in the input.
         */
        this.change = new EventEmitter();
        /**
         * Called when number input is blurred. Needed to properly implement `ControlValueAccessor`.
         * @memberof Number
         */
        this.onTouched = function () { };
        /**
         * Method set in `registerOnChange` to propagate changes back to the form.
         * @memberof Number
         */
        this.propagateChange = function (_) { };
        Number.numberCount++;
    }
    /**
     * This is the initial value set to the component
     * @param value The input value.
     */
    Number.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * Sets a method in order to propagate changes back to the form.
     * @param {any} fn
     * @memberof Number
     */
    Number.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    /**
     * Registers a callback to be triggered when the control has been touched.
     * @param fn Callback to be triggered when the number input is touched.
     */
    Number.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Adds 1 to the current `value`.
     */
    Number.prototype.onIncrement = function () {
        if (isNullOrUndefined(this.max) || this.value < this.max) {
            this.value++;
            this.emitChangeEvent();
        }
    };
    /**
     * Subtracts 1 to the current `value`.
     */
    Number.prototype.onDecrement = function () {
        if (isNullOrUndefined(this.min) || this.value > this.min) {
            this.value--;
            this.emitChangeEvent();
        }
    };
    /**
     * Creates a class of `NumberChange` to emit the change in the `Number`.
     */
    Number.prototype.emitChangeEvent = function () {
        var event = new NumberChange();
        event.source = this;
        event.value = this.value;
        this.change.emit(event);
        this.propagateChange(this.value);
    };
    Number.prototype.onNumberInputChange = function (event) {
        this.value = event.target.value;
        this.emitChangeEvent();
    };
    /**
     * Variable used for creating unique ids for number input components.
     */
    Number.numberCount = 0;
    Number.decorators = [
        { type: Component, args: [{
                    selector: "ibm-number",
                    template: "\n\t\t<label *ngIf=\"skeleton && label\" class=\"bx--label bx--skeleton\"></label>\n\t\t<div\n\t\t\tdata-numberinput\n\t\t\t[attr.data-invalid]=\"(invalid ? '' : null)\"\n\t\t\tclass=\"bx--number\"\n\t\t\t[ngClass]=\"{\n\t\t\t\t'bx--number--light': theme === 'light',\n\t\t\t\t'bx--number--nolabel': !label,\n\t\t\t\t'bx--number--helpertext': helperText,\n\t\t\t\t'bx--skeleton' : skeleton\n\t\t\t}\">\n\t\t\t<label *ngIf=\"!skeleton && label\" [for]=\"id\" class=\"bx--label\">{{label}}</label>\n\t\t\t<input\n\t\t\t\ttype=\"number\"\n\t\t\t\t[id]=\"id\"\n\t\t\t\t[value]=\"value\"\n\t\t\t\t[min]=\"min\"\n\t\t\t\t[max]=\"max\"\n\t\t\t\t[disabled]=\"disabled\"\n\t\t\t\t[required]=\"required\"\n\t\t\t\t(input)=\"onNumberInputChange($event)\"/>\n\t\t\t<div *ngIf=\"!skeleton\" class=\"bx--number__controls\">\n\t\t\t\t<button\n\t\t\t\t\tclass=\"bx--number__control-btn up-icon\"\n\t\t\t\t\t(click)=\"onIncrement()\">\n\t\t\t\t\t<svg width=\"10\" height=\"5\" viewBox=\"0 0 10 5\">\n\t\t\t\t\t\t<path d=\"M0 5L5 .002 10 5z\" fill-rule=\"evenodd\" />\n\t\t\t\t\t</svg>\n\t\t\t\t</button>\n\t\t\t\t<button\n\t\t\t\t\tclass=\"bx--number__control-btn down-icon\"\n\t\t\t\t\t(click)=\"onDecrement()\">\n\t\t\t\t\t<svg width=\"10\" height=\"5\" viewBox=\"0 0 10 5\">\n\t\t\t\t\t\t<path d=\"M0 0l5 4.998L10 0z\" fill-rule=\"evenodd\" />\n\t\t\t\t\t</svg>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"invalid\" class=\"bx--form-requirement\">\n\t\t\t\t{{invalidText}}\n\t\t\t</div>\n\t\t\t<div *ngIf=\"helperText\" class=\"bx--form__helper-text\">{{helperText}}</div>\n\t\t</div>\n\t",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: Number,
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    Number.ctorParameters = function () { return []; };
    Number.propDecorators = {
        containerClass: [{ type: HostBinding, args: ["class.bx--form-item",] }],
        theme: [{ type: Input }],
        disabled: [{ type: Input }],
        skeleton: [{ type: Input }],
        invalid: [{ type: Input }],
        id: [{ type: Input }],
        required: [{ type: Input }],
        value: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        label: [{ type: Input }],
        helperText: [{ type: Input }],
        invalidText: [{ type: Input }],
        change: [{ type: Output }]
    };
    return Number;
}());
export { Number };
//# sourceMappingURL=number.component.js.map