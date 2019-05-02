/*!
 *
 * carbon-angular v0.0.0 | combobox.module.js
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
import { PillInputModule } from "./../pill-input/pill-input.module";
import { ComboBox } from "./combobox.component";
import { DropdownModule } from "../dropdown/dropdown.module";
export { ComboBox } from "./combobox.component";
var ComboBoxModule = /** @class */ (function () {
    function ComboBoxModule() {
    }
    ComboBoxModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ComboBox
                    ],
                    exports: [
                        ComboBox,
                        DropdownModule
                    ],
                    imports: [
                        CommonModule,
                        PillInputModule,
                        StaticIconModule,
                        DropdownModule
                    ]
                },] },
    ];
    return ComboBoxModule;
}());
export { ComboBoxModule };
//# sourceMappingURL=combobox.module.js.map