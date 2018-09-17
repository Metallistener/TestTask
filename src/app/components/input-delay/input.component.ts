import { Component, Input, Output, EventEmitter, ElementRef } from "@angular/core";
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-input-delay',
    template: `
    <mat-form-field>
        <input 
            type="text"
            class="testSearch__search-field" 
            matInput 
            [(ngModel)]="inputValue"
            name="name"
            [placeholder]="placeholder"
        >
    </mat-form-field>
    `,
    styleUrls: ['./input.css']
})

export class InputDelayComponent {
    @Input() placeholder: string = '';
    @Input() delay: number = 300;
    @Output() value = new EventEmitter<any>();

    public inputValue: string;

    constructor(private elementRef: ElementRef) {
        const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
            .map(() => this.inputValue)
            .debounceTime(this.delay)
            .distinctUntilChanged();

        eventStream.subscribe((input) => {
            const obj = {
                value: input
            }
            this.value.emit(obj)
        });
    }
}