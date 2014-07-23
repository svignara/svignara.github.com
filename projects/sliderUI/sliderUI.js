(function($){

    $.fn.sliderUI = function( options ){

        var opts = $.extend({
            minValue : 0,
            maxValue : 100000,
            increments : 1
        }, options);

        return this.each(function(){

            //Global Var Declarations

            var sliderInput = $(this),
                inputVal = sliderInput.val(),
                sliderBar = sliderInput.next(),
                sliderMover = sliderBar.children(':first-child'),
                sliderBarWidth = sliderBar.width() - 20,
                sliderBarOffset = sliderBar[0].offsetLeft,
                inc = ( opts.maxValue - opts.minValue ) / opts.increments,
                steps = sliderBarWidth / inc;

            //--end of Global Var Declarations

            var slide = {

                init : function(){

                    this.sliderMoverListener();
                    this.sliderBarListener();
                    this.inputValListener();
                    this.formatValue(opts.minValue, false);

                },

                sliderMoverListener : function(){

                    sliderMover.on('click', function(evt){

                        evt.preventDefault();

                    });

                },

                sliderBarListener : function(){

                    var self = this;
                    var leftPos;

                    sliderBar.on('mousedown', function(evt){

                        leftPos = (evt.clientX - sliderBarOffset) - 10;
                        leftPos = (leftPos < 0) ? 0 : leftPos;
                        leftPos = (leftPos > sliderBarWidth) ? sliderBarWidth : leftPos;

                        sliderMover.css('left', leftPos + 'px');

                        self.updateValue(leftPos);

                        self.bodySlideListener();

                    }).on('mouseup', function(evt){

                        leftPos = (evt.clientX - sliderBarOffset) - 10;
                        leftPos = (leftPos < 0) ? 0 : leftPos;
                        leftPos = (leftPos > sliderBarWidth) ? sliderBarWidth : leftPos;

                        sliderMover.css('left', leftPos + 'px');

                        self.updateValue(leftPos);
                        self.updateFinalPos(leftPos);

                    });

                },

                bodySlideListener : function(){

                    var self = this;
                    var leftPos;

                    $('body').on('mousemove.bodySlide', function(evt){

                        leftPos = evt.clientX - sliderBarOffset;
                        leftPos = (leftPos < 0) ? 0 : leftPos;
                        leftPos = (leftPos > sliderBarWidth) ? sliderBarWidth : leftPos;

                        sliderMover.css('left', leftPos + 'px');

                        self.updateValue(leftPos);

                    }).on('mouseup.bodySlide', function(evt){

                        $('body').off('.bodySlide');

                        self.updateFinalPos(leftPos);

                    }).on('mouseleave.bodySlide', function(evt){

                        $('body').off('.bodySlide');

                        self.updateFinalPos(leftPos);

                    });

                },

                updateValue : function(leftPos){

                    var self = this;
                    var newVal = opts.increments * Math.round(leftPos / steps);

                    self.formatValue(newVal, false);

                },

                updateFinalPos : function(leftPos){

                    var factor = Math.round(leftPos / steps),
                        finalPos = factor * steps;

                    sliderMover.css('left', finalPos + 'px');

                },

                inputValListener : function(){

                    var self = this;

                    sliderInput.on('keyup', function(evt){

                        var code = (evt.keyCode || evt.which);

                        if(code == 37 || code == 38 || code == 39 || code == 40) {
                            return;
                        }

                        self.formatValue(this.value, true);

                    });

                },

                formatValue : function(val, updateSlider){

                    var self = this;

                    var numberVal = (typeof val === 'string') ? parseInt(val.replace(/\D/g, ""), 10) : val,
                        stringVal = '';

                    numberVal = ( isNaN(numberVal) ) ? opts.minValue : numberVal;
                    numberVal = ( numberVal > opts.maxValue ) ? opts.maxValue : numberVal;

                    stringVal = numberVal.toLocaleString('en');

                    sliderInput.val('$' + stringVal);

                    if (updateSlider){
                        self.updateSliderWithVal(numberVal);
                    }

                },

                updateSliderWithVal : function(val){

                    var sliderPos = val * steps;

                    sliderMover.css('left', sliderPos + 'px');

                }

            }

            slide.init();

        });

    }

    $('.slider-input').sliderUI();

}(window.jQuery));