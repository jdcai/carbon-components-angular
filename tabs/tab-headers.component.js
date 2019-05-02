/*!
 *
 * carbon-angular v0.0.0 | tab-headers.component.js
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


import { Component, QueryList, Input, HostListener, ViewChild, ContentChildren, ViewChildren } from "@angular/core";
import { Tab } from "./tab.component";
/**
 * The `TabHeaders` component contains the `Tab` items and controls scroll functionality
 * if content has overflow.
 * @export
 * @class TabHeaders
 * @implements {AfterViewInit}
 */
var TabHeaders = /** @class */ (function () {
    function TabHeaders() {
        /**
         * Set to 'true' to have `Tab` items cached and not reloaded on tab switching.
         * Duplicate from `n-tabs` to support standalone headers
         */
        this.cacheActive = false;
        /**
         * Set to `true` to put tabs in a loading state.
         */
        this.skeleton = false;
        /**
         * The index of the first visible tab.
         */
        this.firstVisibleTab = 0;
        this.tabListVisible = false;
    }
    // keyboard accessibility
    /**
     * Controls the keydown events used for tabbing through the headings.
     */
    TabHeaders.prototype.keyboardInput = function (event) {
        var tabsArray = Array.from(this.tabs);
        // "Right" is an ie11 specific value
        if (event.key === "Right" || event.key === "ArrowRight") {
            if (this.currentSelectedTab < this.allTabHeaders.length - 1) {
                event.preventDefault();
                if (this.followFocus) {
                    this.selectTab(event.target, tabsArray[this.currentSelectedTab + 1], this.currentSelectedTab);
                }
                this.allTabHeaders.toArray()[this.currentSelectedTab + 1].nativeElement.focus();
            }
            else {
                event.preventDefault();
                if (this.followFocus) {
                    this.selectTab(event.target, tabsArray[0], 0);
                }
                this.allTabHeaders.first.nativeElement.focus();
            }
        }
        // "Left" is an ie11 specific value
        if (event.key === "Left" || event.key === "ArrowLeft") {
            if (this.currentSelectedTab > 0) {
                event.preventDefault();
                if (this.followFocus) {
                    this.selectTab(event.target, tabsArray[this.currentSelectedTab - 1], this.currentSelectedTab);
                }
                this.allTabHeaders.toArray()[this.currentSelectedTab - 1].nativeElement.focus();
            }
            else {
                event.preventDefault();
                if (this.followFocus) {
                    this.selectTab(event.target, tabsArray[this.allTabHeaders.length - 1], this.allTabHeaders.length);
                }
                this.allTabHeaders.toArray()[this.allTabHeaders.length - 1].nativeElement.focus();
            }
        }
        if (event.key === "Home") {
            event.preventDefault();
            if (this.followFocus) {
                this.selectTab(event.target, tabsArray[0], 0);
            }
            this.allTabHeaders.toArray()[0].nativeElement.focus();
        }
        if (event.key === "End") {
            event.preventDefault();
            if (this.followFocus) {
                this.selectTab(event.target, tabsArray[this.allTabHeaders.length - 1], this.allTabHeaders.length);
            }
            this.allTabHeaders.toArray()[this.allTabHeaders.length - 1].nativeElement.focus();
        }
        // `"Spacebar"` is IE11 specific value
        if ((event.key === " " || event.key === "Spacebar") && !this.followFocus) {
            this.selectTab(event.target, tabsArray[this.currentSelectedTab], this.currentSelectedTab);
        }
    };
    TabHeaders.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (!this.tabInput) {
            this.tabs = this.tabQuery;
        }
        else {
            this.tabs = this.tabInput;
        }
        this.tabs.forEach(function (tab) { return tab.cacheActive = _this.cacheActive; });
        this.tabs.changes.subscribe(function () {
            _this.setFirstTab();
        });
        this.setFirstTab();
    };
    /**
     * Controls manually focusing tabs.
     */
    TabHeaders.prototype.onTabFocus = function (ref, index) {
        this.currentSelectedTab = index;
        // reset scroll left because we're already handling it
        this.headerContainer.nativeElement.parentElement.scrollLeft = 0;
    };
    TabHeaders.prototype.getSelectedTab = function () {
        var selected = this.tabs.find(function (tab) { return tab.active; });
        if (selected) {
            return selected;
        }
        return { headingIsTemplate: false, heading: "" };
    };
    TabHeaders.prototype.showTabList = function () {
        this.tabListVisible = true;
    };
    /**
     * Selects `Tab` 'tab' and moves it into view on the view DOM if it is not already.
     */
    TabHeaders.prototype.selectTab = function (ref, tab, tabIndex) {
        if (tab.disabled) {
            return;
        }
        // hide the tablist on mobile
        this.tabListVisible = false;
        this.currentSelectedTab = tabIndex;
        this.tabs.forEach(function (_tab) { return _tab.active = false; });
        tab.active = true;
        tab.doSelect();
    };
    /**
     * Determines which `Tab` is initially selected.
     */
    TabHeaders.prototype.setFirstTab = function () {
        var _this = this;
        setTimeout(function () {
            var firstTab = _this.tabs.find(function (tab) { return tab.active; });
            if (!firstTab && _this.tabs.first) {
                firstTab = _this.tabs.first;
                firstTab.active = true;
            }
            if (firstTab) {
                firstTab.doSelect();
            }
        });
    };
    TabHeaders.decorators = [
        { type: Component, args: [{
                    selector: "ibm-tab-headers",
                    template: "\n\t\t<nav\n\t\t\tclass=\"bx--tabs\"\n\t\t\t[ngClass]=\"{\n\t\t\t\t'bx--skeleton': skeleton\n\t\t\t}\"\n\t\t\trole=\"navigation\">\n\t\t\t<div class=\"bx--tabs-trigger\" tabindex=\"0\" (click)=\"showTabList()\">\n\t\t\t\t<a href=\"javascript:void(0)\" class=\"bx--tabs-trigger-text\" tabindex=\"-1\">\n\t\t\t\t\t<ng-container *ngIf=\"!getSelectedTab().headingIsTemplate\">\n\t\t\t\t\t\t{{ getSelectedTab().heading }}\n\t\t\t\t\t</ng-container>\n\t\t\t\t\t<ng-template\n\t\t\t\t\t\t*ngIf=\"getSelectedTab().headingIsTemplate\"\n\t\t\t\t\t\t[ngTemplateOutlet]=\"getSelectedTab().heading\">\n\t\t\t\t\t</ng-template>\n\t\t\t\t</a>\n\t\t\t\t<svg width=\"10\" height=\"5\" viewBox=\"0 0 10 5\">\n\t\t\t\t\t<path d=\"M0 0l5 4.998L10 0z\" fill-rule=\"evenodd\"></path>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t\t<ul\n\t\t\t\t#tabList\n\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t'bx--tabs__nav--hidden': !tabListVisible\n\t\t\t\t}\"\n\t\t\t\tclass=\"bx--tabs__nav\"\n\t\t\t\trole=\"tablist\">\n\t\t\t\t<li\n\t\t\t\t\t*ngFor=\"let tab of tabs; let i = index;\"\n\t\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t\t'bx--tabs__nav-item--selected': tab.active\n\t\t\t\t\t}\"\n\t\t\t\t\tclass=\"bx--tabs__nav-item\"\n\t\t\t\t\trole=\"presentation\"\n\t\t\t\t\t(click)=\"selectTab(tabref, tab, i)\">\n\t\t\t\t\t<a\n\t\t\t\t\t\t#tabItem\n\t\t\t\t\t\t[attr.aria-selected]=\"tab.active\"\n\t\t\t\t\t\t[attr.tabindex]=\"(tab.active?0:-1)\"\n\t\t\t\t\t\t[attr.aria-controls]=\"tab.id\"\n\t\t\t\t\t\t(focus)=\"onTabFocus(tabref, i)\"\n\t\t\t\t\t\tdraggable=\"false\"\n\t\t\t\t\t\tid=\"{{tab.id}}-header\"\n\t\t\t\t\t\tclass=\"bx--tabs__nav-link\"\n\t\t\t\t\t\thref=\"javascript:void(0)\"\n\t\t\t\t\t\trole=\"tab\">\n\t\t\t\t\t\t<ng-container *ngIf=\"!tab.headingIsTemplate\">\n\t\t\t\t\t\t\t{{ tab.heading }}\n\t\t\t\t\t\t</ng-container>\n\t\t\t\t\t\t<ng-template\n\t\t\t\t\t\t\t*ngIf=\"tab.headingIsTemplate\"\n\t\t\t\t\t\t\t[ngTemplateOutlet]=\"tab.heading\"\n\t\t\t\t\t\t\t[ngTemplateOutletContext]=\"{$implicit: tab.context}\">\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</nav>\n\t\t<div>\n\t\t\t<ng-content select=\"ibm-tab\"></ng-content>\n\t\t</div>\n\t "
                },] },
    ];
    TabHeaders.propDecorators = {
        tabInput: [{ type: Input, args: ["tabs",] }],
        cacheActive: [{ type: Input }],
        followFocus: [{ type: Input }],
        skeleton: [{ type: Input }],
        headerContainer: [{ type: ViewChild, args: ["tabList",] }],
        tabQuery: [{ type: ContentChildren, args: [Tab,] }],
        allTabHeaders: [{ type: ViewChildren, args: ["tabItem",] }],
        keyboardInput: [{ type: HostListener, args: ["keydown", ["$event"],] }]
    };
    return TabHeaders;
}());
export { TabHeaders };
//# sourceMappingURL=tab-headers.component.js.map