/*!
 *
 * carbon-angular v0.0.0 | number.component.d.ts
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


import { EventEmitter } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
/**
 * Used to emit changes performed on number input components.
 * @export
 * @class NumberChange
 */
export declare class NumberChange {
    /**
     * Contains the `Number` that has been changed.
     * @type {Number}
     * @memberof NumberChange
     */
    source: Number;
    /**
     * The value of the `Number` field encompassed in the `NumberChange` class.
     * @type {number}
     * @memberof NumberChange
     */
    value: number;
}
/**
 * @export
 * @class Number
 * @implements {ControlValueAccessor}
 */
export declare class Number implements ControlValueAccessor {
    /**
     * Variable used for creating unique ids for number input components.
     */
    static numberCount: number;
    containerClass: boolean;
    /**
     * `light` or `dark` number input theme.
     */
    theme: "light" | "dark";
    /**
     * Set to `true` for a disabled number input.
     */
    disabled: boolean;
    /**
     * Set to `true` for a loading number component.
     */
    skeleton: boolean;
    /**
     * Set to `true` for an invalid number component.
     */
    invalid: boolean;
    /**
     * The unique id for the number component.
     */
    id: string;
    /**
     * Reflects the required attribute of the `input` element.
     */
    required: boolean;
    /**
     * Sets the value attribute on the `input` element.
     */
    value: number;
    /**
     * Sets the min attribute on the `input` element.
     */
    min: any;
    /**
     * Sets the max attribute on the `input` element.
     */
    max: any;
    /**
     * Sets the text inside the `label` tag.
     */
    label: any;
    /**
     * Sets the optional helper text.
     */
    helperText: any;
    /**
     * Sets the invalid text.
     */
    invalidText: any;
    /**
     * Emits event notifying other classes when a change in state occurs in the input.
     */
    change: EventEmitter<NumberChange>;
    /**
     * Creates an instance of `Number`.
     * @memberof Number
     */
    constructor();
    /**
     * This is the initial value set to the component
     * @param value The input value.
     */
    writeValue(value: any): void;
    /**
     * Sets a method in order to propagate changes back to the form.
     * @param {any} fn
     * @memberof Number
     */
    registerOnChange(fn: any): void;
    /**
     * Registers a callback to be triggered when the control has been touched.
     * @param fn Callback to be triggered when the number input is touched.
     */
    registerOnTouched(fn: any): void;
    /**
     * Called when number input is blurred. Needed to properly implement `ControlValueAccessor`.
     * @memberof Number
     */
    onTouched: () => any;
    /**
     * Method set in `registerOnChange` to propagate changes back to the form.
     * @memberof Number
     */
    propagateChange: (_: any) => void;
    /**
     * Adds 1 to the current `value`.
     */
    onIncrement(): void;
    /**
     * Subtracts 1 to the current `value`.
     */
    onDecrement(): void;
    /**
     * Creates a class of `NumberChange` to emit the change in the `Number`.
     */
    emitChangeEvent(): void;
    onNumberInputChange(event: any): void;
}
