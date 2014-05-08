(function($){
$(document).ready(function() {

/*
Cache 
	Always try to cache jQuery call at the top so that they 
	don't get executed more than once
*/

var $iconCheckboxUnChecked = $('.icon.check-box.unchecked');
var $iconCheckboxChecked = $('.icon.check-box.checked');

$('input').focus();

/*
General Functions and plugins
*/

var toggleDisplay = function(className){
	$(className).toggle();
};

$.fn.toggleSprite = function (firstPosition, secondPosition) {
    return $(this).css('background-position',function(idx, sp){
        return sp = sp == firstPosition ? secondPosition : firstPosition;
    });
};

/* DONE
On mouseup view toggle:
	show and hide completed list
	toggle position of sprite for eye icon.
*/
$('.toggle-completed').bind('click',function(e){
	$(this).toggleSprite('-82px 50%','-101px 50%');
	toggleDisplay('.completed-item');
});

/* 
On press enter for task item
	create a new LI in uncomplete list - top of list
	animate - expand slightly in new position
	increment the uncompleted count
	clear the form
	return to the form field
*/

$('#input-submit').keyup(function(e) {
	if(e.which == 13){
		$('#input-submit').click();
	}
});

var itemHtmlFront = '<div class="icon check-box unchecked"></div><span class="item-text">';
var itemHtmlBack = '</span><div class="icon trash-can"></div><div class="icon drag-grab"></div>';

function addItem() {
	var newItem = $('#input-field').val().trim();
	if (newItem){
			$("<li></li>").appendTo('.uncompleted-item')
			.html(itemHtmlFront + newItem + itemHtmlBack);
		}
	console.log(itemHtmlFront + newItem + itemHtmlBack);
	$('#input-field').val('');
}

$('#input-submit').click(addItem);

// $('#input-field').keyup(function(e) {
// 	// user releases return
// 	e.preventDefault();
// 	if(e.keyCode == 13) {
// 		var newItem = $(this).val().trim();
// 		alert(newItem);
// 		if (newItem) {
// 			console.log(newItem);
// 		} else {
// 			console.log("else happened");
// 		}
// 	}
// });


/* 
On mouseup item checkbox (unchecked):
	•move position of sprite to check
	•remove item from uncompleted list(traverse up to li)
	•add item to completed list on bottom
	addClass() and removeClass()
	animate the move
	decrement uncompleted count	
	increment completed count
*/
$('.icon.check-box.unchecked').bind('click',function(e){
	$(this).toggleSprite('-1px 50%','-21px 50%');
	console.log(this);
	$('.completed-item').prepend($(this).closest('li'));
	$(this).addClass('checked');
	$(this).removeClass('unchecked');
});

$('.icon.check-box.checked').bind('click',function(e){
	console.log('check query ran');
	$(this).toggleSprite('-1px 50%','-21px 50%');
	$('.uncompleted-item').append($(this).closest('li'));
	$(this).addClass('unchecked');
	$(this).removeClass('checked');
});



/* 
On mouseup item checkbox (checked):
	move position of sprite to empty check
	remove item from completed list
	add item to uncompleted list on bottom
	increment uncompleted count	
	display js var in html: 
		http://jsfiddle.net/WxzNN/
		http://jsfiddle.net/tewathia/3JUKf/1/
	decrement completed count	
*/

/* 
On mouseup sort:
	sort uncompleted items in alpha order
*/

/* 
On mouseup trash icon:
	remove the list item from the UL
	create a pop-over to confirm
*/

/* 
On drag and drop:
	move item to new position on list
	if moved to completed
		do On check item
	if moved to uncompleted
		do On uncheck item	
*/

/* 
On press enter for task item
	create a new LI in uncomplete list - top of list
	animate - expand slightly in new position
	increment the uncompleted count
	clear the form
	return to the form field
*/




//end jQuery 
});

})(jQuery);