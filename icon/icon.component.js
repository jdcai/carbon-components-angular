/*!
 *
 * carbon-angular v0.0.0 | icon.component.js
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


import { Component, ElementRef, Input } from "@angular/core";
import { IconService } from "./icon.service";
/**
 * `n-icon` pulls the icon from the loaded sprite, and renders it at the specified size.
 * Under the hood, `n-icon` generates code similar to the following:
 * ```
 * <svg class="icon" width="30" height="30"><use href="#alert_30"></use></svg>
 * ```
 */
var Icon = /** @class */ (function () {
    /**
     * Initialize the component
     *
     * @param {ElementRef} elementRef
     */
    function Icon(elementRef, iconService) {
        this.elementRef = elementRef;
        this.iconService = iconService;
        /** accepts color strings */
        this.color = "dark";
        /** accepts abbreviated size strings */
        this.size = "md";
        /** map size strings to numeric values */
        this.sizeMap = {
            "xs": 14,
            "sm": 16,
            "md": 20,
            "lg": 30
        };
        this.spriteLoadingSubscription = null;
    }
    Object.defineProperty(Icon.prototype, "classList", {
        /**
         * Pass down `classList` from host element.
         */
        get: function () {
            return this.elementRef.nativeElement.classList;
        },
        enumerable: true,
        configurable: true
    });
    Icon.prototype.ngAfterViewInit = function () {
        var _this = this;
        var root = this.elementRef.nativeElement;
        var iconPromise = this.iconService.getIcon(this.icon, this.sizeMap[this.size]);
        iconPromise.then(function (icon) {
            root.innerHTML = "";
            icon.classList.add(_this.buildMatterClass());
            if (_this.classList.toString() !== "") {
                for (var _i = 0, _a = _this.classList; _i < _a.length; _i++) {
                    var className = _a[_i];
                    icon.classList.add(className);
                }
            }
            root.appendChild(icon);
        });
    };
    /**
     * Create a class name based on @Input() `color` and `size`.
     */
    Icon.prototype.buildMatterClass = function () {
        if (this.color === "dark" && this.size !== "md") {
            return "icon--" + this.size;
        }
        else {
            return "icon" + (this.color !== "dark" ? "--" + this.color : "") + (this.color !== "dark" && this.size !== "md" ? "-" + this.size : "");
        }
    };
    Icon.decorators = [
        { type: Component, args: [{
                    selector: "ibm-icon",
                    template: "",
                    providers: [IconService]
                },] },
    ];
    /** @nocollapse */
    Icon.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IconService }
    ]; };
    Icon.propDecorators = {
        icon: [{ type: Input }],
        color: [{ type: Input }],
        size: [{ type: Input }]
    };
    return Icon;
}());
export { Icon };
//# sourceMappingURL=icon.component.js.map