$(document).ready(function () {
	const form = $("#form");
	console.log("loaded");

	let error_message = false;

	form.on("submit", function (e) {
		e.preventDefault();

		$.ajax({
		    url: "../php/login.php",
		    method: "POST",
		    data: new FormData(this),
		    processData: false,
		    contentType: false,
		    success: function (data) {
		        if (data === "1") {
		            window.location.href = "/web programming/php/dashboard.php";
		        } else if (data === "x") {
		            window.location.href = "/web programming/html/admin.html";
		        } else {
		            if (!error_message) {
		                const errorDiv = $("<p>")
		                  .text("Oops, looks like your username or password is wrong!")
		                  .addClass("error");
		                form.append(errorDiv);
		                error_message = true;
            		}
        		}
    		}
		});
	});
});