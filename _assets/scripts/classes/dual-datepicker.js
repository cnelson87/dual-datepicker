
var DualDatepicker = function($el, objOptions) {

	// defaults
	this.$el = $el;
	this.options = $.extend({
		selectorStartDatepicker: '.start-date',
		selectorEndDatepicker: '.end-date',
		bindEndDateToStartDate: true,	//end date can't be before start date
		bindStartDateToEndDate: false,	//start date can't be after end date
		minimumDateDiff: 7,				//min num of days between start and end dates
		customEventName: 'DualDatepicker'
	}, objOptions || {});

	// element references
	this.$startDatepicker = this.$el.find(this.options.selectorStartDatepicker);
	this.$endDatepicker = this.$el.find(this.options.selectorEndDatepicker);

	// setup & properties
	// this.startID = this.$startDatepicker.attr('id');
	// this.endID = this.$endDatepicker.attr('id');
	// this.bindEndDate = this.options.bindEndDateToStartDate;
	// this.bindStartDate = this.options.bindStartDateToEndDate;

	this.$startDatepicker.prop('readonly', true);
	this.$startDatepicker.attr('readonly', 'readonly');
	this.$endDatepicker.prop('readonly', true);
	this.$endDatepicker.attr('readonly', 'readonly');

	this.initialize();

};

DualDatepicker.prototype = {

	initialize: function() {
		var self = this;
		var $startDatepicker = this.$startDatepicker;
		var $endDatepicker = this.$endDatepicker;
		var bindEndDate = this.options.bindEndDateToStartDate;
		var bindStartDate = this.options.bindStartDateToEndDate;
		var minimumDays = this.options.minimumDateDiff;

		var beforeShowDay = function(date) {
			var start = $startDatepicker.datepicker('getDate');
			var end = $endDatepicker.datepicker('getDate');
			var dpStart = Date.parse(start);// / 1000;
			var dpEnd = Date.parse(end);// / 1000;
			var dpDate = Date.parse(date);// / 1000;
			var data = ( dpDate >= dpStart && dpDate <= dpEnd ) ? [true, 'ui-state-active', ''] : [true, '', ''];
			return data;
		};

		$startDatepicker.datepicker({
			minDate: 0,
			maxDate: '+1y',
			defaultDate: '0',
			numberOfMonths: 2,//[ 2, 1 ],
			beforeShowDay: beforeShowDay,
			onSelect: function(dt) {
				var date = $startDatepicker.datepicker('getDate');
				date.setDate(date.getDate() + minimumDays);
				if (bindEndDate) {
					$endDatepicker.datepicker('option', 'minDate', date);
				}
			}
		});

		$endDatepicker.datepicker({
			minDate: 0,
			maxDate: '+1y',
			defaultDate: '0',
			numberOfMonths: 2,//[ 2, 1 ],
			beforeShowDay: beforeShowDay,
			onSelect: function(dt) {
				var date = $endDatepicker.datepicker('getDate');
				date.setDate(date.getDate() - minimumDays);
				if (bindStartDate) {
					$startDatepicker.datepicker('option', 'maxDate', date);
				}
			}
		});

		// Set default date
		$startDatepicker.datepicker('setDate', '0');
		$endDatepicker.datepicker('setDate', '+'+minimumDays+'d');

		// blurring on focus to:
		// 1. Prevent visible blinking cursor through calendar on iOS.
		// 2. Remove "done" form control on iOS.
		// Note: may affect accessibility, may need to revisit
		$startDatepicker.on('focus', function() {
			self.$startDatepicker.blur();
		});
		$endDatepicker.on('focus', function() {
			self.$endDatepicker.blur();
		});

	}

};
