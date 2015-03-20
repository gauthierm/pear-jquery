/*!
 * jQuery UI silverorange Augmentations
 *
 * Copyright jQuery Foundation and other contributors
 * Copyright silverorange Inc.
 *
 * Released under the MIT license.
 * http://jquery.org/license
 */

/**
 * Add option to date picker to not hide on selecting a date value.
 */
$.datepicker._defaults.hideOnSelect = true;

/**
 * Add option to date picker  to select today when using the today button.
 */
$.datepicker._defaults.selectOnToday = false;

/**
 * Monkey-patch the datepicker object to use the new hideOnSelect property when
 * selecting a date.
 */
$.datepicker._selectDate = function(id, dateStr) {
	var onSelect,
		hideOnSelect,
		target = $(id),
		inst = this._getInst(target[0]);

	dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
	if (inst.input) {
		inst.input.val(dateStr);
	}
	this._updateAlternate(inst);

	onSelect = this._get(inst, "onSelect");
	if (onSelect) {
		onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
	} else if (inst.input) {
		inst.input.trigger("change"); // fire the change event
	}

	hideOnSelect = this._get(inst, "hideOnSelect");

	if (inst.inline || !hideOnSelect){
		this._updateDatepicker(inst);
	} else {
		this._hideDatepicker();
		this._lastInput = inst.input[0];
		if (typeof(inst.input[0]) !== "object") {
			inst.input.focus(); // restore focus
		}
		this._lastInput = null;
	}
};

/**
 * Monkey-patch the datepicker object to make the "Today" button select the
 * date as well as navigate to it.
 */
$.datepicker._gotoToday = function(id) {
	var selectOnToday,
		gotoCurrent,
		date,
		target = $(id),
		inst = this._getInst(target[0]);

	selectOnToday = this._get(inst, "selectOnToday");
	gotoCurrent = this._get(inst, "gotoCurrent");

	if (gotoCurrent && inst.currentDay) {
		inst.selectedDay = inst.currentDay;
		inst.drawMonth = inst.selectedMonth = inst.currentMonth;
		inst.drawYear = inst.selectedYear = inst.currentYear;
	} else {
		date = new Date();
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
	}
	this._notifyChange(inst);
	this._adjustDate(target);

	if (selectOnToday && (!gotoCurrent || !inst.currentDay)) {
		inst.currentDay = inst.selectedDay;
		inst.currentMonth = inst.selectedMonth;
		inst.currentYear = inst.selectedYear;
		this._selectDate(
			id,
			this._formatDate(
				inst,
				inst.currentDay,
				inst.currentMonth,
				inst.currentYear
			)
		);
	}
};
