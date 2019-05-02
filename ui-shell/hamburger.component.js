/*!
 *
 * carbon-angular v0.0.0 | hamburger.component.js
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
import { I18n } from "../i18n/i18n.module";
/**
 * A slide-out hamburger menu
 *
 * TODO: This is a stub component, and needs to be implemented.
 */
var Hamburger = /** @class */ (function () {
    function Hamburger(i18n) {
        this.i18n = i18n;
    }
    Hamburger.decorators = [
        { type: Component, args: [{
                    selector: "ibm-hamburger",
                    template: "\n\t\t<button\n\t\t\tclass=\"bx--header__menu-trigger bx--header__action\"\n\t\t\t[attr.aria-label]=\"i18n.get('UI_SHELL.HEADER.MENU') | async\"\n\t\t\t[attr.title]=\"i18n.get('UI_SHELL.HEADER.MENU') | async\">\n\t\t\t<svg aria-hidden=\"true\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\">\n\t\t\t\t<path d=\"M4 6h24v2H4zm0 18h24v2H4zm0-9h24v2H4z\" />\n\t\t\t</svg>\n\t\t</button>\n\t"
                },] },
    ];
    /** @nocollapse */
    Hamburger.ctorParameters = function () { return [
        { type: I18n }
    ]; };
    return Hamburger;
}());
export { Hamburger };
//# sourceMappingURL=hamburger.component.js.map