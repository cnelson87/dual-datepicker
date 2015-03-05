
var DualDatepicker = function($el, objOptions) {

	this.$el = $el;

	this.options = $.extend({
		startDatepickerID: '#startDate',
		endDatepickerID: '#endDate',
		bindStartDateToEndDate: true
	}, objOptions || {});

	this.startID = this.options.startDatepickerID;
	this.endID = this.options.endDatepickerID;
	this.bindStartDate = this.options.bindStartDateToEndDate;

	this.$startDatepicker = this.$el.find('#' + this.options.startDatepickerID);
	this.$endDatepicker = this.$el.find('#' + this.options.endDatepickerID);

	this.initDOM();

};

DualDatepicker.prototype = {

/**
*	Private Methods
**/

	initDOM: function() {
		var self = this;
		var $startDatepicker = this.$startDatepicker;
		var $endDatepicker = this.$endDatepicker;

		this.$startDatepicker.datepicker({
			minDate: 0,
			maxDate: '+1y',
			defaultDate: '0',
			numberOfMonths: 2,
			showCurrentAtPos: 0,

			// 'Paint' td cells with active class
			beforeShowDay: function(date) {
				var start = $startDatepicker.val();
				var end = $endDatepicker.val();
				var inputID = $(this).attr('id');

				if ( Date.parse(date) < Date.parse(start) && inputID !== self.startID ) {
					return [false, '', ''];
				}
				else if ( Date.parse(date) >= Date.parse(start) && Date.parse(date) <= Date.parse(end) ) {
					return [true, 'ui-state-active', ''];
				} else {
					return [true, '', ''];
				}
			},
			onSelect: function(date) {
				var start = $startDatepicker.datepicker('getDate');
				var end = $endDatepicker.datepicker('getDate');
				var startMo = (new Date(start)).getMonth();
				var endMo = (new Date(end)).getMonth();
				var position = (startMo === endMo) ? 0 : 1;
				$endDatepicker.datepicker('option', 'showCurrentAtPos', position);
				$endDatepicker.datepicker('option', 'minDate', date);
			}
		});

		this.$endDatepicker.datepicker({
			minDate: 0,
			maxDate: '+1y',
			defaultDate: '+1d',
			numberOfMonths: 2,
			showCurrentAtPos: 0,

			// 'Paint' td cells with active class
			beforeShowDay: function(date) {
				var start = $startDatepicker.val();
				var end = $endDatepicker.val();
				var inputID = $(this).attr('id');

				if ( Date.parse(date) < Date.parse(start) && inputID !== self.startID ) {
					return [false, '', ''];
				}
				else if ( Date.parse(date) >= Date.parse(start) && Date.parse(date) <= Date.parse(end) ) {
					return [true, 'ui-state-active', ''];
				} else {
					return [true, '', ''];
				}
			},
			onSelect: function(date) {
				var start = $startDatepicker.datepicker('getDate');
				var end = $endDatepicker.datepicker('getDate');
				var startMo = (new Date(start)).getMonth();
				var endMo = (new Date(end)).getMonth();
				var position = (startMo === endMo) ? 0 : 1;
				$endDatepicker.datepicker('option', 'showCurrentAtPos', position);
				if (self.bindStartDate) {
					$startDatepicker.datepicker('option', 'maxDate', date);
				}
			}
		});

		// Set default date
		this.$startDatepicker.datepicker('setDate', '0');
		this.$endDatepicker.datepicker('setDate', '+1d');

		this.bindEvents();

	},

	bindEvents: function() {
		var self = this;

		this.$startDatepicker.on('focus', function() {
			self.$startDatepicker.blur();
		});
		this.$endDatepicker.on('focus', function() {
			self.$endDatepicker.blur();
		});

	},


/**
*	Event Handlers
**/

	__onActive: function(e) {

	},

	__onInactive: function(e) {

	},

	__onClick: function(e) {

	},


/**
*	Public API
**/

	updateUI: function() {


	},

	render: function() {

		return this.$el;
	}

};
