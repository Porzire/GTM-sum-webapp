"use strict";

// Store the MD5 for the previous request.
var pre_md5 = null;
// True if the result is ready for download.
var ready = false;

/* Create result table DOM element.
 *
 * @param cvs   The curriculum vitaes' name and content array.
 * @param sims  The similarities array.
 *
 * @return The table DOM element.
 */
var createResult = function(cvs, sims) {
    $tbody = $(document.createElement('tbody'));
    $table = $(document.createElement('table')).addClass('table').append(
                   $(document.createElement('thead')).append(
                           $(document.createElement('tr')).append(
                                   $(document.createElement('th')).html('Rank'),
                                   $(document.createElement('th')).html('File Name'),
                                   $(document.createElement('th')).html('Similarity'))), $tbody);
    // Sort and store the ranking in the sims_rank.
    var sims_rank = [];
    for (var i = 0; i < sims.length; i++)
        sims_rank[i] = [i, sims[i]];
    for (var i = 0; i < sims_rank.length; i++) {
        var max = i;
        for (var j = i + 1; j < sims_rank.length; j++) {
            if (sims_rank[j][1] > sims_rank[max][1]) {
                max = j;
            }
        }
        if (max !== i) {
            var temp = sims_rank[i];
            sims_rank[i] = sims_rank[max];
            sims_rank[max] = temp;
        }
    }
    // Append sorted information into table.
    for (var i = 0; i < sims_rank.length; i++) {
        $tbody.append($(document.createElement('tr')).append(
                              $(document.createElement('td')).html(i + 1),
                              $(document.createElement('td')).html(cvs[sims_rank[i][0]][0]),
                              $(document.createElement('td')).html(sims_rank[i][1])));
    }
    return $table;
};

/**
 * A event handler which disable the tag.
 */
var disableLink = function(evt){
    evt.preventDefault();
    return false;
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
        $('#summary-p').html('waiting for response..');
        ready = false;
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
                $('#summary-p').html(response['summaries'][0]);
                ready = true;
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
    // Disable the summary tab.
    $('#summary-tab').bind('click', disableLink);

    /**
     * Interval check.
     */
    setInterval(function(){
        if ($('#input-ta').val().length === 0) {
            if (!$('#summary-li').hasClass('disabled')) {
                $('#summary-li').addClass('disabled');
                $('#summary-tab').bind('click', disableLink);
            }
        } else {
            if ($('#summary-li').hasClass('disabled')) {
                $('#summary-li').removeClass('disabled');
                $('#summary-tab').unbind('click', disableLink);
            }
        }
        if (ready)
            $('#download-btn').removeAttr('disabled');
        else
            $('#download-btn').attr('disabled', 'disabled');
    }, 200);

    /**
     * Summary length options setting.
     */
    // Change output unit on select.
    $('.output-type').click(function(){
        var type = $(this).html();
        $('#output-type-label').html(type);
        if (type === 'percentage')
            $('#sum-slider-data').show(500);
        else
            $('#sum-slider-data').hide(500);
    });
    // Update percentage on slider position change.
    $('#sum-slider').on('slide', function(slideEvt) {
        $('#sum-num-in').val(slideEvt.value);
    });
    // Update slider position on value change.
    $('#sum-num-in').change(function() {
        $('#sum-slider').slider('setValue', Number($(this).val()));
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
    $('#summary-tab').click(compute);

    /**
     * Download summary.
     */
    $('#download-btn').click(function(){
        var output = $('#summary-p').html();
        var blob = new Blob([output], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "result.txt");
    });
});
