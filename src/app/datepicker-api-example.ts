import { Component, Optional, Inject, ViewChild } from "@angular/core";
import { DateAdapter } from "@angular/material/core";
import {
  DateRange,
  MatCalendarUserEvent,
  MatDateSelectionModel,
  MatDateRangeSelectionStrategy,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
MatStartDate, MatEndDate, MatDateRangeInput
} from "@angular/material/datepicker";
// https://github.com/palantir/blueprint/issues/959#issuecomment-465063930
import moment from 'moment';
import { MatSelectionList } from "@angular/material/list";

/** @title Datepicker open method */
@Component({
  selector: "datepicker-api-example",
  templateUrl: "datepicker-api-example.html",
  styleUrls: ["datepicker-api-example.scss"]
})
export class DatepickerApiExample {
  minDate: Date = new Date(2002, 7, 2);
  maxDate: Date = new Date(2022, 7, 20);
  selected: DateRange<Date>;
  startAt: moment.Moment = moment(new Date(2020, 7, 10));

  @ViewChild(MatSelectionList) selectionList: MatSelectionList;
  @ViewChild(MatStartDate) startDate: MatStartDate<any>;
  @ViewChild(MatEndDate) endDate: MatEndDate<any>;
  @ViewChild(MatDateRangeInput) dateRangeInput: MatDateRangeInput<any>;

  options = [
    'Maximum',
    '1 Week',
    '1 Month',
    '2 Months',
    '1 Year',
    '2 Years',
  ];

  select(index: number) {
    let item = this.options[index];
    const end = new Date(Date.now());
    let start = moment();
    switch (index) {
      case 0:
        start = moment("1950-01-01 0:00", "YYYY-MM-DD HH:mm");
        break;
      case 1:
        start = moment().subtract(1, 'weeks');
        break;
      case 2:
        start = moment().subtract(1, 'months');
        break;
      case 3:
        start = moment().subtract(2, 'months');
        break;
      case 4:
        start = moment().subtract(1, 'years');
        break;
      case 5:
        start = moment().subtract(2, 'years');
        break;
    }
      
    this.selected = new DateRange(start.toDate(), end);
  }

  selectionChanged(): void {
    if (this.selectionList) {
      this.selectionList.deselectAll();
    }
  }
}