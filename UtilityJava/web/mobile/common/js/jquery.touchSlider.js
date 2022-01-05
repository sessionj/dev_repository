
jQuery.fn.touchSlider = function (settings) {
	
	settings = jQuery.extend({
		roll : true,
		flexible : false,
		btn_prev : false,
		btn_next : false,
		speed : 75,
		view : 1,
		range : 0.15,
		counter : false
	}, settings);
	
	var opts = [];
	opts = $.extend({}, $.fn.touchSlider.defaults, settings);
	
	return this.each(function () {
		var _this = this;
		
		this.opts = opts;
		this._view = this.opts.view;
		this._speed = this.opts.speed;
		this._tg = $(this);
		this._list = this._tg.children().children();
		this._width = parseInt(this._tg.css("width"));
		this._item_w = parseInt(this._list.css("width"));
		this._len = this._list.length;
		this._range = this.opts.range * this._width;
		this._pos = [];
		this._start = [];
		this._startX = 0;
		this._left = 0;
		this._drag = true;
		this._btn_prev;
		this._btn_next;
		
		ts_init(this);
		
		this._tg
		.bind("touchstart", ts_touchstart)
		.bind("touchmove", ts_touchmove)
		.bind("touchend", ts_touchend)
		
		$(window).bind("orientationchange resize", function () {
			ts_resize(_this);
		});
	});
}

function ts_init (e) {	
	$(e).children().css({
		"width":e._width + "px",
		"overflow":"visible"
	});
	
	if(e.opts.flexible) e._item_w = e._width / e._view;
	if(e.opts.roll) e._len = Math.ceil(e._len / e._view) * e._view;
	
	for(var i=0; i<e._len; ++i) {
		e._pos[i] = e._item_w * i;
		e._start[i] = e._pos[i];
		e._list.eq(i).css({
			"float" : "none",
			"display" : "block",
			"position" : "absolute",
			"top" : "0",
			"left" : e._pos[i] + "px",
			"width" : e._item_w + "px"
		});
	}
	
	if(e.opts.btn_prev && e.opts.btn_next) {
		e.opts.btn_prev.bind("click", function() {
			ts_animate(e, 1, true);
			return false;
		})
		e.opts.btn_next.bind("click", function() {
			ts_animate(e, -1, true);
			return false;
		});
	}
	
	ts_counter(e);
};

function ts_resize (e) {
	if(e.opts.flexible) {
		var tmp_w = e._item_w;
		
		e._width = parseInt(e._tg.css("width"));
		e._item_w = e._width / e._view;
		e._range = e.opts.range * e._width;
		
		for(var i=0; i<e._len; ++i) {
			e._pos[i] = e._pos[i] / tmp_w * e._item_w;
			e._list.eq(i).css({
				"left" : e._pos[i] + "px",
				"width" : e._item_w + "px"
			});
		}
	}
};

function ts_touchstart (e) {
	this._startX = e.originalEvent.touches[0].pageX;
	
	this._start = [];
	for(var i=0; i<this._len; ++i) {
		this._start[i] = this._pos[i];
	}
};

function ts_touchmove (e) {
	this._left = e.originalEvent.touches[0].pageX - this._startX;
	
	if(Math.abs(this._left) > 15) e.preventDefault();
	
	ts_position(this, e);
	
	for(var i=0; i<this._len; ++i) {
		var tmp = this._start[i] + this._left;
		this._list.eq(i).css("left", tmp + "px");
		this._pos[i] = tmp;
	}
	
	this._drag = true;
};

function ts_touchend (e) {
	ts_animate(this, ts_direction(this));
	this._drag = false;
};

function ts_position (t, d) {
	var gap = t._view * t._item_w;
	
	if(d == -1 || d == 1) {
		t._startX = 0;
		t._start = [];
		for(var i=0; i<t._len; ++i) {
			t._start[i] = t._pos[i];
		}
		t._left = d * gap;
	} else {
		if(t._left > gap) t._left = gap;
		if(t._left < - gap) t._left = - gap;
	}
	
	if(t.opts.roll) {
		var tmp_pos = [];
		for(var i=0; i<t._len; ++i) {
			tmp_pos[i] = t._pos[i];
		}
		tmp_pos.sort(function(a,b){return a-b;});
		
		var max_chk = tmp_pos[t._len-t._view];
		var p_min = t._pos.indexOf(tmp_pos[0]);
		var p_max = t._pos.indexOf(max_chk);
		
		if(t._view <= 1) max_chk = t._len - 1;
		
		if(d == 1 || tmp_pos[0] > 0) {
			for(var i=0; i<t._view; ++i, ++p_min, ++p_max) {
				t._start[p_max] = t._start[p_min] - gap;
			}
		} else if(d == -1 || tmp_pos[max_chk] <= 0) {
			for(var i=0; i<t._view; ++i, ++p_min, ++p_max) {
				t._start[p_min] = t._start[p_max] + gap;
			}
		}
	} else {
		var last_p = parseInt((t._len - 1) / t._view) * t._view;
		if(	(t._start[0] == 0 && t._left > 0) || (t._start[last_p] == 0 && t._left < 0) ) t._left = 0;
	}
};

function ts_animate (t, d, btn_click) {
	if(t._drag || btn_click) {
		if(btn_click) ts_position(t, d);
		
		var gap = d * (t._item_w * t._view);
		if(t._left == 0) gap = 0;
		
		for(var i=0; i<t._len; ++i) {
			t._pos[i] = t._start[i] + gap;
			t._list.eq(i).animate({"left": t._pos[i] + "px"}, t._speed);
		}
		
		ts_counter(t);
	}
}

function ts_direction (t) {
	var r = 0;
	
	if(t._left < -(t._range)) r = -1;
	else if(t._left > t._range) r = 1;
	
	return r;
};

function ts_counter (e) {
	if(typeof(e.opts.counter) == "function") {
		var param = {
			total : Math.ceil(e._len / e._view),
			current : (e._pos.indexOf(0) / e._view) + 1
		};
		e.opts.counter(param);
	}
};