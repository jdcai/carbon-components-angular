/*!
 *
 * carbon-angular v0.0.0 | sample.component.d.ts
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


import { EventEmitter, ElementRef, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { SampleInterface } from "./sample.interface";
/**
 * This is a sample component to demonstrate how components should be written, and can be used as a template for new components
 */
export declare class Sample implements OnInit, AfterViewInit, OnDestroy {
    protected _elementRef: ElementRef;
    /** foo is an input that takes a SampleInterface */
    foo: SampleInterface;
    /** bar is an event that emits a SampleInterface */
    bar: EventEmitter<SampleInterface>;
    /**
     * instantiate services as protected variables
     *
     * @param {ElementRef} _elementRef
     */
    constructor(_elementRef: ElementRef);
    /** run setup logic that doesnt depend on the DOM and only needs to be run once here */
    ngOnInit(): void;
    /** run setup logic that depends on the DOM here */
    ngAfterViewInit(): void;
    /** clean up any event handlers or other objects that won't normally be destroyed */
    ngOnDestroy(): void;
    /** this is an instance method that can be used in templates */
    doBar(value: any): void;
    /** this is an instance method that can be inherited and used by subclasses */
    protected setFoo(value: SampleInterface): void;
}
