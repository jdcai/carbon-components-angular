/*!
 *
 * carbon-angular v0.0.0 | sidenav-item.component.js
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
var SideNavItem = /** @class */ (function () {
    function SideNavItem() {
        this.active = false;
        this.isSubMenu = false;
    }
    SideNavItem.decorators = [
        { type: Component, args: [{
                    selector: "ibm-sidenav-item",
                    template: "\n\t\t<li [ngClass]=\"{\n\t\t\t'bx--side-nav__item': !isSubMenu,\n\t\t\t'bx--side-nav__menu-item': isSubMenu\n\t\t}\"\n\t\t[attr.role]=\"(isSubMenu ? 'none' : null)\">\n\t\t\t<a\n\t\t\t\tclass=\"bx--side-nav__link\"\n\t\t\t\thref=\"javascript:void(0)\"\n\t\t\t\t[attr.role]=\"(isSubMenu ? 'menuitem' : null)\"\n\t\t\t\t[attr.aria-current]=\"(active ? 'page' : null)\">\n\t\t\t\t<div *ngIf=\"!isSubMenu\" class=\"bx--side-nav__icon\">\n\t\t\t\t\t<ng-content select=\"[icon]\"></ng-content>\n\t\t\t\t</div>\n\t\t\t\t<span class=\"bx--side-nav__link-text\">\n\t\t\t\t\t<ng-content></ng-content>\n\t\t\t\t</span>\n\t\t\t</a>\n\t\t</li>\n\t"
                },] },
    ];
    SideNavItem.propDecorators = {
        active: [{ type: Input }]
    };
    return SideNavItem;
}());
export { SideNavItem };
//# sourceMappingURL=sidenav-item.component.js.map