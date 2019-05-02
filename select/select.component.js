/*!
 *
 * carbon-angular v0.0.0 | select.component.js
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


import { Component, Input, Output, ViewChild, ElementRef, HostListener, EventEmitter } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
/**
 * `ibm-select` provides a styled `select` component.
 *
 * Example:
 *
 * ```
 * <ibm-select [(ngModel)]="model">
 * 	<option value="default" disabled selected hidden>Choose an option</option>
 * 	<option value="option1">Option 1</option>
 *	<option value="option2">Option 2</option>
 * 	<option value="option3">Option 3</option>
 * </ibm-select>
 *	```

 */
var Select = /** @class */ (function () {
    function Select() {
        /**
         * `inline` or `default` select displays
         */
        this.display = "default";
        /**
         * Label for the select. Appears above the input.
         */
        this.label = "Select label";
        /**
         * Sets the unique ID. Defaults to `select-${total count of selects instantiated}`
         */
        this.id = "select-" + Select.selectCount++;
        /**
         * Set to true to disable component.
         */
        this.disabled = false;
        /**
         * Set to true for a loading select.
         */
        this.skeleton = false;
        /**
         * Set to `true` for an invalid select component.
         */
        this.invalid = false;
        /**
         * `light` or `dark` select theme
         */
        this.theme = "dark";
        /**
         * emits the selected options `value`
         */
        this.selected = new EventEmitter();
        /**
         * placeholder declarations. Replaced by the functions provided to `registerOnChange` and `registerOnTouched`
         */
        this.onChangeHandler = function (_) { };
        this.onTouchedHandler = function () { };
    }
    Object.defineProperty(Select.prototype, "value", {
        get: function () {
            return this.select.nativeElement.value;
        },
        set: function (v) {
            this.select.nativeElement.value = v;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Receives a value from the model.
     */
    Select.prototype.writeValue = function (obj) {
        this.value = obj;
    };
    /**
     * Registers a listener that notifies the model when the control updates
     */
    Select.prototype.registerOnChange = function (fn) {
        this.onChangeHandler = fn;
    };
    /**
     * Registers a listener that notifies the model when the control is blurred
     */
    Select.prototype.registerOnTouched = function (fn) {
        this.onTouchedHandler = fn;
    };
    /**
     * Sets the disabled state through the model
     */
    Select.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * Handles the change event from the `select`.
     * Sends events to the change handler and emits a `selected` event.
     */
    Select.prototype.onChange = function (event) {
        this.onChangeHandler(event.target.value);
        this.selected.emit(event.target.value);
    };
    /**
     * Listens for the host blurring, and notifies the model
     */
    Select.prototype.blur = function () {
        this.onTouchedHandler();
    };
    /**
     * Tracks the total number of selects instantiated. Used to generate unique IDs
     */
    Select.selectCount = 0;
    Select.decorators = [
        { type: Component, args: [{
                    selector: "ibm-select",
                    template: "\n\t\t<div class=\"bx--form-item\">\n\t\t\t<label *ngIf=\"skeleton\" [attr.for]=\"id\" class=\"bx--label bx--skeleton\"></label>\n\t\t\t<div\n\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t'bx--select--inline': display === 'inline',\n\t\t\t\t\t'bx--select--light': theme === 'light',\n\t\t\t\t\t'bx--skeleton': skeleton\n\t\t\t\t}\"\n\t\t\t\tclass=\"bx--select\"\n\t\t\t\tstyle=\"width: 100%\">\n\t\t\t\t<label *ngIf=\"!skeleton\" [attr.for]=\"id\" class=\"bx--label\">{{label}}</label>\n\t\t\t\t<select\n\t\t\t\t\t#select\n\t\t\t\t\t[attr.id]=\"id\"\n\t\t\t\t\t[attr.data-invalid]=\"(invalid ? '' : null)\"\n\t\t\t\t\t[disabled]=\"disabled\"\n\t\t\t\t\t(change)=\"onChange($event)\"\n\t\t\t\t\tclass=\"bx--select-input\">\n\t\t\t\t\t<ng-content></ng-content>\n\t\t\t\t</select>\n\t\t\t\t<svg *ngIf=\"!skeleton\" class=\"bx--select__arrow\" width=\"10\" height=\"5\" viewBox=\"0 0 10 5\">\n\t\t\t\t<path d=\"M0 0l5 4.998L10 0z\" fill-rule=\"evenodd\" />\n\t\t\t\t</svg>\n\t\t\t\t<div *ngIf=\"helperText\" class=\"bx--form__helper-text\">{{helperText}}</div>\n\t\t\t\t<div *ngIf=\"invalid\" class=\"bx--form-requirement\">{{invalidText}}</div>\n\t\t\t</div>\n\t\t</div>\n\t",
                    styles: ["\n\t\t[data-invalid] ~ .bx--select__arrow {\n\t\t\tbottom: 2.25rem;\n\t\t}\n\t"],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: Select,
                            multi: true
                        }
                    ]
                },] },
    ];
    Select.propDecorators = {
        display: [{ type: Input }],
        label: [{ type: Input }],
        helperText: [{ type: Input }],
        invalidText: [{ type: Input }],
        id: [{ type: Input }],
        disabled: [{ type: Input }],
        skeleton: [{ type: Input }],
        invalid: [{ type: Input }],
        theme: [{ type: Input }],
        selected: [{ type: Output }],
        select: [{ type: ViewChild, args: ["select",] }],
        blur: [{ type: HostListener, args: ["blur",] }]
    };
    return Select;
}());
export { Select };
//# sourceMappingURL=select.component.js.map