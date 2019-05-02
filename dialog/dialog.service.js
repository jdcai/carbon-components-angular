/*!
 *
 * carbon-angular v0.0.0 | dialog.service.js
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


import { EventEmitter, Injector, ComponentFactoryResolver, Injectable } from "@angular/core";
import { PlaceholderService } from "./../placeholder/placeholder.module";
/**
 * `Dialog` object to be injected into other components.
 * @export
 * @class DialogService
 */
var DialogService = /** @class */ (function () {
    /**
     * Creates an instance of `DialogService`.
     * @param {ComponentFactoryResolver} componentFactoryResolver
     * @param {Injector} injector
     * @memberof DialogService
     */
    function DialogService(componentFactoryResolver, injector, placeholderService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.placeholderService = placeholderService;
        /**
         * Reflects the open or closed state of the `Dialog`.
         * @memberof DialogService
         */
        this.isOpen = false;
        /**
         * To emit the `Dialog` closing event.
         * @type {EventEmitter<any>}
         * @memberof DialogService
         */
        this.onClose = new EventEmitter();
        /**
         * Emits the state `true` if the Dialog is closed, false if `Dialog`
         * is opened/viewable.
         * @type {EventEmitter<any>}
         * @memberof DialogService
         */
        this.isClosed = new EventEmitter();
    }
    /**
     * Uses module `componentFactory` to create the `Dialog` component.
     * @param {any} component
     * @memberof DialogService
     */
    DialogService.prototype.create = function (component) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    };
    /**
     * Toggles between `Dialog` open/close states.
     * @param {ViewContainerRef} viewContainer
     * @param {DialogConfig} dialogConfig
     * @memberof DialogService
     */
    DialogService.prototype.toggle = function (viewContainer, dialogConfig) {
        if (this.isOpen) {
            this.close(viewContainer);
        }
        else {
            this.open(viewContainer, dialogConfig);
        }
    };
    /**
     * If `dialogRef` is defined, the Dialog is already open. If
     * `dialogRef` is undefined, we create the `Dialog` component and reference to it.
     * A subscription is created to track if the `Dialog` should close.
     * @param {ViewContainerRef} viewContainer
     * @param {DialogConfig} dialogConfig
     * @memberof DialogService
     */
    DialogService.prototype.open = function (viewContainer, dialogConfig) {
        var _this = this;
        if (!this.dialogRef) {
            if (dialogConfig.appendInline) {
                // add our component to the view
                this.dialogRef = viewContainer.createComponent(this.componentFactory, 0, this.injector);
            }
            else if (!this.placeholderService.hasPlaceholderRef()) {
                this.dialogRef = viewContainer.createComponent(this.componentFactory, 0, this.injector);
                setTimeout(function () {
                    window.document.querySelector("body").appendChild(_this.dialogRef.location.nativeElement);
                });
            }
            else {
                this.dialogRef = this.placeholderService.createComponent(this.componentFactory, this.injector);
            }
            // initialize some extra options
            var focusedElement = document.activeElement;
            dialogConfig["previouslyFocusedElement"] = focusedElement;
            this.dialogRef.instance.dialogConfig = dialogConfig;
            this.onClose = this.dialogRef.instance.close;
            this.isOpen = true;
            this.dialogSubscription = this.onClose.subscribe(function () {
                _this.close(viewContainer);
            });
            this.dialogRef.instance.elementRef.nativeElement.focus();
        }
        return this;
    };
    /**
     * On close of `Dialog` item, sets focus back to previous item, unsets
     * the current `dialogRef` item. Unsubscribes to the event of `Dialog` close.
     * @param {ViewContainerRef} viewContainer
     * @param {any} [evt]
     * @memberof DialogService
     */
    DialogService.prototype.close = function (viewContainer) {
        this.isClosed.emit(true);
        if (this.dialogRef) {
            var elementToFocus = this.dialogRef.instance.dialogConfig["previouslyFocusedElement"];
            if (this.placeholderService.hasPlaceholderRef() && !this.dialogRef.instance.dialogConfig.appendInline) {
                this.placeholderService.destroyComponent(this.dialogRef);
            }
            else {
                viewContainer.remove(viewContainer.indexOf(this.dialogRef.hostView));
            }
            this.dialogRef = null;
            this.isOpen = false;
            elementToFocus.focus();
            if (this.dialogSubscription) {
                this.dialogSubscription.unsubscribe();
            }
        }
    };
    /**
     * Fix for safari hijacking clicks.
     *
     * Runs on `ngOnInit` of every dialog. Ensures we don't have multiple listeners
     * because having many of them could degrade performance in certain cases (and is
     * not necessary for our use case)
     *
     * This is an internally used function, can change at any point (even get removed)
     * and changes to it won't be considered a breaking change. Use at your own risk.
     */
    DialogService.prototype.singletonClickListen = function () {
        if (!DialogService.listeningForBodyClicks) {
            document.body.firstElementChild.addEventListener("click", function () { return null; }, true);
            DialogService.listeningForBodyClicks = true;
        }
    };
    /**
     * Used in `singletonClickListen`, don't count on its existence and values.
     */
    DialogService.listeningForBodyClicks = false;
    DialogService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DialogService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: PlaceholderService }
    ]; };
    return DialogService;
}());
export { DialogService };
//# sourceMappingURL=dialog.service.js.map