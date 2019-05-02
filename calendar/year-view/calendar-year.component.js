/*!
 *
 * carbon-angular v0.0.0 | calendar-year.component.js
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
var CalendarYear = /** @class */ (function () {
    function CalendarYear() {
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
    }
    CalendarYear.prototype.ngOnInit = function () {
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
    CalendarYear.prototype.range = function (stop, start, step) {
        if (start === void 0) { start = 0; }
        if (step === void 0) { step = 1; }
        return range(stop, start, step);
    };
    /**
     * Returns value indicating whether `year` is current year
     *
     * @param {number} yearIndex index of year in view
     * @returns boolean
     * @memberof CalendarYear
     */
    CalendarYear.prototype.isCurrentYear = function (yearIndex) {
        var now = new Date();
        var currentYear = this.currentView.getFullYear() - yearIndex; // Last year in the calendar view
        return currentYear === now.getFullYear();
    };
    /**
     * Returns value indicating whether `year` is disabled
     *
     * @param {number} yearIndex index of year in view
     * @returns boolean
     * @memberof CalendarYear
     */
    CalendarYear.prototype.isDisabled = function (yearIndex) {
        var year = this.currentView.getFullYear() - yearIndex;
        return this.model.isDateDisabled(new Date(year, 1, 1));
    };
    /**
     * Returns value indicating whether `year` is part of a range selection
     *
     * @param {number} yearIndex index of year in view
     * @returns boolean
     * @memberof CalendarYear
     */
    CalendarYear.prototype.inRange = function (yearIndex) {
        var year = this.currentView.getFullYear() - yearIndex;
        return this.model.isDateInRange(new Date(year, 1, 1));
    };
    /**
     * Returns value indicating whether `year` is selected
     *
     * @param {number} yearIndex index of year in view
     * @returns boolean
     * @memberof CalendarYear
     */
    CalendarYear.prototype.isSelected = function (yearIndex) {
        var currentYearProvided = this.currentView.getFullYear() - yearIndex;
        for (var i = 0; i < 6; i++) {
            var currentYearInView = this.currentView.getFullYear() - i;
            var isCurrentYearStart = currentYearInView === this.model.startDate.getFullYear() &&
                currentYearProvided === this.model.startDate.getFullYear();
            var isCurrentYearEnd = currentYearInView === this.model.endDate.getFullYear() &&
                currentYearProvided === this.model.endDate.getFullYear();
            if (isCurrentYearStart || isCurrentYearEnd) {
                return true;
            }
        }
        return false;
    };
    /**
     * Sets model's `startDate` and `endDate`
     *
     * @param {number} yearIndex index of year in view
     * @memberof CalendarYear
     */
    CalendarYear.prototype.selectYear = function (yearIndex) {
        var selectedYear = this.currentView.getFullYear() - yearIndex;
        if (this.isDisabled(yearIndex)) {
            return;
        }
        if (this.rangeSelectionInProgress) {
            this.rangeSelectionInProgress = false;
            this.model.selectYearEnd(new Date(selectedYear));
            this.model.endDate = new Date(selectedYear, 11, 31);
            if (this.model.startDate.getTime() > this.model.endDate.getTime()) {
                var tmp = this.model.startDate;
                this.model.startDate = this.model.endDate;
                this.model.endDate = tmp;
            }
        }
        else {
            this.rangeSelectionInProgress = true;
            this.model.selectYear(new Date(selectedYear, 1, 1));
        }
    };
    CalendarYear.decorators = [
        { type: Component, args: [{
                    selector: "ibm-calendar-year-view",
                    template: "\n\t<div class=\"calendar-view\">\n\t\t<ibm-calendar-header [currentView]=\"currentView\" header=\"yearOnlyRange\"></ibm-calendar-header>\n\t\t<table class=\"calendar_grid\">\n\t\t\t<tr\n\t\t\tclass=\"grid_row--months\"\n\t\t\t*ngFor=\"let i of range(-1, 2, -1)\">\n\t\t\t\t<td\n\t\t\t\t*ngFor=\"let j of range(-1, 1, -1)\"\n\t\t\t\t(click)=\"selectYear(i * 2 + j)\"\n\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t'today': isCurrentYear(i * 2 + j),\n\t\t\t\t\t'selected': isSelected(i * 2 + j),\n\t\t\t\t\t'range': inRange(i * 2 + j),\n\t\t\t\t\t'disabled': isDisabled(i * 2 + j)\n\t\t\t\t}\">\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t{{currentView.getFullYear() - (i * 2 + j)}}\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t</table>\n\t</div>\n\t"
                },] },
    ];
    CalendarYear.propDecorators = {
        model: [{ type: Input }]
    };
    return CalendarYear;
}());
export { CalendarYear };
//# sourceMappingURL=calendar-year.component.js.map