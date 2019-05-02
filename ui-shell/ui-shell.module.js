/*!
 *
 * carbon-angular v0.0.0 | ui-shell.module.js
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


import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { I18nModule } from "./../i18n/i18n.module";
import { Header } from "./header.component";
import { HeaderItem } from "./header-item.component";
import { HeaderMenu } from "./header-menu.component";
import { HeaderNavigation } from "./header-navigation.component";
import { HeaderGlobal } from "./header-global.component";
import { HeaderAction } from "./header-action.component";
import { Hamburger } from "./hamburger.component";
import { SideNav } from "./sidenav.component";
import { SideNavHeader } from "./sidenav-header.component";
import { SideNavItem } from "./sidenav-item.component";
import { SideNavMenu } from "./sidenav-menu.component";
export { Header, HeaderItem, HeaderMenu, HeaderNavigation, HeaderGlobal, HeaderAction, Hamburger, SideNav, SideNavHeader, SideNavItem, SideNavMenu };
var UIShellModule = /** @class */ (function () {
    function UIShellModule() {
    }
    UIShellModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        Header,
                        HeaderItem,
                        HeaderMenu,
                        HeaderNavigation,
                        HeaderGlobal,
                        HeaderAction,
                        Hamburger,
                        SideNav,
                        SideNavHeader,
                        SideNavItem,
                        SideNavMenu
                    ],
                    imports: [CommonModule, I18nModule],
                    exports: [
                        Header,
                        HeaderItem,
                        HeaderMenu,
                        HeaderNavigation,
                        HeaderGlobal,
                        HeaderAction,
                        Hamburger,
                        SideNav,
                        SideNavHeader,
                        SideNavItem,
                        SideNavMenu
                    ]
                },] },
    ];
    return UIShellModule;
}());
export { UIShellModule };
//# sourceMappingURL=ui-shell.module.js.map