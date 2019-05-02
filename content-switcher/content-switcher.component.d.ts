/*!
 *
 * carbon-angular v0.0.0 | content-switcher.component.d.ts
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


import { QueryList, EventEmitter, AfterViewInit, ElementRef } from "@angular/core";
import { ContentSwitcherOption } from "./content-switcher-option.directive";
/**
 * The content switcher can be used for toggling between distinct options.
 * Similar to tabs, but without an associated content panel
 *
 * ```html
 * <ibm-content-switcher (selected)="selected($event)">
 *		<button ibmContentOption>First section</button>
 *		<button ibmContentOption>Second section</button>
 *		<button ibmContentOption>Third section</button>
 *	</ibm-content-switcher>
 *	```
 */
export declare class ContentSwitcher implements AfterViewInit {
    protected elementRef: ElementRef;
    /**
     * aria-label for the content switcher. Should be set to something descriptive
     */
    label: string;
    /**
     * Emits the activated `ContentSwitcherOption`
     */
    selected: EventEmitter<{}>;
    options: QueryList<ContentSwitcherOption>;
    constructor(elementRef: ElementRef);
    ngAfterViewInit(): void;
    hostkeys(event: KeyboardEvent): void;
}
