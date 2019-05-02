/*!
 *
 * carbon-angular v0.0.0 | date-time-model.class.js
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


var DateTimeModel = /** @class */ (function () {
    function DateTimeModel(startDate, endDate) {
        /**
         * 0 = Sunday
         * 1 = Monday
         * 2 = Tuesday
         * 3 = Wednesday
         * 4 = Thursday
         * 5 = Friday
         * 6 = Saturday
         *
         * Defaults to 0 (Sunday)
         *
         * @memberof DateTimeModel
         */
        this.weekStart = 0;
        /**
         * An array of disabled dates and/or date ranges.
         *
         * Date is a Javascript `Date`. Range is an array with a start and end `Date`.
         * If any of those is `null`, it represents an open range.
         *
         * ```typescript
         * // dates (July 10th, 2018 and August 10th, 2018)
         * [new Date(2018, 6, 10), new Date(2018, 7, 10)]
         *
         * // date (July 10th, 2018) and a range (from August 10th, 2018 to forever)
         * [new Date(2018, 6, 10), [new Date(2018, 7, 10), null]]
         * ```
         *
         * @memberof DateTimeModel
         */
        this.disabledDates = [];
        this.startDate = startDate;
        this.endDate = endDate;
    }
    DateTimeModel.dayStart = function (day) {
        return new Date(day.getFullYear(), day.getMonth(), day.getDate());
    };
    DateTimeModel.dayEnd = function (day) {
        return new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59);
    };
    Object.defineProperty(DateTimeModel.prototype, "daysOfWeek", {
        /**
         * An array of short week names, starting from `weekStart`.
         *
         * @readonly
         * @memberof DateTimeModel
         */
        get: function () {
            var sunday = new Date(2018, 5, 10);
            var result = [];
            for (var i = this.weekStart; i < this.weekStart + 7; i++) {
                var day = new Date(sunday);
                day.setDate(day.getDate() + i);
                result.push(DateTimeModel.shortWeekdaysTranslateKeys[day.getDay()]);
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Selects the full day that `day` is part of.
     *
     * Adjusts `startDate` and `endDate`
     *
     * @param {Date} [day=new Date()]
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectDay = function (day) {
        if (day === void 0) { day = new Date(); }
        this.startDate = DateTimeModel.dayStart(day);
        this.endDate = DateTimeModel.dayEnd(day);
    };
    /**
     * Selects the week that `day` is part of.
     *
     * Adjusts `startDate` and `endDate`
     *
     * @param {Date} [day=new Date()]
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectWeek = function (day) {
        if (day === void 0) { day = new Date(); }
        this.startDate = this.weekStartDate(day);
        this.endDate = this.weekStartDate(day);
        this.endDate.setDate(this.endDate.getDate() + 6);
        this.endDate.setHours(23);
        this.endDate.setMinutes(59);
        this.endDate.setSeconds(59);
    };
    /**
     * Convenience function that selects today.
     *
     * Adjusts `startDate` and `endDate`
     *
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectToday = function () {
        this.selectDay(new Date());
    };
    /**
     * Selects yesterday.
     *
     * Adjusts `startDate` and `endDate`
     *
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectYesterday = function () {
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        this.selectDay(yesterday);
    };
    /**
     * Selects a week that `targetDate` belongs to from the beginning
     * (as set with `weekStart`) until the `targetDate`, included.
     *
     * @param {*} [targetDate=new Date()]
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectWeekToDate = function (targetDate) {
        if (targetDate === void 0) { targetDate = new Date(); }
        this.startDate = this.weekStartDate(targetDate);
        this.endDate = targetDate;
    };
    /**
     * Selects a `monthCount` of months ending with the one that `targetDate` belongs to
     * from the beginning of the first until the `targetDate`, included.
     *
     * @param {*} [targetDate=new Date()]
     * @param {number} [monthCount=1]
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectMonthsToDate = function (targetDate, monthCount) {
        if (targetDate === void 0) { targetDate = new Date(); }
        if (monthCount === void 0) { monthCount = 1; }
        this.startDate = new Date(targetDate.getFullYear(), targetDate.getMonth() - monthCount + 1, 1);
        this.endDate = targetDate;
    };
    /**
     * Selects month that `day` belongs to.
     *
     * @param {*} [day=new Date()]
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectMonth = function (day) {
        if (day === void 0) { day = new Date(); }
        this.startDate = new Date(day.getFullYear(), day.getMonth(), 1);
        this.selectMonthEnd(day);
    };
    /**
     * Selects end of month that `day` belongs to.
     *
     * @param {*} [day=new Date()]
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectMonthEnd = function (day) {
        if (day === void 0) { day = new Date(); }
        this.endDate = new Date(day.getFullYear(), day.getMonth() + 1, 0, 23, 59, 59); // 0 selects last day of previous month
    };
    /**
     * Selects previous month.
     *
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectLastMonth = function () {
        var now = new Date();
        this.selectMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1));
    };
    /**
     * Selects a quarter that `targetDate` belongs to from the first day of the
     * quarter to `targetDate`.
     *
     * @param {*} [targetDate=new Date()]
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectQuarterToDate = function (targetDate) {
        if (targetDate === void 0) { targetDate = new Date(); }
        var year = targetDate.getFullYear();
        var time = targetDate.getTime();
        var quarters = [new Date(year, 0, 1), new Date(year, 3, 1), new Date(year, 6, 1), new Date(year, 9, 1)];
        var quarterTimes = quarters.map(function (q) { return q.getTime(); });
        if (quarterTimes[0] < time && time < quarterTimes[1]) {
            // Q1
            this.startDate = quarters[0];
        }
        else if (quarterTimes[1] < time && time < quarterTimes[2]) {
            // Q2
            this.startDate = quarters[1];
        }
        else if (quarterTimes[2] < time && time < quarterTimes[3]) {
            // Q3
            this.startDate = quarters[2];
        }
        else {
            // Q4
            this.startDate = quarters[3];
        }
        this.endDate = targetDate;
    };
    /**
     * Select a `quarter` of the `year`.
     *
     * `quarter` ranges from `0` to `3`, Q1 being `0`
     *
     * @param {number} quarter
     * @param {*} [year=new Date().getFullYear()]
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectQuarter = function (quarter, year) {
        if (year === void 0) { year = new Date().getFullYear(); }
        this.selectQuarterStart(quarter, year);
        this.selectQuarterEnd(quarter, year);
    };
    /**
     * Sets a `startDate` to start of `quarter` of the `year`.
     *
     * `quarter` ranges from `0` to `3`, Q1 being `0`
     *
     * @param {number} quarter
     * @param {*} [year=new Date().getFullYear()]
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectQuarterStart = function (quarter, year) {
        if (year === void 0) { year = new Date().getFullYear(); }
        this.startDate = new Date(year, quarter * 3, 1);
    };
    /**
     * Sets an `endDate` to end of `quarter` of the `year`.
     *
     * `quarter` ranges from `0` to `3`, Q1 being `0`
     *
     * @param {number} quarter
     * @param {*} [year=new Date().getFullYear()]
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectQuarterEnd = function (quarter, year) {
        if (year === void 0) { year = new Date().getFullYear(); }
        this.endDate = new Date(year, (quarter + 1) * 3, 0, 23, 59, 59);
    };
    DateTimeModel.prototype.selectLastQuarter = function (date) {
        if (date === void 0) { date = new Date(); }
        this.selectQuarter(date.getMonth() / 3, date.getFullYear());
    };
    /**
     * Selects year that `day` belongs to.
     *
     * @param {*} [day=new Date()]
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectYear = function (day) {
        if (day === void 0) { day = new Date(); }
        this.selectYearStart(day);
        this.selectYearEnd(day);
    };
    /**
     * Selects end of year that `day` belongs to.
     *
     * @param {*} [day=new Date()]
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectYearEnd = function (day) {
        if (day === void 0) { day = new Date(); }
        this.endDate = new Date(day.getFullYear(), 11, 31, 23, 59, 59); // 31st of December of given year
    };
    /**
     * Selects start of year that `day` belongs to.
     *
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.selectYearStart = function (day) {
        if (day === void 0) { day = new Date(); }
        this.startDate = new Date(day.getFullYear(), 0, 1); // 1st of January
    };
    /**
     * Returns a week start date for a week that `day` is in.
     *
     * @param {Date} [day=new Date()]
     * @returns {Date}
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.weekStartDate = function (day) {
        if (day === void 0) { day = new Date(); }
        return new Date(day.getFullYear(), day.getMonth(), day.getDate() - day.getDay() + this.weekStart);
    };
    /**
     * Returns a 2D array representing days of month the way they would be displayed
     * in the calendar. With `null` representing empty days.
     *
     * Month of June, 2018, with week starting on Sunday, will return
     *
     * ```typescript
     * [
     * 	[ null, null, null, null, null, 1, 2 ],
     * 	[ 3, 4, 5, 6, 7, 8, 9 ],
     * 	[ 10, 11, 12, 13, 14, 15, 16 ],
     * 	[ 17, 18, 19, 20, 21, 22, 23 ],
     * 	[ 24, 25, 26, 27, 28, 29, 30 ],
     * 	[ null, null, null, null, null, null, null ]
     * ]
     * ```
     *
     * @param {Date} [day=new Date()]
     * @returns {Array<Array<number>>}
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.daysOfMonth = function (day) {
        if (day === void 0) { day = new Date(); }
        var weeks = [];
        var firstOfTheMonth = new Date(day.getFullYear(), day.getMonth(), 1);
        var lastOfTheMonth = new Date(day.getFullYear(), day.getMonth() + 1, 0);
        var dayIndex = 1;
        for (var w = 1; w < 7; w++) {
            var week = [];
            for (var d = 0; d < 7; d++) {
                if (w === 1) {
                    // first week is special, we have to determine when to start
                    if (d >= firstOfTheMonth.getDay() + this.weekStart) {
                        week.push(dayIndex++);
                    }
                    else {
                        week.push(null);
                    }
                }
                else if (dayIndex <= lastOfTheMonth.getDate()) {
                    // every other day of the month
                    week.push(dayIndex++);
                }
                else {
                    // except for when month ends
                    week.push(null);
                }
            }
            weeks.push(week);
        }
        return weeks;
    };
    /**
     * Tells you if `day` is disabled in `disabledDates` property.
     *
     * @param {Date} day
     * @returns
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.isDateDisabled = function (day) {
        for (var i = 0; i < this.disabledDates.length; i++) {
            var dd = this.disabledDates[i];
            if (Array.isArray(dd)) {
                if (dd.length !== 2) {
                    console.warn(dd, "should have length of 2, range start and range end. They can be set to `null` for open range.");
                }
                else if (!dd[0] && dd[1] && day.getTime() <= dd[1].getTime() ||
                    dd[0] && !dd[1] && day.getTime() >= dd[0].getTime() ||
                    !dd[0] && !dd[1] ||
                    dd[0] && dd[1] && day.getTime() <= dd[1].getTime() && day.getTime() >= dd[0].getTime()) {
                    return true;
                }
            }
            else if (day.getFullYear() === dd.getFullYear() &&
                day.getMonth() === dd.getMonth() &&
                day.getDate() === dd.getDate()) {
                return true;
            }
        }
        return false;
    };
    /**
     * Tells you if `day` is inside of selected range.
     *
     * @param {Date} day
     * @returns
     * @memberof DateTimeModel
     */
    DateTimeModel.prototype.isDateInRange = function (day) {
        var time = day.getTime();
        return this.startDate && this.endDate && this.startDate.getTime() <= time && time <= this.endDate.getTime();
    };
    DateTimeModel.monthsTranslateKeys = [
        "CALENDAR.MONTHS.JANUARY",
        "CALENDAR.MONTHS.FEBRUARY",
        "CALENDAR.MONTHS.MARCH",
        "CALENDAR.MONTHS.APRIL",
        "CALENDAR.MONTHS.MAY",
        "CALENDAR.MONTHS.JUNE",
        "CALENDAR.MONTHS.JULY",
        "CALENDAR.MONTHS.AUGUST",
        "CALENDAR.MONTHS.SEPTEMBER",
        "CALENDAR.MONTHS.OCTOBER",
        "CALENDAR.MONTHS.NOVEMBER",
        "CALENDAR.MONTHS.DECEMBER"
    ];
    DateTimeModel.shortWeekdaysTranslateKeys = [
        "CALENDAR.SHORTWEEKDAYS.SUNDAY",
        "CALENDAR.SHORTWEEKDAYS.MONDAY",
        "CALENDAR.SHORTWEEKDAYS.TUESDAY",
        "CALENDAR.SHORTWEEKDAYS.WEDNESDAY",
        "CALENDAR.SHORTWEEKDAYS.THURSDAY",
        "CALENDAR.SHORTWEEKDAYS.FRIDAY",
        "CALENDAR.SHORTWEEKDAYS.SATURDAY"
    ];
    return DateTimeModel;
}());
export { DateTimeModel };
//# sourceMappingURL=date-time-model.class.js.map