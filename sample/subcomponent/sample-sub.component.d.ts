/*!
 *
 * carbon-angular v0.0.0 | sample-sub.component.d.ts
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


import { EventEmitter, OnChanges } from "@angular/core";
import { SampleBase } from "./../sample-base.class";
import { SampleInterface } from "./../sample.interface";
/**
 * this is a sample sub-component
 */
export declare class SampleSub implements SampleBase, OnChanges {
    /** input foo */
    foo: SampleInterface;
    /** bar emits an Object of some type */
    bar: EventEmitter<Object>;
    /** here's a instance variable that takes a union of "single" | "multi" */
    type: "single" | "multi";
    /** for changes and initilization that must happen before anything else */
    ngOnChanges(changes: any): void;
    /** an instance method */
    getNextFoo(): SampleInterface;
}
