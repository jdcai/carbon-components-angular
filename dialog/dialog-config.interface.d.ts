/*!
 *
 * carbon-angular v0.0.0 | dialog-config.interface.d.ts
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


import { ElementRef, TemplateRef } from "@angular/core";
/**
 * Data structure for definig properties of a `Dialog` component.
 **/
export interface DialogConfig {
    /**
     * Title for the `Dialog` header.
     */
    title: string;
    /**
     * Body content for the `Dialog`.
     */
    content: string | TemplateRef<any>;
    /**
     * Parameter for triggering `Dialog` display.
     * With the release of v2.0 the type will just be "click" or "hover".
     */
    trigger: "click" | "hover" | "mouseenter";
    /**
     * Parameter defining the placement in which the `Dialog` appears.
     * @type {Placement}
     */
    placement: string;
    /**
     * Used to set the offset of the `Dialog` relative to the content it
     * is associated to.
     */
    gap: number;
    /**
     * Reference to the Parent element that links the `Dialog`.
     */
    parentRef: ElementRef;
    /**
     * Set to `true` to open the dialog next to the triggering component
     */
    appendInline: boolean;
    /**
     * Config object passed to the rendered component. (Optional)
     */
    data: Object;
    [propName: string]: any;
}
