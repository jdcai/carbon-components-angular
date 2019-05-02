/*!
 *
 * carbon-angular v0.0.0 | sprite.component.d.ts
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
import { Http } from "@angular/http";
import { IconService } from "./icon.service";
/**
 * Used to load sprites and is generally used at the root of the application.
 * Page specific sprites may be loaded on that page, but do note that may result in unintened network requets.
 */
export declare class Sprite implements AfterViewInit {
    protected http: Http;
    protected _elementRef: ElementRef;
    protected icons: IconService;
    /** name used to request sprite from the baseURL */
    sprite: string;
    /**
     * instantiate the component and instances of http and iconService
     *
     * @param {Http} http
     * @param {ElementRef} _elementRef
     * @param {IconService} icons
     */
    constructor(http: Http, _elementRef: ElementRef, icons: IconService);
    /** load the sprite and inject it into the rendered DOM */
    ngAfterViewInit(): void;
}
