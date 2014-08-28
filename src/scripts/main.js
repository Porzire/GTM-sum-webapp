"use strict";

var HIDE_SLIDER = false;
var DEFAULT_CONTENT = //'';
        'BERLIN – SoundCloud said Thursday that it will start paying artists and record companies whose music is played on the popular streaming site, a move that will bring it in line with competitors such as YouTube and Spotify.\n' +
        'Berlin-based SoundCloud boasts some 175 million unique listeners a month, but so far those who upload tracks to the site haven’t received money. To fund the payments SoundCloud is introducing ads, the revenue from which will be shared with musicians and rights holders.\n' +
        '“This is something we’ve been wanting to get to ever since we started the company,” SoundCloud founder Alexander Ljung told The Associated Press. He said artists will be able to decide on which tracks the audio and display ads can appear, and initially only content played in the United States will be counted.\n' +
        'The program will start with 20 partners ranging from major record companies such as Sony/ATV and BMG to independent artists; eventually everyone will be able to join. Advertisers include Red Bull, Jaguar and Comedy Central.\n' +
        'Despite tying in record companies, SoundCloud has no plans to shift away from its support for new, original music, said Ljung. Instead, it hopes that young artists will see it as a way to start earning money with their music early on, he said.\n' +
        'Listening to music on SoundCloud is free. However, users who don’t want to see or hear the ads will be able to get a subscription that will remove them, he said.';
// Stopwords.
var DEFAULT_STOPWORDS = [
        'a', 'a\'s', 'able', 'about', 'above', 'according', 'accordingly',
        'across', 'actually', 'after', 'afterwards', 'again', 'against',
        'ain\'t', 'all', 'allow', 'allows', 'almost', 'alone', 'along',
        'already', 'also', 'although', 'always', 'am', 'among', 'amongst', 'an',
        'and', 'another', 'any', 'anybody', 'anyhow', 'anyone', 'anything',
        'anyway', 'anyways', 'anywhere', 'apart', 'appear', 'appreciate',
        'appropriate', 'are', 'aren\'t', 'around', 'as', 'aside', 'ask',
        'asking', 'associated', 'at', 'available', 'away', 'awfully', 'be',
        'became', 'because', 'become', 'becomes', 'becoming', 'been', 'before',
        'beforehand', 'behind', 'being', 'believe', 'below', 'beside', 'besides',
        'best', 'better', 'between', 'beyond', 'both', 'brief', 'but', 'by',
        'c\'mon', 'c\'s', 'came', 'can', 'can\'t', 'cannot', 'cant', 'cause',
        'causes', 'certain', 'certainly', 'changes', 'clearly', 'co', 'com',
        'come', 'comes', 'concerning', 'consequently', 'consider', 'considering',
        'contain', 'containing', 'contains', 'corresponding', 'could',
        'couldn\'t', 'course', 'currently', 'definitely', 'described', 'despite',
        'did', 'didn\'t', 'different', 'do', 'does', 'doesn\'t', 'doing',
        'don\'t', 'done', 'down', 'downwards', 'during', 'each', 'edu', 'eg',
        'eight', 'either', 'else', 'elsewhere', 'enough', 'entirely',
        'especially', 'et', 'etc', 'even', 'ever', 'every', 'everybody',
        'everyone', 'everything', 'everywhere', 'ex', 'exactly', 'example',
        'except', 'far', 'few', 'fifth', 'first', 'five', 'followed',
        'following', 'follows', 'for', 'former', 'formerly', 'forth', 'four',
        'from', 'further', 'furthermore', 'get', 'gets', 'getting', 'given',
        'gives', 'go', 'goes', 'going', 'gone', 'got', 'gotten', 'greetings',
        'had', 'hadn\'t', 'happens', 'hardly', 'has', 'hasn\'t', 'have',
        'haven\'t', 'having', 'he', 'he\'s', 'hello', 'help', 'hence', 'her',
        'here', 'here\'s', 'hereafter', 'hereby', 'herein', 'hereupon', 'hers',
        'herself', 'hi', 'him', 'himself', 'his', 'hither', 'hopefully', 'how',
        'howbeit', 'however', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'ie', 'if',
        'ignored', 'immediate', 'in', 'inasmuch', 'inc', 'indeed', 'indicate',
        'indicated', 'indicates', 'inner', 'insofar', 'instead', 'into',
        'inward', 'is', 'isn\'t', 'it', 'it\'d', 'it\'ll', 'it\'s', 'its',
        'itself', 'just', 'keep', 'keeps', 'kept', 'know', 'known', 'knows',
        'last', 'lately', 'later', 'latter', 'latterly', 'least', 'less', 'lest',
        'let', 'let\'s', 'like', 'liked', 'likely', 'little', 'look', 'looking',
        'looks', 'ltd', 'mainly', 'many', 'may', 'maybe', 'me', 'mean',
        'meanwhile', 'merely', 'might', 'more', 'moreover', 'most', 'mostly',
        'much', 'must', 'my', 'myself', 'name', 'namely', 'nd', 'near', 'nearly',
        'necessary', 'need', 'needs', 'neither', 'never', 'nevertheless', 'new',
        'next', 'nine', 'no', 'nobody', 'non', 'none', 'noone', 'nor',
        'normally', 'not', 'nothing', 'novel', 'now', 'nowhere', 'obviously',
        'of', 'off', 'often', 'oh', 'ok', 'okay', 'old', 'on', 'once', 'one',
        'ones', 'only', 'onto', 'or', 'other', 'others', 'otherwise', 'ought',
        'our', 'ours', 'ourselves', 'out', 'outside', 'over', 'overall', 'own',
        'particular', 'particularly', 'per', 'perhaps', 'placed', 'please',
        'plus', 'possible', 'presumably', 'probably', 'provides', 'que', 'quite',
        'qv', 'rather', 'rd', 're', 'really', 'reasonably', 'regarding',
        'regardless', 'regards', 'relatively', 'respectively', 'right', 'said',
        'same', 'saw', 'say', 'saying', 'says', 'second', 'secondly', 'see',
        'seeing', 'seem', 'seemed', 'seeming', 'seems', 'seen', 'self', 'selves',
        'sensible', 'sent', 'serious', 'seriously', 'seven', 'several', 'shall',
        'she', 'should', 'shouldn\'t', 'since', 'six', 'so', 'some', 'somebody',
        'somehow', 'someone', 'something', 'sometime', 'sometimes', 'somewhat',
        'somewhere', 'soon', 'sorry', 'specified', 'specify', 'specifying',
        'still', 'sub', 'such', 'sup', 'sure', 't\'s', 'take', 'taken', 'tell',
        'tends', 'th', 'than', 'thank', 'thanks', 'thanx', 'that', 'that\'s',
        'thats', 'the', 'their', 'theirs', 'them', 'themselves', 'then',
        'thence', 'there', 'there\'s', 'thereafter', 'thereby', 'therefore',
        'therein', 'theres', 'thereupon', 'these', 'they', 'they\'d', 'they\'ll',
        'they\'re', 'they\'ve', 'think', 'third', 'this', 'thorough',
        'thoroughly', 'those', 'though', 'three', 'through', 'throughout',
        'thru', 'thus', 'to', 'together', 'too', 'took', 'toward', 'towards',
        'tried', 'tries', 'truly', 'try', 'trying', 'twice', 'two', 'un',
        'under', 'unfortunately', 'unless', 'unlikely', 'until', 'unto', 'up',
        'upon', 'us', 'use', 'used', 'useful', 'uses', 'using', 'usually',
        'value', 'various', 'very', 'via', 'viz', 'vs', 'want', 'wants', 'was',
        'wasn\'t', 'way', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'welcome',
        'well', 'went', 'were', 'weren\'t', 'what', 'what\'s', 'whatever',
        'when', 'whence', 'whenever', 'where', 'where\'s', 'whereafter',
        'whereas', 'whereby', 'wherein', 'whereupon', 'wherever', 'whether',
        'which', 'while', 'whither', 'who', 'who\'s', 'whoever', 'whole', 'whom',
        'whose', 'why', 'will', 'willing', 'wish', 'with', 'within', 'without',
        'won\'t', 'wonder', 'would', 'wouldn\'t', 'yes', 'yet', 'you', 'you\'d',
        'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself',
        'yourselves', 'zero'
];
var stopwords = {};
for (var i in DEFAULT_STOPWORDS)
    stopwords[DEFAULT_STOPWORDS[i]] = true;

// Store the MD5 for the previous request.
var pre_md5 = null;

// Ready to compute new summary.
var ready = false;


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

/**
 * Reset the slider according to the current input text.
 */
var resetslider = function(){
    // Update the slider settings.
    var update = function(val, min, max){
        $('#sum-slider').slider('setAttribute', 'min', min);
        $('#sum-slider').slider('setAttribute', 'max', max);
        $('#sum-slider').slider('setValue', val);
    };
    var val = parseInt($('#sum-num-in').val());
    var input = $('#input-ta').val().trim();
    switch ($('#output-type-label').html()) {
        case 'percentage':
            update(val, 1, 100); break;
        case 'sentence':
            var max = sentences(input);
            update((val > max ? max : val), (max === 0 ? 0 : 1), max); break;
        case 'word':
            var max = words(input);
            update((val > max ? max : val), (max === 0 ? 0 : 1), max); break;
    }
};

/**
 * Highlight the sentences in the textarea.
 *
 * @param  $textarea  The textarea selector.
 * @param  sentences  The array of sentences to be highlighted.
 */
var highlight = function($textarea, sentences) {
    // Reset the highlighter.
    if ($textarea.data('highlighter') != null)
        $textarea.data('highlighter').destroy();
    $textarea.highlightTextarea({
        words: sentences,
        color: '#E6E6E6'
    });
};

// Last request.
var pre_response = null;
/**
 * Update the statistic display.
 */
var updateDisplay = function() {
    if (pre_response === null)
        return;
    var opt = $('#statistic-type-label').html(),
        sentences = [];
    // Copy the sentences for using by string.replace.
    for (var i in pre_response['sentences'])
        sentences.push(pre_response['sentences'][i].slice());
    if (opt !== 'Display') {
        // Format the number.
        var format = function(num){
            return num.toString().substring(0, 5);
        };

        // For word statistic display.
        var words = pre_response['words'],
            scores = pre_response['wordScores'],
            rank = $('#word-rank-cb').is(':checked'),
            score = $('#word-score-cb').is(':checked');
            stats = [];
        if (rank && score) {
            for (var i in words)
                stats.push('(' + (Number(i)+1) + ', ' + format(scores[i]) + ')');
        } else if (rank) {
            for (var i in words)
                stats.push('(' + (Number(i)+1) + ')');
        } else if (score) {
            for (var i in words)
                stats.push('(' + format(scores[i]) + ')');
        }
        if (stats.length > 0)
            for (var i in words)
                for (var j in sentences)
                    sentences[j]  = sentences[j].replace(new RegExp(words[i], 'g'),
                            '<span class="word-mark">' + words[i] + ' ' + stats[i] + '</span>');

        // For sentence statistic display.
        var scores = pre_response['sentenceScores'],
            rank = $('#sentence-rank-cb').is(':checked'),
            score = $('#sentence-score-cb').is(':checked'),
            stats = [];
        $('#summary-div').html(sentences.join(' '));
        // Display based on the options selected.
        if (rank && score) {
            // Sort the sentences.
            var sorted = [];
            for (var i in sentences)
                sorted.push([i, scores[i]]);
            sorted.sort(function(a, b){ return b[1] - a[1]; });
            stats = new Array(sorted.length);
            var rank = 1;
            for (var i in sorted) {
                stats[sorted[i][0]] = '(' + rank + ', ' + format(sorted[i][1]) + ')';
                rank += 1;
            }
        } else if (rank) {
            var sorted = [];
            for (var i in sentences)
                sorted.push([i, scores[i]]);
            sorted.sort(function(a, b){ return b[1] - a[1]; });
            stats = new Array(sorted.length);
            var rank = 1;
            for (var i in sorted) {
                stats[sorted[i][0]] = '(' + rank + ')';
                rank += 1;
            }
        } else if (score) {
            for (var i in sentences)
                stats.push('(' + format(scores[i]) + ')');
        }
        var sb = '';
        if (stats.length > 0)
            for (var i in sentences)
                sb += sentences[i].substring(0, sentences[i].length - 1) + ' <mark class="sentence-mark">' + stats[i] + '</mark>. ';
        else
            sb += sentences.join(' ')
        sb = sb.trim();

        $('#summary-div').html(sb);
    } else {
        $('#summary-div').html(sentences.join(' '));
    }
};

var pre_originalOrder = [];

/**
 * Compute summary.
 */
var compute = function(){
    var unit = $('#output-type-label').html();
    if (unit === 'sentences' || unit === 'words')
        unit = unit.substring(0, unit.length - 1);
    var request = {
            'text'     : $('#input-ta').val(),
            'size'     : parseInt($('#sum-num-in').val()),
            'stopwords': Object.keys(stopwords),
            'unit'     : unit,
            'detail'   : true
    };
    var md5 = MD5(JSON.stringify(request));
    if (md5 !== pre_md5) {
        $('#summarize-btn').html('Summarizing...');
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
                console.log(response);
                var sentences = response['sentences'];
                $('#summarize-btn').html('Summarize');
                highlight($('#input-ta'), sentences);
                $('#summary-div').html(sentences.join(' '));
                pre_response = response;
                updateDisplay();
            }
        });
    }
    pre_md5 = md5;
};

/**
 * Interval check and update.
 */
var prevLen = 0;
var prevInput = '';
setInterval(function(){
    // Update the slider while length value still get focus.
    resetslider();
    // Update the summary while changing the slider.
    var len = $('#sum-slider').slider('getValue');
    if (prevLen === len && ready)
        compute();
    prevLen = len;
    // Once input changes, clean the current summary and aviod the auto-update.
    var input = $('#input-ta').val().trim();
    if (input !== prevInput) {
        $('#summary-div').html('');
        $('#summarize-btn').show();
        ready = false;
    }
    prevInput = input;
}, 300);

$(function(){

    //--------------------------- General settings ---------------------------\\

    /**
     * Initialize the application.
     */
    // Initialize slider.
    $('#sum-slider').slider({ tooltip: 'hide' });
    $('#sum-num-in').val($('#sum-slider').slider('getValue'));
    $('#statistic-slider').slider({ tooltip: 'hide' });
    $('#statistic-slider-data').hide();
    // Initialize stopword Panel.
    var stopword_list = '';
    for (var stopword in stopwords)
        stopword_list += stopword + '\n';
    stopword_list.substring(0, stopword_list.length - 1);
    $('#stopword-ta').val(stopword_list);
    // Preload context.
    $('#input-ta').val(DEFAULT_CONTENT);

    /**
     * Setting buttons.
     */
    // Close button.
    $('.setting-close-btn').click(function(){
        // Reset stopword Panel.
        var stopword_list = '';
        for (var stopword in stopwords)
            stopword_list += stopword + '\n';
        stopword_list.substring(0, stopword_list.length - 1);
        $('#stopword-ta').val(stopword_list);
    });
    // OK button.
    $('#setting-ok-btn').click(function(){
        // Update stopword.
        var list = $('#stopword-ta').val().split('\n');
        stopwords = {};
        for (var i = 0; i < list.length; i++)
            stopwords[list[i]] = true;
    });

    //---------------------------- Original Panel ----------------------------\\

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

    //----------------------------- Result Panel -----------------------------\\

    $('#original-order-a').click(function(){
        if (pre_originalOrder.length !== 0) {
            var orderedSentence = [],
                orderedScores = [];
            for (var i in pre_originalOrder) {
                var index = pre_originalOrder[i];
                orderedSentence.push(pre_response['sentences'][index]);
                orderedScores.push(pre_response['sentenceScores'][index]);
            }
            pre_originalOrder = [];
            // Update the pre_response.
            pre_response['sentences'] = orderedSentence;
            pre_response['sentenceScores'] = orderedScores;
            // Update the summary.
            updateDisplay();
        }
    });

    $('#ranked-order-a').click(function(){
        if (pre_originalOrder.length === 0) {
            var sorted = [];
            for (var i in pre_response['sentences'])
                sorted.push([i, pre_response['sentenceScores'][i]]);
            sorted.sort(function(a, b){ return b[1] - a[1]; });
            var orderedSentence = [],
                orderedScores = [];
            for (var i in sorted) {
                var index = sorted[i][0];
                orderedSentence.push(pre_response['sentences'][index]);
                orderedScores.push(sorted[i][1]);
                pre_originalOrder.push(index);
            }
            // Update the pre_response.
            pre_response['sentences'] = orderedSentence;
            pre_response['sentenceScores'] = orderedScores;
            // Update the summary.
            updateDisplay();
        }
    });

    /**
     * Result panel tablist.
     */
    $('#result-opts').click(function(){
        // Update label for the tab change.
        $('#result-tablab').html($(this).children('a').html());
        // Disable the 'active' status for the previous selection.
        // NOTE: the current selection is activated by the 'data-toggle="tab"'
        //       mark up in the html.
        $('#result-tablist').find('li[class="active"]').removeClass('active');
    });

    /**
     * Download summary.
     */
    $('#download-btn').click(function(){
        var output = pre_response['sentences'].join(' ');
        var blob = new Blob([output], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "result.txt");
    });


    //---------------------------- Control Panel -----------------------------\\

    /**
     * Compute once summary is requested.
     */
    $('#summarize-btn').click(function(){
        compute();
        ready = true;
        $(this).hide();
    });

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
    // Hide slider for PC browsers.
    if (HIDE_SLIDER) {
    // if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('#sum-slider-data').hide();
        $('#sum-num-in').on('focus', function(){
            $('#sum-slider-data').fadeIn(500);
        });
        $('textarea, button[id!="output-type-btn"], input[type=file]').on('focus', function() {
            $('#sum-slider-data').delay(200).fadeOut(500);
        });
    }
    // Change the output type.
    $('.output-type').click(function(){
        // Highlight the current selection.
        $(this).parent().parent().find('.active').removeClass('active');
        $(this).parent().addClass('active');
        // Update the value and slider
        var label = $(this).html();
        var curr_type = (label === 'percentage'
                ? label : label.substring(0, label.length - 1));
        var pre_type = $('#output-type-label').html();
        if (curr_type !== pre_type) {
            $('#output-type-label').html(curr_type);
            var val = $('#sum-slider').slider('getValue');
            var input = $('#input-ta').val().trim();
            var change = pre_type.charAt(0).concat('->', curr_type.charAt(0));
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
            $('#sum-num-in').val((val === 0 ? 1 : val));
            resetslider();
        }
    });

    /**
     * Option panels.
     */
    $('.statistic-type').click(function(){
        $('#statistic-opt-list').children('.active').removeClass('active');
        var opt = $(this).html();
        if (opt === 'hide statistic') {
            $('#statistic-type-label').html('Display');
            updateDisplay();
        } else
            $('#statistic-type-label').html(opt);
        if (opt === 'top word')
            $('#statistic-slider-data').fadeIn(200);
        else
            $('#statistic-slider-data').fadeOut(200);
    });

    $('#word-rank-cb, #word-score-cb, #sentence-rank-cb, #sentence-score-cb').click(function(){
        updateDisplay();
    });
});
