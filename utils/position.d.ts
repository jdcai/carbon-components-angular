/*!
 *
 * carbon-angular v0.0.0 | position.d.ts
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
 * Utilites to manipulate the position of elements relative to other elements
 *
 */
export declare type Placement = "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left-bottom" | "right-bottom";
export interface AbsolutePosition {
    top: number;
    left: number;
    position?: AbsolutePosition;
}
export declare type Offset = {
    left: number;
    top: number;
};
export declare namespace position {
    function getRelativeOffset(target: HTMLElement): Offset;
    function getAbsoluteOffset(target: HTMLElement): Offset;
    function findRelative(reference: HTMLElement, target: HTMLElement, placement: Placement): AbsolutePosition;
    function findAbsolute(reference: HTMLElement, target: HTMLElement, placement: Placement): AbsolutePosition;
    function findPosition(reference: HTMLElement, target: HTMLElement, placement: Placement, offsetFunction?: typeof getRelativeOffset): AbsolutePosition;
    /**
     * Get the dimensions of the dialog from an AbsolutePosition and a reference element
     */
    function getPlacementBox(target: HTMLElement, position: AbsolutePosition): {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    function addOffset(position: AbsolutePosition, top?: number, left?: number): AbsolutePosition;
    function setElement(element: HTMLElement, position: AbsolutePosition): void;
}
export default position;
