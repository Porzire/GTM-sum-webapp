"use strict";

// Store the MD5 for the previous request.
var pre_md5 = null;

/**
 * Count the number of tokens in the given string.
 */
var words = function(string){
    return string.split(/\s+/gi).length;
};

/**
 * Count the number of sentences in the given string.
 */
var sentences = function(string){
    return string.split(/[.|!|?]\s/gi).length;
};

/**
 * Get current unit type.
 */
var type = function(){
    var label = $('#output-type-label').html();
    return (label === 'percentage' ? label : label.substring(0, label.length - 1));
};

var resetSilder = function(val, min, max){
    $('#sum-slider').slider('setAttribute', 'min', min);
    $('#sum-slider').slider('setAttribute', 'max', max);
    $('#sum-slider').slider('setValue', val);
};

/**
 * Compute summary.
 */
var compute = function(){
    var unit = $('#output-type-label').html();
    if (unit === 'sentences' || unit === 'words')
        unit = unit.substring(0, unit.length - 1);
    var request = {
            'texts': [$('#input-ta').val()],
            'size' : parseInt($('#sum-num-in').val()),
            'unit' : unit
    };
    var md5 = MD5(JSON.stringify(request));
    if (md5 !== pre_md5) {
        $('#summarize-btn').html('Summarizing...');
        // $('#summary-ta').val(JSON.stringify(request));
        // $('#summary-ta').val(tokens($('#input-ta').val()) + '\n'
        //         + sentences($('#input-ta').val()));
        // Ajax call for summarization.
        $.ajax({
            type: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            dataType: 'json',
            crossDomain: true,
            url: 'http://jiemei.cs.dal.ca:8080/gtm-api/services/sum',
            data: JSON.stringify(request),
            success: function(response) {
                $('#summary-ta').val(response['summaries'][0]);
                $('#summarize-btn').html('Summarize');
            }
        });
    }
    pre_md5 = md5;
};

$(function(){

    /**
     * Initialize the application.
     */
    // Initialize silder.
    $('#sum-slider').slider({ tooltip: 'hide' });
    $('#sum-num-in').val($('#sum-slider').slider('getValue'));
    $('#sum-slider-data').hide();

    /**
     * Interval check and update.
     */
    setInterval(function(){
    }, 200);

    /**
     * Summary length options setting.
     */
    // Update percentage on slider position change.
    $('#sum-slider').on('slide', function(slideEvt){
        $('#sum-num-in').val(slideEvt.value);
    });
    // Update slider position on value change.
    $('#sum-num-in').change(function() {
        $('#sum-slider').slider('setValue', Number($(this).val()));
    });
    // Enable slider for PC browsers.
    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('#sum-num-in').on('focus', function(){
            $('#sum-slider-data').fadeIn(500);
        });
        $('textarea, button[id!="output-type-btn"], input[type=file]').on('focus', function() {
            $('#sum-slider-data').delay(200).fadeOut(500);
        });
    }
    // Change the output type.
    $('.output-type').click(function(){
        var label = $(this).html();
        var curr_type = (label === 'percentage'
                ? label : label.substring(0, label.length - 1));
        var pre_type = type();
        if (curr_type !== pre_type) {
            $('#output-type-label').html(curr_type);
            var val = $('#sum-slider').slider('getValue');
            var input = $('#input-ta').val().trim();
            var change = pre_type.charAt(0).concat('->', curr_type.charAt(0));
            alert(val + ' ' + input + ' ' + change);
            switch (change) {
                case 'p->s':
                    val = parseInt(val / 100 * sentences(input)); break;
                case 'p->w':
                    val = parseInt(val / 100 * words(input)); break;
                case 's->p':
                    val = parseInt(val / sentences(input) * 100); break;
                case 's->w':
                    val = parseInt(val / sentences(input) * words(input)); break;
                case 'w->p':
                    val = parseInt(val / words(input) * 100); break;
                case 'w->s':
                    val = parseInt(val / words(input) * sentences(input)); break;
            }
            switch (curr_type) {
                case 'percentage':
                    resetSilder(val, 1, 100); break;
                case 'sentence':
                    var max = sentences(input);
                    resetSilder(val, (max === 0 ? 0 : 1), max); break;
                case 'word':
                    var max = words(input);
                    resetSilder(val, (max === 0 ? 0 : 1), max); break;
            }
            $('#sum-num-in').val((val === 0 ? 1 : val));
        }
    });

    /**
     * Read the content of input file into textarea.
     */
    $('#input-fi').change(function(){
        var files = !!this.files ? this.files : [];
        if (!files.length) { return; }
        var reader = new FileReader();
        reader.readAsText(files[0]);
        reader.onloadend = function(evt) {
            if (evt.target.readyState = FileReader.DONE) {
                $('#input-ta').val(evt.target.result);
            }
        }
    });

    /**
     * Compute once summary is requested.
     */
    $('#summarize-btn').click(compute);

    /**
     * Download summary.
     */
    $('#download-btn').click(function(){
        var output = $('#summary-p').html();
        var blob = new Blob([output], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "result.txt");
    });
});
