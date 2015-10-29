
var DualDatepicker = function($el, objOptions) {

	this.$el = $el;

	this.options = $.extend({
		startDatepickerID: 'startDate',
		endDatepickerID: 'endDate',
		bindStartDateToEndDate: true,
		customEventName: 'DualDatepicker'
	}, objOptions || {});

	this.startID = this.options.startDatepickerID;
	this.endID = this.options.endDatepickerID;
	this.bindStartDate = this.options.bindStartDateToEndDate;

	this.$startDatepicker = this.$el.find('#' + this.options.startDatepickerID);
	this.$endDatepicker = this.$el.find('#' + this.options.endDatepickerID);

	this.initialize();

};

DualDatepicker.prototype = {

	initialize: function() {
		var self = this;
		var $startDatepicker = this.$startDatepicker;
		var $endDatepicker = this.$endDatepicker;

		var beforeShowDay = function(date) {
			var start = $startDatepicker.datepicker('getDate');
			var end = $endDatepicker.datepicker('getDate');
			var dpStart = Date.parse(start) / 1000;
			var dpEnd = Date.parse(end) / 1000;
			var dpDate = Date.parse(date) / 1000;
			var inputID = $(this).attr('id');

			if ( dpDate >= dpStart && dpDate <= dpEnd ) {
				return [true, 'ui-state-active', ''];
			} else {
				return [true, '', ''];
			}
		};

		var onSelect = function(date) {
			var start = $startDatepicker.datepicker('getDate');
			var end = $endDatepicker.datepicker('getDate');
			var startMo = (new Date(start)).getMonth();
			var endMo = (new Date(end)).getMonth();
			var position = (startMo === endMo) ? 0 : 1;
			$endDatepicker.datepicker('option', 'showCurrentAtPos', position);
		};

		this.$startDatepicker.datepicker({
			minDate: 0,
			maxDate: '+1y',
			defaultDate: '0',
			numberOfMonths: 2,
			showCurrentAtPos: 0,
			beforeShowDay: beforeShowDay,
			onSelect: onSelect,
			onClose: function(date) {
				$endDatepicker.datepicker('option', 'minDate', date);
			}
		});

		this.$endDatepicker.datepicker({
			minDate: 0,
			maxDate: '+1y',
			defaultDate: '+1d',
			numberOfMonths: 2,
			showCurrentAtPos: 0,
			beforeShowDay: beforeShowDay,
			onSelect: onSelect,
			onClose: function(date) {
				if (self.bindStartDate) {
					$startDatepicker.datepicker('option', 'maxDate', date);
				}
			}
		});

		// Set default date
		this.$startDatepicker.datepicker('setDate', '0');
		this.$endDatepicker.datepicker('setDate', '+1d');

		// blurring on focus to:
		// 1. Prevent visible blinking cursor through calendar on iOS.
		// 2. Remove "done" form control on iOS.
		// Note: this affects accessibility though, everything may change later
		this.$startDatepicker.on('focus', function() {
			self.$startDatepicker.blur();
		});
		this.$endDatepicker.on('focus', function() {
			self.$endDatepicker.blur();
		});

	}

};
