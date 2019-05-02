/*!
 *
 * carbon-angular v0.0.0 | header.component.js
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


import { Component, Input, HostBinding } from "@angular/core";
import { I18n } from "./../i18n/i18n.module";
var Header = /** @class */ (function () {
    function Header(i18n) {
        this.i18n = i18n;
        this.brand = "IBM";
        this.hostClass = true;
    }
    Header.decorators = [
        { type: Component, args: [{
                    selector: "ibm-header",
                    template: "\n\t\t<header\n\t\t\tclass=\"bx--header\"\n\t\t\trole=\"banner\"\n\t\t\t[attr.aria-label]=\"brand + ' ' + name\">\n\t\t\t<a\n\t\t\t\tclass=\"bx--skip-to-content\"\n\t\t\t\t[href]=\"skipTo\"\n\t\t\t\ttabindex=\"0\">\n\t\t\t\t{{ i18n.get(\"UI_SHELL.SKIP_TO\") | async }}\n\t\t\t</a>\n\t\t\t<ng-content select=\"ibm-hamburger\"></ng-content>\n\t\t\t<a class=\"bx--header__name\" href=\"#\">\n\t\t\t\t<span class=\"bx--header__name--prefix\">{{brand}}&nbsp;</span>\n\t\t\t\t{{name}}\n\t\t\t</a>\n\t\t\t<ng-content></ng-content>\n\t\t</header>\n\t"
                },] },
    ];
    /** @nocollapse */
    Header.ctorParameters = function () { return [
        { type: I18n }
    ]; };
    Header.propDecorators = {
        skipTo: [{ type: Input }],
        name: [{ type: Input }],
        brand: [{ type: Input }],
        hostClass: [{ type: HostBinding, args: ["class.bx--header",] }]
    };
    return Header;
}());
export { Header };
//# sourceMappingURL=header.component.js.map