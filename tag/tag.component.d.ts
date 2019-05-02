/*!
 *
 * carbon-angular v0.0.0 | tag.component.d.ts
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
 * Supported tag types for carbon v9
 */
export declare type TagType = "beta" | "community" | "custom" | "dedicated" | "experimental" | "ibm" | "local" | "private" | "third-party";
/**
 * Supported tag types for carbon v10
 */
export declare type TagTypeExperimental = "red" | "magenta" | "purple" | "blue" | "cyan" | "teal" | "green" | "cool-gray" | "warm-gray";
/**
 * Component that represents a tag for labelling/categorizing using keywords
 */
export declare class Tag {
    /**
     * type of the tag determines the styling
     *
     * Reference `TagType` for v9 applications, and `TagTypeExperimental` for v10/v9 experimental mode applications
     */
    type: TagType | TagTypeExperimental;
    class: string;
    readonly attrClass: string;
}
