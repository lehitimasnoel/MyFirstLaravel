@extends('global_template') 
@section('title', 'Business Partner Management')

@section('content')

@include('bizpartner.css.bizpartner_css')
@include('bizpartner.js.bizpartner_controls')
@include('bizpartner.js.bizpartner_databinding')

<script type="text/javascript">
    function ui(id){ return sap.ui.getCore().byId(id); } 
    function showBusyDialog(message){
        return new sap.m.BusyDialog({text : message});
    }
    var gv_previous_livechange_time = new Date();
    function fn_livechange_numeric_input(oEvt){
	
        var lv_control = oEvt.getSource();
        
        //check this input box - it must contain numbers only
        var lv_str_value = lv_control.getValue();		

        var lv_numeric_pattern1 = /[^-0-9\.\,]+/g; // comma separator 
        
        var lv_match_result = lv_str_value.match(lv_numeric_pattern1);
        
        // if non numeric character is entered, it will trigger fireChange - the fireChange will add the comma separator
        
        if(lv_match_result && lv_match_result.length > 0){
            // remove the non numeric characters			
            lv_control.setValue(fn_convert_to_numeric(lv_str_value));
            
            // added by John to avoid retriggering of fire change when holding down	a letter			
            var lv_last_time = new Date();
            var lv_livechange_timediff = gv_previous_livechange_time.getTime() - lv_last_time.getTime();
            
            var lv_seconds_from_T1_to_T2 = lv_livechange_timediff / 1000;
            var lv_seconds_between_dates = Math.abs(lv_seconds_from_T1_to_T2);
            
            console.log("time difference for numeric livechange: "+lv_seconds_between_dates+" seconds");			
            // allow trigger fireChange if greater than 1 second
            if(lv_seconds_between_dates > 1){
                gv_previous_livechange_time = new Date();
                
                if(lv_control.getValue().length > 0 && isNaN(lv_control.getValue())){
                    lv_control.setValue("0");
                }
                lv_control.fireChange();
            }
        }
        
    }
    function fn_convert_to_numeric(lv_string){
		var lv_is_negative = false;
		// first char is a negative sign,
		if(lv_string.length > 0 && lv_string[0] == "-"){
			lv_is_negative = true;
		}
		var lv_replace_result = lv_string.replace(/[^0-9\.]+/g, "");
		
		if(lv_replace_result.length > 0 && lv_is_negative){
			lv_replace_result = "-" + lv_replace_result;
		}
		
		return lv_replace_result;
	}
    function fn_show_message_strip(msgerrorid,lv_message){	
        ui(msgerrorid).destroyContent().setVisible(false);
		return new sap.m.MessageStrip({text: lv_message, type: "Error", showIcon: true, showCloseButton: true})
        .attachClose(function(oEvt){
			ui(msgerrorid).destroyContent().setVisible(false);	
		});	
	}
    function fn_show_message_toast(msg){
        new sap.m.MessageToast.show(msg, {
            duration: 4000,                  // default
            width: "100%",                   // default
            my: "center bottom",             // default
            at: "center center",             // default
            of: window,                      // default
            offset: "0 300",                   // default
            collision: "fit fit",            // default
            onClose: null,                   // default
            autoClose: true,                 // default
            animationTimingFunction: "ease", // default
            animationDuration: 1000,         // default
            closeOnBrowserNavigation: true   // default
        });
    }
    function get_ClientDate(){
		d = new Date();

		day = d.getDate();
				day = day < 10 ? '0'+String(day) : day;
		month = parseInt(d.getMonth()) + 1;
				month = month < 10 ? '0'+String(month) : month;
		year = d.getFullYear();

		return year +'-'+ month  +'-'+ day;
	}
    function fn_download_bp_listing(){
		
		let busyDialog = showBusyDialog("Please wait loading..");
		    busyDialog.open();


		var lv_contexts = [];
		
		var	lv_table = ui('BP_LISTING_TABLE');
		var lt_content = lv_table.getModel().getData();
		
		var lt_columns = ui('BP_LISTING_TABLE').getColumns();
		var lt_temp = [];

		for(var i = 0; i < lt_content.length; i++){
			
			lo_temp = {};
			
			for(var x=0; x<lt_columns.length; x++){
				
				lv_key = ui('BP_LISTING_TABLE').getColumns()[x].getLabel().getText();
				lv_field = ui('BP_LISTING_TABLE').getColumns()[x].getFilterProperty();
				
				lo_temp[lv_key] = (lt_content[i][lv_field] || "") ? lt_content[i][lv_field] : "";
				
			}
			
			lt_temp.push(lo_temp);

		}

		var lv_array_date = typeof lt_temp != 'object' ? JSON.parse(lt_temp) : lt_temp;

		var CSV = "\uFEFF";

		var ShowLabel = true;

		//This condition will generate the Label/Header
		if (ShowLabel) {
			var row = "";
			var modified ="";


			//This loop will extract the label from 1st index of on array
			for (var index in lv_array_date[0]) {

				//covert underscore to space
				modified = index.replace(/_/g, ' ');
				//Now convert each value to string and comma-seprated
				row += modified + ',';
			}

			row = row.slice(0, -1);

			//append Label row with line break
			CSV += row + '\r\n';
		}

			//1st loop is to extract each row
			for (var i = 0; i < lv_array_date.length; i++) {
				var row = "";

				//2nd loop will extract each column and convert it in string comma-seprated
				for (var index in lv_array_date[i]) {
					row += '"' + lv_array_date[i][index] +'",';
					//row += lv_array_date[i][index] +',';
				}

				//remove 1st row
				row.slice(0, row.length - 1);

				//remove last comma
				row = row.replace(/,\s*$/, "");

				//add a line break after each row
				CSV += row + '\r\n';
			}

		if (CSV == '') {
			console.log("Invalid data");
			return;
		}

		//Generate a file name
		var fileName = "";
		var downloadedDate = get_ClientDate();
		//this will remove the blank-spaces from the title and replace it with an underscore
		fileName = "Business Partner Listing".replace(/ /g,"_") + downloadedDate;


		if(window.navigator.msSaveOrOpenBlob){

			blobObject = new Blob([CSV]);
			window.navigator.msSaveOrOpenBlob(blobObject, fileName + ".csv");

		}else if(navigator.userAgent.search("Trident") >= 0){

			var IEwindow = window.open("application/csv", "replace");
				IEwindow.document.write('sep=,\r\n' + CSV);
				IEwindow.document.close();
				IEwindow.document.execCommand('SaveAs', true, fileName + ".csv");
				IEwindow.close();

		}else{

			//Initialize file format you want csv or xls
			//var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(CSV);
			var uri = new Blob([ CSV ], { type : "application/csv;charset=utf-8;" });
			var csvUrl = URL.createObjectURL(uri);

			var link = document.createElement("a");
			link.href = csvUrl;
			link.setAttribute("target", "_blank");

			link.style = "visibility:hidden";
			link.download = fileName + ".csv";

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

		}

		busyDialog.close();
	}

    var go_App_Right = "";
    var go_App_Left = "";
    var go_SplitContainer = "";
    var labelWidth = "140px";
	var TextWidth ="auto";
    var mode =  "";
    var filteredBP = [];
    
    
    $(document).ready(function () {	
        CreateContent();
        ui('LEFT_MENU_TEMPLATE-MENU_LIST-0').firePress();
	});

   

   
</script>

 @endsection



 
