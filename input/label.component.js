/*!
 *
 * carbon-angular v0.0.0 | label.component.js
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


import { Component, Input, ElementRef, HostBinding } from "@angular/core";
/**
 * ```html
 * <ibm-label labelState="success">
 * 	<label label>Field with success</label>
 * 	<input type="text" class="input-field">
 * </ibm-label>
 *
 * <ibm-label labelState="warning">
 * 	<label label>Field with warning</label>
 * 	<input type="text" class="input-field">
 * </ibm-label>
 *
 * <ibm-label labelState="error">
 * 	<label label>Field with error</label>
 * 	<input type="text" class="input-field">
 * </ibm-label>
 * ```
 *
 * @export
 * @class Label
 * @implements {AfterContentInit}
 */
var Label = /** @class */ (function () {
    /**
     * Creates an instance of Label.
     * @param {ElementRef} elementRef
     * @memberof Label
     */
    function Label(elementRef) {
        this.elementRef = elementRef;
        /**
         * The id of the input item associated with the `Label`. This value is also used to associate the `Label` with
         * its input counterpart through the 'for' attribute.
         * @memberof Label
         */
        this.labelInputID = "ibm-label-" + Label.labelCounter;
        /**
         * State of the `Label` will determine the styles applied.
         * @type {("success" | "warning" | "error" | "")}
         * @memberof Label
         */
        this.labelState = "";
        /**
         * Set to `true` for a loading label.
         */
        this.skeleton = false;
        this.labelClass = true;
        Label.labelCounter++;
    }
    /**
     * Sets the id on the input item associated with the `Label`.
     * @memberof Label
     */
    Label.prototype.ngAfterContentInit = function () {
        this.elementRef.nativeElement.querySelector("input,textarea,div").setAttribute("id", this.labelInputID);
    };
    /**
     * Used to build the id of the input item associated with the `Label`.
     * @static
     * @memberof Label
     */
    Label.labelCounter = 0;
    Label.decorators = [
        { type: Component, args: [{
                    selector: "ibm-label",
                    template: "\n\t\t<label\n\t\t\t[for]=\"labelInputID\"\n\t\t\tclass=\"bx--label\"\n\t\t\t[ngClass]=\"{\n\t\t\t\t'bx--skeleton': skeleton\n\t\t\t}\">\n\t\t\t<ng-content></ng-content>\n\t\t</label>\n\t\t<ng-content select=\"input,textarea,div\"></ng-content>\n\t"
                },] },
    ];
    /** @nocollapse */
    Label.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    Label.propDecorators = {
        labelState: [{ type: Input }],
        skeleton: [{ type: Input }],
        labelClass: [{ type: HostBinding, args: ["class.bx--form-item",] }]
    };
    return Label;
}());
export { Label };
//# sourceMappingURL=label.component.js.map