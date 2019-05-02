/*!
 *
 * carbon-angular v0.0.0 | datepicker.component.js
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


import { Component, Input, Output, EventEmitter, ElementRef } from "@angular/core";
import flatpickr from "flatpickr";
import rangePlugin from "flatpickr/dist/plugins/rangePlugin";
var DatePicker = /** @class */ (function () {
    function DatePicker(elementRef) {
        var _this = this;
        this.elementRef = elementRef;
        /**
         * Format of date
         *
         * For reference: https://flatpickr.js.org/formatting/
         */
        this.dateFormat = "m/d/Y";
        this.placeholder = "mm/dd/yyyy";
        this.pattern = "\\d{1,2}/\\d{1,2}/\\d{4}";
        this.id = "datepicker-" + DatePicker.datePickerCount++;
        this.value = [];
        this.theme = "dark";
        this.disabled = false;
        this.invalid = false;
        this.skeleton = false;
        this.valueChange = new EventEmitter();
        this.flatpickrOptions = {
            dateFormat: this.dateFormat,
            allowInput: true,
            onChange: function (selectedValue) { _this.doSelect(selectedValue); },
            onOpen: function () { _this.updateClassNames(); },
            value: this.value
        };
        this.flatpickrOptionsRange = {
            dateFormat: this.dateFormat,
            "plugins": [rangePlugin({ input: "#" + this.id + "-rangeInput" })],
            allowInput: true,
            onChange: function (selectedValue) { _this.doSelect(selectedValue); },
            onOpen: function () { _this.updateClassNames(); },
            value: this.value
        };
    }
    DatePicker.prototype.doSelect = function (selectedValue) {
        this.valueChange.emit(selectedValue);
    };
    DatePicker.prototype.updateClassNames = function () {
        var _this = this;
        var ng2FlatPickrElement = this.elementRef.nativeElement.querySelector(".ng2-flatpickr-input-container");
        ng2FlatPickrElement._flatpickr._positionCalendar();
        // get all the possible flatpickrs in the document - we need to add classes to (potentially) all of them
        var calendarContainer = document.querySelectorAll(".flatpickr-calendar");
        var monthContainer = document.querySelectorAll(".flatpickr-month");
        var weekdaysContainer = document.querySelectorAll(".flatpickr-weekdays");
        var weekdayContainer = document.querySelectorAll(".flatpickr-weekday");
        var daysContainer = document.querySelectorAll(".flatpickr-days");
        var dayContainer = document.querySelectorAll(".flatpickr-day");
        // add classes to lists of elements
        var addClassIfNotExists = function (classname, elementList) {
            Array.from(elementList).forEach(function (element) {
                if (!element.classList.contains(classname)) {
                    element.classList.add(classname);
                }
            });
        };
        // add classes (but only if they don't exist, small perf win)
        addClassIfNotExists("bx--date-picker__calendar", calendarContainer);
        addClassIfNotExists("bx--date-picker__month", monthContainer);
        addClassIfNotExists("bx--date-picker__weekdays", weekdaysContainer);
        addClassIfNotExists("bx--date-picker__days", daysContainer);
        // add weekday classes and format the text
        Array.from(weekdayContainer).forEach(function (element) {
            element.innerHTML = element.innerHTML.replace(/\s+/g, "");
            element.classList.add("bx--date-picker__weekday");
        });
        // add day classes and special case the "today" element based on `this.value`
        Array.from(dayContainer).forEach(function (element) {
            element.classList.add("bx--date-picker__day");
            if (!_this.value) {
                return;
            }
            if (element.classList.contains("today") && _this.value.length > 0) {
                element.classList.add("no-border");
            }
            else if (element.classList.contains("today") && _this.value.length === 0) {
                element.classList.remove("no-border");
            }
        });
    };
    DatePicker.prototype.onInputValueChange = function (event, index) {
        var eventDate = flatpickr.parseDate(event, this.dateFormat, true);
        var previousDate = flatpickr.parseDate(this.value[index], this.dateFormat, true);
        if (eventDate) {
            if (!previousDate || previousDate.getTime() !== eventDate.getTime()) {
                this.value = this.value.slice();
                this.value[index] = eventDate;
            }
        }
        else {
            if (previousDate || event) {
                this.value = this.value.slice();
                this.value[index] = undefined;
            }
        }
    };
    DatePicker.prototype.ngOnDestroy = function () {
        // clean up our flatpickr element - needed because the wrapper doesn't handle this
        var ng2FlatPickrElement = this.elementRef.nativeElement.querySelector(".ng2-flatpickr-input-container");
        ng2FlatPickrElement._flatpickr.destroy();
    };
    DatePicker.datePickerCount = 0;
    DatePicker.decorators = [
        { type: Component, args: [{
                    selector: "ibm-date-picker",
                    template: "\n\t<div class=\"bx--form-item\">\n\t\t<ng2-flatpickr\n\t\t\t[setDate]= \"value\"\n\t\t\t[config]= \"range ? flatpickrOptionsRange : flatpickrOptions\"\n\t\t\t[hideButton]=\"true\">\n\t\t\t<div class=\"bx--form-item\">\n\t\t\t\t<div\n\t\t\t\t\tdata-date-picker\n\t\t\t\t\t[attr.data-date-picker-type]= \"range ? 'range' : 'single'\"\n\t\t\t\t\tclass=\"bx--date-picker\"\n\t\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t\t'bx--date-picker--range' : range,\n\t\t\t\t\t\t'bx--date-picker--single' : !range,\n\t\t\t\t\t\t'bx--date-picker--light' : theme === 'light',\n\t\t\t\t\t\t'bx--skeleton' : skeleton\n\t\t\t\t\t}\">\n\t\t\t\t\t<div class=\"bx--date-picker-container\">\n\t\t\t\t\t\t<ibm-date-picker-input\n\t\t\t\t\t\t\t[label]= \"label\"\n\t\t\t\t\t\t\t[placeholder]= \"placeholder\"\n\t\t\t\t\t\t\t[pattern]= \"pattern\"\n\t\t\t\t\t\t\t[id]= \"id\"\n\t\t\t\t\t\t\t[type]= \"range ? 'range' : 'single'\"\n\t\t\t\t\t\t\t[hasIcon]= \"range ? false : true\"\n\t\t\t\t\t\t\t[disabled]=\"disabled\"\n\t\t\t\t\t\t\t[invalid]=\"invalid\"\n\t\t\t\t\t\t\t[invalidText]=\"invalidText\"\n\t\t\t\t\t\t\t[skeleton]=\"skeleton\"\n\t\t\t\t\t\t\t(valueChange)=\"onInputValueChange($event, 0)\">\n\t\t\t\t\t\t</ibm-date-picker-input>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div *ngIf=\"range\" class=\"bx--date-picker-container\">\n\t\t\t\t\t\t<ibm-date-picker-input\n\t\t\t\t\t\t\t[label]= \"rangeLabel\"\n\t\t\t\t\t\t\t[placeholder]= \"placeholder\"\n\t\t\t\t\t\t\t[pattern]= \"pattern\"\n\t\t\t\t\t\t\t[id]= \"id + '-rangeInput'\"\n\t\t\t\t\t\t\t[type]= \"range ? 'range' : 'single'\"\n\t\t\t\t\t\t\t[hasIcon]= \"range ? true : null\"\n\t\t\t\t\t\t\t[disabled]=\"disabled\"\n\t\t\t\t\t\t\t[invalid]=\"invalid\"\n\t\t\t\t\t\t\t[invalidText]=\"invalidText\"\n\t\t\t\t\t\t\t[skeleton]=\"skeleton\"\n\t\t\t\t\t\t\t(valueChange)=\"onInputValueChange($event, 1)\">\n\t\t\t\t\t\t</ibm-date-picker-input>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</ng2-flatpickr>\n\t</div>\n\t"
                },] },
    ];
    /** @nocollapse */
    DatePicker.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    DatePicker.propDecorators = {
        range: [{ type: Input }],
        dateFormat: [{ type: Input }],
        label: [{ type: Input }],
        rangeLabel: [{ type: Input }],
        placeholder: [{ type: Input }],
        pattern: [{ type: Input }],
        id: [{ type: Input }],
        value: [{ type: Input }],
        theme: [{ type: Input }],
        disabled: [{ type: Input }],
        invalid: [{ type: Input }],
        invalidText: [{ type: Input }],
        skeleton: [{ type: Input }],
        valueChange: [{ type: Output }]
    };
    return DatePicker;
}());
export { DatePicker };
//# sourceMappingURL=datepicker.component.js.map