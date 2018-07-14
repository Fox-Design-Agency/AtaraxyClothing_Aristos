import $ from "jquery";

$("#editor").on("DOMSubtreeModified", function() {
  $("#contentAreaStuffs").html($("#editor").html());
});

let colorPalette = [
  "000000",
  "FF9966",
  "6699FF",
  "99FF66",
  "CC0000",
  "00CC00",
  "0000CC",
  "333333",
  "0066FF",
  "FFFFFF"
];
let forePalette = $(".fore-palette");
let backPalette = $(".back-palette");

for (var i = 0; i < colorPalette.length; i++) {
  forePalette.append(
    '<a href="#" data-command="forecolor" data-value="' +
      "#" +
      colorPalette[i] +
      '" style="background-color:' +
      "#" +
      colorPalette[i] +
      ';" class="palette-item"></a>'
  );
  backPalette.append(
    '<a href="#" data-command="backcolor" data-value="' +
      "#" +
      colorPalette[i] +
      '" style="background-color:' +
      "#" +
      colorPalette[i] +
      ';" class="palette-item"></a>'
  );
}

$(".toolbar a").click(function(e) {
  let command = $(this).data("command");
  if (
    command === "H1" ||
    command == "H2" ||
    command == "P" ||
    command == "H3" ||
    command == "H4" ||
    command == "H5" ||
    command == "H6" ||
    command == "HR"
  ) {
    $("#myDropdown").removeClass("show");

    document.execCommand("formatBlock", false, command);
  }
  if (command == "forecolor" || command == "backcolor") {
    document.execCommand($(this).data("command"), false, $(this).data("value"));
  }
  if (command == "createlink") {
    url = prompt("Enter the link here: ", "http://");
    document.execCommand($(this).data("command"), false, url);
  }
  if (command == "insertimage") {
    $(".image-selector").addClass("image-selector-show");
    $(".image-selector-background").addClass("image-selector-show");
  } else {
    document.execCommand($(this).data("command"), false, null);
  }
});
$(".image-selector a").click(function(e) {
  let command = $(this).data("command");
  $(".image-selector").removeClass("image-selector-show");
  $(".image-selector-background").removeClass("image-selector-show");
  let img = $(this).html();
  document.execCommand("insertHTML", false, img);
});
$(".image-selector-background").click(function(e) {
  $(".image-selector").removeClass("image-selector-show");
  $(".image-selector-background").removeClass("image-selector-show");
});
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
$(".dropbtn").click(function() {
  if ($("#myDropdown").hasClass("show")) {
    $("#myDropdown").removeClass("show");
  } else {
    $("#myDropdown").addClass("show");
  }
});
