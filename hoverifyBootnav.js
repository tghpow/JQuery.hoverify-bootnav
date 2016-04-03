/**
 * hoverifyBootnav v1.0.0
 * Thibault Chazottes
 */

;(function($)
{
    $.fn.hoverifyBootnav = function(options)
    {
        // set options for the current el
        var el_options = $.extend({
            duration_effect_on : 200,
            duration_effect_off : 500,
            easing_effect_on : null,
            easing_effect_off : null,
            effect_mouse_hover: 'classic',
            effect_mouse_out: 'classic',
            background_color : null,
            color : null,
            //functions
            my_effect_mouse_hover : null,
            my_effect_mouse_out : null
        }, options);

        /**
         * ===================================================================================
         * = FEW MANIPULATIONS BEFORE REALLY INIT THE PLUGIN
         * ===================================================================================
         */

        if (this.length === 0) {
            return this;
        }

        // support multiple elements
        if (this.length > 1) {
            this.each(function() {
                $(this).hoverifyBootnav(options);
            });
            return this;
        }


        // set a reference to you hbn element
        var el = this;

        // Return if hbn is already initialized
        if ($(el).data('hoverboot')) { return; }

        //We dont support if there is no active li
        if(el.find('li.active').length == 0){
            return;
        }
        /**
         * ===================================================================================
         * = PRIVATE FUNCTIONS
         * ===================================================================================
         */

        var init = function(){
            //update current element's options
            check_options_data_attribute();
            //Create few html element need by hbn
            prepare_html();
            //Apply effect when catch hover event
            catch_mouse_hover();
        };

        /**
        * Add class to a element according to his type, determine design effect
        * @param {object} element - The element to  observ.
        */
        var hover_boot_detect_style_to_add_on_ul = function(element) {
            if( element.hasClass('nav-tabs') ){
                element.addClass('hoverboot-cadre');
            }else if( element.hasClass('nav-pills') ){
                element.addClass('hoverboot-pills');
            }else{
                element.addClass('hoverboot-pills');
            }
        };

        /**
         * Fews DOM's manipulations to prepare the script
         * Create the wrapper, the pill...etc
         */
        var prepare_html = function() {
            el.addClass('hoverboot');
            var li_active = el.find('li.active');

            //Add a wrapper
            el.wrap("<div class='hoverboot-wrap'></div>");
            var wraper_hb = el.closest('.hoverboot-wrap');

            //Create the pill
            wraper_hb.append("<div class='hoverboot-pill'></div>");
            var pill_hb = wraper_hb.find('.hoverboot-pill');

            //Set the background-color
            pill_hb.css('background-color',el_options.background_color);

            //Add class with the chosen effect
            hover_boot_detect_style_to_add_on_ul(el);

            //Initialize pill's css properties (width, height, position...)
            pill_hb.width(li_active.width());
            pill_hb.height(li_active.height());
            pill_hb.css({
                'left' : li_active.position().left,
                'top'  : li_active.position().top
            });
        };

        /**
         * Check if data attribute are use for overwrite
         */
        var check_options_data_attribute = function() {
            var data_hbn =  el.data('hbn-options');
            if(data_hbn){                
                el_options = $.extend(el_options, data_hbn);
            }
        };

        /**
         * Apply effect according to options
         */
        var catch_mouse_hover = function(){
            el.find('> li').hover(function () {
                if(el_options.my_effect_mouse_hover !== null){
                    el_options.my_effect_mouse_hover();
                }else {
                    switch (el_options.effect_mouse_hover) {
                        case "classic" :
                            mouse_hover_effect_classic($(this));
                            break;
                        case "teleportation" :
                            mouse_hover_effect_teleportation($(this));
                            break;
                        default:
                            mouse_hover_effect_classic($(this));
                    }
                }
            }, function () {
                if(el_options.my_effect_mouse_out !== null){
                    el_options.my_effect_mouse_out();
                }else {
                    switch (el_options.effect_mouse_out) {
                        case "classic" :
                            mouse_out_effect_classic($(this));
                            break;
                        case "teleportation" :
                            mouse_out_effect_teleportation($(this));
                            break;
                        default:
                            mouse_out_effect_classic($(this));
                    }
                }
            });
        };

        /**
         * ===================================================================================
         * = HOVERIFY BOOTNAV EFFECTS
         * ===================================================================================
         */

        /**
         * Apply classic effect on mouse hover
         * @param {object} li_to_watch - The <li> who is on hover
         * */
        var mouse_hover_effect_classic = function(li_to_watch) {
            var pill_hb = li_to_watch.closest('.hoverboot-wrap').find('.hoverboot-pill');

            pill_hb.stop().animate({
                width: li_to_watch.width(),
                left: li_to_watch.position().left,
                top: li_to_watch.position().top
            }, {
                duration: el_options.duration_effect_on,
                easing: el_options.easing_effect_on,
                complete: function () {
                    li_to_watch.find('> a').css('color', el_options.color);
                }
            });
        };

        /**
         * Apply classic effect on mouse out
         * @param {object} li_to_watch - The <li> who is on hover
         */
        var mouse_out_effect_classic = function(li_to_watch) {
            var pill_hb   = li_to_watch.closest('.hoverboot-wrap').find('.hoverboot-pill');
            var li_active = li_to_watch.closest('.hoverboot-wrap').find('ul>li.active');

            li_to_watch.find('> a').css('color','');

            pill_hb.stop().animate({
                width : li_active.width(),
                left  : li_active.position().left,
                top   : li_active.position().top
            }, {duration: el_options.duration_effect_off, easing: el_options.easing_effect_off});
        };

        /**
         * Apply teleportation effect on mouse hover
         * @param {object} li_to_watch - The <li> who is on hover
         */
        var mouse_hover_effect_teleportation = function(li_to_watch) {
            var pill_hb = li_to_watch.closest('.hoverboot-wrap').find('.hoverboot-pill');

            pill_hb.stop().animate({
                opacity: 0
            }, {
                duration: el_options.duration_effect_on / 2,
                complete: function () {
                    pill_hb.css({
                        top: li_to_watch.position().top,
                        width: 0,
                        left: li_to_watch.position().left + li_to_watch.width() / 2
                    });
                    pill_hb.animate({
                        opacity: 1,
                        width: li_to_watch.width(),
                        left: li_to_watch.position().left
                    }, {
                        duration: el_options.duration_effect_on / 2
                    });
                }
            });
        };

        /**
         * Apply teleportation effect on mouse out
         * @param {object} li_to_watch - The <li> who is on hover
         */
        var mouse_out_effect_teleportation = function(li_to_watch) {
            var pill_hb = li_to_watch.closest('.hoverboot-wrap').find('.hoverboot-pill');
            var li_active = li_to_watch.closest('.hoverboot-wrap').find('ul>li.active');

            li_to_watch.find('> a').css('color','');

            pill_hb.stop().animate({
                opacity: 0
            }, {
                duration: el_options.duration_effect_on/2,
                complete:  function() {
                    pill_hb.css({
                        opacity: 1,
                        width : 0,
                        left : li_active.position().left + li_active.width()/2,
                        top : li_active.position().top
                    });
                    pill_hb.animate({
                        opacity: 1,
                        left : li_active.position().left,
                        width : li_active.width()
                    }, {
                        duration: el_options.duration_effect_on/2
                    });
                }
            });
        };

         //Init script
        init();

        return this;
    };

    /**
     * Run hbn with data attribute
     */
    var run_hbn_with_data_attribute = function() {
        $('*[data-hbn]').each(function () {
            
            var options =  $(this).data('hbn-options');            
            $(this).hoverifyBootnav(options);
        });
    };

    //We need to run hbn with html data attribute?
    run_hbn_with_data_attribute();

})(jQuery);