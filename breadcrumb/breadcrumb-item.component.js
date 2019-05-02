/*!
 *
 * carbon-angular v0.0.0 | breadcrumb-item.component.js
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


import { Component, HostBinding, Input } from "@angular/core";
var BreadcrumbItemComponent = /** @class */ (function () {
    function BreadcrumbItemComponent() {
        this.skeleton = false;
        this.itemClass = true;
    }
    BreadcrumbItemComponent.decorators = [
        { type: Component, args: [{
                    selector: "ibm-breadcrumb-item",
                    template: "\n\t<a class=\"bx--link\"\n\t\thref=\"{{skeleton ? '/#' : href}}\"\n\t\t*ngIf=\"skeleton || href; else content\">\n\t\t<ng-container *ngTemplateOutlet=\"content\"></ng-container>\n\t</a>\n\t<ng-template #content>\n\t\t<ng-content></ng-content>\n\t</ng-template>"
                },] },
    ];
    BreadcrumbItemComponent.propDecorators = {
        href: [{ type: Input }],
        skeleton: [{ type: Input }],
        itemClass: [{ type: HostBinding, args: ["class.bx--breadcrumb-item",] }]
    };
    return BreadcrumbItemComponent;
}());
export { BreadcrumbItemComponent };
//# sourceMappingURL=breadcrumb-item.component.js.map