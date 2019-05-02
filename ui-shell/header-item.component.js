/*!
 *
 * carbon-angular v0.0.0 | header-item.component.js
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


import { Component } from "@angular/core";
var HeaderItem = /** @class */ (function () {
    function HeaderItem() {
    }
    HeaderItem.decorators = [
        { type: Component, args: [{
                    selector: "ibm-header-item",
                    template: "\n\t\t<li style=\"height: 100%\">\n\t\t\t<a class=\"bx--header__menu-item\" href=\"javascript:void(0)\" role=\"menuitem\" tabindex=\"0\">\n\t\t\t\t<ng-content></ng-content>\n\t\t\t</a>\n\t\t</li>\n\t"
                },] },
    ];
    return HeaderItem;
}());
export { HeaderItem };
//# sourceMappingURL=header-item.component.js.map