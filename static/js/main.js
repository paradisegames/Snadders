/*!
 * main js
hi
test
 */

$(document).ready(function () {
    console.log("document loaded");
});

$(window).on("load", function () {
    console.log("window loaded test1");
});

$(document).ready(function () {
    $(window).on('resize', function () {
        //$('.hh').height( $('.hh').width() );
        var cell_height = ((($('.main-bg').height())-20)/ 10);
        //$('.hh').width(cell_width);
        $('.hh').height(cell_height);
    }).trigger('resize');
});


// dice script


