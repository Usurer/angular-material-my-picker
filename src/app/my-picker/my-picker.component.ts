import {Component, Optional, Inject, Input, Output, ViewChild, EventEmitter} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import { DateRange, MatCalendarUserEvent, MatDateSelectionModel, MatDateRangeSelectionStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY, MatCalendar } from '@angular/material/datepicker';
import {merge, Subject, Observable, Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-my-picker',
  templateUrl: './my-picker.component.html',
  styleUrls: ['./my-picker.component.scss']
})
export class MyPickerComponent {

  constructor(
    private _model: MatDateSelectionModel<DateRange<Date>, DateRange<Date>>,
    private _dateAdapter: DateAdapter<DateRange<Date>>,
    @Optional() @Inject(MAT_DATE_RANGE_SELECTION_STRATEGY) private _rangeSelectionStrategy?: MatDateRangeSelectionStrategy<Date | DateRange<Date>>
  ){
    const LOCALE = 'ru';
    console.log(LOCALE);
    _dateAdapter.setLocale(LOCALE);
  }

  _datepickerInput: any;
  private _inputStateChanges = Subscription.EMPTY;
  readonly _stateChanges = new Subject<void>();
  header = HeaderComponent;

  @Input()
  set startAt(value: Date) {
    if (this.calendar && value)
      this.calendar._goToDateInView(value, 'month');
  }

  @ViewChild(MatCalendar) calendar: MatCalendar<Date>;

  @Output()
  selectionChanged = new EventEmitter<void>();

  _getSelected() {
    // @breaking-change 11.0.0 Remove null check for `_model`.
    return this._model ? this._model.selection as unknown as Date | DateRange<Date> | null : null;
  }

  /** The minimum selectable date. */
  _getMinDate(): Date | null {
    return this._datepickerInput && this._datepickerInput.min;
  }

  /** The maximum selectable date. */
  _getMaxDate(): Date | null {
    return this._datepickerInput && this._datepickerInput.max;
  }

  _handleUserSelection(event: MatCalendarUserEvent<DateRange<Date> | null>) {
    // @breaking-change 11.0.0 Remove null checks for _model,
    // _rangeSelectionStrategy and _dateAdapter.
    if (this._model && this._dateAdapter) {
      const selection = this._model.selection;
      const value = event.value;
      const isRange = selection instanceof DateRange;

      // If we're selecting a range and we have a selection strategy, always pass the value through
      // there. Otherwise don't assign null values to the model, unless we're selecting a range.
      // A null value when picking a range means that the user cancelled the selection (e.g. by
      // pressing escape), whereas when selecting a single value it means that the value didn't
      // change. This isn't very intuitive, but it's here for backwards-compatibility.
      if (isRange && this._rangeSelectionStrategy) {
        const newSelection = this._rangeSelectionStrategy.selectionFinished(value,
            selection as unknown as DateRange<Date>, event.event);
        this._model.updateSelection(newSelection as unknown as DateRange<Date>, this);
      } else if (value && (isRange ||
                !this._dateAdapter.sameDate(value, selection as unknown as DateRange<Date>))) {
        this._model.add(value);
      }

      this.selectionChanged.emit();
    }
  }

  /**
   * Register an input with this datepicker.
   * @param input The datepicker input to register with this datepicker.
   * @returns Selection model that the input should hook itself up to.
   */
  _registerInput(input: any): MatDateSelectionModel<DateRange<Date>, DateRange<Date>> {
    if (this._datepickerInput) {
      throw Error('A MatDatepicker can only be associated with a single input.');
    }
    this._inputStateChanges.unsubscribe();
    this._datepickerInput = input;
    this._inputStateChanges =
        input._stateChanges.subscribe(() => this._stateChanges.next(undefined));
    return this._model;
  }

}