/*!
 *
 * carbon-angular v0.0.0 | icon.service.js
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


import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
/**
 * Service that provides static methods for globally configuring icon requests,
 * and instance methods for requesting sprites and converting sizes to pixel values
 */
var IconService = /** @class */ (function () {
    /** get an instance of the Http service */
    function IconService(http) {
        this.http = http;
    }
    /**
     * Sets the baseURL
     *
     * By default we use http://peretz-icons.mybluemix.net/ for sprites - this is sufficient for prototyping,
     * but for development and production it is recommended to build streamlined sprites and host them statically.
     *
     * @param {string} url
     */
    IconService.setBaseURL = function (url) {
        IconService.baseURL = url;
        return IconService;
    };
    /**
     * sets the caching level for sprites.
     * "none" disables caching (sprites will always be requested again)
     * "simple" uses a static Map as a naive cache
     *
     * @param {"none" | "simple"} level
     */
    IconService.setCacheLevel = function (level) {
        IconService.cacheLevel = level;
        return IconService;
    };
    /**
     * Responsible for fetching sprites from the `baseURL`
     *
     * @param {string} name name of the sprite to request
     */
    IconService.prototype.doSpriteRequest = function (name) {
        IconService.runningRequests++;
        return this.http.get("" + IconService.baseURL + name + ".svg", { responseType: "text" })
            .pipe(tap(function () { return IconService.runningRequests--; }), catchError(function () {
            var error = "failed to load sprite " + name + ", check that the server is available and baseURL is correct";
            console.error(error);
            return throwError(error);
        }));
    };
    /**
     * Returns a promise that will resolve to a clone of the requested icon
     *
     * @param name name of the icon
     * @param size size of the icon as an IconSize
     */
    IconService.prototype.getIcon = function (name, size) {
        // resolver either calls the provided Promise resolution function with the loaded icon
        // or returns false to indicate the sprite with the required icon has yet to load
        var resolver = function (resolve) {
            var icon = document.querySelector("symbol#" + name + "_" + size);
            if (icon) {
                var clone = icon.firstElementChild.cloneNode(true);
                return resolve(clone);
            }
            return false;
        };
        var loadedIcon = new Promise(function (resolve, reject) {
            if (!resolver(resolve)) {
                IconService.spriteLoaded.subscribe(function () {
                    resolver(resolve);
                });
            }
        });
        return loadedIcon;
    };
    /**
     * Requests and caches the specified sprite
     *
     * @param {string} name name of the sprite to request
     */
    IconService.prototype.getSprite = function (name) {
        if (IconService.cacheLevel === "none") {
            return this.doSpriteRequest(name);
        }
        else {
            if (IconService.spriteCache.has(name)) {
                return IconService.spriteCache.get(name);
            }
            var spriteRequest = this.doSpriteRequest(name);
            IconService.spriteCache.set(name, spriteRequest);
            return spriteRequest;
        }
    };
    IconService.spriteLoaded = new EventEmitter();
    /**
     * Internal variable to track running requests.
     * Used to call spriteLoaded when new sprites are available
     */
    IconService.runningRequests = 0;
    /**
     * map to use for sprite requests
     *
     * we just cache the whole promise since we can always `.then` out the result
     * */
    IconService.spriteCache = new Map();
    /** how aggressively to cache sprites. defaults to simple */
    IconService.cacheLevel = "simple";
    /** URL to request sprites from */
    IconService.baseURL = "https://peretz-icons.mybluemix.net/";
    IconService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    IconService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return IconService;
}());
export { IconService };
//# sourceMappingURL=icon.service.js.map