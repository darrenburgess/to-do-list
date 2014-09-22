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
//updateCounts();

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
	increment the uncompleted count
	clear the form
	return to the form field
	post the data to database
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

	$('#input-field').val('');

	$.ajax({
		type: "POST",
		url: "php/addItem.php",
		data: 'newItem=' + newItem,
		cache: false,
		success: function(result) {
			if (newItem){
				$('.uncompleted-item').append($('<li>' + itemHtmlFront + newItem + itemHtmlBack + '</li>'));
			}
			updateCounts();
		}
	});
}

$('form').submit(function(e){ e.preventDefault(); });

/*  
On mouseup item checkbox (unchecked):
	•move position of sprite to check
	•remove item from uncompleted list(traverse up to li)
	•add item to completed list on bottom
*/

$(document).on('click','.icon.check-box.unchecked',function(){
	var recId = $(this).closest('li').attr('id');
	$.ajax({
		type: "POST",
		url: "php/toggleStatus.php",
		data: {
			recId: recId,
			status: 1
		},
		cache: false,
		success: function(){
			console.log('made checked');
		}
	});
	$(this).toggleSprite('-1px 50%','-21px 50%')
			.addClass('checked')
			.removeClass('unchecked');
	$('.completed-item').prepend($(this).closest('li'));
	updateCounts();
});

$(document).on('click','.icon.check-box.checked',function(){
	var recId = $(this).closest('li').attr('id');
	$.ajax({
		type: "POST",
		url: "php/toggleStatus.php",
		data: {
			recId: recId,
			status: 0
		},
		cache: false,
		success: function(result){
			console.log('made unchecked');
			var ajaxResult = "Successful Ajax";
		}
	});
	$(this).toggleSprite('-1px 50%','-21px 50%')
		.addClass('unchecked')
		.removeClass('checked');
	$('.uncompleted-item').append($(this).closest('li'));
	updateCounts();
});

/* 
On drag and drop:
	move item to new position on list
*/
$('ul').sortable({ axis: "y" });


/* DONE  
On click trash icon:
	remove the list item from the UL
	create a pop-over to confirm
*/
$('ul').on('click','.icon.trash-can', function() {
	var recId = $(this).closest('li').attr('id');
	console.log (recId);
	$.ajax({
		type: "POST",
		url: "php/deleteItem.php",
		data: 'recId=' + recId,
		cache: false,
		success: function(result) {
			//
		},
		error: function(result) {
			console.log("error in php");
		}
	});
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