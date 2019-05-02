/*!
 *
 * carbon-angular v0.0.0 | code-snippet.component.d.ts
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


import { I18n } from "../i18n/i18n.module";
export declare enum SnippetType {
    single = "single",
    multi = "multi",
    inline = "inline"
}
/**
 * ```html
 * <ibm-code-snippet>Code</ibm-code-snippet>
 * ```
 * @export
 * @class CodeSnippet
 */
export declare class CodeSnippet {
    protected i18n: I18n;
    /**
     * Variable used for creating unique ids for code-snippet components.
     * @type {number}
     * @static
     * @memberof CodeSnippet
     */
    static codeSnippetCount: number;
    /**
     * It can be `"single"`, `"multi"` or `"inline"`
     *
     * @type {SnippetType}
     * @memberof CodeSnippet
     */
    display: SnippetType;
    translations: any;
    /**
     * Set to `"light"` to apply the light style on the code snippet.
     * @type {"light" | "dark"}
     * @memberof CodeSnippet
     */
    theme: "light" | "dark";
    /**
     * Text displayed in the tooltip when user clicks button to copy code.
     *
     * @memberof CodeSnippet
     */
    feedbackText: any;
    /**
     * Time in miliseconds to keep the feedback tooltip displayed.
     *
     * @memberof CodeSnippet
     */
    feedbackTimeout: number;
    expanded: boolean;
    skeleton: boolean;
    snippetClass: boolean;
    readonly snippetSingleClass: boolean;
    readonly snippetMultiClass: boolean;
    readonly snippetInlineClass: boolean;
    readonly snippetInlineLightClass: boolean;
    readonly btnCopyClass: boolean;
    readonly displayStyle: string;
    readonly attrType: string;
    code: any;
    readonly shouldShowExpandButton: boolean;
    showFeedback: boolean;
    /**
     * Creates an instance of CodeSnippet.
     * @param {ChangeDetectorRef} changeDetectorRef
     * @param {ElementRef} elementRef
     * @param {Renderer2} renderer
     * @memberof CodeSnippet
     */
    constructor(i18n: I18n);
    toggleSnippetExpansion(): void;
    /**
     * Copies the code from the `<code>` block to clipboard.
     *
     * @memberof CodeSnippet
     */
    copyCode(): void;
    onCopyButtonClicked(): void;
    /**
     * Inline code snippet acts as button and makes the whole component clickable.
     *
     * This handles clicks in that case.
     *
     * @returns
     * @memberof CodeSnippet
     */
    hostClick(): void;
}
