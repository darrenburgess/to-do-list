!function(e){e(document).ready(function(){function t(){var t=e("#input-field").val().trim();t&&e("<li></li>").appendTo(".uncompleted-item").html(o+t+l),e("#input-field").val(""),i()}e("input").focus();var c=function(t){e(t).toggle()},n=function(t){return countOfElements=e(t).length},i=function(){e("#completed").text(n(".completed-item > li")),e("#uncompleted").text(n(".uncompleted-item > li"))};i(),e.fn.toggleSprite=function(t,c){return e(this).css("background-position",function(e,n){return n=n==t?c:t})},e(".toggle-completed").bind("click",function(t){e(this).toggleSprite("-82px 50%","-101px 50%"),c(".completed-item")}),e("form").keyup(function(e){13==e.which&&t()});var o='<div class="icon check-box unchecked"></div><span class="item-text">',l='</span><div class="icon trash-can"></div><div class="icon drag-grab"></div>';e("form").submit(function(e){e.preventDefault()}),e(document).on("click",".icon.check-box.unchecked",function(t){e(this).toggleSprite("-1px 50%","-21px 50%").addClass("checked").removeClass("unchecked"),e(".completed-item").prepend(e(this).closest("li")),i()}),e(document).on("click",".icon.check-box.checked",function(t){e(this).toggleSprite("-1px 50%","-21px 50%").addClass("unchecked").removeClass("checked"),e(".uncompleted-item").append(e(this).closest("li")),i()}),e("ul").sortable({axis:"y"}),e("ul").on("click",".icon.trash-can",function(){e(this).closest("li").remove(),i()}),e(".icon.alpha-sort").click(function(t){var c=e(".uncompleted-item"),n=e("li",c);console.log(n),n.sort(function(t,c){var n=e(t).text(),i=e(c).text();return n>i?1:0}),e.each(n,function(e,t){c.append(t)}),t.preventDefault()})})}(jQuery);