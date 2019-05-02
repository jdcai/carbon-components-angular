/*!
 *
 * carbon-angular v0.0.0 | overflow-menu.component.ngfactory.js
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
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../dialog.service";
import * as i3 from "../../placeholder/placeholder.service";
import * as i4 from "./overflow-menu.directive";
import * as i5 from "./overflow-menu.component";
import * as i6 from "../../i18n/i18n.service";
var styles_OverflowMenu = ["\n\t\t.bx--overflow-menu--open {\n\t\t\topacity: 1\n\t\t}\n\n\t\t\n\t\t.bx--data-table-v2 .bx--overflow-menu {\n\t\t\ttransform: rotate(90deg);\n\t\t}\n\n\t\t.bx--data-table-v2 .bx--overflow-menu__icon {\n\t\t\ttransform: rotate(180deg);\n\t\t}\n\t"];
var RenderType_OverflowMenu = i0.ɵcrt({ encapsulation: 2, styles: styles_OverflowMenu, data: {} });
export { RenderType_OverflowMenu as RenderType_OverflowMenu };
function View_OverflowMenu_1(_l) { return i0.ɵvid(0, [i0.ɵncd(null, 0), (_l()(), i0.ɵand(0, null, null, 0))], null, null); }
export function View_OverflowMenu_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 16777216, null, null, 9, "div", [["aria-haspopup", "true"], ["class", "bx--overflow-menu"], ["placement", "bottom"], ["role", "button"], ["tabindex", "0"]], [[1, "aria-label", 0], [1, "role", 0], [1, "aria-expanded", 0], [1, "aria-haspopup", 0], [1, "aria-owns", 0]], [[null, "onOpen"], [null, "onClose"], [null, "touchstart"], [null, "keydown"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("touchstart" === en)) {
        var pd_0 = (i0.ɵnov(_v, 4).onTouchStart($event) !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (i0.ɵnov(_v, 4).hostkeys($event) !== false);
        ad = (pd_1 && ad);
    } if (("onOpen" === en)) {
        var pd_2 = ((_co.open = true) !== false);
        ad = (pd_2 && ad);
    } if (("onClose" === en)) {
        var pd_3 = ((_co.open = false) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i1.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(2, { "bx--overflow-menu--open": 0 }), i0.ɵprd(512, null, i2.DialogService, i2.DialogService, [i0.ComponentFactoryResolver, i0.Injector, i3.PlaceholderService]), i0.ɵdid(4, 737280, null, 0, i4.OverflowMenuDirective, [i0.ElementRef, i0.ViewContainerRef, i2.DialogService], { placement: [0, "placement"], ibmOverflowMenu: [1, "ibmOverflowMenu"], flip: [2, "flip"] }, { onClose: "onClose", onOpen: "onOpen" }), (_l()(), i0.ɵeld(5, 0, null, null, 4, ":svg:svg", [["class", "bx--overflow-menu__icon"], ["focusable", "false"], ["height", "15"], ["viewBox", "0 0 3 15"], ["width", "3"]], null, null, null, null, null)), (_l()(), i0.ɵeld(6, 0, null, null, 3, ":svg:g", [["fill-rule", "evenodd"]], null, null, null, null, null)), (_l()(), i0.ɵeld(7, 0, null, null, 0, ":svg:circle", [["cx", "1.5"], ["cy", "1.5"], ["r", "1.5"]], null, null, null, null, null)), (_l()(), i0.ɵeld(8, 0, null, null, 0, ":svg:circle", [["cx", "1.5"], ["cy", "7.5"], ["r", "1.5"]], null, null, null, null, null)), (_l()(), i0.ɵeld(9, 0, null, null, 0, ":svg:circle", [["cx", "1.5"], ["cy", "13.5"], ["r", "1.5"]], null, null, null, null, null)), (_l()(), i0.ɵand(0, [["options", 2]], null, 0, null, View_OverflowMenu_1))], function (_ck, _v) { var _co = _v.component; var currVal_5 = "bx--overflow-menu"; var currVal_6 = _ck(_v, 2, 0, _co.open); _ck(_v, 1, 0, currVal_5, currVal_6); var currVal_7 = "bottom"; var currVal_8 = i0.ɵnov(_v, 10); var currVal_9 = _co.flip; _ck(_v, 4, 0, currVal_7, currVal_8, currVal_9); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.buttonLabel; var currVal_1 = i0.ɵnov(_v, 4).role; var currVal_2 = i0.ɵnov(_v, 4).expanded; var currVal_3 = i0.ɵnov(_v, 4).hasPopup; var currVal_4 = i0.ɵnov(_v, 4).ariaOwns; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4); }); }
export function View_OverflowMenu_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "ibm-overflow-menu", [], null, null, null, View_OverflowMenu_0, RenderType_OverflowMenu)), i0.ɵdid(1, 49152, null, 1, i5.OverflowMenu, [i0.ElementRef, i6.I18n], null, null), i0.ɵqud(335544320, 1, { overflowMenuDirective: 0 })], null, null); }
var OverflowMenuNgFactory = i0.ɵccf("ibm-overflow-menu", i5.OverflowMenu, View_OverflowMenu_Host_0, { buttonLabel: "buttonLabel", flip: "flip" }, {}, ["*"]);
export { OverflowMenuNgFactory as OverflowMenuNgFactory };
//# sourceMappingURL=overflow-menu.component.ngfactory.js.map