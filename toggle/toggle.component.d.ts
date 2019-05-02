/*!
 *
 * carbon-angular v0.0.0 | toggle.component.d.ts
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


import { Checkbox } from "../checkbox/checkbox.component";
import { ChangeDetectorRef, EventEmitter } from "@angular/core";
import { I18n } from "../i18n/i18n.module";
/**
 * Defines the set of states for a toggle component.
 * @export
 * @enum {number}
 */
export declare enum ToggleState {
    Init = 0,
    Indeterminate = 1,
    Checked = 2,
    Unchecked = 3
}
/**
 * Used to emit changes performed on toggle components.
 * @export
 * @class ToggleChange
 */
export declare class ToggleChange {
    /**
     * Contains the `Toggle` that has been changed.
     * @type {Toggle}
     * @memberof ToggleChange
     */
    source: Toggle;
    /**
     * The state of the `Toggle` encompassed in the `ToggleChange` class.
     * @type {boolean}
     * @memberof ToggleChange
     */
    checked: boolean;
}
/**
 * ```html
 * <ibm-toggle [(ngModel)]="toggleState">Toggle</ibm-toggle>
 * ```
 * @export
 * @class Toggle
 * @extends {Checkbox}
 * @implements {OnInit}
 */
export declare class Toggle extends Checkbox {
    protected changeDetectorRef: ChangeDetectorRef;
    protected i18n: I18n;
    /**
     * Variable used for creating unique ids for toggle components.
     * @type {number}
     * @static
     * @memberof Toggle
     */
    static toggleCount: number;
    /**
     * Text that is set on the left side of the toggle.
     * @type {(string)}
     * @memberof Toggle
     */
    offText: any;
    /**
     * Text that is set on the right side of the toggle.
     * @type {(string)}
     * @memberof Toggle
     */
    onText: any;
    /**
     * Size of the toggle component.
     * @type {("sm" | "md" | "default")}
     * @memberof Toggle
     */
    size: "sm" | "md";
    /**
     * Set to `true` for a loading toggle.
     * @type {(boolean)}
     * @memberof Toggle
     */
    skeleton: boolean;
    /**
     * The unique id allocated to the `Toggle`.
     * @type {string}
     * @memberof Toggle
     */
    id: string;
    /**
     * Emits event notifying other classes when a change in state occurs on a toggle after a
     * click.
     */
    change: EventEmitter<ToggleChange>;
    protected _offText: any;
    protected _onText: any;
    /**
     * Creates an instance of Toggle.
     * @param {ChangeDetectorRef} changeDetectorRef
     * @memberof Toggle
     */
    constructor(changeDetectorRef: ChangeDetectorRef, i18n: I18n);
    /**
     * Creates instance of `ToggleChange` used to propagate the change event.
     * @memberof To
     */
    emitChangeEvent(): void;
}
