import { Component, Optional, Inject } from "@angular/core";
import { DateAdapter } from "@angular/material/core";
import {
  DateRange,
  MatCalendarUserEvent,
  MatDateSelectionModel,
  MatDateRangeSelectionStrategy,
  MAT_DATE_RANGE_SELECTION_STRATEGY
} from "@angular/material/datepicker";

/** @title Datepicker open method */
@Component({
  selector: "datepicker-api-example",
  templateUrl: "datepicker-api-example.html",
  styleUrls: ["datepicker-api-example.scss"]
})
export class DatepickerApiExample {
  minDate: Date = new Date(2002, 7, 2);
  maxDate: Date = new Date(2022, 7, 20);

  options = [
    'Maximum',
    '1 Week',
    '1 Month',
    '2 Months',
    '1 Year',
    '2 Years',
  ]
}