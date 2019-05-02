/*!
 *
 * carbon-angular v0.0.0 | calendar-month.component.js
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
var CalendarMonth = /** @class */ (function () {
    function CalendarMonth() {
        /**
         * Number of months to display in this view.
         *
         * @memberof CalendarMonth
         */
        this.monthCount = 1;
        /**
         * `Date` being used in this view.
         *
         * @type {Date}
         * @memberof CalendarMonth
         */
        this.currentView = new Date();
        /**
         * State to determine whether you are selecting `startDate` or `endDate`
         *
         * @memberof CalendarMonth
         */
        this.rangeSelectionInProgress = false;
    }
    CalendarMonth.prototype.ngOnInit = function () {
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
     * @memberof CalendarMonth
     */
    CalendarMonth.prototype.range = function (stop, start, step) {
        if (start === void 0) { start = 0; }
        if (step === void 0) { step = 1; }
        return range(stop, start, step);
    };
    /**
     * Returns value indicating whether `day` is current day
     *
     * @param {number} day day of month
     * @param {number} [position=0] index of month in view
     * @returns boolean
     * @memberof CalendarMonth
     */
    CalendarMonth.prototype.isCurrentDay = function (day, position) {
        if (position === void 0) { position = 0; }
        var now = new Date();
        return (this.currentView.getFullYear() === now.getFullYear() &&
            this.currentView.getMonth() + position === now.getMonth() &&
            day === now.getDate());
    };
    /**
     * Convenience method to figure out if `day` is disabled
     *
     * @param {number} day day of month
     * @param {number} [position=0] index of month in view
     * @returns boolean
     * @memberof CalendarMonth
     */
    CalendarMonth.prototype.isDisabled = function (day, position) {
        if (position === void 0) { position = 0; }
        return this.model.isDateDisabled(new Date(this.currentView.getFullYear(), this.currentView.getMonth() + position, day));
    };
    /**
     * Convenience method to figure out if days of the month in view
     *
     * @param {number} [position=0] index of month in view
     * @returns boolean
     * @memberof CalendarMonth
     */
    CalendarMonth.prototype.daysOfMonth = function (position) {
        if (position === void 0) { position = 0; }
        return this.model.daysOfMonth(new Date(this.currentView.getFullYear(), this.currentView.getMonth() + position, 1));
    };
    /**
     * Convenience method to figure out if `day` is part of a range selection
     *
     * @param {number} day day of month
     * @param {number} [position=0] index of month in view
     * @returns boolean
     * @memberof CalendarMonth
     */
    CalendarMonth.prototype.inRange = function (day, position) {
        if (position === void 0) { position = 0; }
        if (!day) {
            return false;
        }
        return this.model.isDateInRange(new Date(this.currentView.getFullYear(), this.currentView.getMonth() + position, day));
    };
    /**
     * Returns value indicating whether `day` is selected
     *
     * @param {number} day day of month
     * @param {number} [position=0] index of month in view
     * @returns boolean
     * @memberof CalendarMonth
     */
    CalendarMonth.prototype.isSelected = function (date, position) {
        if (position === void 0) { position = 0; }
        if (!date) {
            return false;
        }
        var currentMonthInView = (this.currentView.getMonth() + position) % 12;
        var currentYearInView = this.currentView.getFullYear();
        if (this.currentView.getMonth() + position === 12) {
            currentYearInView += 1;
        }
        return currentMonthInView === date.getMonth() &&
            currentYearInView === date.getFullYear();
    };
    /**
     *	Sets model's `startDate` and `endDate`
     *
     * @param {number} day day of month
     * @param {number} [position=0] index of month in view
     * @memberof CalendarMonth
     */
    CalendarMonth.prototype.selectDay = function (day, position) {
        if (position === void 0) { position = 0; }
        if (this.isDisabled(day, position)) {
            return;
        }
        var currentMonthInView = (this.currentView.getMonth() + position) % 12;
        var currentYearInView = this.currentView.getFullYear();
        if (this.currentView.getMonth() + position === 12) {
            currentYearInView += 1;
        }
        if (this.rangeSelectionInProgress) {
            this.rangeSelectionInProgress = false;
            this.model.endDate = DateTimeModel.dayEnd(new Date(currentYearInView, currentMonthInView, day));
            if (this.model.startDate.getTime() > this.model.endDate.getTime()) {
                var tmp = this.model.startDate;
                this.model.startDate = this.model.endDate;
                this.model.endDate = tmp;
            }
        }
        else {
            this.rangeSelectionInProgress = true;
            this.model.selectDay(new Date(currentYearInView, currentMonthInView, day));
        }
    };
    CalendarMonth.decorators = [
        { type: Component, args: [{
                    selector: "ibm-calendar-month-view",
                    template: "\n\t<div class=\"calendar-view\">\n\t\t<ibm-calendar-header [currentView]=\"currentView\" [monthCount]=\"monthCount\"></ibm-calendar-header>\n\t\t<div class=\"calendar_month-container\"\n\t\t*ngFor=\"let month of range(monthCount)\">\n\t\t\t<table class=\"calendar_grid calendar_month\">\n\t\t\t\t<tr class=\"grid_row_header--month\">\n\t\t\t\t\t<th *ngFor=\"let day of model.daysOfWeek\"><div>{{day}}</div></th>\n\t\t\t\t</tr>\n\t\t\t\t<tr\n\t\t\t\tclass=\"grid_row--month\"\n\t\t\t\t*ngFor=\"let week of daysOfMonth(month)\">\n\t\t\t\t<td\n\t\t\t\t\t*ngFor=\"let day of week\"\n\t\t\t\t\t(click)=\"selectDay(day, month)\"\n\t\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t\t'today': isCurrentDay(day, month),\n\t\t\t\t\t\t'empty': !day,\n\t\t\t\t\t\t'selected': isSelected(model.startDate, month) && day == model.startDate.getDate()\n\t\t\t\t\t\t\t|| isSelected(model.endDate, month) && day == model.endDate.getDate(),\n\t\t\t\t\t\t'range': inRange(day, month),\n\t\t\t\t\t\t'disabled': isDisabled(day, month)\n\t\t\t\t\t}\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t{{day}}\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\t</div>\n\t"
                },] },
    ];
    CalendarMonth.propDecorators = {
        model: [{ type: Input }],
        monthCount: [{ type: Input }]
    };
    return CalendarMonth;
}());
export { CalendarMonth };
//# sourceMappingURL=calendar-month.component.js.map