/*!
 *
 * carbon-angular v0.0.0 | calendar-header.component.js
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
import { DateTimeModel } from "./date-time-model.class";
import { range } from "../common/utils";
var CalendarHeader = /** @class */ (function () {
    function CalendarHeader() {
        this.currentView = new Date();
        this.monthCount = 1;
    }
    CalendarHeader.prototype.range = function (stop, start, step) {
        if (start === void 0) { start = 0; }
        if (step === void 0) { step = 1; }
        return range(stop, start, step);
    };
    CalendarHeader.prototype.nextYear = function () {
        this.currentView.setFullYear(this.currentView.getFullYear() + 1);
    };
    CalendarHeader.prototype.nextMonth = function () {
        this.currentView.setMonth(this.currentView.getMonth() + 1);
    };
    CalendarHeader.prototype.previousYear = function () {
        this.currentView.setFullYear(this.currentView.getFullYear() - 1);
    };
    CalendarHeader.prototype.previousMonth = function () {
        this.currentView.setMonth(this.currentView.getMonth() - 1);
    };
    CalendarHeader.prototype.getYear = function () {
        return this.currentView.getFullYear();
    };
    CalendarHeader.prototype.getMonth = function (position) {
        if (position === void 0) { position = 0; }
        var currentMonthInView = (this.currentView.getMonth() + position) % 12;
        return DateTimeModel.monthsTranslateKeys[currentMonthInView];
    };
    CalendarHeader.decorators = [
        { type: Component, args: [{
                    selector: "ibm-calendar-header",
                    template: "\n\t\t\t<nav class=\"pagination\" aria-label=\"year-pagination\">\n\t\t\t\t<ul>\n\t\t\t\t\t<li class=\"pagination_chevron\">\n\t\t\t\t\t\t<a (click)=\"previousYear()\" title=\"Previous page\" aria-label=\"Previous page\">\n\t\t\t\t\t\t\t<!-- <peretz-icon set=\"arrows_chevrons\" icon=\"chevron_left\" size=\"xs\"></peretz-icon> -->\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li *ngIf=\"header === 'yearOnlyRange'\">{{getYear() - 5}} - {{getYear()}}</li>\n\t\t\t\t\t<li *ngIf=\"header !== 'yearOnlyRange'\">{{getYear()}}</li>\n\t\t\t\t\t<li class=\"pagination_chevron\">\n\t\t\t\t\t\t<a (click)=\"nextYear()\" title=\"Next page\" aria-label=\"Next page\">\n\t\t\t\t\t\t\t<!-- <peretz-icon set=\"arrows_chevrons\" icon=\"chevron_right\" size=\"xs\"></peretz-icon> -->\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</nav>\n\n\t\t\t<nav\n\t\t\t*ngIf=\"header !== 'yearOnly' && header !== 'yearOnlyRange'\"\n\t\t\tclass=\"pagination month\"\n\t\t\taria-label=\"month-pagination\">\n\t\t\t\t<ul>\n\t\t\t\t\t<li class=\"pagination_chevron\">\n\t\t\t\t\t\t<a (click)=\"previousMonth()\" title=\"Previous page\" aria-label=\"Previous page\">\n\t\t\t\t\t\t\t<!-- <peretz-icon set=\"arrows_chevrons\" icon=\"chevron_left\" size=\"xs\"></peretz-icon> -->\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li\n\t\t\t\t\tclass=\"month_view-month\"\n\t\t\t\t\t*ngFor=\"let month of range(monthCount)\">\n\t\t\t\t\t\t{{getMonth(month)}}\n\t\t\t\t\t</li>\n\t\t\t\t\t<li class=\"pagination_chevron\">\n\t\t\t\t\t\t<a (click)=\"nextMonth()\" title=\"Next page\" aria-label=\"Next page\">\n\t\t\t\t\t\t\t<!-- <peretz-icon set=\"arrows_chevrons\" icon=\"chevron_right\" size=\"xs\"></peretz-icon> -->\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</nav>\n\t"
                },] },
    ];
    CalendarHeader.propDecorators = {
        currentView: [{ type: Input }],
        header: [{ type: Input }],
        monthCount: [{ type: Input }]
    };
    return CalendarHeader;
}());
export { CalendarHeader };
//# sourceMappingURL=calendar-header.component.js.map