import { CheckboxComponent } from "./checkbox.component";
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	Input,
	OnInit,
	Output,
	ViewChild
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

export enum SwitchState {
	Init,
	Indeterminate,
	Checked,
	Unchecked
}

export class SwitchChange {
	source: SwitchComponent;
	checked: boolean;
}

@Component({
	selector: "n-switch",
	template: `
		<label [for]="id" class="toggle">
			<span class="toggle-label"><ng-content></ng-content></span>
			<input type="checkbox"
				#inputCheckbox
				(change)="onChange($event)"
				(click)="onClick($event)"
				[checked]="checked"
				[disabled]="disabled"
				[indeterminate]="indeterminate"
				[name]="name"
				[id]="id"
				[required]="required"
				[value]="value"
				[attr.aria-label]="ariaLabel"
				[attr.aria-labelledby]="ariaLabelledby"
				[attr.aria-checked]="indeterminate ? 'mixed' : checked">
			<span></span>
		</label>
	`,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SwitchComponent),
			multi: true
		}
	],
	host: {
		"role": "checkbox"
	}
})
export class SwitchComponent extends CheckboxComponent {
	static switchCount = 0;

	id = "switch-" + SwitchComponent.switchCount;

	constructor(protected changeDetectorRef: ChangeDetectorRef) {
		super(changeDetectorRef);
		SwitchComponent.switchCount++;
	}
}
