/*!
 *
 * carbon-angular v0.0.0 | datepicker-input.module.js
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


import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatePickerInput } from "./datepicker-input.component";
var DatePickerInputModule = /** @class */ (function () {
    function DatePickerInputModule() {
    }
    DatePickerInputModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        DatePickerInput
                    ],
                    exports: [
                        DatePickerInput
                    ],
                    imports: [
                        CommonModule,
                        Ng2FlatpickrModule
                    ]
                },] },
    ];
    return DatePickerInputModule;
}());
export { DatePickerInputModule };
//# sourceMappingURL=datepicker-input.module.js.map