(function($){
$(document).ready(function() {

/*
Cache 
	Always try to cache jQuery call at the top so that they 
	don't get executed more than once
*/

// var $iconCheckboxUnChecked = $('.icon.check-box.unchecked');
// var $iconCheckboxChecked = $('.icon.check-box.checked');

$('input').focus();

var countOfElements;

/*
General Functions and plugins
*/

var toggleDisplay = function(className){
	$(className).toggle();
};

var countElements = function(selector){
	return countOfElements = $(selector).length;
};

var updateCounts = function(){
	$('#completed').text(countElements('.completed-item > li'));
	$('#uncompleted').text(countElements('.uncompleted-item > li'));
};

// run countElements on load so that the counts are correct
updateCounts();

// jQuery plugin that will shift the position of the sprite image
$.fn.toggleSprite = function (firstPosition, secondPosition) {
    return $(this).css('background-position',function(idx, sp){
        return sp = sp === firstPosition ? secondPosition : firstPosition;
    });
};

/* DONE
On click view toggle:
	show and hide completed list
	toggle position of sprite for eye icon.
*/
$('.toggle-completed').bind('click',function(){
	$(this).toggleSprite('-82px 50%','-101px 50%');
	toggleDisplay('.completed-item');
});

/* DONE 
On press enter for task item
	create a new LI in uncomplete list - top of list
	animate - expand slightly in new position
	increment the uncompleted count
	clear the form
	return to the form field
*/
$('form').keyup(function(e) {
	if(e.which === 13){
		addItem();
	}
});

var itemHtmlFront = '<div class="icon check-box unchecked"></div><span class="item-text">';
var itemHtmlBack = '</span><div class="icon trash-can"></div><div class="icon drag-grab"></div>';

function addItem() {
	var newItem = $('#input-field').val().trim();
	if (newItem){
			$('.uncompleted-item').append($('<li>' + itemHtmlFront + newItem + itemHtmlBack + '</li>'));
			// $("<li></li>").appendTo('.uncompleted-item') // cache this
		}
	$('#input-field').val('');
	updateCounts();
}

$('form').submit(function(e){ e.preventDefault(); });

/* DONE 

REFACTOR: Abstract these two events into a function

On mouseup item checkbox (unchecked):
	•move position of sprite to check
	•remove item from uncompleted list(traverse up to li)
	•add item to completed list on bottom
	addClass() and removeClass()
	animate the move
	decrement uncompleted count	
	increment completed count
*/

$(document).on('click','.icon.check-box.unchecked',function(){
	$(this).toggleSprite('-1px 50%','-21px 50%')
			.addClass('checked')
			.removeClass('unchecked');
	$('.completed-item').prepend($(this).closest('li'));
	updateCounts();
});

$(document).on('click','.icon.check-box.checked',function(){
	$(this).toggleSprite('-1px 50%','-21px 50%')
		.addClass('unchecked')
		.removeClass('checked');
	$('.uncompleted-item').append($(this).closest('li'));
	updateCounts();
});

/* 
On drag and drop:
	move item to new position on list
	if moved to completed
		do On check item
	if moved to uncompleted
		do On uncheck item	
*/
$('ul').sortable({ axis: "y" });


/* DONE  
On click trash icon:
	remove the list item from the UL
	create a pop-over to confirm
*/
$('ul').on('click','.icon.trash-can', function() {
	$(this).closest('li').remove();
	updateCounts();
});


/* 
On click sort:
	sort uncompleted items in alpha order

	* build an array of just the text
	* sort that array
	* build the html around the array
	* create a function to build the html
	* set break points and step thru dev tools.
*/
var $list = $('.uncompleted-item'); 

// $('.icon.alpha-sort').click(function(e){
// 	var $listLi = $list.find('li');
//     $listLi.sort(function(a, b){
//     	var keyA = $(a).find('.item-text').html();
//         var keyB = $(b).find('.item-text').html();
// 		return (keyA.toLowerCase() > keyB.toLowerCase()) ? 1 : -1;
// 	});
// 	$list.empty();
// 	$.each($listLi, function (index, row){
// 		$list.append(row);
// 	});
// 	e.preventDefault();
// });

/* sort option 2
http://blog.rodneyrehm.de/archives/14-Sorting-Were-Doing-It-Wrong.html
*/
$.fn.sortChildren = function(compare) {
  var $children = this.children();
  $children.sort(compare);
  this.append($children);
  return this;
};

$('.icon.alpha-sort').click(function(e){
	$($list).sortChildren(function(a, b) {
	return 	$(a).find('.item-text').html().toLowerCase() > 
			$(b).find('.item-text').html().toLowerCase() 
			? 1 : -1;
	});
});




/*
On click edit item
*/


//end jQuery 
});

})(jQuery);