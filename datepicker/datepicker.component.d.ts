/*!
 *
 * carbon-angular v0.0.0 | datepicker.component.d.ts
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


import { EventEmitter, ElementRef, OnDestroy } from "@angular/core";
import { FlatpickrOptions } from "ng2-flatpickr";
export declare class DatePicker implements OnDestroy {
    protected elementRef: ElementRef;
    private static datePickerCount;
    /**
     * Select calendar range mode
     */
    range: boolean;
    /**
     * Format of date
     *
     * For reference: https://flatpickr.js.org/formatting/
     */
    dateFormat: string;
    label: string;
    rangeLabel: string;
    placeholder: string;
    pattern: string;
    id: string;
    value: Array<any>;
    theme: "light" | "dark";
    disabled: boolean;
    invalid: boolean;
    invalidText: string;
    skeleton: boolean;
    valueChange: EventEmitter<any>;
    flatpickrOptions: FlatpickrOptions;
    flatpickrOptionsRange: FlatpickrOptions;
    constructor(elementRef: ElementRef);
    doSelect(selectedValue: any): void;
    updateClassNames(): void;
    onInputValueChange(event: string, index: number): void;
    ngOnDestroy(): void;
}
