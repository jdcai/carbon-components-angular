/*!
 *
 * carbon-angular v0.0.0 | button.directive.d.ts
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


import { OnInit } from "@angular/core";
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
export declare class Button implements OnInit {
    /**
     * sets the button type
     */
    ibmButton: "primary" | "secondary" | "tertiary" | "ghost" | "danger" | "danger--primary" | "toolbar-action";
    /**
     * Specify the size of the button
     */
    size: "normal" | "sm";
    readonly baseClass: boolean;
    primary: boolean;
    secondary: boolean;
    tertiary: boolean;
    ghost: boolean;
    danger: boolean;
    dangerPrimary: boolean;
    skeleton: boolean;
    smallSize: boolean;
    toolbarAction: boolean;
    ngOnInit(): void;
}
