$(document).ready(function() {
    $('.event-card').each(function(index) {
        // Store both the original parent and the index within the parent
        $(this).data({
            'originalParent': $(this).parent(),
            'originalIndex': $(this).index() // Store the original index within the parent
        });
    });

    $('.event-card').click(function(e) {
        e.stopPropagation(); // Prevent the document click handler from firing

        var wasExpanded = $(this).hasClass('expanded');
        var contentWrapper = $('.content-wrapper');

        // Collapse any previously expanded card and remove blur
        $('.event-card.expanded').not(this).each(function() {
            var originalParent = $(this).data('originalParent');
            var originalIndex = $(this).data('originalIndex');
            // Place the card back in its original position
            if (originalIndex >= originalParent.children().length) {
                originalParent.append($(this));
            } else {
                originalParent.children().eq(originalIndex).before($(this));
            }
            $(this).removeClass('expanded').find('.more-info').slideUp();
        });

        // Remove blurred class if no expanded card left
        if ($('.event-card.expanded').length === 0) {
            contentWrapper.removeClass('blurred');
        }

        // Toggle this card
        if (!wasExpanded) {
            $(this).addClass('expanded').find('.more-info').slideDown();
            $('body').append($(this)); // Move the expanded card out of the content wrapper
            contentWrapper.addClass('blurred');
        } else {
            var originalParent = $(this).data('originalParent');
            var originalIndex = $(this).data('originalIndex');
            // Place the card back in its original position
            if (originalIndex >= originalParent.children().length) {
                originalParent.append($(this));
            } else {
                originalParent.children().eq(originalIndex).before($(this));
            }
            $(this).removeClass('expanded').find('.more-info').slideUp();
            contentWrapper.removeClass('blurred');
        }
    });

    // Clicking outside an expanded card collapses it and removes blur
    $(document).click(function() {
        $('.event-card.expanded').each(function() {
            var originalParent = $(this).data('originalParent');
            var originalIndex = $(this).data('originalIndex');
            // Place the card back in its original position
            if (originalIndex >= originalParent.children().length) {
                originalParent.append($(this));
            } else {
                originalParent.children().eq(originalIndex).before($(this));
            }
            $(this).removeClass('expanded').find('.more-info').slideUp();
        });
        $('.content-wrapper').removeClass('blurred');
    });
});
