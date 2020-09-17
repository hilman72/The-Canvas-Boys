// Sidebar collapse 
$(document).ready(function () {
    $("#sidebarCollapse,.sidebar-header,#side1,#side2,#side3,#side4").on(
      "click",
      function () {
        $("#sidebar, #content").toggleClass("active");
      }
    );
  });


//Dropdown menu

  $(".dropdown-menu li a").click(function(){

    $(".brushes:first-child").html($(this).text()+' <span class="caret"></span>');

  });
  

