/*global $, jQuery*/

// document.ready()
$(document).ready(function () {
  $msgPanel = $("#messagePanel");
  $resPanel = $("#resultPanel");
  
  "use strict";
  buttonMagic();
  checkBoxMagic();

  $("#getDataBtn").click( function() {
      postRequest();
  });

}); // end of document.ready() 



/**
 * Using AJAX GET receive json object with possible DB requests
 */
function postRequest() {
    var reqData = {};
    reqData["fieldId"] = $("#toggleButtons button.active").attr("id");
    reqData["inputText"] = $("#inputText").val();
    reqData["queries"] = [];
    
    $("#queries label input:checked").each( function () {
        reqData.queries.push($(this).val());
    });
   
    console.log(reqData);
    
    
	$.ajax({
    type: "POST",
    url: "./ws/requestData",
//    data: reqData,
    data: JSON.stringify(reqData),
    contentType: 'application/json',
    dataType: 'json',
    success: function (res) {
      console.log(res);
      renderResponse(res);
    },
    error: function(jqXHR, textStatus, errorThrown) {
//      alert("Error during sending");
        console.log(textStatus);
//            console.log(errorThrown);
        console.log(errorThrown.Message);
        console.log(jqXHR.responseText);
        $msgPanel.append($("<p>").text(jqXHR.responseText).addClass("bg-danger"));
//            console.log(res);
    }
  });
}

function renderResponse(res) {
	$.each(res, function(index, element) {
		var $resDiv = $("<div>").addClass("response");
		$resDiv.append($("<h3>").append($("<small>").text(element.label + ": ")));
		$resDiv.children($("h3")).append(element.inputText);
    
		if (element.message == "Error") {
			$resDiv.append($("<p>").addClass("errorMessage").text(element.result));
		}
		else {
			$table = createTable(element.result);
			$resDiv.append($table);
		}
		// Table with data creation
		
		$resPanel.append($resDiv);
		console.log(index);
		console.log(element);
	})
}

function createTable(data) {
	$table = $("<table>").addClass("table table-striped table-hover");
  
  if (data.vertical !== "True") { //normal rendering
    
    $thead = $("<thead>");
    $tbody = $("<tbody>");
    $trh = $("<tr>").appendTo($thead);
    $.each(data.metaData, function(i, elem) {
      console.log(i, elem);
      $trh.append($("<th>").text(elem));
    });

    $.each(data.rows, function(i, elem) {
      $trd = $("<tr>");
      $.each(elem, function( _i, _elem ) {
        $trd.append($("<td>").text(_elem));
      });
      $tbody.append($trd);
    });
    
    $table.append($thead);
    $table.append($tbody);
  }
  else { // vertical rendering
    $tbody = $("<tbody>");
    for (var i = 0; i < data.metaData.length; i += 1) {
      
      $tr = $("<tr>");
      $tr.append($("<th>").text(data.metaData[i]));
      $.each(data.rows, function(_i, elem) {
        $tr.append($("<td>").text(elem[i]));
      });
      $tbody.append($tr);
    }
    $table.append($tbody);
  }
	
	return $table;
}


/**
 * Gives functionality to buttonss
 */
function buttonMagic() {
  $tglBtns = $("#toggleButtons button");
  $allOptnLabels = $("#queries label");

  $tglBtns.click(function() {
    // set buttons
    $tglBtns.removeClass("active");
    $(this).addClass("active");
    
    btnOptns = $(this).data("options").split(" "); // button options
    $.each($allOptnLabels, function(i, elem) {
      if (btnOptns.includes($(elem).attr("id"))) {
        $(elem).addClass("active").removeClass("disabled");
        $(elem).children("input").prop("disabled", false);
      }
      else {
        $(elem).addClass("disabled").removeClass("active checked");
        $(elem).children("input").prop("disabled", true).prop("checked", false);
      }
    });
    // change placeholder on #inputText element
    $("#inputText").attr("placeholder", "Insert " + $(this).html());
  });
}

function checkBoxMagic() {
  $boxLbls = $("#queries label");
  
  $boxLbls.each(function() {
    wid = $(this).width();
    $(this).width(Math.round(wid*1.1));
  });
  
  $boxLbls.click(function() {
    if ( $(this).children("input").prop("checked") ) {
      $(this).addClass("checked");
    }
    else {
      $(this).removeClass("checked");
    }
  });
}