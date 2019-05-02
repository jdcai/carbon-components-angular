/*!
 *
 * carbon-angular v0.0.0 | search.component.d.ts
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


import { EventEmitter, ElementRef } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { I18n } from "../i18n/i18n.module";
/**
 * Used to emit changes performed on search components.
 */
export declare class SearchChange {
    /**
     * Contains the `Search` that has been changed.
     */
    source: Search;
    /**
     * The value of the `Search` field encompassed in the `SearchChange` class.
     */
    value: string;
}
export declare class Search implements ControlValueAccessor {
    protected elementRef: ElementRef;
    protected i18n: I18n;
    /**
     * Variable used for creating unique ids for search components.
     */
    static searchCount: number;
    containerClass: boolean;
    /**
     * `light` or `dark` search theme.
     */
    theme: "light" | "dark";
    /**
     * Size of the search field.
     */
    size: "sm" | "lg";
    /**
     * Set to `true` for a disabled search input.
     */
    disabled: boolean;
    /**
     * Set to `true` for a toolbar search component.
     */
    toolbar: boolean;
    /**
     * Set to `true` for a loading search component.
     */
    skeleton: boolean;
    /**
     * Set to `true` to expand the toolbar search component.
     */
    active: boolean;
    /**
     * Sets the name attribute on the `input` element.
     */
    name: string;
    /**
     * The unique id for the search component.
     */
    id: string;
    /**
     * Reflects the required attribute of the `input` element.
     */
    required: boolean;
    /**
     * Sets the value attribute on the `input` element.
     */
    value: string;
    /**
     * Sets the text inside the `label` tag.
     */
    label: any;
    /**
     * Sets the placeholder attribute on the `input` element.
     */
    placeholder: any;
    /**
     * Used to set the `title` attribute of the clear button.
     */
    clearButtonTitle: any;
    /**
     * Emits event notifying other classes when a change in state occurs in the input.
     */
    change: EventEmitter<SearchChange>;
    inputRef: ElementRef;
    /**
     * Creates an instance of `Search`.
     * @param i18n The i18n translations.
     */
    constructor(elementRef: ElementRef, i18n: I18n);
    /**
     * This is the initial value set to the component
     * @param value The input value.
     */
    writeValue(value: any): void;
    /**
     * Sets a method in order to propagate changes back to the form.
     */
    registerOnChange(fn: any): void;
    /**
     * Registers a callback to be triggered when the control has been touched.
     * @param fn Callback to be triggered when the search input is touched.
     */
    registerOnTouched(fn: any): void;
    /**
     * Called when search input is blurred. Needed to properly implement `ControlValueAccessor`.
     */
    onTouched: () => any;
    /**
     * Method set in `registerOnChange` to propagate changes back to the form.
     */
    propagateChange: (_: any) => void;
    /**
     * Called when text is written in the input.
     * @param {string} search The input text.
     */
    onSearch(search: string): void;
    /**
     * Called when clear button is clicked.
     */
    clearSearch(): void;
    /**
     * Creates a class of `RadioChange` to emit the change in the `RadioGroup`.
     */
    emitChangeEvent(): void;
    openSearch(): void;
    keyDown(event: KeyboardEvent): void;
    focusOut(event: any): void;
}
