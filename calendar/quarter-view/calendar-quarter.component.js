/*!
 *
 * carbon-angular v0.0.0 | calendar-quarter.component.js
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
var CalendarQuarter = /** @class */ (function () {
    /**
     * Creates an instance of CalendarQuarter.
     * Translates quarters.
     * @param {TranslateService} translate
     * @memberof CalendarQuarter
     */
    function CalendarQuarter() {
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
        // this.translate.get("CALENDAR.QUARTERS").subscribe((res: Array<any>) => {
        // 	this.quarters = res;
        // });
    }
    CalendarQuarter.prototype.ngOnInit = function () {
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
    CalendarQuarter.prototype.range = function (stop, start, step) {
        if (start === void 0) { start = 0; }
        if (step === void 0) { step = 1; }
        return range(stop, start, step);
    };
    /**
     * Returns value indicating whether `quarter` is current quarter
     *
     * @param {number} quarter of year
     * @returns boolean
     * @memberof CalendarQuarter
     */
    CalendarQuarter.prototype.isCurrentQuarter = function (quarter) {
        var now = new Date();
        return (this.currentView.getFullYear() === now.getFullYear() &&
            quarter === Math.floor(now.getMonth() / 3));
    };
    /**
     * Returns value indicating whether `quarter` is disabled
     *
     * @param {number} quarter of year
     * @returns boolean
     * @memberof CalendarQuarter
     */
    CalendarQuarter.prototype.isDisabled = function (quarter) {
        return this.model.isDateDisabled(new Date(this.currentView.getFullYear(), quarter * 4, 1));
    };
    /**
     * Returns value indicating whether `quarter` is part of a range selection
     *
     * @param {number} quarter of year
     * @returns boolean
     * @memberof CalendarQuarter
     */
    CalendarQuarter.prototype.inRange = function (quarter) {
        return this.model.isDateInRange(new Date(this.currentView.getFullYear(), quarter * 4, 1));
    };
    /**
     * Returns value indicating whether `quarter` is selected
     *
     * @param {number} quarter
     * @returns
     * @memberof CalendarQuarter
     */
    CalendarQuarter.prototype.isSelected = function (quarter) {
        return (this.currentView.getFullYear() === this.model.startDate.getFullYear() && quarter === Math.floor(this.model.startDate.getMonth() / 3)
            || this.currentView.getFullYear() === this.model.endDate.getFullYear() && quarter === Math.floor(this.model.endDate.getMonth() / 3));
    };
    /**
     * Sets model's `startDate` and `endDate`
     *
     * @param {number} quarter
     * @memberof CalendarQuarter
     */
    CalendarQuarter.prototype.selectQuarter = function (quarter) {
        if (this.isDisabled(quarter)) {
            return;
        }
        if (this.rangeSelectionInProgress) {
            this.rangeSelectionInProgress = false;
            this.model.selectQuarterEnd(quarter, this.currentView.getFullYear());
            if (this.model.startDate.getTime() > this.model.endDate.getTime()) {
                var tmp = this.model.startDate;
                this.model.startDate = this.model.endDate;
                this.model.endDate = tmp;
            }
        }
        else {
            this.rangeSelectionInProgress = true;
            this.model.selectQuarter(quarter, this.currentView.getFullYear());
        }
    };
    CalendarQuarter.decorators = [
        { type: Component, args: [{
                    selector: "ibm-calendar-quarter-view",
                    template: "\n\t<div class=\"calendar-view\">\n\t\t<ibm-calendar-header [currentView]=\"currentView\" header=\"yearOnly\"></ibm-calendar-header>\n\t\t<table class=\"calendar_grid\">\n\t\t\t<tr\n\t\t\tclass=\"grid_row--quarters\"\n\t\t\t*ngFor=\"let i of range(2)\">\n\t\t\t\t<td\n\t\t\t\t*ngFor=\"let j of range(2)\"\n\t\t\t\t(click)=\"selectQuarter(i * 2 + j)\"\n\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t'today': isCurrentQuarter(i * 2 + j),\n\t\t\t\t\t'selected': isSelected(i * 2 + j),\n\t\t\t\t\t'range': inRange(i * 2 + j),\n\t\t\t\t\t'disabled': isDisabled(i * 2 + j)\n\t\t\t\t}\">\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<p class=\"top\">\n\t\t\t\t\t\t\t{{quarters[i * 2 + j].name}}\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p class=\"bottom\">\n\t\t\t\t\t\t\t{{quarters[i * 2 + j].months}}\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t</table>\n\t</div>\n\t"
                },] },
    ];
    /** @nocollapse */
    CalendarQuarter.ctorParameters = function () { return []; };
    CalendarQuarter.propDecorators = {
        model: [{ type: Input }]
    };
    return CalendarQuarter;
}());
export { CalendarQuarter };
//# sourceMappingURL=calendar-quarter.component.js.map