/*!
 *
 * carbon-angular v0.0.0 | banner.service.js
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


import { ApplicationRef, ComponentFactoryResolver, EventEmitter, Injectable, Injector } from "@angular/core";
import { Banner } from "./banner.module";
import { Toast } from "./toast.component";
/**
 * Deprecated in favour of `NotificationService` (to be removed in v3.0).
 * Provides a way to use the banner component.
 *
 * Banners are displayed toward the top of the UI and do not interrupt the user’s work.
 *
 * @export
 * @class BannerService
 * @deprecated
 */
var BannerService = /** @class */ (function () {
    /**
     * Constructs BannerService.
     *
     * @param {Injector} injector
     * @param {ComponentFactoryResolver} componentFactoryResolver
     * @param {ApplicationRef} applicationRef
     * @memberof BannerService
     */
    function BannerService(injector, componentFactoryResolver, applicationRef) {
        this.injector = injector;
        this.componentFactoryResolver = componentFactoryResolver;
        this.applicationRef = applicationRef;
        /**
         * An array containing `ComponentRef`s to all the banners this service instance
         * is responsible for.
         *
         * @memberof BannerService
         */
        this.bannerRefs = new Array();
        this.onClose = new EventEmitter();
        console.warn("`BannerService` has been deprecated in favour of `NotificationService`");
    }
    /**
     * Shows the banner based on the `bannerObj`.
     *
     * @param {any} bannerObj Can have `type`, `message`, `target`, `duration` and `smart` members.
     *
     * **Members:**
     *
     * * `type` can be one of `"info"`, `"warning"`, `"danger"`, `"success"`
     * * `message` is message for banner to display
     * * `target` is css selector defining an element to append banner to. If not provided,
     * `showBanner()` creates a place for the banner in `body`
     * * `duration` is number of ms to close the banner after. If used in combination with `smart`,
     * it's added to the calculated timeout
     * * `smart`, set to `true` if you want to use smart banner.
     *
     * **Example:**
     * ```typescript
     * // Info banner, saying "Sample message." added to the element with id banner-container
     * // uses smart timeout with added duration of 1 second.
     * {
     *	type: "info",
     *	message: "Sample message.",
     *	target: "#banner-container",
     *	duration: 1000,
     *	smart: true
     * }
     * ```
     *
     * @param {any} [bannerComp=Banner] If provided, used to resolve component factory
     * @memberof BannerService
     */
    BannerService.prototype.showBanner = function (bannerObj, bannerComp) {
        var _this = this;
        if (bannerComp === void 0) { bannerComp = Banner; }
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(bannerComp);
        var bannerRef = componentFactory.create(this.injector);
        bannerRef.instance.bannerObj = bannerObj; // typescript isn't being very smart here, so we type to any
        this.bannerRefs.push(bannerRef);
        this.onClose = bannerRef.instance.close;
        this.applicationRef.attachView(bannerRef.hostView);
        if (bannerObj.target) {
            document.querySelector(bannerObj.target).appendChild(bannerRef.location.nativeElement);
        }
        else {
            var body = document.querySelector("body");
            // get or create a container for alert list
            var bannerClassName = "banner-overlay";
            var bannerList = body.querySelector("." + bannerClassName);
            if (!bannerList) {
                bannerList = document.createElement("div");
                bannerList.className = bannerClassName;
                body.appendChild(bannerList);
            }
            // add the banner to the top of the list
            if (bannerList.firstChild) {
                bannerList.insertBefore(bannerRef.location.nativeElement, bannerList.firstChild);
            }
            else {
                bannerList.appendChild(bannerRef.location.nativeElement);
            }
        }
        if (bannerObj.duration && bannerObj.duration > 0) {
            setTimeout(function () {
                _this.close(bannerRef);
            }, bannerObj.duration);
        }
        if (bannerObj.smart) {
            // let it disappear after calculated timeout
            setTimeout(function () {
                _this.close(bannerRef);
            }, this.getSmartTimeout(bannerObj));
        }
        this.onClose.subscribe(function () {
            _this.close(bannerRef);
        });
        bannerRef.instance.componentRef = bannerRef;
        return bannerRef.instance;
    };
    BannerService.prototype.showToast = function (bannerObj, bannerComp) {
        if (bannerComp === void 0) { bannerComp = Toast; }
        return this.showBanner(bannerObj, bannerComp);
    };
    /**
     * Programatically closes banner based on `bannerRef`.
     *
     * @param bannerRef `ComponentRef` of a banner or `Banner` component you wish to close
     * @memberof BannerService
     */
    BannerService.prototype.close = function (bannerRef) {
        var _this = this;
        if (bannerRef) {
            if (bannerRef instanceof Banner) {
                this.close(bannerRef.componentRef);
            }
            else {
                setTimeout(function () {
                    _this.applicationRef.detachView(bannerRef.hostView);
                    bannerRef.destroy();
                }, 200);
            }
        }
    };
    /**
     * Calculates the amount of time user needs to read the message in the banner.
     *
     * @param {any} bannerObj Same object used to instantiate banner.
     *
     * In addition to `type` and `message` members, use `duration` member to add
     * some extra time (in ms) to timeout if you need to.
     * @returns {number} calculated timeout (in ms) for smart banner
     * @memberof BannerService
     */
    BannerService.prototype.getSmartTimeout = function (bannerObj) {
        // calculate timeout
        var timeout = 600; // start with reaction time
        // custom duration
        timeout += bannerObj.duration || 0;
        // message type
        switch (bannerObj.type) {
            case "info":
            case "success":
            default: {
                break;
            }
            case "danger": {
                timeout += 3000;
                break;
            }
            case "warning": {
                timeout += 1500;
                break;
            }
        }
        // message length
        // average reader reads around 200 words per minute, or it takes them ~0.3s per word
        // let's use 1.5 factor for below average speed readers and have 0.45s per word
        var wordCount = bannerObj.message.trim().split(/\s+/).length;
        timeout += wordCount * 450;
        return timeout;
    };
    /**
     * OnDestroy hook.
     *
     * Destroys all living banners it is responsible for.
     *
     * @memberof BannerService
     */
    BannerService.prototype.ngOnDestroy = function () {
        if (this.bannerRefs.length > 0) {
            for (var i = 0; i < this.bannerRefs.length; i++) {
                var bannerRef = this.bannerRefs[i];
                this.applicationRef.detachView(bannerRef.hostView);
                bannerRef.destroy();
            }
            this.bannerRefs.length = 0;
        }
    };
    BannerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BannerService.ctorParameters = function () { return [
        { type: Injector },
        { type: ComponentFactoryResolver },
        { type: ApplicationRef }
    ]; };
    return BannerService;
}());
export { BannerService };
//# sourceMappingURL=banner.service.js.map