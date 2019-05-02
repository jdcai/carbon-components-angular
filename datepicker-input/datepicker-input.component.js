/*!
 *
 * carbon-angular v0.0.0 | datepicker-input.component.js
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


import { Component, Input, Output, EventEmitter } from "@angular/core";
var DatePickerInput = /** @class */ (function () {
    function DatePickerInput() {
        /**
         * Select a calendar type for the `model`.
         * Internal purposes only.
         *
         * @type {("simple" | "single" | "range")}
         * @memberof Datepicker
         */
        this.type = "simple";
        this.id = "datepicker-" + DatePickerInput.datePickerCount++;
        this.hasIcon = false;
        this.placeholder = "mm/dd/yyyy";
        this.pattern = "\\d{1,2}/\\d{1,2}/\\d{4}";
        this.valueChange = new EventEmitter();
        this.theme = "dark";
        this.disabled = false;
        this.invalid = false;
        this.skeleton = false;
    }
    DatePickerInput.datePickerCount = 0;
    DatePickerInput.decorators = [
        { type: Component, args: [{
                    selector: "ibm-date-picker-input",
                    template: "\n\t<div class=\"bx--form-item\">\n\t\t<div class=\"bx--date-picker\"\n\t\t\t[ngClass]=\"{\n\t\t\t\t'bx--date-picker--single' : type === 'single',\n\t\t\t\t'bx--date-picker--range' : type === 'range',\n\t\t\t\t'bx--date-picker--light' : theme === 'light',\n\t\t\t\t'bx--skeleton' : skeleton\n\t\t\t}\">\n\t\t\t<div class=\"bx--date-picker-container\">\n\t\t\t\t<label [for]=\"id\" class=\"bx--label\">\n\t\t\t\t\t{{label}}\n\t\t\t\t</label>\n\t\t\t\t<div *ngIf=\"skeleton\" class=\"bx--date-picker__input bx--skeleton\"></div>\n\t\t\t\t<svg *ngIf=\"type == 'single' && !skeleton\"\n\t\t\t\tdata-date-picker-icon\n\t\t\t\tclass=\"bx--date-picker__icon\"\n\t\t\t\twidth=\"14\" height=\"16\"\n\t\t\t\tviewBox=\"0 0 14 16\"\n\t\t\t\tdata-open>\n\t\t\t\t\t<path d=\"M0 5h14v1H0V5zm3-5h1v4H3V0zm7 0h1v4h-1V0zM0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5\n\t\t\t\t\t\t1.5h-11A1.5 1.5 0 0 1 0 14.5v-12zm1 0v12a.5.5 0 0 0\n\t\t\t\t\t\t.5.5h11a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5z\"\n\t\t\t\t\t\tfill-rule=\"nonzero\"/>\n\t\t\t\t</svg>\n\t\t\t\t<input\n\t\t\t\t    #dateInput\n\t\t\t\t\t*ngIf=\"!skeleton\"\n\t\t\t\t\tautocomplete=\"off\"\n\t\t\t\t\ttype=\"text\"\n\t\t\t\t\tclass=\"bx--date-picker__input\"\n\t\t\t\t\t[pattern]=\"pattern\"\n\t\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t\tdata-date-picker-input\n\t\t\t\t\t[attr.data-input] = \"type == 'single' || type == 'range' ?  '' : null\"\n\t\t\t\t\t[id]= \"id\"\n\t\t\t\t\t[attr.disabled]=\"(disabled ? '' : null)\"\n\t\t\t\t\t[attr.data-invalid]=\"(invalid ? '' : null)\"\n\t\t\t\t\t(change) = \"valueChange.emit(dateInput.value)\"/>\n\t\t\t\t\t<div *ngIf=\"invalid\" class=\"bx--form-requirement\">\n\t\t\t\t\t\t{{invalidText}}\n\t\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<svg *ngIf= \"type == 'range' && hasIcon && !skeleton\"\n\t\t\tdata-date-picker-icon\n\t\t\tclass=\"bx--date-picker__icon\"\n\t\t\twidth=\"14\" height=\"16\"\n\t\t\tviewBox=\"0 0 14 16\"\n\t\t\tdata-open>\n\t\t\t\t<path d=\"M0 5h14v1H0V5zm3-5h1v4H3V0zm7 0h1v4h-1V0zM0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5\n\t\t\t\t1.5h-11A1.5 1.5 0 0 1 0 14.5v-12zm1 0v12a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5z\"\n\t\t\t\t\tfill-rule=\"nonzero\"/>\n\t\t\t</svg>\n\t\t</div>\n\t</div>\n\t"
                },] },
    ];
    DatePickerInput.propDecorators = {
        type: [{ type: Input }],
        id: [{ type: Input }],
        hasIcon: [{ type: Input }],
        label: [{ type: Input }],
        placeholder: [{ type: Input }],
        pattern: [{ type: Input }],
        valueChange: [{ type: Output }],
        theme: [{ type: Input }],
        disabled: [{ type: Input }],
        invalid: [{ type: Input }],
        invalidText: [{ type: Input }],
        skeleton: [{ type: Input }]
    };
    return DatePickerInput;
}());
export { DatePickerInput };
//# sourceMappingURL=datepicker-input.component.js.map