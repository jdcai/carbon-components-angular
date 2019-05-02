/*!
 *
 * carbon-angular v0.0.0 | label.component.d.ts
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


import { AfterContentInit, ElementRef } from "@angular/core";
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
export declare class Label implements AfterContentInit {
    protected elementRef: ElementRef;
    /**
     * Used to build the id of the input item associated with the `Label`.
     * @static
     * @memberof Label
     */
    static labelCounter: number;
    /**
     * The id of the input item associated with the `Label`. This value is also used to associate the `Label` with
     * its input counterpart through the 'for' attribute.
     * @memberof Label
     */
    labelInputID: string;
    /**
     * State of the `Label` will determine the styles applied.
     * @type {("success" | "warning" | "error" | "")}
     * @memberof Label
     */
    labelState: "success" | "warning" | "error" | "";
    /**
     * Set to `true` for a loading label.
     */
    skeleton: boolean;
    labelClass: boolean;
    /**
     * Creates an instance of Label.
     * @param {ElementRef} elementRef
     * @memberof Label
     */
    constructor(elementRef: ElementRef);
    /**
     * Sets the id on the input item associated with the `Label`.
     * @memberof Label
     */
    ngAfterContentInit(): void;
}
