!function(t){t(document).ready(function(){function e(){var e=t("#input-field").val().trim();e&&t(".uncompleted-item").append(t("<li>"+l+e+r+"</li>")),t("#input-field").val(""),o()}t("input").focus();var n,i=function(e){t(e).toggle()},c=function(e){return n=t(e).length},o=function(){t("#completed").text(c(".completed-item > li")),t("#uncompleted").text(c(".uncompleted-item > li"))};o(),t.fn.toggleSprite=function(e,n){return t(this).css("background-position",function(t,i){return i=i===e?n:e})},t(".toggle-completed").bind("click",function(){t(this).toggleSprite("-82px 50%","-101px 50%"),i(".completed-item")}),t("form").keyup(function(t){13===t.which&&e()});var l='<div class="icon check-box unchecked"></div><span class="item-text">',r='</span><div class="icon trash-can"></div><div class="icon drag-grab"></div>';t("form").submit(function(t){t.preventDefault()}),t(document).on("click",".icon.check-box.unchecked",function(){t(this).toggleSprite("-1px 50%","-21px 50%").addClass("checked").removeClass("unchecked"),t(".completed-item").prepend(t(this).closest("li")),o()}),t(document).on("click",".icon.check-box.checked",function(){t(this).toggleSprite("-1px 50%","-21px 50%").addClass("unchecked").removeClass("checked"),t(".uncompleted-item").append(t(this).closest("li")),o()}),t("ul").sortable({axis:"y"}),t("ul").on("click",".icon.trash-can",function(){t(this).closest("li").remove(),o()});var s=t(".uncompleted-item");t(".icon.alpha-sort").click(function(e){var n=s.find("li");n.sort(function(e,n){var i=t(e).find(".item-text").html(),c=t(n).find(".item-text").html();return i.toLowerCase()>c.toLowerCase()?1:-1}),s.empty(),t.each(n,function(t,e){s.append(e)}),e.preventDefault()}),t.fn.sortChildren=function(t){var e=this.children();return e.sort(t),this.append(e),this},t(".icon.alpha-sort").click(function(e){t(s).sortChildren(function(e,n){return t(e).find(".item-text").html().toLowerCase()>t(n).find(".item-text").html().toLowerCase()?1:-1})})})}(jQuery);