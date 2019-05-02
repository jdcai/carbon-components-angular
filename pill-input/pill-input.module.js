/*!
 *
 * carbon-angular v0.0.0 | pill-input.module.js
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


import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StaticIconModule } from "./../icon/static-icon.module";
import { PillInput } from "./pill-input.component";
import { Pill } from "./pill.component";
export { PillInput } from "./pill-input.component";
export { Pill } from "./pill.component";
var PillInputModule = /** @class */ (function () {
    function PillInputModule() {
    }
    PillInputModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        Pill,
                        PillInput
                    ],
                    exports: [
                        Pill,
                        PillInput
                    ],
                    imports: [CommonModule, StaticIconModule]
                },] },
    ];
    return PillInputModule;
}());
export { PillInputModule };
//# sourceMappingURL=pill-input.module.js.map