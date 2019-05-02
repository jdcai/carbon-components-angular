/*!
 *
 * carbon-angular v0.0.0 | icon.component.d.ts
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


import { ElementRef, AfterViewInit } from "@angular/core";
import { IconService } from "./icon.service";
import { Subscription } from "rxjs";
import { SizeMap } from "./icon.types";
/**
 * `n-icon` pulls the icon from the loaded sprite, and renders it at the specified size.
 * Under the hood, `n-icon` generates code similar to the following:
 * ```
 * <svg class="icon" width="30" height="30"><use href="#alert_30"></use></svg>
 * ```
 */
export declare class Icon implements AfterViewInit {
    protected elementRef: ElementRef;
    protected iconService: IconService;
    /** follows the naming convention found in the icon listing on the demo page */
    icon: string;
    /** accepts color strings */
    color: "blue" | "light" | "dark" | "white";
    /** accepts abbreviated size strings */
    size: "xs" | "sm" | "md" | "lg";
    /** map size strings to numeric values */
    protected sizeMap: SizeMap;
    /**
     * Pass down `classList` from host element.
     */
    readonly classList: any;
    protected spriteLoadingSubscription: Subscription;
    /**
     * Initialize the component
     *
     * @param {ElementRef} elementRef
     */
    constructor(elementRef: ElementRef, iconService: IconService);
    ngAfterViewInit(): void;
    /**
     * Create a class name based on @Input() `color` and `size`.
     */
    buildMatterClass(): string;
}
