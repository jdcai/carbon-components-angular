/*!
 *
 * carbon-angular v0.0.0 | table.component.js
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


import { Component, ApplicationRef, Input, Output, EventEmitter, ElementRef, TemplateRef } from "@angular/core";
import { fromEvent } from "rxjs";
import { TableModel } from "./table.module";
import { TableHeaderItem } from "./table-header-item.class";
import { TableItem } from "./table-item.class";
import { getScrollbarWidth } from "../common/utils";
import { getFocusElementList, tabbableSelectorIgnoreTabIndex } from "../common/tab.service";
import { I18n } from "./../i18n/i18n.module";
/**
 * Build your table with this component by extending things that differ from default.
 *
 * demo: [https://angular.carbondesignsystem.com/?selectedKind=Table](https://angular.carbondesignsystem.com/?selectedKind=Table)
 *
 * Instead of the usual write-your-own-html approach you had with `<table>`,
 * carbon table uses model-view-controller approach.
 *
 * Here, you create a view (with built-in controller) and provide it a model.
 * Changes you make to the model are reflected in the view. Provide same model you use
 * in the table to the `<ibm-pagination>` components.
 * They provide a different view over the same data.
 *
 * ## Basic usage
 *
 * ```html
 * <ibm-table [model]="model"></ibm-table>
 * ```
 *
 * ```typescript
 * public model = new TableModel();
 *
 * this.model.data = [
 * 	[new TableItem({data: "asdf"}), new TableItem({data: "qwer"})],
 * 	[new TableItem({data: "csdf"}), new TableItem({data: "zwer"})],
 * 	[new TableItem({data: "bsdf"}), new TableItem({data: "swer"})],
 * 	[new TableItem({data: "csdf"}), new TableItem({data: "twer"})]
 * ];
 * ```
 *
 * ## Customization
 *
 * If you have custom data in your table, you need a way to display it. You can do that
 * by providing a template to `TableItem`.
 *
 * ```html
 * <ng-template #customTableItemTemplate let-data="data">
 * 	<a [routerLink]="data.link">{{data.name}} {{data.surname}}</a>
 * </ng-template>
 * ```
 *
 * ```typescript
 * customTableItemTemplate: TemplateRef<any>;
 *
 * this.customModel.data = [
 * 	[new TableItem({data: "asdf"}), new TableItem({data: {name: "Lessy", link: "/table"}, template: this.customTableItemTemplate})],
 * 	[new TableItem({data: "csdf"}), new TableItem({data: "swer"})],
 * 	[new TableItem({data: "bsdf"}), new TableItem({data: {name: "Alice", surname: "Bob"}, template: this.customTableItemTemplate})],
 * 	[new TableItem({data: "csdf"}), new TableItem({data: "twer"})],
 * ];
 * ```
 *
 * ### Sorting and filtering
 *
 * In case you need custom sorting and/or filtering you should subclass `TableHeaderItem`
 * and override needed functions.
 *
 * ```typescript
 * class FilterableHeaderItem extends TableHeaderItem {
 * 	// custom filter function
 * 	filter(item: TableItem): boolean {
 * 		if (typeof item.data === "string" && item.data.toLowerCase().indexOf(this.filterData.data.toLowerCase()) >= 0 ||
 * 		item.data.name && item.data.name.toLowerCase().indexOf(this.filterData.data.toLowerCase()) >= 0 ||
 * 		item.data.surname && item.data.surname.toLowerCase().indexOf(this.filterData.data.toLowerCase()) >= 0) {
 * 			return false;
 * 		}
 * 		return true;
 * 	}
 *
 * 	set filterCount(n) {}
 * 	get filterCount() {
 * 		return (this.filterData && this.filterData.data && this.filterData.data.length > 0) ? 1 : 0;
 * 	}
 *
 * 	// used for custom sorting
 * 	compare(one: TableItem, two: TableItem) {
 * 		const stringOne = (one.data.name || one.data.surname || one.data).toLowerCase();
 * 		const stringTwo = (two.data.name || two.data.surname || two.data).toLowerCase();
 *
 * 		if (stringOne > stringTwo) {
 * 			return 1;
 * 		} else if (stringOne < stringTwo) {
 * 			return -1;
 * 		} else {
 * 			return 0;
 * 		}
 * 	}
 * }
 * ```
 *
 * See `TableHeaderItem` class for more information.
 *
 * ## No data template
 *
 * When table has no data to show, it can show a message you provide it instead.
 *
 * ```html
 * <ibm-table [model]="model">No data.</ibm-table>
 * ```
 *
 * ... will show `No data.` message, but you can get creative and provide any template you want
 * to replace table's default `tbody`.
 *
 * ## Use pagination as table footer
 *
 * ```html
 * <ibm-pagination [model]="model" (selectPage)="selectPage($event)"></ibm-pagination>
 * ```
 *
 * `selectPage()` function should fetch the data from backend, create new `data`, apply it to `model.data`,
 * and update `model.currentPage`.
 *
 * If the data your server returns is a two dimensional array of objects, it would look something like this:
 *
 * ```typescript
 * selectPage(page) {
 * 	this.getPage(page).then((data: Array<Array<any>>) => {
 * 		// set the data and update page
 * 		this.model.data = this.prepareData(data);
 * 		this.model.currentPage = page;
 * 	});
 * }
 *
 * protected prepareData(data: Array<Array<any>>) {
 * 	// create new data from the service data
 * 	let newData = [];
 * 	data.forEach(dataRow => {
 * 		let row = [];
 * 		dataRow.forEach(dataElement => {
 * 			row.push(new TableItem({
 * 				data: dataElement,
 * 				template: typeof dataElement === "string" ? undefined : this.paginationTableItemTemplate
 * 				// your template can handle all the data types so you don't have to conditionally set it
 * 				// you can also set different templates for different columns based on index
 * 			}));
 * 		});
 * 		newData.push(row);
 * 	});
 * 	return newData;
 * }
 * ```
 *
 * @export
 * @class Table
 * @implements {AfterContentChecked}
 */
var Table = /** @class */ (function () {
    /**
     * Creates an instance of Table.
     *
     * @param {ApplicationRef} applicationRef
     */
    function Table(elementRef, applicationRef, i18n) {
        this.elementRef = elementRef;
        this.applicationRef = applicationRef;
        this.i18n = i18n;
        /**
         * Size of the table rows.
         *
         * @type {("sm" | "md" | "lg")}
         */
        this.size = "md";
        /**
         * Set to `true` for a loading table.
         */
        this.skeleton = false;
        /**
         * Set to `true` for a data grid with keyboard interactions.
         */
        this.isDataGrid = false;
        /**
         * Controls whether to show the selection checkboxes column or not.
         *
         * @type {boolean}
         */
        this.showSelectionColumn = true;
        /**
         * Controls whether to enable multiple or single row selection.
         *
         * @type {boolean}
         */
        this.enableSingleSelect = false;
        /**
         * Distance (in px) from the bottom that view has to reach before
         * `scrollLoad` event is emitted.
         *
         * @type {number}
         */
        this.scrollLoadDistance = 0;
        /**
         * Set to `true` to enable users to resize columns.
         *
         * Works for columns with width set in pixels.
         *
         */
        this.columnsResizable = false;
        /**
         * Set to `true` to enable users to drag and drop columns.
         *
         * Changing the column order in table changes table model. Be aware of it when you add additional data
         * to the model.
         *
         */
        this.columnsDraggable = false;
        this.checkboxHeaderLabel = this.i18n.get("TABLE.CHECKBOX_HEADER");
        this.checkboxRowLabel = this.i18n.get("TABLE.CHECKBOX_ROW");
        this.endOfDataText = this.i18n.get("TABLE.END_OF_DATA");
        this.scrollTopText = this.i18n.get("TABLE.SCROLL_TOP");
        this.filterTitle = this.i18n.get("TABLE.FILTER");
        /**
         * Controls if all checkboxes are viewed as selected.
         *
         * @type {boolean}
         */
        this.selectAllCheckbox = false;
        /**
         * Controls the indeterminate state of the header checkbox.
         *
         * @type {boolean}
         */
        this.selectAllCheckboxSomeSelected = false;
        /**
         * Set to `false` to remove table rows (zebra) stripes.
         *
         * @type {boolean}
         */
        this.striped = true;
        /**
         * Set to `true` to stick the header to the top of the table
         */
        this.stickyHeader = false;
        /**
         * Emits an index of the column that wants to be sorted.
         *
         */
        this.sort = new EventEmitter();
        /**
         * Emits if all rows are selected.
         *
         * @param {TableModel} model
         */
        this.selectAll = new EventEmitter();
        /**
         * Emits if all rows are deselected.
         *
         * @param {TableModel} model
         */
        this.deselectAll = new EventEmitter();
        /**
         * Emits if a single row is selected.
         *
         * @param {Object} ({model: this.model, selectedRowIndex: index})
         */
        this.selectRow = new EventEmitter();
        /**
         * Emits if a single row is deselected.
         *
         * @param {Object} ({model: this.model, deselectedRowIndex: index})
         */
        this.deselectRow = new EventEmitter();
        /**
         * Emits when table requires more data to be loaded.
         *
         * @param {TableModel} model
         */
        this.scrollLoad = new EventEmitter();
        this.columnIndex = 0;
        this._expandButtonAriaLabel = this.i18n.get("TABLE.EXPAND_BUTTON");
        this._sortDescendingLabel = this.i18n.get("TABLE.SORT_DESCENDING");
        this._sortAscendingLabel = this.i18n.get("TABLE.SORT_ASCENDING");
        this.isColumnDragging = false;
        this.columnDraggedHoverIndex = -1;
        this.columnDraggedPosition = "";
    }
    /**
     * Creates a skeleton model with a row and column count specified by the user
     *
     * Example:
     *
     * ```typescript
     * this.model = Table.skeletonModel(5, 5);
     * ```
     *
     * @param {number} rowCount
     * @param {number} columnCount
     */
    Table.skeletonModel = function (rowCount, columnCount) {
        var model = new TableModel();
        var header = new Array();
        var data = new Array();
        var row = new Array();
        for (var i = 0; i < columnCount; i++) {
            header.push(new TableHeaderItem());
            row.push(new TableItem());
        }
        for (var i = 0; i < rowCount - 1; i++) {
            data.push(row);
        }
        model.header = header;
        model.data = data;
        return model;
    };
    Table.setTabIndex = function (element, index) {
        var focusElementList = getFocusElementList(element, tabbableSelectorIgnoreTabIndex);
        if (element.firstElementChild && element.firstElementChild.classList.contains("bx--table-sort-v2")) {
            focusElementList[1].tabIndex = index;
        }
        else if (focusElementList.length > 0) {
            focusElementList[0].tabIndex = index;
        }
        else {
            element.tabIndex = index;
        }
    };
    Object.defineProperty(Table.prototype, "model", {
        get: function () {
            return this._model;
        },
        /**
         * `TableModel` with data the table is to display.
         *
         * @type {TableModel}
         */
        set: function (m) {
            var _this = this;
            if (this._model) {
                this._model.dataChange.unsubscribe();
                this._model.rowsSelectedChange.unsubscribe();
            }
            this._model = m;
            this._model.rowsSelectedChange.subscribe(function () { return _this.updateSelectAllCheckbox(); });
            this._model.dataChange.subscribe(function () {
                _this.updateSelectAllCheckbox();
                if (_this.isDataGrid) {
                    _this.handleTabIndex();
                }
            });
            if (this.isDataGrid) {
                this._model.rowsExpandedChange.subscribe(function () {
                    // Allows the expanded row to have a focus state when it exists in the DOM
                    setTimeout(function () {
                        var expandedRows = _this.elementRef.nativeElement.querySelectorAll(".bx--expandable-row-v2:not(.bx--parent-row-v2)");
                        Array.from(expandedRows).forEach(function (row) {
                            if (row.firstElementChild.tabIndex === undefined || row.firstElementChild.tabIndex !== -1) {
                                row.firstElementChild.tabIndex = -1;
                            }
                        });
                    });
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "enableRowSelect", {
        get: function () {
            return this.showSelectionColumn;
        },
        /**
         * Controls whether to show the selection checkboxes column or not.
         *
         * @deprecated in the next major carbon-components-angular version in favour of
         * `showSelectionColumn` because of new attribute `enableSingleSelect`
         *  please use `showSelectionColumn` instead
         */
        set: function (value) {
            this.showSelectionColumn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "expandButtonAriaLabel", {
        get: function () {
            return this._expandButtonAriaLabel;
        },
        set: function (value) {
            this._expandButtonAriaLabel.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "sortDescendingLabel", {
        get: function () {
            return this._sortDescendingLabel;
        },
        set: function (value) {
            this._sortDescendingLabel.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "sortAscendingLabel", {
        get: function () {
            return this._sortAscendingLabel;
        },
        set: function (value) {
            this._sortAscendingLabel.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "translations", {
        /**
         * Expects an object that contains some or all of:
         * ```
         * {
         *		"FILTER": "Filter",
         *		"END_OF_DATA": "You've reached the end of your content",
         *		"SCROLL_TOP": "Scroll to top",
         *		"CHECKBOX_HEADER": "Select all rows",
         *		"CHECKBOX_ROW": "Select row"
         * }
         * ```
         */
        set: function (value) {
            if (value.FILTER) {
                this.filterTitle.next(value.FILTER);
            }
            if (value.END_OF_DATA) {
                this.endOfDataText.next(value.END_OF_DATA);
            }
            if (value.SCROLL_TOP) {
                this.scrollTopText.next(value.SCROLL_TOP);
            }
            if (value.CHECKBOX_HEADER) {
                this.checkboxHeaderLabel.next(value.CHECKBOX_HEADER);
            }
            if (value.CHECKBOX_ROW) {
                this.checkboxRowLabel.next(value.CHECKBOX_ROW);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "noData", {
        get: function () {
            return !this.model.data ||
                this.model.data.length === 0 ||
                this.model.data.length === 1 && this.model.data[0].length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.ngAfterViewInit = function () {
        if (this.isDataGrid) {
            this.handleTabIndex();
        }
    };
    Table.prototype.columnResizeStart = function (event, column) {
        var _this = this;
        this.columnResizeWidth = parseInt(column.style.width, 10);
        this.columnResizeMouseX = event.clientX;
        event.preventDefault();
        this.mouseMoveSubscription = fromEvent(document.body, "mousemove").subscribe(function (event) {
            _this.columnResizeProgress(event, column);
        });
        this.mouseUpSubscription = fromEvent(document.body, "mouseup").subscribe(function (event) {
            _this.columnResizeEnd(event, column);
        });
    };
    Table.prototype.columnResizeProgress = function (event, column) {
        var move = event.clientX - this.columnResizeMouseX;
        column.style.width = this.columnResizeWidth + move + "px";
    };
    Table.prototype.columnResizeEnd = function (event, column) {
        this.mouseMoveSubscription.unsubscribe();
        this.mouseUpSubscription.unsubscribe();
    };
    Table.prototype.onRowSelect = function (index) {
        var _this = this;
        if (!this.showSelectionColumn && this.enableSingleSelect) {
            this.model.rowsSelected.forEach(function (element, index) {
                _this.model.selectRow(index, false);
            });
            this.model.selectRow(index, !this.model.rowsSelected[index]);
            this.onRowCheckboxChange(index);
        }
    };
    Table.prototype.updateSelectAllCheckbox = function () {
        var selectedRowsCount = this.model.selectedRowsCount();
        if (selectedRowsCount <= 0) {
            // reset select all checkbox if nothing selected
            this.selectAllCheckbox = false;
            this.selectAllCheckboxSomeSelected = false;
        }
        else if (selectedRowsCount < this.model.data.length) {
            this.selectAllCheckboxSomeSelected = true;
        }
    };
    /**
     * Triggered whenever the header checkbox is clicked.
     * Updates all the checkboxes in the table view.
     * Emits the `selectAll` or `deselectAll` event.
     *
     */
    Table.prototype.onSelectAllCheckboxChange = function () {
        this.applicationRef.tick(); // give app time to process the click if needed
        if (this.selectAllCheckboxSomeSelected) {
            this.selectAllCheckbox = false; // clear all boxes
            this.deselectAll.emit(this.model);
        }
        else if (this.selectAllCheckbox) {
            this.selectAll.emit(this.model);
        }
        else {
            this.deselectAll.emit(this.model);
        }
        this.selectAllCheckboxSomeSelected = false;
        for (var i = 0; i < this.model.rowsSelected.length; i++) {
            this.model.rowsSelected[i] = this.selectAllCheckbox;
        }
    };
    /**
     * Triggered when a single row is clicked.
     * Updates the header checkbox state.
     * Emits the `selectRow` or `deselectRow` event.
     *
     * @param {number} index
     * @returns
     */
    Table.prototype.onRowCheckboxChange = function (index) {
        var startValue = this.model.rowsSelected[0];
        if (this.model.rowsSelected[index]) {
            this.selectRow.emit({ model: this.model, selectedRowIndex: index });
        }
        else {
            this.deselectRow.emit({ model: this.model, deselectedRowIndex: index });
        }
        for (var i = 1; i < this.model.rowsSelected.length; i++) {
            var one = this.model.rowsSelected[i];
            if (!!one !== !!startValue) { // !! essentially converts to boolean and we want undefined to be false
                // set indeterminate
                this.selectAllCheckbox = false;
                this.selectAllCheckboxSomeSelected = true;
                return;
            }
        }
        this.selectAllCheckboxSomeSelected = false;
        this.selectAllCheckbox = startValue;
    };
    /**
     * Triggered when the user scrolls on the `<tbody>` element.
     * Emits the `scrollLoad` event.
     *
     * @param {any} event
     */
    Table.prototype.onScroll = function (event) {
        var distanceFromBottom = event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop;
        if (distanceFromBottom <= this.scrollLoadDistance) {
            this.scrollLoad.emit(this.model);
        }
        else {
            this.model.isEnd = false;
        }
    };
    Table.prototype.columnDragStart = function (event, columnIndex) {
        this.isColumnDragging = true;
        this.columnDraggedHoverIndex = columnIndex;
        event.dataTransfer.setData("columnIndex", JSON.stringify(columnIndex));
    };
    Table.prototype.columnDragEnd = function (event, columnIndex) {
        this.isColumnDragging = false;
        this.columnDraggedHoverIndex = -1;
    };
    Table.prototype.columnDragEnter = function (event, position, columnIndex) {
        this.columnDraggedPosition = position;
        this.columnDraggedHoverIndex = columnIndex;
    };
    Table.prototype.columnDragLeave = function (event, position, columnIndex) {
        this.columnDraggedPosition = "";
    };
    Table.prototype.columnDragover = function (event, position, columnIndex) {
        this.columnDraggedHoverIndex = columnIndex;
        this.columnDraggedPosition = position;
        // needed to tell browser to allow dropping
        event.preventDefault();
    };
    Table.prototype.columnDrop = function (event, position, columnIndex) {
        this.isColumnDragging = false;
        this.columnDraggedHoverIndex = -1;
        this.columnDraggedPosition = "";
        this.model.moveColumn(parseInt(event.dataTransfer.getData("columnIndex"), 10), columnIndex + (position === "right" ? 1 : 0));
    };
    Object.defineProperty(Table.prototype, "scrollbarWidth", {
        get: function () {
            return getScrollbarWidth();
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.firstExpandedDataInRow = function (row) {
        var found = row.find(function (d) { return d.expandedData; });
        if (found) {
            return found.expandedData;
        }
        return found;
    };
    Table.prototype.firstExpandedTemplateInRow = function (row) {
        var found = row.find(function (d) { return d.expandedTemplate; });
        if (found) {
            return found.expandedTemplate;
        }
        return found;
    };
    /**
     * Triggered when the user scrolls on the `<tbody>` element.
     * Emits the `scrollLoad` event.
     *
     * @param {any} event
     */
    Table.prototype.scrollToTop = function (event) {
        event.target.parentElement.parentElement.parentElement.parentElement.children[1].scrollTop = 0;
        this.model.isEnd = false;
    };
    Table.prototype.handleTabIndex = function () {
        var _this = this;
        setTimeout(function () {
            var focusElementList = getFocusElementList(_this.elementRef.nativeElement, tabbableSelectorIgnoreTabIndex);
            if (focusElementList.length > 0) {
                focusElementList.forEach(function (tabbable) {
                    tabbable.tabIndex = -1;
                });
            }
            Array.from(_this.elementRef.nativeElement.querySelectorAll("td, th")).forEach(function (cell) { return Table.setTabIndex(cell, -1); });
            var rows = _this.elementRef.nativeElement.firstElementChild.rows;
            if (Array.from(rows[0].querySelectorAll("th")).some(function (th) { return getFocusElementList(th, tabbableSelectorIgnoreTabIndex).length > 0; })) {
                Table.setTabIndex(rows[0].querySelector("th"), 0);
            }
            else {
                Table.setTabIndex(rows[1].querySelector("td"), 0);
            }
        });
    };
    Table.prototype.setIndex = function (columnIndex) {
        if (this.model.hasExpandableRows() && this.showSelectionColumn) {
            this.columnIndex = columnIndex + 2;
        }
        else if (this.model.hasExpandableRows() || this.showSelectionColumn) {
            this.columnIndex = columnIndex + 1;
        }
    };
    Table.prototype.setCheckboxIndex = function () {
        if (this.model.hasExpandableRows()) {
            this.columnIndex = 1;
        }
        else {
            this.columnIndex = 0;
        }
    };
    Table.prototype.setExpandIndex = function (event) {
        this.columnIndex = 0;
    };
    Table.prototype.getSelectionLabelValue = function (row) {
        if (!this.selectionLabelColumn) {
            return { value: this.i18n.get().TABLE.ROW };
        }
        return { value: row[this.selectionLabelColumn].data };
    };
    Table.decorators = [
        { type: Component, args: [{
                    selector: "ibm-table",
                    template: "\n\t<table\n\tclass=\"bx--data-table-v2\"\n\t[ngClass]=\"{\n\t\t'bx--data-table-v2--compact': size === 'sm',\n\t\t'bx--data-table-v2--tall': size === 'lg',\n\t\t'bx--data-table-v2--zebra': striped,\n\t\t'bx--skeleton': skeleton\n\t}\">\n\t\t<thead>\n\t\t\t<tr>\n\t\t\t\t<th *ngIf=\"model.hasExpandableRows()\"\n\t\t\t\t\t[ibmDataGridFocus]=\"isDataGrid\"\n\t\t\t\t\t[(columnIndex)]=\"columnIndex\"\n\t\t\t\t\t(click)=\"setExpandIndex($event)\">\n\t\t\t\t</th>\n\t\t\t\t<th *ngIf=\"!skeleton && showSelectionColumn\"\n\t\t\t\t\t[ibmDataGridFocus]=\"isDataGrid\"\n\t\t\t\t\t[(columnIndex)]=\"columnIndex\"\n\t\t\t\t\t(click)=\"setCheckboxIndex()\"\n\t\t\t\t\tstyle=\"width: 10px;\">\n\t\t\t\t\t<ibm-checkbox\n\t\t\t\t\t\tinline=\"true\"\n\t\t\t\t\t\t[size]=\"size !== ('lg' ? 'sm' : 'md')\"\n\t\t\t\t\t\t[(ngModel)]=\"selectAllCheckbox\"\n\t\t\t\t\t\t[indeterminate]=\"selectAllCheckboxSomeSelected\"\n\t\t\t\t\t\t[attr.aria-label]=\"checkboxHeaderLabel | async\"\n\t\t\t\t\t\t(change)=\"onSelectAllCheckboxChange()\">\n\t\t\t\t\t</ibm-checkbox>\n\t\t\t\t</th>\n\t\t\t\t<ng-container *ngFor=\"let column of model.header; let i = index\">\n\t\t\t\t\t<th [ngClass]='{\"thead_action\": column.filterTemplate || this.sort.observers.length > 0}'\n\t\t\t\t\t*ngIf=\"column.visible\"\n\t\t\t\t\t[class]=\"column.className\"\n\t\t\t\t\t[ngStyle]=\"column.style\"\n\t\t\t\t\t[ibmDataGridFocus]=\"isDataGrid\"\n\t\t\t\t\t[(columnIndex)]=\"columnIndex\"\n\t\t\t\t\t[draggable]=\"columnsDraggable\"\n\t\t\t\t\t(dragstart)=\"columnDragStart($event, i)\"\n\t\t\t\t\t(dragend)=\"columnDragEnd($event, i)\"\n\t\t\t\t\t(click)=\"setIndex(i)\">\n\t\t\t\t\t\t<span *ngIf=\"skeleton\"></span>\n\t\t\t\t\t\t<div\n\t\t\t\t\t\t*ngIf=\"columnsResizable\"\n\t\t\t\t\t\tclass=\"column-resize-handle\"\n\t\t\t\t\t\t(mousedown)=\"columnResizeStart($event, column)\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\tclass=\"bx--table-sort-v2\"\n\t\t\t\t\t\t\t*ngIf=\"this.sort.observers.length > 0 && column.sortable\"\n\t\t\t\t\t\t\t[attr.aria-label]=\"(column.sorted && column.ascending ? sortDescendingLabel : sortAscendingLabel) | async\"\n\t\t\t\t\t\t\taria-live=\"polite\"\n\t\t\t\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t\t\t\t'bx--table-sort-v2--active': column.sorted,\n\t\t\t\t\t\t\t\t'bx--table-sort-v2--ascending': column.ascending\n\t\t\t\t\t\t\t}\"\n\t\t\t\t\t\t\t(click)=\"sort.emit(i)\">\n\t\t\t\t\t\t\t<span\n\t\t\t\t\t\t\t\t*ngIf=\"!column.template\"\n\t\t\t\t\t\t\t\t[title]=\"column.data\"\n\t\t\t\t\t\t\t\ttabindex=\"-1\">\n\t\t\t\t\t\t\t\t{{column.data}}\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<ng-template\n\t\t\t\t\t\t\t\t[ngTemplateOutlet]=\"column.template\" [ngTemplateOutletContext]=\"{data: column.data}\">\n\t\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t\t\t<svg\n\t\t\t\t\t\t\tclass=\"bx--table-sort-v2__icon\"\n\t\t\t\t\t\t\twidth=\"10\" height=\"5\" viewBox=\"0 0 10 5\">\n\t\t\t\t\t\t\t\t<path d=\"M0 0l5 4.998L10 0z\" fill-rule=\"evenodd\" />\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<span\n\t\t\t\t\t\t\tclass=\"bx--table-header-label\"\n\t\t\t\t\t\t\t*ngIf=\"!skeleton && this.sort.observers.length === 0 || (this.sort.observers.length > 0 && !column.sortable)\">\n\t\t\t\t\t\t\t<span *ngIf=\"!column.template\" [title]=\"column.data\">{{column.data}}</span>\n\t\t\t\t\t\t\t<ng-template\n\t\t\t\t\t\t\t\t[ngTemplateOutlet]=\"column.template\" [ngTemplateOutletContext]=\"{data: column.data}\">\n\t\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\t[ngClass]=\"{'active': column.filterCount > 0}\"\n\t\t\t\t\t\t\t*ngIf=\"column.filterTemplate\"\n\t\t\t\t\t\t\ttype=\"button\"\n\t\t\t\t\t\t\taria-expanded=\"false\"\n\t\t\t\t\t\t\taria-haspopup=\"true\"\n\t\t\t\t\t\t\t[ibmTooltip]=\"column.filterTemplate\"\n\t\t\t\t\t\t\ttrigger=\"click\"\n\t\t\t\t\t\t\t[title]=\"filterTitle | async\"\n\t\t\t\t\t\t\tplacement=\"bottom,top\"\n\t\t\t\t\t\t\t[data]=\"column.filterData\">\n\t\t\t\t\t\t\t<svg\n\t\t\t\t\t\t\t\txmlns=\"http://www.w3.org/2000/svg\"\n\t\t\t\t\t\t\t\tclass=\"icon--sm\"\n\t\t\t\t\t\t\t\twidth=\"16\"\n\t\t\t\t\t\t\t\theight=\"16\"\n\t\t\t\t\t\t\t\tviewBox=\"0 0 16 16\">\n\t\t\t\t\t\t\t\t<path d=\"M0 0v3l6 8v5h4v-5l6-8V0H0zm9 10.7V15H7v-4.3L1.3 3h13.5L9 10.7z\"/>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t<span *ngIf=\"column.filterCount > 0\">\n\t\t\t\t\t\t\t\t{{column.filterCount}}\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<div\n\t\t\t\t\t\t*ngIf=\"columnsDraggable && isColumnDragging\"\n\t\t\t\t\t\tclass=\"drop-area\">\n\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t*ngIf=\"columnDraggedHoverIndex == i && columnDraggedPosition == 'left'\"\n\t\t\t\t\t\t\tclass=\"drop-indicator-left\"></div>\n\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\tclass=\"drop-area-left\"\n\t\t\t\t\t\t\t(dragenter)=\"columnDragEnter($event, 'left', i)\"\n\t\t\t\t\t\t\t(dragleave)=\"columnDragLeave($event, 'left', i)\"\n\t\t\t\t\t\t\t(dragover)=\"columnDragover($event, 'left', i)\"\n\t\t\t\t\t\t\t(drop)=\"columnDrop($event, 'left', i)\">\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\tclass=\"drop-area-right\"\n\t\t\t\t\t\t\t(dragenter)=\"columnDragEnter($event, 'right', i)\"\n\t\t\t\t\t\t\t(dragleave)=\"columnDragLeave($event, 'right', i)\"\n\t\t\t\t\t\t\t(dragover)=\"columnDragover($event, 'right', i)\"\n\t\t\t\t\t\t\t(drop)=\"columnDrop($event, 'right', i)\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t*ngIf=\"columnDraggedHoverIndex == i && columnDraggedPosition == 'right'\"\n\t\t\t\t\t\t\tclass=\"drop-indicator-right\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</th>\n\t\t\t\t</ng-container>\n\t\t\t\t<th *ngIf=\"!skeleton && stickyHeader\" [ngStyle]=\"{'width': scrollbarWidth + 'px', 'padding': 0, 'border': 0}\">\n\t\t\t\t\t<!--\n\t\t\t\t\t\tScrollbar pushes body to the left so this header column is added to push\n\t\t\t\t\t\tthe title bar the same amount and keep the header and body columns aligned.\n\t\t\t\t\t-->\n\t\t\t\t</th>\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody\n\t\t*ngIf=\"!noData; else noDataTemplate\"\n\t\t[ngStyle]=\"{'overflow-y': 'scroll'}\"\n\t\t(scroll)=\"onScroll($event)\">\n\t\t\t<ng-container *ngFor=\"let row of model.data; let i = index\">\n\t\t\t\t<tr *ngIf=\"!model.isRowFiltered(i)\"\n\t\t\t\t\t(click)=\"onRowSelect(i)\"\n\t\t\t\t\t[attr.data-parent-row]=\"(model.isRowExpandable(i) ? 'true' : null)\"\n\t\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t\t'bx--data-table-v2--selected': model.rowsSelected[i],\n\t\t\t\t\t\t'bx--parent-row-v2': model.isRowExpandable(i),\n\t\t\t\t\t\t'bx--expandable-row-v2': model.rowsExpanded[i],\n\t\t\t\t\t\t'tbody_row--selectable': enableSingleSelect,\n\t\t\t\t\t\t'tbody_row--success': !model.rowsSelected[i] && model.rowsContext[i] === 'success',\n\t\t\t\t\t\t'tbody_row--warning': !model.rowsSelected[i] && model.rowsContext[i] === 'warning',\n\t\t\t\t\t\t'tbody_row--info': !model.rowsSelected[i] && model.rowsContext[i] === 'info',\n\t\t\t\t\t\t'tbody_row--error': !model.rowsSelected[i] && model.rowsContext[i] === 'error'\n\t\t\t\t\t}\">\n\t\t\t\t\t<td\n\t\t\t\t\t*ngIf=\"model.hasExpandableRows()\"\n\t\t\t\t\tclass=\"bx--table-expand-v2\"\n\t\t\t\t\t[ibmDataGridFocus]=\"isDataGrid\"\n\t\t\t\t\t[(columnIndex)]=\"columnIndex\"\n\t\t\t\t\t[attr.data-previous-value]=\"(model.rowsExpanded[i] ? 'collapsed' : null)\"\n\t\t\t\t\t(click)=\"setExpandIndex($event)\">\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t*ngIf=\"model.isRowExpandable(i)\"\n\t\t\t\t\t\tclass=\"bx--table-expand-v2__button\"\n\t\t\t\t\t\t[attr.aria-label]=\"expandButtonAriaLabel | async\"\n\t\t\t\t\t\t(click)=\"model.expandRow(i, !model.rowsExpanded[i])\">\n\t\t\t\t\t\t\t<svg class=\"bx--table-expand-v2__svg\" width=\"7\" height=\"12\" viewBox=\"0 0 7 12\">\n\t\t\t\t\t\t\t\t<path fill-rule=\"nonzero\" d=\"M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z\" />\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td\n\t\t\t\t\t\t*ngIf=\"!skeleton && showSelectionColumn\"\n\t\t\t\t\t\t[ibmDataGridFocus]=\"isDataGrid\"\n\t\t\t\t\t\t[(columnIndex)]=\"columnIndex\"\n\t\t\t\t\t\t(click)=\"setCheckboxIndex()\">\n\t\t\t\t\t\t<ibm-checkbox\n\t\t\t\t\t\t\tinline=\"true\"\n\t\t\t\t\t\t\t[aria-label]=\"checkboxRowLabel | i18nReplace:getSelectionLabelValue(row) | async\"\n\t\t\t\t\t\t\t[size]=\"size !== ('lg' ? 'sm' : 'md')\"\n\t\t\t\t\t\t\t[(ngModel)]=\"model.rowsSelected[i]\"\n\t\t\t\t\t\t\t(change)=\"onRowCheckboxChange(i)\">\n\t\t\t\t\t\t</ibm-checkbox>\n\t\t\t\t\t</td>\n\t\t\t\t\t<ng-container *ngFor=\"let item of row; let j = index\">\n\t\t\t\t\t\t<td *ngIf=\"model.header[j].visible\"\n\t\t\t\t\t\t\t[class]=\"model.header[j].className\"\n\t\t\t\t\t\t\t[ngStyle]=\"model.header[j].style\"\n\t\t\t\t\t\t\t[ibmDataGridFocus]=\"isDataGrid\"\n\t\t\t\t\t\t\t[(columnIndex)]=\"columnIndex\"\n\t\t\t\t\t\t\t(click)=\"setIndex(j)\">\n\t\t\t\t\t\t\t<ng-container *ngIf=\"!item.template\">{{item.data}}</ng-container>\n\t\t\t\t\t\t\t<ng-template\n\t\t\t\t\t\t\t\t[ngTemplateOutlet]=\"item.template\" [ngTemplateOutletContext]=\"{data: item.data}\">\n\t\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</ng-container>\n\t\t\t\t</tr>\n\t\t\t\t<tr\n\t\t\t\t*ngIf=\"model.rowsExpanded[i] && !firstExpandedTemplateInRow(row) && !model.isRowFiltered(i)\"\n\t\t\t\tclass=\"bx--expandable-row-v2\"\n\t\t\t\tibmExpandedRowHover\n\t\t\t\t[attr.data-child-row]=\"(model.rowsExpanded[i] ? 'true' : null)\">\n\t\t\t\t\t<td\n\t\t\t\t\t\t[ibmDataGridFocus]=\"isDataGrid\"\n\t\t\t\t\t\t[(columnIndex)]=\"columnIndex\"\n\t\t\t\t\t\t[attr.colspan]=\"row.length + 2\"\n\t\t\t\t\t\t(click)=\"setExpandIndex($event)\">\n\t\t\t\t\t\t<ng-container *ngIf=\"!firstExpandedTemplateInRow(row)\">{{firstExpandedDataInRow(row)}}</ng-container>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<ng-template\n\t\t\t\t[ngTemplateOutlet]=\"firstExpandedTemplateInRow(row)\"\n\t\t\t\t[ngTemplateOutletContext]=\"{data: firstExpandedDataInRow(row)}\">\n\t\t\t</ng-template>\n\t\t\t</ng-container>\n\t\t</tbody>\n\t\t<ng-template #noDataTemplate><ng-content></ng-content></ng-template>\n\t\t<tfoot>\n\t\t\t<ng-template\n\t\t\t\t[ngTemplateOutlet]=\"footerTemplate\">\n\t\t\t</ng-template>\n\t\t\t<tr *ngIf=\"this.model.isLoading\">\n\t\t\t\t<td class=\"table_loading-indicator\">\n\t\t\t\t\t<ibm-static-icon icon=\"loading_rows\" size=\"lg\"></ibm-static-icon>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t<tr *ngIf=\"this.model.isEnd\">\n\t\t\t\t<td class=\"table_end-indicator\">\n\t\t\t\t\t<h5>{{endOfDataText | async}}</h5>\n\t\t\t\t\t<button (click)=\"scrollToTop($event)\" class=\"btn--secondary-sm\">\n\t\t\t\t\t\t{{scrollTopText | async}}\n\t\t\t\t\t</button>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t</tfoot>\n\t</table>\n\t"
                },] },
    ];
    /** @nocollapse */
    Table.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ApplicationRef },
        { type: I18n }
    ]; };
    Table.propDecorators = {
        size: [{ type: Input }],
        skeleton: [{ type: Input }],
        isDataGrid: [{ type: Input }],
        model: [{ type: Input }],
        enableRowSelect: [{ type: Input }],
        showSelectionColumn: [{ type: Input }],
        enableSingleSelect: [{ type: Input }],
        scrollLoadDistance: [{ type: Input }],
        columnsResizable: [{ type: Input }],
        columnsDraggable: [{ type: Input }],
        expandButtonAriaLabel: [{ type: Input }],
        sortDescendingLabel: [{ type: Input }],
        sortAscendingLabel: [{ type: Input }],
        translations: [{ type: Input }],
        striped: [{ type: Input }],
        stickyHeader: [{ type: Input }],
        footerTemplate: [{ type: Input }],
        selectionLabelColumn: [{ type: Input }],
        sort: [{ type: Output }],
        selectAll: [{ type: Output }],
        deselectAll: [{ type: Output }],
        selectRow: [{ type: Output }],
        deselectRow: [{ type: Output }],
        scrollLoad: [{ type: Output }]
    };
    return Table;
}());
export { Table };
//# sourceMappingURL=table.component.js.map