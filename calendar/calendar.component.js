/*!
 *
 * carbon-angular v0.0.0 | calendar.component.js
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
var Calendar = /** @class */ (function () {
    function Calendar() {
        this.monthCount = 1;
        // onKeyDown(evt, idx) {
        // 	console.log(evt, idx);
        // 	if (evt.key === "ArrowRight" && this.allButtons[idx + 1]) {
        // 		evt.preventDefault();
        // 		this.allButtons[idx + 1].focus();
        // 	} else if (evt.key === "ArrowLeft" && idx > 0) {
        // 		evt.preventDefault();
        // 		this.allButtons[idx - 1].focus();
        // 	} else if (evt.key === "ArrowUp" && idx - 7 >= 0) {
        // 		evt.preventDefault();
        // 		this.allButtons[idx - 7].focus();
        // 	} else if (evt.key === "ArrowDown" && this.allButtons[idx + 7]) {
        // 		evt.preventDefault();
        // 		this.allButtons[idx + 7].focus();
        // 	}
        // }
    }
    Calendar.decorators = [
        { type: Component, args: [{
                    selector: "ibm-calendar",
                    template: "\n\t\t<div class=\"calendar-view\">\n\t\t\t<ibm-calendar-month-view [model]=\"model\" [monthCount]=\"monthCount\" *ngIf=\"view == 'month'\"></ibm-calendar-month-view>\n\t\t\t<ibm-calendar-months-view [model]=\"model\" *ngIf=\"view == 'months'\"></ibm-calendar-months-view>\n\t\t\t<ibm-calendar-quarter-view [model]=\"model\" *ngIf=\"view == 'quarter'\"></ibm-calendar-quarter-view>\n\t\t\t<ibm-calendar-year-view [model]=\"model\" *ngIf=\"view == 'year'\"></ibm-calendar-year-view>\n\t\t</div>\n\t"
                },] },
    ];
    Calendar.propDecorators = {
        view: [{ type: Input }],
        model: [{ type: Input }],
        monthCount: [{ type: Input }]
    };
    return Calendar;
}());
export { Calendar };
//# sourceMappingURL=calendar.component.js.map