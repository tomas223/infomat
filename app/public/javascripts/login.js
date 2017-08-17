/*global $, jQuery*/

// document.ready()
$(document).ready(function () {
  
$("#signin-btn").click( function() {
  
  reqData = {
    "userName": $("#userName").val(),
    "inputPassword": $("#inputPassword").val()
  }
  
  $.ajax({
    type: "POST",
    url: "./login",
//    data: reqData,
    data: JSON.stringify(reqData),
    contentType: 'application/json',
    dataType: 'json',
    success: function (res) {
      console.log(res);
      renderResponse('success', 'OK', res.success);
      setTimeout(function() {
        window.location.href="./";
      }, 1000);
    },
    error: function(jqXHR, textStatus, errorThrown) {
//      alert("Error during sending");
      console.log(textStatus);
//            console.log(errorThrown);
      console.log(errorThrown.Message);
      console.log(jqXHR.responseText);
      temp = jqXHR.responseText;
      renderResponse('danger', 'warning', JSON.parse(jqXHR.responseText).error);
    }
  });
})

}); // end of document.ready() 

function renderResponse(type, strongText, message) {
  $msg = $("<div>").addClass("alert alert-" + type);
  $msg.append($("<strong>" + strongText + ": </stromg>"));
  $msg.append(message);
  $(".info-panel").append($msg);
}