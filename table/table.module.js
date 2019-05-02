/*!
 *
 * carbon-angular v0.0.0 | table.module.js
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
import { FormsModule } from "@angular/forms";
import { DialogModule } from "./../dialog/dialog.module";
import { NFormsModule } from "./../forms/forms.module";
import { Table } from "./table.component";
import { TableToolbar } from "./toolbar/table-toolbar.component";
import { TableToolbarActions } from "./toolbar/table-toolbar-actions.component";
import { TableToolbarSearch } from "./toolbar/table-toolbar-search.component";
import { TableToolbarContent } from "./toolbar/table-toolbar-content.component";
import { DataGridFocus } from "./data-grid-focus.directive";
import { ExpandedRowHover } from "./expanded-row-hover.directive";
import { IconModule } from "./../icon/icon.module";
import { StaticIconModule } from "..";
import { I18nModule } from "./../i18n/i18n.module";
export { Table } from "./table.component";
export { TableModel } from "./table-model.class";
export { TableItem } from "./table-item.class";
export { TableHeaderItem } from "./table-header-item.class";
export { TableToolbar } from "./toolbar/table-toolbar.component";
export { TableToolbarActions } from "./toolbar/table-toolbar-actions.component";
export { TableToolbarSearch } from "./toolbar/table-toolbar-search.component";
export { TableToolbarContent } from "./toolbar/table-toolbar-content.component";
export { DataGridFocus } from "./data-grid-focus.directive";
export { ExpandedRowHover } from "./expanded-row-hover.directive";
var TableModule = /** @class */ (function () {
    function TableModule() {
    }
    TableModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        Table,
                        TableToolbar,
                        TableToolbarActions,
                        TableToolbarSearch,
                        TableToolbarContent,
                        DataGridFocus,
                        ExpandedRowHover
                    ],
                    exports: [
                        Table,
                        TableToolbar,
                        TableToolbarActions,
                        TableToolbarSearch,
                        TableToolbarContent,
                        DataGridFocus,
                        ExpandedRowHover
                    ],
                    imports: [
                        CommonModule,
                        NFormsModule,
                        FormsModule,
                        IconModule,
                        DialogModule,
                        StaticIconModule,
                        I18nModule
                    ]
                },] },
    ];
    return TableModule;
}());
export { TableModule };
//# sourceMappingURL=table.module.js.map