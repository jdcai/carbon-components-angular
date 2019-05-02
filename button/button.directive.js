/*!
 *
 * carbon-angular v0.0.0 | button.directive.js
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


import { Directive, HostBinding, Input } from "@angular/core";
/**
 * A convinence directive for applying styling to a button.
 *
 * Example:
 *
 * ```html
 * <button ibmButton>A button</button>
 * <button ibmButton="secondary">A secondary button</button>
 * ```
 *
 * See the [vanilla carbon docs](http://www.carbondesignsystem.com/components/button/code) for more detail.
 */
var Button = /** @class */ (function () {
    function Button() {
        /**
         * sets the button type
         */
        this.ibmButton = "primary";
        /**
         * Specify the size of the button
         */
        this.size = "normal";
        this.primary = true;
        this.secondary = false;
        this.tertiary = false;
        this.ghost = false;
        this.danger = false;
        this.dangerPrimary = false;
        this.skeleton = false;
        this.smallSize = false;
        this.toolbarAction = false;
    }
    Object.defineProperty(Button.prototype, "baseClass", {
        // a whole lot of HostBindings ... this way we don't have to touch the elementRef directly
        get: function () {
            return !this.toolbarAction;
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.ngOnInit = function () {
        if (this.size === "sm") {
            this.smallSize = true;
        }
        this.primary = false;
        switch (this.ibmButton) {
            case "primary":
                this.primary = true;
                break;
            case "secondary":
                this.secondary = true;
                break;
            case "tertiary":
                this.tertiary = true;
                break;
            case "ghost":
                this.ghost = true;
                break;
            case "danger":
                this.danger = true;
                break;
            case "danger--primary":
                this.dangerPrimary = true;
                break;
            case "toolbar-action":
                this.toolbarAction = true;
                break;
            default:
                this.primary = true;
                break;
        }
    };
    Button.decorators = [
        { type: Directive, args: [{
                    selector: "[ibmButton]"
                },] },
    ];
    Button.propDecorators = {
        ibmButton: [{ type: Input }],
        size: [{ type: Input }],
        baseClass: [{ type: HostBinding, args: ["class.bx--btn",] }],
        primary: [{ type: HostBinding, args: ["class.bx--btn--primary",] }],
        secondary: [{ type: HostBinding, args: ["class.bx--btn--secondary",] }],
        tertiary: [{ type: HostBinding, args: ["class.bx--btn--tertiary",] }],
        ghost: [{ type: HostBinding, args: ["class.bx--btn--ghost",] }],
        danger: [{ type: HostBinding, args: ["class.bx--btn--danger",] }],
        dangerPrimary: [{ type: HostBinding, args: ["class.bx--btn--danger--primary",] }],
        skeleton: [{ type: HostBinding, args: ["class.bx--skeleton",] }, { type: Input }],
        smallSize: [{ type: HostBinding, args: ["class.bx--btn--sm",] }],
        toolbarAction: [{ type: HostBinding, args: ["class.bx--toolbar-action",] }]
    };
    return Button;
}());
export { Button };
//# sourceMappingURL=button.directive.js.map