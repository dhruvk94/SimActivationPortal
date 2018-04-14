
#snackbar {
	visibility: hidden; /* Hidden by default. Visible on click */
	min-width: 250px; /* Set a default minimum width */
	margin-left: -125px; /* Divide value of min-width by 2 */
	background-color: #ff0000; /* Black background color */
	color: #fff; /* White text color */
	text-align: center; /* Centered text */
	border-radius: 2px; /* Rounded borders */
	padding: 16px; /* Padding */
	position: fixed; /* Sit on top of the screen */
	z-index: 1; /* Add a z-index if needed */
	left: 50%; /* Center the snackbar */
	bottom: 30px; /* 30px from the bottom */
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
	visibility: visible; /* Show the snackbar */
	/* Add animation: Take 0.5 seconds to fade in and out the snackbar. 
However, delay the fade out process for 2.5 seconds */
	-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
	animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@
-webkit-keyframes fadein {
	from {bottom: 0;
	opacity: 0;
}

to {
	bottom: 30px;
	opacity: 1;
}

}
@
keyframes fadein {
	from {bottom: 0;
	opacity: 0;
}

to {
	bottom: 30px;
	opacity: 1;
}

}
@
-webkit-keyframes fadeout {
	from {bottom: 30px;
	opacity: 1;
}

to {
	bottom: 0;
	opacity: 0;
}

}
@
keyframes fadeout {
	from {bottom: 30px;
	opacity: 1;
}

to {
	bottom: 0;
	opacity: 0;
}

}
body {
	font-family: 'Product Sans', Arial, sans-serif;
	padding-top: 70px;
}

h6 {
	padding-left: 60px;
}

.navbar-header, .navbar-collapse, .navbar-brand {
	background-color: black;
}

h1 {
	color: blue;
}

.carousel-indicators li {
	background-color: #337ab7;
}

.carousel-indicators .active {
	background-color: blue;
}

.carousel-indicators {
	bottom: -50px;
}

.carousel-inner {
	padding: 20px;
	margin-bottom: 50px;
	box-shadow: 10px 10px 5px #888888;
}

h2 {
	color: #337ab7;
}

.btn-danger {
	background-color: #337ab7;
	width: 100%;
}

.carousel {
	padding: 10px;
	interval: false;
}

.carousel-inner {
	border: 1px solid grey;
	border-radius: 5px;
	border-padding: 10px 10px 10px 10px;
}

#contid {
	background-color: black;
}

#cont2 {
	background-color: black;
}

.icon-bar {
	background-color: #337ab7;
}


/**
 * 
 * 
 */

// Function to show snack bar
function snack(str) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar")
    x.innerHTML = str;
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function() {
        x.className = x.className.replace("show", "");
    }, 3000);
}

// Function to activate button on basic details page
function activateButton1(element) {

    if (element.checked) {
        document.getElementById("basicbtn").disabled = false;
    } else {
        document.getElementById("basicbtn").disabled = true;
    }

}

// Function to activate button for terms and conditions
function activateButton2(element) {

    if (element.checked) {
        document.getElementById("termsbtn").disabled = false;
    } else {
        document.getElementById("termsbtn").disabled = true;
    }

}

var rootUrl = "http://localhost:4343/SimActivationPortalBoot"
var simServiceUrl = rootUrl + "/sim/validation";
var offersUrl = rootUrl + "/sim/offer";
var basicUrl = rootUrl + "/customer/validation";
var idProofUrl = rootUrl + "/idproof/validation";
var customerUrl = rootUrl + "/customer/activate"
var activateUrl = rootUrl + "/sim/activation";
var validateNameUrl = rootUrl + "/customer/validateName";
var validateAddressUrl = rootUrl + "/customer/validateAddress";

$(document).ready(function() {
    // Validating SIM and Service Details
	// Sends the SIM and Service number
	// Returns success or error
	
	
    $('#pg1btn').click(
        function(event) {
            var simnum1 = $('#simNum1').val();
            var sernum1 = $('#servNum1').val();
            // console.log('sim' + simnum1 + 'ser' + sernum1);
            jsondata = {
            		'simNumber':simnum1,
            		'serviceNumber':sernum1
            };
            console.log(jsondata);
            $.ajax({
        		url:simServiceUrl,
        		type:'POST',
        		data:JSON.stringify(jsondata),
        		contentType:"application/json",
        		headers:{contentType:"application/x-www-form-urlencoded;charset=UTF-8"},
        		success : function(response, status, xhr) {
        			if (response) {
        				 $.getJSON({
        		                url: offersUrl + "/" + simnum1,
        		                contentType:"application/json",
        		                headers:{contentType:"application/x-www-form-urlencoded;charset=UTF-8",
        		                	Authorization: "Basic " + btoa("admin:admin")},
        		                success: function(data) {
        		                    if(data) {
        		        				
        		                    	console.log(data);
        		                    	 $("#offer").html(data.offerName + "<br/><br/>" +
        		                    			 "Get " + data.calls + " minutes calling,<br/>" + 
        		                    			 data.data + " MB 4G data <br/>for " + 
        		                    			 data.validity + " <br><br>" + 
        		                    			 "at just " + data.cost);
        		                    	 localStorage.setItem('offerId', data.offerId);
        		                    	 localStorage.setItem('offerName', data.offerName);

        		                    }
        		                    else {
        		        				snack("Some unknown error occurred");
        		                    }
        		                   
        		                },
        		                error: function(error) {
        		                    snack("Some unknown error occurred");
        		                }
        		            });
        				
        				console.log("SUCCESS" + JSON.stringify(response));
        				localStorage.setItem('simNumber', simnum1);
        				localStorage.setItem('serviceNumber', sernum1);
                        $('#carousel-example-generic').carousel('next');
                        
        			}
        		},
        		error : function(error) {
        			{
        				snack(JSON.stringify(error["responseText"]));
        			}
        		}
        	});
            
           

    });

    // Action on clicking offers button
    // Carousel moves to Basic User Validation
    $("#offbtn").click(function(event) {
        $('#carousel-example-generic').carousel('next');
    });

    // Basic user validation button click action
    // Verifies email and DOB
    $("#basicbtn").click(function(event) {
        var email1 = $('#email1').val();
        var dob1 = $('#dob1').val();
        var dobBeforeConvert = dob1;
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(dob1);
        dob1 = [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
        console.log(email1);
        console.log(dob1);
        jsondata = {
        		'emailId':email1,
        		'dateOfBirth':dob1
        };
        $.ajax({
    		url:basicUrl,
    		type:'POST',
    		data:JSON.stringify(jsondata),
    		contentType:"application/json",
    		headers:{contentType:"application/x-www-form-urlencoded;charset=UTF-8"},
    		success : function(response, status, xhr) {
    			if (response) {
    				console.log("SUCCESS" + JSON.stringify(response));
    		        localStorage.setItem('email', email1);
    		        localStorage.setItem('dob', dobBeforeConvert);
    		        $('#dob2').val(dobBeforeConvert);
    		        $('#email2').val(email1);
                    $('#carousel-example-generic').carousel('next');
    			}
    		},
    		error : function(error) {
    			{
    				console.log(JSON.stringify(error["responseText"]));
    				snack(JSON.stringify(error["responseText"]));
    			}
    		}
    	});
    });

    // On Personal Details page
    $("#persbtn").click(function(event) {
        var title1 = $('#title1').val();
        var fname1 = $('#fname1').val();
        var lname1 = $('#lname1').val();
        var cemail = $('#cemail2').val();
        
        var simnum1 = localStorage.getItem('simNumber');
        
        if (localStorage.getItem('email') == cemail) {
            
        	 jsondata = {
             		'firstName':fname1,
             		'lastName':lname1,
             		'simDetails': {
             			'simNumber':simnum1
             		}
             };

        	
        	$.ajax({
        		url:validateNameUrl,
        		type:'POST',
        		data:JSON.stringify(jsondata),
        		contentType:"application/json",
        		headers:{contentType:"application/x-www-form-urlencoded;charset=UTF-8"},
        		success : function(response, status, xhr) {
        			if (response) {
        				console.log("SUCCESS" + JSON.stringify(response));
        	        	localStorage.setItem('title1', title1);
        	            localStorage.setItem('lname', lname1);
        	            localStorage.setItem('fname', fname1);
        	        	$('#carousel-example-generic').carousel('next');
        			}
        		},
        		error : function(error) {
        			{
        				console.log(JSON.stringify(error["responseText"]));
        				snack(JSON.stringify(error["responseText"]));
        			}
        		}
        	});
        }
        else {
        	snack("Email Id should be same.")
        }
    });

    
	 $('#pin11').change(function(event) { 
		 	pin1 = $("#pin11").val(); 
		 	url1 = "http://maps.googleapis.com/maps/api/geocode/json?address="+pin1+"&region=in"; 
		 	console.log(url1);
		 	$.getJSON({
		 		url : url1, 
			 	success : function(data) { 
			 		console.log(data);
			 		data1 = data;
			 		po = data1['results'][0]['address_components'];
			 		var city = po[1]['long_name'];
			 		var state = po[3]['long_name'];
			 		localStorage.setItem('state', state);
			 		console.log(city + state); 
			 		// document.getElementById('title1').value = state;
			 		$("#title1 option[value='"+state+"']").prop('selected', 'selected');

			 		$("#city1").val(city); 
			 		
		 		}, 
		 		error : function(error) {
		 			console.log('error in getting pin code data')
 				}
	 		});
	 	});
	 

    // Action on clicking Address Details page button
    $("#addrbtn").click(function(event) {
        add1 = $("#add1").val();
        state1 = $("#state1").val();
        city1 = $("#city1").val();
        pin1 = $("#pin11").val();

        
        localStorage.setItem('address', (add1));
        localStorage.setItem('city', (city1));
        localStorage.setItem('pin', (pin1));
        
        var jsondata = {
        		'addressDetails':add1,
        		'city':city1,
        		'pincode':pin1
        };
        
        $.ajax({
    		url:validateAddressUrl,
    		type:'POST',
    		data:JSON.stringify(jsondata),
    		contentType:"application/json",
    		headers:{contentType:"application/x-www-form-urlencoded;charset=UTF-8"},
    		success : function(response, status, xhr) {
    			if (response) {
    				$("#state2 option[value="+state1+"]").prop('selected', 'selected');
    		        $("#fname2").val(localStorage.getItem('fname'));
    		        $("#lname2").val(localStorage.getItem('lname'));
    		        $("#dob3").val(localStorage.getItem('dob'));
    		        if(add1 != "" && city1 != "" && pin1 != null)
    		        	$('#carousel-example-generic').carousel('next');
    		        $("#ffname").html(localStorage.getItem('fname'));
    		        $("#flname").html(localStorage.getItem('lname'));
    		        $("#femail").html(localStorage.getItem('email'));
    		        $("#fdob").html(localStorage.getItem('dob'));
    		        $("#foffer").html(localStorage.getItem('offerName'));
    		        $("#fservice").html(localStorage.getItem('serviceNumber'));
    			}
    		},
    		error : function(error) {
    			{
    				console.log(JSON.stringify(error["responseText"]));
    				snack(JSON.stringify(error["responseText"]));
    			}
    		}
    	});
        
        
     });


    $("#idbtn").click(function(event) {
        state1 = $("#state2").val();
        idn = $("#idn1").val();
        fname2 = $("#fname2").val();
        lname2 = $("#lname2").val();
        idtype = $("#id1").val();
        dob = $("#dob3").val();

        //localStorage.setItem('state1', (state1));
        localStorage.setItem('idn', (idn));
        //localStorage.setItem('fname2', (fname2));
        //localStorage.setItem('lname2', (lname2));
        
        console.log("state1:"+state1);
        console.log("local state:"+localStorage.getItem('state'));
        
		if(localStorage.getItem('fname') == fname2 
				&& localStorage.getItem('lname') == lname2
				&& localStorage.getItem('state') == state1
				&& dob === localStorage.getItem('dob')) {
	        jsondata = {
	        		'firstName':fname2,
	        		'lastName':lname2,
	        		'dateOfBirth':dob,
	        		'idProof':{
		        		'idProofType':idtype,
		        		'idProofNumber':idn
	        		},
	        		'address':{
	        			'state':state1
	        		}
	        }
	        console.log("data" + JSON.stringify(jsondata));
			$.ajax({
	    		url:idProofUrl,
	    		type:'POST',
	    		data:JSON.stringify(jsondata),
	    		contentType:"application/json",
	    		headers:{contentType:"application/x-www-form-urlencoded;charset=UTF-8"},
	    		success : function(response, status, xhr) {
	    			if (response) {
	    				console.log("SUCCESS" + JSON.stringify(response));
	    		        $('#dob2').val(dob1);
	                    $('#carousel-example-generic').carousel('next');
	    			}
	    		},
	    		error : function(error) {
	    			{
	    				console.log(JSON.stringify(error["responseText"]));
	    				snack(JSON.stringify(error["responseText"]));
	    			}
	    		}
	    	});
		}
		else {
			snack("Wrong details entered.");
		}
    });

    $("#termsbtn").click(function(event) {
        jsondata = {
        		'firstName':localStorage.getItem('fname'),
        		'lastName':localStorage.getItem('lname'),
        		'emailId':localStorage.getItem('email'),
        		'dateOfBirth':localStorage.getItem('dob'),
        		'address':{
        			'addressDetails':localStorage.getItem('address'),
        			'pincode':localStorage.getItem('pin'),
        			'city':localStorage.getItem('city'),
        			'state':localStorage.getItem('state')
        		},
        		'simDetails':{
            		'simNumber': localStorage.getItem('simNumber')
        		}
        };
        console.log(jsondata);
        $.ajax({
    		url:customerUrl,
    		type:'POST',
    		data:JSON.stringify(jsondata),
    		contentType:"application/json",
    		headers:{contentType:"application/x-www-form-urlencoded;charset=UTF-8"},
    		success : function(response, status, xhr) {
    			if (response) {
    				console.log("SUCCESS" + JSON.stringify(response));
    				
    			}
    			$('#carousel-example-generic').carousel('next');
    		},
    		error : function(error) {
    			{
    				console.log(JSON.stringify(error["responseText"]));
    				snack(JSON.stringify(error["responseText"]));
    			}
    		}
    	});

    });


});