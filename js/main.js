(function($){
$(document).ready(function() {

/*
General Functions
*/

var toggleDisplay = function(className){
	$(className).toggle();
};

$.fn.toggleSprite = function (firstPosition, secondPosition) {
    return $(this).css('background-position',    function(idx, sp){
        return sp = sp == firstPosition ? secondPosition : firstPosition;
    });
};


/* 
On mouseup view toggle:
	show and hide completed list
	toggle position of sprite for eye icon.
*/
$('.toggle-completed').mouseup(function(){
	$(this).toggleSprite('-82px 50%', '-101px 50%');
	toggleDisplay('.completed-item');
});


/* 
On mouseup item checkbox (unchecked):
	move position of sprite to check
	remove item from uncompleted list(traverse up to li)
	add item to completed list on bottom
	decrement uncompleted count	
	increment completed count
*/
$('.icon.check-box.unchecked').click(function(){
	$(this).toggleSprite('-1px 50%','-21px 50%');
	$('.completed-item').prepend($(this).closest('li'));
});

//This doesn't work for items that have already moved. they still have previous class
$('.icon.check-box.checked').click(function(){
	$(this).toggleSprite('-1px 50%','-21px 50%');
	$('.uncompleted-item').append($(this).closest('li'));
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