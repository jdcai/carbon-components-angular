/*!
 *
 * carbon-angular v0.0.0 | clickable-tile.component.d.ts
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


/**
 * Build application's clickable tiles using this component.
 *
 * ## Basic usage
 *
 * ```html
 * <ibm-clickable-tile>
 * 		tile content
 * </ibm-clickable-tile>
 * ```
 *
 * @export
 * @class ClickableTile
 * @implements {OnInit}
 */
export declare class ClickableTile {
    /**
     * Sets the `href` attribute on the `ibm-clickable-tile` element.
     * @type {string}
     * @memberof ClickableTile
     */
    href: string;
    /**
     * Sets the `target` attribute on the `ibm-clickable-tile` element.
     * @type {string}
     * @memberof ClickableTile
     */
    target: string;
    /**
     * Set to `true` to disable the clickable tile.
     * @type {boolean}
     * @memberof ClickableTile
     */
    disabled: boolean;
    clicked: boolean;
    onClick(event: any): void;
    onKeyDown(event: any): void;
}
