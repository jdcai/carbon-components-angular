/*!
 *
 * carbon-angular v0.0.0 | calendar-months.component.js
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
import { DateTimeModel } from "./../date-time-model.class";
import { range } from "../../common/utils";
var CalendarMonths = /** @class */ (function () {
    function CalendarMonths() {
        /**
         * `Date` being used in this view.
         *
         * @type {Date}
         * @memberof CalendarMonths
         */
        this.currentView = new Date();
        /**
         * State to determine whether you are selecting `startDate` or `endDate`
         *
         * @memberof CalendarMonths
         */
        this.rangeSelectionInProgress = false;
        /**
         * Reference to month translation keys in `DateTimeModel`
         *
         * @memberof CalendarMonths
         */
        this.months = DateTimeModel.monthsTranslateKeys;
    }
    CalendarMonths.prototype.ngOnInit = function () {
        this.currentView = new Date(this.model.startDate);
        if (!this.currentView || isNaN(this.currentView.getTime())) {
            this.currentView = new Date();
        }
    };
    /**
     * Wrapper for `range` function in utils because it cannot
     * be directly used in template
     *
     * @param {number} stop
     * @param {number} [start=0]
     * @param {number} [step=1]
     * @returns Array<any>
     * @memberof CalendarMonths
     */
    CalendarMonths.prototype.range = function (stop, start, step) {
        if (start === void 0) { start = 0; }
        if (step === void 0) { step = 1; }
        return range(stop, start, step);
    };
    /**
     * Returns value indicating whether `month` is current month
     *
     * @param {number} month in year
     * @returns boolean
     * @memberof CalendarMonths
     */
    CalendarMonths.prototype.isCurrentMonth = function (month) {
        var now = new Date();
        return (this.currentView.getFullYear() === now.getFullYear() &&
            month === now.getMonth());
    };
    /**
     * Returns value indicating whether `month` is disabled
     *
     * @param {number} month in year
     * @returns boolean
     * @memberof CalendarMonths
     */
    CalendarMonths.prototype.isDisabled = function (month) {
        return this.model.isDateDisabled(new Date(this.currentView.getFullYear(), month, 1));
    };
    /**
     * Returns value indicating whether `month` is part of a range selection
     *
     * @param {number} month in year
     * @returns boolean
     * @memberof CalendarMonths
     */
    CalendarMonths.prototype.inRange = function (month) {
        return this.model.isDateInRange(new Date(this.currentView.getFullYear(), month, 1));
    };
    /**
     * Returns value indicating whether `month` is selected
     *
     * @param {number} month in year
     * @memberof CalendarMonths
     */
    CalendarMonths.prototype.isSelected = function (month) {
        return this.currentView.getFullYear() === this.model.startDate.getFullYear() && month === this.model.startDate.getMonth()
            || this.currentView.getFullYear() === this.model.endDate.getFullYear() && month === this.model.endDate.getMonth();
    };
    /**
     * Sets model's `startDate` and `endDate`
     *
     * @param {number} month in year
     * @memberof CalendarMonths
     */
    CalendarMonths.prototype.selectMonth = function (month) {
        if (this.isDisabled(month)) {
            return;
        }
        if (this.rangeSelectionInProgress) {
            this.rangeSelectionInProgress = false;
            this.model.selectMonthEnd(new Date(this.currentView.getFullYear(), month));
            if (this.model.startDate.getTime() > this.model.endDate.getTime()) {
                var tmp = this.model.startDate;
                this.model.startDate = this.model.endDate;
                this.model.endDate = tmp;
            }
        }
        else {
            this.rangeSelectionInProgress = true;
            this.model.selectMonth(new Date(this.currentView.getFullYear(), month, 1));
        }
    };
    CalendarMonths.decorators = [
        { type: Component, args: [{
                    selector: "ibm-calendar-months-view",
                    template: "\n\t<div class=\"calendar-view\">\n\t\t<ibm-calendar-header [currentView]=\"currentView\" header=\"yearOnly\"></ibm-calendar-header>\n\t\t<table class=\"calendar_grid\">\n\t\t\t<tr\n\t\t\tclass=\"grid_row--months\"\n\t\t\t*ngFor=\"let i of range(3)\">\n\t\t\t\t<td\n\t\t\t\t*ngFor=\"let j of range(4)\"\n\t\t\t\t(click)=\"selectMonth(i * 4 + j)\"\n\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t'today': isCurrentMonth(i * 4 + j),\n\t\t\t\t\t'selected': isSelected(i * 4 + j),\n\t\t\t\t\t'range': inRange(i * 4 + j),\n\t\t\t\t\t'disabled': isDisabled(i * 4 + j)\n\t\t\t\t}\">\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t{{months[i * 4 + j]}}\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t</table>\n\t</div>\n\t"
                },] },
    ];
    CalendarMonths.propDecorators = {
        model: [{ type: Input }]
    };
    return CalendarMonths;
}());
export { CalendarMonths };
//# sourceMappingURL=calendar-months.component.js.map