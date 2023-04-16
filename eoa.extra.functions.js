/*
  |--------------------------------------------------------------------------
  | Shorten Version
  |--------------------------------------------------------------------------
  */ 
    
  
	function ui(id){ return sap.ui.getCore().byId(id); }

/*
// ================================================================================
// Special Functions
// ================================================================================
*/  
	function fn_pad_value(n, width, z) {
		z = z || '0';
		n = String(''+ n + '');
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

  /*
  |--------------------------------------------------------------------------
  | get Child No- Aljhun
  |--------------------------------------------------------------------------
  */ 
  
      function getSwtState(statDesc){
          
		if(statDesc!="Counted"){
			return false;
		}else{return true;}
	   
	   }
	   
   /*
  |--------------------------------------------------------------------------
  | get Child No- Aljhun
  |--------------------------------------------------------------------------
  */ 
  
      function getSwtStateB(statDesc){
          
		if(statDesc!="X"){
			return false;
		}else{return true;}
	   
	   }
 
	/*
	|--------------------------------------------------------------------------
	| get GLB Status Desc- Aljhun
	|--------------------------------------------------------------------------
	*/ 
 
     function getGlbStat(status){
         var statusdata=[]
 	
 		for(var i=0;i<GlbStatusData.length;i++){
 			
 			if(GlbStatusData[i].status==status){
 				
 				statusdata.push({
 					statusdesc	:GlbStatusData[i].description,
 					statusstate	: setStatState(GlbStatusData[i].description)
 				})
 				//log(statusdata,"Stat");
 				return statusdata;
 			}
 		
 		}
 		
 		if(statusdata.length==0){
 			statusdata.push({
 					statusdesc	: "",
 					statusstate	: setStatState("None")
 				})
 				
 			return statusdata;
 		}
 
     }
 
   /*
   |--------------------------------------------------------------------------
   | ValueHelp_AssetNumF - Aljhun
   |--------------------------------------------------------------------------
   */ 
   
       function setStatState(status){
           
           switch(status){
           
               case "Pending":
	 			return sap.ui.core.ValueState.Warning;
             break;
             
             case "Completed":
	 			return sap.ui.core.ValueState.Success;
             break;
             case "Withdraw":
	 			return sap.ui.core.ValueState.Error;
             break;
	 		case "Counted":
	 			return sap.ui.core.ValueState.Success;
             break;
	 		
	 		case "Missing":
	 			return sap.ui.core.ValueState.Error;
             break;
	 		
	 		case "Under Repair":
	 			return sap.ui.core.ValueState.Warning;
             break;
	 		
	 		case "Disposal":
	 			return sap.ui.core.ValueState.Error;
             break;
	 		
	 		case "Disposal":
	 			return sap.ui.core.ValueState.Error;
             break;
	 		
	 		default:
	 			return sap.ui.core.ValueState.None;
           
           }
       
       
       
       }
  /*
  |--------------------------------------------------------------------------
  | get year - Aljhun
  |--------------------------------------------------------------------------
  */ 		
	function getEmpname(ID){

		for(var i=0;i<EmployeeData.length;i++){
		
			if(EmployeeData[i].emp_id==ID){
				return EmployeeData[i].fname;
			}
		}

	}	
	
  /*
  |--------------------------------------------------------------------------
  | get year - Aljhun
  |--------------------------------------------------------------------------
  */ 		
 	function getFullYear(date){
 
 		var datestamp = new Date(date);
 		var year = datestamp.getFullYear();
 
 		return year;
 	}
 	
   /*
   |--------------------------------------------------------------------------
   | get table items - Aljhun
   |--------------------------------------------------------------------------
   */    
		function get_TableItems(Table,ColumnName,index){
			var items ="";
			for(var i=0; i<Table.getColumns().length ; i++){
			
				if(Table.getColumns()[i].getHeader().getText().toLowerCase()== ColumnName.toLowerCase()){
					//for(var j=0;j<Table.getSelectedItems()[index].length;j++){
						items = Table.getSelectedItems()[index].getCells()[i].getText()
					//}
				}
				
			}
			return items;
		}
	
	
	/*
    |--------------------------------------------------------------------------
    | Bind Asset Master Header and Child Items- Alj
    |--------------------------------------------------------------------------
    */

        function Bind_HeaderChild(){
		
			var c = innerJoin(AssetMList, AssetCHList, function (AssetMList, AssetCHList) {
			 	//console.log("s")
				if (AssetCHList.assetnum === AssetMList.assetnum) {
				
			 		return {
			 			
			 			assetnum			:AssetCHList.assetnum,			
			 			assetsubnum			:AssetCHList.assetsubnum,			
			 			assetdesc			:AssetCHList.assetdesc,			
			 			companycode			:AssetCHList.companycode,			
			 			assetclass			:AssetCHList.assetclass,			
			 			assetsernum			:AssetCHList.assetsernum,			
			 			assetloc			:AssetCHList.assetloc,			
			 			assetphsyloc		:AssetCHList.assetphsyloc,		
			 			costcenter			:AssetCHList.costcenter,			
			 			capdate				:AssetCHList.capdate,				
			 			deacdate			:AssetCHList.deacdate,			
			 			assetcost			:AssetCHList.assetcost,			
			 			assetnetbkval		:AssetCHList.assetnetbkval,		
			 			assetquantity		:AssetCHList.assetquantity,		
			 			assetum				:AssetCHList.assetum,				
			 			assetnote			:AssetCHList.assetnote,			
			 			asseteffectdate		:AssetCHList.asseteffectdate,		
			 			assetduration		:AssetCHList.assetduration,		
			 			tag					:AssetCHList.tag,					
			 			image_id			:AssetCHList.image_id,			
			 			sys_id				:AssetCHList.sys_id,				
			 			status_description	:AssetCHList.status_description,
			 			status_state		:setStatState(AssetCHList.status_description),
			 			assetChild			:AssetCHList.assetChild
			 			
			 			
			 		};
			 	}
			 });

			 
			//log(c,"All")
			
			AssetMList=c;
		
			Bind_Verify_TB(AssetMList);
			Bind_AssetNum(AssetMList);
			//log(AssetMList,"Asset Joint List");
			
			
        }
		
					
		function innerJoin(a, b, select) {
			var m = a.length, n = b.length, c = [];

			for (var i = 0; i < m; i++) {
					var x = a[i];
					c.push(x);//<<-----------Add if Parent is to be included even without any child items..
				for (var j = 0; j < n; j++) { 	   // cartesian product - all combinations
					
					var y = select(x, b[j]);  	// filter out the rows and columns you want
						if (y) c.push(y);         // if a row is returned add it to the table
						
				}
				
			}

			return c;
		}
	
	
	
	
	
	
	
	/*
   |--------------------------------------------------------------------------
   | Attach Value Help to Element Input - Aljhun
   |--------------------------------------------------------------------------
   */  
		
		
     function Attach_MValueHelp(func_id,func_title,func_sProperty){
        
		
		var SelecDialog = new sap.m.SelectDialog(func_id,{
                title: func_title,
					search : function(oEvent){
								var filter = [];
								var sVal = oEvent.getParameter("value");
								if(sVal !== undefined) {
									//Get the bound items
									var itemsBinding = oEvent.getParameter("itemsBinding");
						   
									// create the local filter to apply
									var selectFilter = new sap.ui.model.Filter(func_sProperty, sap.ui.model.FilterOperator.Contains , sVal);
									filter.push(selectFilter);
								
									// and apply the filter to the bound items, and the Select Dialog will update
									itemsBinding.filter(filter);
								}
							},
					liveChange: function(oEvent){
									var filter = [];
									var sVal = oEvent.getParameter("value");
									var sEventType = oEvent.getParameter("eventType");
									if(sVal !== undefined) {
										//Get the bound items
										var itemsBinding = oEvent.getParameter("itemsBinding");
								
										// create the local filter to apply
										var selectFilter = new sap.ui.model.Filter(func_sProperty, sap.ui.model.FilterOperator.Contains , sVal);
										filter.push(selectFilter);
									
										// and apply the filter to the bound items, and the Select Dialog will update
										itemsBinding.filter(filter);
									}
								},
				});
			
				return SelecDialog;	
        }
		
		function Attach_MValueHelpB(func_id,func_title,selCtrl){
        
		
		var SelecDialog = new sap.m.SelectDialog(func_id,{
                title: func_title,
				search : function(oEvent){
								var filter = [];
								var sVal = oEvent.getParameter("value");
								if(sVal !== undefined) {
									//Get the bound items
									var itemsBinding = oEvent.getParameter("itemsBinding");
						   
									// create the local filter to apply
									var selectFilter = new sap.ui.model.Filter(selCtrl.getSelectedKey(), sap.ui.model.FilterOperator.Contains , sVal);
									filter.push(selectFilter);
								
									// and apply the filter to the bound items, and the Select Dialog will update
									itemsBinding.filter(filter);
								}
							},
					liveChange: function(oEvent){
									var filter = [];
									var sVal = oEvent.getParameter("value");
									var sEventType = oEvent.getParameter("eventType");
									if(sVal !== undefined) {
										//Get the bound items
										var itemsBinding = oEvent.getParameter("itemsBinding");
								
										// create the local filter to apply
										var selectFilter = new sap.ui.model.Filter(selCtrl.getSelectedKey(), sap.ui.model.FilterOperator.Contains , sVal);
										filter.push(selectFilter);
									
										// and apply the filter to the bound items, and the Select Dialog will update
										itemsBinding.filter(filter);
									}
								},
				});
			
				return SelecDialog;	
        }
		
		
		
		function Bind_ValueHelp(Dialog,Element,Model_VHelp,Model_sPath,func_pTitle,func_pDesc){
		
			// set model & bind Aggregation
			Dialog.setModel(Model_VHelp, Model_sPath);
				// attach close listener
			Dialog.attachConfirm(function(evt) {
					 var selectedItem = evt.getParameter("selectedItem");
					 if (selectedItem) {
					 
							if(selectedItem.getTitle()!="" && selectedItem.getDescription()!=""){
								Element.setValue(selectedItem.getDescription()+" - "+selectedItem.getTitle());
							}
							
							if(selectedItem.getTitle()=="" && selectedItem.getDescription()!=""){
								Element.setValue(selectedItem.getDescription());
							}
							
							if(selectedItem.getTitle()!="" && selectedItem.getDescription()==""){
								Element.setValue(selectedItem.getTitle());
							}
							
							if(selectedItem.getTitle()=="" && selectedItem.getDescription()==""){
								Element.setValue("");
							}
							

							
					 }
			});
				
			var temp = new sap.m.StandardListItem({
					 title		:"{"+ Model_sPath + ">"+func_pTitle +"}",
					 description:"{"+ Model_sPath + ">"+func_pDesc +"}",
					 active: true
				 })
				
				Element.attachValueHelpRequest(
				   function () {
					   Dialog.open(Element.getValue());
					   Dialog.setModel(Model_VHelp, Model_sPath);
					   Dialog.bindAggregation("items", {
						   path: ""+Model_sPath+">/"+Model_sPath+"", 
						   template: temp
					   });
				   }
			   );
			   
		
		
		}

	 /*
     |--------------------------------------------------------------------------
     | Attach Array JSON.stringify
     |--------------------------------------------------------------------------
     */ 		
	 	
 	function log(data,title){
 		console.log(JSON.stringify(title));
 		console.log(JSON.stringify(data));
 	}		
		
	/*
    |--------------------------------------------------------------------------
    | Convert Numeric With Delimiter - added by John
    |--------------------------------------------------------------------------
    */ 		

	function fn_convert_numeric_with_delimiter(nStr, inD, outD, sep) {
		nStr += '';
		var dpos = nStr.indexOf(inD);
		var nStrEnd = '';
		
			if (dpos != -1) {
				nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
				nStr = nStr.substring(0, dpos);
			}
		
		var rgx = /(\d+)(\d{3})/;
		
			while (rgx.test(nStr)) {
				nStr = nStr.replace(rgx, '$1' + sep + '$2');
			}
		return nStr + nStrEnd;
	}
	
	/*
    |--------------------------------------------------------------------------
    | Format Number with Decimal and Comma
    |--------------------------------------------------------------------------
    */ 		
		
	function formatNumber(number){
		number = parseFloat(number);
		number = number.toFixed(2) + '';
		x = number.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}
	
	/*
    |--------------------------------------------------------------------------
    | Convert String to Numbers - added by John
    |--------------------------------------------------------------------------
    */ 	

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
	
	
	/*
    |--------------------------------------------------------------------------
    | Convert String to UPPERCASE or lowercase - added by Jullie
    |--------------------------------------------------------------------------
    */ 	

	function  fn_convert_string_case(p_string, p_string_format){
			
		var lv_string;
			
		if(typeof p_string == 'string' || p_string instanceof String){
			lv_string = p_string;
		}else{
			lv_string = String(p_string);
		}
			
		var lv_return_string;
		
		switch(p_string_format){
			case("uppercase"):{
				lv_return_string = lv_string.toUpperCase();
			}break;
			case("lowercase"):{
				lv_return_string = lv_string.toLowerCase();
			}break;
			default:lv_return_string = lv_string;break;
		}
			
			return lv_return_string;

		}
		
		
	/*
    |--------------------------------------------------------------------------
    | CURRENCY CONVERSION VERSION 2
    |--------------------------------------------------------------------------
    */ 	
	function fn_Currency_Convertion(lv_Pricing_Date,lv_Base_Currency,lv_From_Currency,lv_To_Currency,lt_Items_To_Compute,fn_callback_Success,fn_callback_Failed){
			
		// (1)SAME CURRENCY CONVERTION
		if(lv_From_Currency == lv_To_Currency){
				console.log("FAILED: (1)SAME CURRENCY CONVERTION");
				fn_callback_Failed();
			
		// (2)FROM BASE CURRENCY CONVERTING TO ANOTHER CURRENCY
		}else if(lv_From_Currency == lv_Base_Currency){
					
				fn_convert_currency(lv_To_Currency,true,function(){ //FAIL CALLBACK
						console.log("FAILED: (2)FROM BASE CURRENCY CONVERTING TO ANOTHER CURRENCY");
						fn_callback_Failed();
					
				},function(result){//SUCCESS CALLBACK
						console.log("SUCCESS: (2)FROM BASE CURRENCY CONVERTING TO ANOTHER CURRENCY");					
						//console.log(result);							
						
						// IF parameter lt_Items_To_Compute has items. Compute and return converted values.
						var lv_returned_operand  	=  result[0].operand;
						var lv_returned_rate 		=  result[0].rate;
						var lv_returned_curr		=  result[0].currency;							

						for(var i=0; i < lt_Items_To_Compute.length; i++){
						
								for(x in lt_Items_To_Compute[i]){
										
										if(lv_returned_operand != "/"){
											lt_Items_To_Compute[i][x] =  parseFloat( lt_Items_To_Compute[i][x]   *  lv_returned_rate  );
										}else{
											lt_Items_To_Compute[i][x] =  parseFloat( lt_Items_To_Compute[i][x]   /  lv_returned_rate  );
										}									
								}
						
						}
						
						var lv_return = {
								from_currency		:lv_From_Currency,
								to_currency			:lv_To_Currency,
								exchange_rate		:lv_returned_rate,
								operand				:lv_returned_operand,
								converted_items		:lt_Items_To_Compute
						};
						
						fn_callback_Success(lv_return);
				},lv_Pricing_Date);
		// (3)FROM ANOTHER CURRENCY CONVERTING TO BASE CURRENCY
		}else if(lv_To_Currency == lv_Base_Currency){
		
				fn_convert_currency(lv_From_Currency,false,function(){ //FAIL CALLBACK							
						console.log("FAILED: (3)FROM ANOTHER CURRENCY CONVERTING TO BASE CURRENCY");	
						fn_callback_Failed();
						
				},function(result){//SUCCESS CALLBACK
						console.log("SUCCESS: (3)FROM ANOTHER CURRENCY CONVERTING TO BASE CURRENCY");					
						//console.log(result);	

						// IF parameter lt_Items_To_Compute has items. Compute and return converted values.
						var lv_returned_operand  	=  result[0].operand;
						var lv_returned_rate 		=  result[0].rate;
						var lv_returned_curr		=  result[0].currency;							

						for(var i=0; i < lt_Items_To_Compute.length; i++){
						
								for(x in lt_Items_To_Compute[i]){
										
										if(lv_returned_operand != "/"){
											lt_Items_To_Compute[i][x] =  parseFloat( lt_Items_To_Compute[i][x]   *  lv_returned_rate  );
										}else{
											lt_Items_To_Compute[i][x] =  parseFloat( lt_Items_To_Compute[i][x]   /  lv_returned_rate  );
										}									
								}
						
						}
						
						var lv_return = {
								from_currency		:lv_From_Currency,
								to_currency			:lv_To_Currency,
								exchange_rate		:lv_returned_rate,
								operand				:lv_returned_operand,
								converted_items		:lt_Items_To_Compute
						};
						
						fn_callback_Success(lv_return);								
				},lv_Pricing_Date);
		
		// (4)CONVERTING FROM ANOTHER CURRENCY TO ANOTHER CURRENCY		 
		}else{
				
				// fn_convert_currency(lv_To_Currency,false,function(){ //FAIL CALLBACK
						
				//		console.log("FAILED: (4)CONVERTING FROM ANOTHER CURRENCY TO ANOTHER CURRENCY");	
				//		fn_callback_Failed();
						
				// },function(result){ //SUCCESS CALLBACK
					
					// checking if TO CURRENCY is existing

					// (4.1)IF TO CURRENCY EXIST, start converting FROM CURRENCY to BASE CURRENCY
					fn_convert_currency(lv_From_Currency,false,function(){ //FAIL CALLBACK
							console.log("FAILED: (4.1)IF TO CURRENCY EXIST, start converting FROM CURRENCY to BASE CURRENCY");	
							fn_callback_Failed();
						
					},function(result){ //SUCCESS CALLBACK
							console.log("SUCCESS: (4.1)IF TO CURRENCY EXIST, start converting FROM CURRENCY to BASE CURRENCY");	
							//console.log(result);
							
							// IF parameter lt_Items_To_Compute has items. Compute values.
							var lv_returned_operand = result[0].operand;
							var lv_returned_rate 	= result[0].rate;
							var lv_returned_curr 	= result[0].currency;
						
							for(var i=0; i < lt_Items_To_Compute.length; i++){
							
									for(x in lt_Items_To_Compute[i]){
											
											if(lv_returned_operand != "/"){
												lt_Items_To_Compute[i][x] =  parseFloat( lt_Items_To_Compute[i][x]   *  lv_returned_rate  );
											}else{
												lt_Items_To_Compute[i][x] =  parseFloat( lt_Items_To_Compute[i][x]   /  lv_returned_rate  );
											}									
									}
							
							}
							
							
							// (4.2)IF TO CURRENCY EXIST, next convert BASE CURRENCY to ANOTHER CURRENCY
							
							fn_convert_currency(lv_To_Currency,true,function(){//FAIL CALLBACK
									console.log("FAILED: (4.2)IF TO CURRENCY EXIST, next convert BASE CURRENCY to ANOTHER CURRENCY");	
									fn_callback_Failed();
									
							},function(result){//SUCCESS CALLBACK
									console.log("SUCCESS: (4.2)IF TO CURRENCY EXIST, next convert BASE CURRENCY to ANOTHER CURRENCY");	
									//console.log(result);
									
									var lv_returned_operand = result[0].operand;
									var lv_returned_rate 	= result[0].rate;
									var lv_returned_curr 	= result[0].currency;
									
									
									for(var i=0; i<lt_Items_To_Compute.length; i++){
					
										for(x in lt_Items_To_Compute[i]){
												
												if(lv_returned_operand!="/"){
													lt_Items_To_Compute[i][x] =  parseFloat( lt_Items_To_Compute[i][x]   *  lv_returned_rate  );
												}else{
													lt_Items_To_Compute[i][x] =  parseFloat( lt_Items_To_Compute[i][x]   /  lv_returned_rate  );
												}
										
										}
									
									}
										
									var lv_return = {
											from_currency		:lv_From_Currency,
											to_currency			:lv_To_Currency,
											exchange_rate		:lv_returned_rate,
											operand				:lv_returned_operand,
											converted_items		:lt_Items_To_Compute
									};
									
									fn_callback_Success(lv_return);
								
							},lv_Pricing_Date);
							
					},lv_Pricing_Date);
				
					
				// },lv_Pricing_Date);
		}
	
	}
	
	/*
    |--------------------------------------------------------------------------
    | Convert currency - added
    |--------------------------------------------------------------------------
    */ 	
	
	function fn_convert_currency(lv_selected_currency, lv_reverse_flag, fn_Failed, fn_Success,lv_selected_pricing_date){

		var lv_selected_currency = lv_selected_currency.toUpperCase();
		
		var lv_pricing_date = "";		
		lv_selected_pricing_date ? lv_pricing_date = lv_selected_pricing_date : lv_pricing_date = "";
		
		
		var array_result = [];
			
		var getCurrency = { 
			action : ["1","Global_Query","005"],
			items:{
				"frCurr": lv_selected_currency,				
				"pricingDate": lv_pricing_date,
			} 
		};		 
		
		
		callservice_php(getCurrency, "", "", "", "", function(result){
			
			if(result.return.status == "01") {
				for(var i =0; i < result.dataitem.length; i++){
				
				var lv_exch_rate = "";
				var lv_operand = "";
				
				// revised by John - see below new code
				// if(lv_reverse_flag === true){
				// 	if(result.dataitem[i].rate.indexOf('/') >= 0){
				// 		lv_exch_rate = result.dataitem[i].rate.split('/');
				// 		lv_exch_rate = lv_exch_rate[1];
				// 		lv_operand = "/";
				// 	}else{
				// 		lv_exch_rate =result.dataitem[i].rate;
				// 		lv_operand = "/";
				// 	}
				// 
				// }
				
				// reverse operation
				if(lv_reverse_flag === true){
					if(result.dataitem[i].rate.indexOf('/') >= 0){
						lv_exch_rate = result.dataitem[i].rate.split('/');
						lv_exch_rate = lv_exch_rate[1];
						lv_operand = "*";
					}else{
						lv_exch_rate =result.dataitem[i].rate;
						lv_operand = "/";
					}
				// default operation
				} else {
					if(result.dataitem[i].rate.indexOf('/') >= 0){
						lv_exch_rate = result.dataitem[i].rate.split('/');
						lv_exch_rate = lv_exch_rate[1];
						lv_operand = "/";
					}else{
						lv_exch_rate =result.dataitem[i].rate;
						lv_operand = "*";
					}
				
				
				}
				
					array_result.push({
						currency:  result.dataitem[i].toc,
						rate: lv_exch_rate, //(lv_exch_rate || "") ?  lv_exch_rate : result.dataitem[i].rate,
						operand: lv_operand //(lv_operand ||"") ? lv_operand : "*"						
					});	
				}
				fn_Success(array_result);
				
				//console.log(array_result);
					
			}else{
				fn_show_notification_message("No Exchange rate available"); 
				
				fn_Failed();
			}
			
		
		}); 
		
	
	
	}
	
	/*
    |--------------------------------------------------------------------------
    | FREEZE COLUMN
    |--------------------------------------------------------------------------
    */ 

		function fn_freeze_headers(table_name, container, layout){
			
			var lv_table_name = $('#'+table_name+' table:eq(0)').attr('id');
			var lv_scroll_container = String(container);
			var lv_layout = "";
			
			if(typeof layout === 'undefined'){
				lv_layout = "fixed";
			}else{
				lv_layout = layout;
			}
			
			setTimeout(function(){
				var lo_table = $('#'+lv_table_name);
				lo_table.floatThead({
					scrollContainer: function(lo_table){
						return lo_table.closest('#'+lv_scroll_container);
					},
					//copyTableClass:false,
					useAbsolutePositioning: true
				});
			
				$('.floatThead-table').attr('style','table-layout:'+lv_layout+' !important;');
				
			}, 1000);
			
		
		
			
		}
		
		
		function fn_freeze_headers_v2(lv_table_name, lv_table_container){
	
			var lo_table = $('#'+lv_table_name);
				lo_table.floatThead({
					scrollContainer: function(lo_table){
						return lo_table.closest('#'+lv_table_container);
					},				
					useAbsolutePositioning: true
				});
		}
		
		/*
		|--------------------------------------------------------------------------
		| CONVERT TIME TO 24 HOUR FORMAT
		|--------------------------------------------------------------------------
		*/ 
	
	
		function fn_convert_timeformat(str) {
			
			if(str != ''){
				var time = String(str);
				var hours = Number(time.match(/^(\d+)/)[1]);
				var minutes = Number(time.match(/:(\d+)/)[1]);
				var AMPM = time.match(/\s(.*)$/)[1];
				if (AMPM == "PM" && hours < 12) hours = hours + 12;
				if (AMPM == "AM" && hours == 12) hours = hours - 12;
				var sHours = hours.toString();
				var sMinutes = minutes.toString();
				if (hours < 10) sHours = "0" + sHours;
				if (minutes < 10) sMinutes = "0" + sMinutes;
				
				return sHours + ":" + sMinutes;
			}else{
				return "00:00";
			}
			
		}
	
	

function fn_format_datetime(p_string_datetime,p_string_format){
	var lv_date = new Date(p_string_datetime);
	
	//if date is invalid - assign current date
	if(isNaN(lv_date)){
		lv_date = new Date();
	}
	
	var lv_return_string;
	switch(p_string_format){
		case "DD MM YYYY": {
								lv_month_string = lv_date.getMonth() + 1;
								lv_month_string = ( parseInt(lv_month_string) < 10 ? '0'+lv_month_string : lv_month_string );
								lv_return_string = ( lv_date.getDate() < 10 ? '0'+lv_date.getDate() : lv_date.getDate() ) 
												+ ' ' 
												+ lv_month_string
												+ ' '
												+  lv_date.getFullYear() ;
							} break;
		case "YYYY-MM-DD": {
								lv_month_string = lv_date.getMonth() + 1;
								lv_month_string = ( parseInt(lv_month_string) < 10 ? '0'+lv_month_string : lv_month_string);
								lv_return_string = lv_date.getFullYear() 
												+'-'
												+ lv_month_string
												+'-'
												+ ( lv_date.getDate() < 10 ? '0'+lv_date.getDate() : lv_date.getDate() );
							} break;
		case "YYYY-MM": {
										lv_month_string = lv_date.getMonth() + 1;
										lv_month_string = ( parseInt(lv_month_string) < 10 ? '0'+lv_month_string : lv_month_string);
										lv_return_string = lv_date.getFullYear() 
														+'-'
														+ lv_month_string;
									} break;
		case "DD/MM/YYYY": {
								lv_month_string = lv_date.getMonth() + 1;
								lv_month_string = ( parseInt(lv_month_string) < 10 ? '0'+lv_month_string : lv_month_string);
								lv_return_string = ( lv_date.getDate() < 10 ? '0'+lv_date.getDate() : lv_date.getDate() )
												+'/'
												+ lv_month_string
												+'/'
												+ lv_date.getFullYear();
									
							} break;						
		case "DD MMM YYYY": {
								lv_return_string = ( lv_date.getDate() < 10 ? '0'+String(lv_date.getDate()) : lv_date.getDate() ) 
												+ ' ' 
												+ (lv_date.toDateString().substring(4)).substring(0,3)
												+ ' '
												+  lv_date.getFullYear() ;
							} break;
		case "DAY DD MMM YYYY": {
								var lt_weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

								lv_return_string = (lt_weekday[lv_date.getDay()])
												+ ', '
												+ ( lv_date.getDate() < 10 ? '0'+String(lv_date.getDate()) : lv_date.getDate() ) 
												+ ' ' 
												+ (lv_date.toDateString().substring(4)).substring(0,3)
												+ ' '
												+  lv_date.getFullYear() ;
							} break;
		case "HH:MM:SS AMPM":	{
								var lv_hours = lv_date.getHours();
								var lv_minutes = lv_date.getMinutes();
								var lv_seconds = lv_date.getSeconds();
								var lv_ampm = lv_hours >= 12 ? 'PM' : 'AM';
								lv_hours = lv_hours % 12;
								lv_hours = lv_hours ? lv_hours : 12;
								lv_minutes = lv_minutes < 10 ? '0'+lv_minutes : lv_minutes;
								lv_seconds = lv_seconds < 10 ? '0'+lv_seconds : lv_seconds;
								lv_return_string = lv_hours+':'+lv_minutes+':'+lv_seconds+' ' +lv_ampm;
								
							} break;
		case "HH:MM:SS":	{
								var lv_hours = lv_date.getHours();
								var lv_minutes = lv_date.getMinutes();
								var lv_seconds = lv_date.getSeconds();
								lv_hours = lv_hours < 10 ? '0'+lv_hours : lv_hours;
								lv_minutes = lv_minutes < 10 ? '0'+lv_minutes : lv_minutes;
								lv_seconds = lv_seconds < 10 ? '0'+lv_seconds : lv_seconds;
								lv_return_string = lv_hours+':'+lv_minutes+':'+lv_seconds;
							} break;
		case "MMM yyyy": {
						lv_return_string = (lv_date.toDateString().substring(4)).substring(0,3)
										+ ' '
										+  lv_date.getFullYear() ;
					} break;
									
		default : lv_return_string = lv_date.toDateString(); break;
	}

	return lv_return_string;
}
 
function fn_validate_dateFormat(dateString,formatString,errorString) {
	var return_booleanStr;
	switch(formatString){
		case "DD MMM YYY" : {
								var regEx = /^(1|2|3|4|5|6|7|8|9|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31)\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s\d{4}$/;
								return_booleanStr = dateString.toUpperCase().match(regEx) != null;
							} break;
		
		default : 			{
								return_booleanStr = false;
							} break;
	}
	
	// if error string has value and does not match correct format
	if(errorString && !return_booleanStr){
		fn_show_notification_message(errorString);
	}
	
	return return_booleanStr;
} 

function fn_show_notification_message (message) {
	
	if(document.getElementsByClassName("ns-box ns-growl ns-effect-slide ns-type-notice ns-show").length==0){
	
		new neko.control.Notification({
			message 	: message,
			type 		: "notice",
			layout 		: "growl",
			effect		: "slide ",		
			//durability	: 2500, 
			durability	: 5000, 
			
		}).show();
	
	}	
	
}

var global_counter = 0;
function fn_create_confirm_leave_page(){
	
	$("body").prepend("<a id='noback' style='display:none;'></a><a id='noback_again' style='display:none;'></a>");
	
	window.location.hash = "noback";
	window.location.hash = "noback_again";
	window.onhashchange = function(){ 
		global_counter++;
		window.location.hash="noback";
		if(global_counter >= 3 && global_counter % 2 == 0){
			go_dialog_confirm_leave_page.open();
		}
		
	}
	
	//declare Confirmation Box - this will open when click on Browser Back Button
	go_dialog_confirm_leave_page = new sap.m.Dialog({
		title: "Confirmation",
		contentWidth : "100px",
		contentHeight : "50px",		
		beginButton:  new sap.m.Button({text:"Ok" , icon: "sap-icon://accept", type: "Accept" ,press:function(oEvt){ 
			go_dialog_confirm_leave_page.close();
			//window.location.href = MainPageLink;
			console.log(document.referrer);
			if(String(document.referrer).length > 0){
				window.location.href = document.referrer;
			} else {
				//window.onhashchange = function(){};
				//window.history.back();
				//window.history.back();
				window.location.href = MainPageLink;
			}
			
			
			
		}}),
		endButton: new sap.m.Button({text:"Cancel", icon: "sap-icon://decline", type: "Reject" ,press:function(oEvt){ 
			go_dialog_confirm_leave_page.close(); 
		}}),
		content:[			
			new sap.m.Label({text:"Are you sure you want to navigate away from this page?"}),
		],
	}).addStyleClass('sapUiSizeCompact');
}


var bsortflag = true;
var fn_add_sorting_arrow = function(){};
function fn_sort_table_column(oEvt,oProperty,oIndex,oFieldType,oGrouping){	
	
	function fn_show_busy_dialog(message){ 
		return new sap.m.BusyDialog({
			text:message,
			//customIcon:'../image/loader/fiori.gif',  
			//customIconRotationSpeed: 2000
		}).addStyleClass('GLOBAL_BUSY_DIALOG'); 
	}
	var lo_busydialog = fn_show_busy_dialog("");
		lo_busydialog.open();
	
	
	var lv_table = oEvt.getSource().getParent().getParent();
	
	//check if Table is binded
	if(lv_table.getBindingInfo("items")){
	
		//get event values
		var lv_column_id = oEvt.getSource().getId();	
		var lv_column_index = oEvt.getSource().getParent()._index;
	
		var lv_template = lv_table.getBindingInfo("items").template;
		var lv_column_property = "";
		if(typeof oProperty == "string") {
			lv_column_property = oProperty;
		} else {		
				if(oIndex){
					lv_column_index = oIndex;
				}
				
				var lv_object = lv_table.getBindingInfo("items").template.mAggregations.cells[lv_column_index];
				
				
				
				if(lv_object.hasOwnProperty('mBindingInfos')){
					
					if ( lv_column_property == "" && lv_object.mBindingInfos.hasOwnProperty('text') ) {
						lv_column_property = lv_object.mBindingInfos.text.parts[0].path;	
					}
					
					if ( lv_column_property == "" && lv_object.mBindingInfos.hasOwnProperty('value') ) {
						lv_column_property = lv_object.mBindingInfos.value.parts[0].path;			
					}
					
					if ( lv_column_property == "" && lv_object.mBindingInfos.hasOwnProperty('state') ) {
						lv_column_property = lv_object.mBindingInfos.state.parts[0].path;		
					}
				}
				
				//overwrite lv_column_property base on mapping in oProperty
				for (x in oProperty) {
					if(lv_column_property == x){
						lv_column_property = oProperty[x];					
						break;
					}
				}
		
		}
		
		console.log(lv_column_index);
		console.log("column to be sorted: "+lv_column_property);
		
		//if column is not yet sorted, it will initially set as ascending
		if(($('#'+lv_column_id).html()).indexOf('&nbsp;') === -1){
			bsortflag = true;
		}
		
		//get filter from binding items
		var lt_filters = lv_table.getBindingInfo("items").filters;	
		
		var lt_items = JSON.parse(lv_table.getModel().getJSON());
		
		//check if data has path
		var lv_data_path = "";
		var lv_data_type;
		var lv_check_type = {}.toString;
		if(lv_check_type.call(lt_items).indexOf('Array') === -1){		
			lv_data_type = "Object";		
			for (x in lt_items) {
				lv_data_path = x;
				break;
			}
		} else {
			lv_data_type = "Array";		
		}
		
		
		// JOHN 08172015		
		//remove float or freeze table header before it will recreate table control after rebinding
		var lv_table_id = lv_table.getId();
		var lo_table = $('#'+lv_table_id+'-listUl');
			lo_table.floatThead('destroy');		
		
		function fn_restructure_data_format(a, b, oFieldType){
			
			var a_data;
			var b_data;
			
			switch(oFieldType){
			
				case "number": {
						a_data = parseInt(fn_convert_to_numeric(a) * 1000);
						b_data = parseInt(fn_convert_to_numeric(b) * 1000);
				} break;
					
				case "date": {
						a_data = fn_format_datetime(a,"YYYY-MM-DD");
						b_data = fn_format_datetime(b,"YYYY-MM-DD");
				} break;			
					
				default : {
						a_data = a;
						b_data = b;
				} break;
			}
			
			return {"a":a_data, "b":b_data};
		
		}
		
		//before binding, remove the update finish function		
		lv_table.detachUpdateFinished(fn_add_sorting_arrow);
			
		if(bsortflag){
			//ASCENDING	
			
			if(oFieldType && (oFieldType == "number" || oFieldType == "date" ) ){
				
				// Manual sorting for numeric			
				if(lv_data_type == "Object"){
					// lt_items = { ArrayName : Array }
					lt_items[lv_data_path].sort(function (a, b) {
						var lo_data = fn_restructure_data_format(a[lv_column_property],b[lv_column_property],oFieldType);						
						return lo_data.a < lo_data.b ? -1 : lo_data.a > lo_data.b ? 1 : 0 ;
					});
					
				} else {
					// lt_items = Array
					lt_items.sort(function (a, b) {	
						var lo_data = fn_restructure_data_format(a[lv_column_property],b[lv_column_property],oFieldType);
						return lo_data.a < lo_data.b ? -1 : lo_data.a > lo_data.b ? 1 : 0 ;
					});
				
				}			
				
				// Binding
				if( 
					(lv_data_type == "Object" && lt_items[lv_data_path].length > 0) || 
					(lv_data_type == "Array" && lt_items.length > 0)
				  ){				
					lv_table.getModel().setData(lt_items);			
					lv_table.bindAggregation("items", {
						path: "/"+lv_data_path,
						template: lv_template,
						filters : lt_filters,
					});
				}
				
			} else {

				var lt_sorter = [];
				
				if(oGrouping ){
					lt_sorter.push(new sap.ui.model.Sorter(oGrouping, false, true));
					lt_sorter.push(new sap.ui.model.Sorter(lv_column_property, false, false));
				} else {
					lt_sorter.push(new sap.ui.model.Sorter(lv_column_property, false, false));
				}

				
			
				// Binding			
				if( 
					(lv_data_type == "Object" && lt_items[lv_data_path].length > 0) || 
					(lv_data_type == "Array" && lt_items.length > 0)
				  ){
					lv_table.getModel().setData(lt_items);			
					lv_table.bindAggregation("items", {
						path: "/"+lv_data_path,
						template: lv_template,
						filters : lt_filters,
						sorter: lt_sorter
					});
				}
			}
			
			
			//after binding, add arrow pointing up
			if( 
					(lv_data_type == "Object" && lt_items[lv_data_path].length > 0) || 
					(lv_data_type == "Array" && lt_items.length > 0)
			){	
				fn_add_sorting_arrow = function(){
					$('#'+lv_column_id).append("&nbsp;&#9650;");
					
					lv_table.detachUpdateFinished(fn_add_sorting_arrow);
				};

				lv_table.attachUpdateFinished(fn_add_sorting_arrow);
			}
			
		} else {	
			//DESCENDING	
			
			if(oFieldType && (oFieldType == "number" || oFieldType == "date") ){

				// Manual sorting for numeric			
				if(lv_data_type == "Object"){
					// lt_items = { ArrayName : Array }
					lt_items[lv_data_path].sort(function (a, b) {
						var lo_data = fn_restructure_data_format(a[lv_column_property],b[lv_column_property],oFieldType);						
						return lo_data.a < lo_data.b ? 1 : lo_data.a > lo_data.b ? -1 : 0 ; 
					});
					
				} else {
					// lt_items = Array
					lt_items.sort(function (a, b) {	
						var lo_data = fn_restructure_data_format(a[lv_column_property],b[lv_column_property],oFieldType);
						return lo_data.a < lo_data.b ? 1 : lo_data.a > lo_data.b ? -1 : 0 ; 
					});
				
				}			
				
				// Binding
				if( 
					(lv_data_type == "Object" && lt_items[lv_data_path].length > 0) || 
					(lv_data_type == "Array" && lt_items.length > 0)
				  ){
					lv_table.getModel().setData(lt_items);			
					lv_table.bindAggregation("items", {
						path: "/"+lv_data_path,
						template: lv_template,
						filters : lt_filters,
					});
				}
				
				
			} else {
				var lt_sorter = [];
				if(oGrouping ){
					lt_sorter.push(new sap.ui.model.Sorter(oGrouping, false, true));
					lt_sorter.push(new sap.ui.model.Sorter(lv_column_property, true, false));
				} else {
					lt_sorter.push(new sap.ui.model.Sorter(lv_column_property, true, false));
				}
			
				// Binding
				if( 
					(lv_data_type == "Object" && lt_items[lv_data_path].length > 0) || 
					(lv_data_type == "Array" && lt_items.length > 0)
				  ){
					lv_table.getModel().setData(lt_items);			
					lv_table.bindAggregation("items", {
						path: "/"+lv_data_path,
						template: lv_template,
						filters : lt_filters,
						sorter: lt_sorter
					});
				}
				
			}
		
			//after binding, add arrow pointing down
			if( 
					(lv_data_type == "Object" && lt_items[lv_data_path].length > 0) || 
					(lv_data_type == "Array" && lt_items.length > 0)
			){		
				fn_add_sorting_arrow = function(){
					$('#'+lv_column_id).append("&nbsp;&#9660;");
					
					lv_table.detachUpdateFinished(fn_add_sorting_arrow);
				};

				lv_table.attachUpdateFinished(fn_add_sorting_arrow);		
			}
		}
		
		// JOHN 08172015
		// add float or freeze table headers
		if (typeof fn_freeze_so_table_header === "function") { 
			setTimeout(function(){
				fn_freeze_so_table_header();
				lo_busydialog.close();
			}, 500);
		} else if (typeof fn_freeze_table_header === "function") { 
			setTimeout(function(){
				fn_freeze_table_header();
				lo_busydialog.close();
			}, 500);
		} else {
			lo_busydialog.close();
		}
		
		
		//change value of sort flag
		bsortflag = !bsortflag;		
	}
	else {
		// no data and template binded to table
		lo_busydialog.close();
	}
}

function fn_show_busy_dialog(message){
	return new sap.m.BusyDialog({
		text:message,
		//customIcon:'../image/loader/fiori.gif',
		//customIconRotationSpeed: 2000
	}).addStyleClass('GLOBAL_BUSY_DIALOG');
}

function fn_sort_table_column_vbox(oEvt,oProperty,oIndex){	
	
	function fn_show_busy_dialog(message){ 
		return new sap.m.BusyDialog({
			text:message,
			//customIcon:'../image/loader/fiori.gif',  
			//customIconRotationSpeed: 2000
		}).addStyleClass('GLOBAL_BUSY_DIALOG'); 
	}
	var lo_busydialog = fn_show_busy_dialog("");
		lo_busydialog.open();
		
	//get event values
	
	var lv_table = oEvt.getSource().getParent().getParent();	
	//check if Table is binded
	if(lv_table.getBindingInfo("items")){
		
		var lv_column_id = oEvt.getSource().getId();	
		var lv_column_index = oEvt.getSource().getParent()._index;
		var lv_template = lv_table.getBindingInfo("items").template;
		
		if(oIndex){
			lv_column_index = oIndex;
		}
		
		var lv_object = lv_table.getBindingInfo("items").template.mAggregations.cells[lv_column_index];
			// vbox - first item
			lv_object = lv_object.mAggregations.items[0];

		var lv_column_property = "";
		
		if(lv_object.hasOwnProperty('mBindingInfos')){
			
			if ( lv_object.mBindingInfos.hasOwnProperty('text') ) {
				lv_column_property = lv_object.mBindingInfos.text.parts[0].path;	//for controls with property text		
			}
			
			if ( lv_object.mBindingInfos.hasOwnProperty('value') ) {
				lv_column_property = lv_object.mBindingInfos.value.parts[0].path;	//for controls with property value		
			}
		}
		
		console.log(lv_column_index);
		console.log("column to be sorted: "+lv_column_property);
		
		//if column is not yet sorted, it will initially set as ascending
		if(($('#'+lv_column_id).html()).indexOf('&nbsp;') === -1){
			bsortflag = true;
		}
		
		//overwrite lv_column_property base on mapping in oProperty
		for (x in oProperty) {
			if(lv_column_property == x){
				lv_column_property = oProperty[x];		
				console.log("new column to be sorted: "+lv_column_property);
				break;
			}
		}
		
		
		//get filter from binding items
		var lt_filters = lv_table.getBindingInfo("items").filters;	
		
		var lt_items = JSON.parse(lv_table.getModel().getJSON());
		
		//check if data has path
		var lv_data_path = "";
		var lv_check_type = {}.toString;
		if(lv_check_type.call(lt_items).indexOf('Array') === -1){		
			console.log("Data Model is type Object");
			for (x in lt_items) {
				lv_data_path = x;
				break;
			}
		} else {
			console.log("Data Model is type Array");		
		}
		
		// JOHN 08172015		
		//remove float or freeze table header before it will recreate table control after rebinding
		var lv_table_id = lv_table.getId();
		var lo_table = $('#'+lv_table_id+'-listUl');
			lo_table.floatThead('destroy');		
			
		//before binding, remove the update finish function
		lv_table.detachUpdateFinished(fn_add_sorting_arrow);
			
		if(bsortflag){
			//ASCENDING
			//set model with sorted array
			lv_table.getModel().setData(lt_items);
			
			lv_table.bindAggregation("items", {
				path: "/"+lv_data_path,
				template: lv_template,
				filters : lt_filters,
				sorter: new sap.ui.model.Sorter(lv_column_property, false, false)
			});
			
			//after binding, add arrow pointing up
			if( 
					(lv_data_type == "Object" && lt_items[lv_data_path].length > 0) || 
					(lv_data_type == "Array" && lt_items.length > 0)
			){		
				fn_add_sorting_arrow = function(){
					$('#'+lv_column_id).append("&nbsp;&#9650;");
					
					lv_table.detachUpdateFinished(fn_add_sorting_arrow);
				};
				
				lv_table.attachUpdateFinished(fn_add_sorting_arrow);
			}
			
		} else {
			//DESCENDING		
			//set model with sorted array
			lv_table.getModel().setData(lt_items);
			
			lv_table.bindAggregation("items", {
				path: "/"+lv_data_path,
				template: lv_template,
				filters : lt_filters,
				sorter: new sap.ui.model.Sorter(lv_column_property, true, false)
			});
			
			
			//after binding, add arrow pointing down
			if( 
					(lv_data_type == "Object" && lt_items[lv_data_path].length > 0) || 
					(lv_data_type == "Array" && lt_items.length > 0)
			){			
				fn_add_sorting_arrow = function(){
					$('#'+lv_column_id).append("&nbsp;&#9660;");
					
					lv_table.detachUpdateFinished(fn_add_sorting_arrow);
				};
				
				lv_table.attachUpdateFinished(fn_add_sorting_arrow);
			}
		}
		
		// JOHN 08172015
		// add float or freeze table headers
		if (typeof fn_freeze_so_table_header === "function") { 
			setTimeout(function(){
				fn_freeze_so_table_header();
				lo_busydialog.close();
			}, 500);
		} else if (typeof fn_freeze_table_header === "function") { 
			setTimeout(function(){
				fn_freeze_table_header();
				lo_busydialog.close();
			}, 500);
		} else {
			lo_busydialog.close();
		}
		
		
		//change value of sort flag
		bsortflag = !bsortflag;		
	}
	else {
		// no data and template binded to table
		lo_busydialog.close();
	}
}


function fn_get_user_param(lv_param_id){
	var lv_return_value = "";
	// if open in new tab, user_params is empty and will reassign value when redirect to main listing
	var lt_user_params = UI5Storage.get("user_params") || [];
	
	for(i=0; i < lt_user_params.length; i++){
		if(lt_user_params[i].PARAM_ID == lv_param_id){
			lv_return_value = lt_user_params[i].VALUE;
			break;
		}
	}
	
	return lv_return_value;
}

function fn_open_new_window(url, title, w, h) {
	    // Fixes dual-screen position                         Most browsers      Firefox
	    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

	    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

	    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
	    var top = ((height / 2) - (h / 2)) + dualScreenTop;
	    var newWindow = window.open(url, title, 'directories=no,toolbar=0,location=0,menubar=0,scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

	    // Puts focus on the newWindow
	    //if (window.focus) {
	    //    newWindow.focus();
	    //}
	}


	function fn_help_button(app_id , sub_app){
	
		var lv_url = "/admin/users/management/show_help/"+app_id+"/"+sub_app;

		return new sap.m.Button({
                icon:"sap-icon://sys-help",
                press: function(){
                    
                    var lv_help = JSON.parse('{"app_id":"'+app_id+'","sub_app":"'+sub_app+'"}')
					lv_help=JSON.stringify(lv_help);
					
					fn_open_new_window(lv_url,'xtf','1200','600');
                }
        });
	}
	
	//this function will get the left panel menu based on glbmfunctiontxt
	//will use the app id to filter what app to be called
	function fn_get_left_panel(lv_app_id, callback){
	
		var gt_left_menu = [];
		
		$.ajax({
			url:"/admin/users/management/get_left_panel/"+lv_app_id, 
			type: "GET",
		}).done(function (response){
			if(response.return.status == "01"){
				gt_left_menu = response.glbmfunctiontxt;
			}else{
				gt_left_menu = [];
			}

			return callback(gt_left_menu);
		}).fail(function(XHR, textStatus, errorThrown){   
			gt_left_menu = [];
			return callback(gt_left_menu);
		});
		
		
	}
	
	function fn_get_url_location(){
	
		var lv_url_final = "";
	
		var lv_host = window.location.host;
		var lv_href = window.location.href.toString();
		var lv_url = lv_href.split(lv_host);
		var lv_url_string = lv_url[1].split('/admin/');
		
		lv_url_final = lv_url_string[1].trim();
		
		return lv_url_final;
	
	}

	// screen idle will show prompt
	gv_screen_session_timer_max = 3600; // (60 minutes) or (3600 seconds)
	gv_screen_session_timer_min = 300; // (5 minutes) or (300 seconds)
	gv_screen_session_timer_ctr = parseInt(gv_screen_session_timer_max); 
	gv_screen_session_csrf_token = "";
	gv_session_screen_old_date = "2000-01-01";
	
	function fn_get_minute_seconds(lv_value_in_seconds){
		
		var lv_minutes = parseInt(lv_value_in_seconds / 60).toFixed(0);
		if(lv_minutes.length == 1){
			lv_minutes = "0"+String(lv_minutes);
		}
		var lv_seconds = parseInt(lv_value_in_seconds % 60).toFixed(0);
		if(lv_seconds.length == 1){
			lv_seconds = "0"+String(lv_seconds);
		}
		return ""+lv_minutes+":"+lv_seconds+"";
		
	}
	
	function set_cookie_browser_timer(lv_date_value) {
		var lv_year = lv_date_value.getFullYear();
		var lv_month = lv_date_value.getMonth() + 1;
			if(lv_month < 10) lv_month = '0'+ lv_month ;
		var lv_day = lv_date_value.getDate();
			if(lv_day < 10) lv_day = '0'+ lv_day ;
		
		var lv_hour = lv_date_value.getHours();
			if(lv_hour < 10) lv_hour = '0'+ lv_hour ;
		var lv_mins = lv_date_value.getMinutes();
			if(lv_mins < 10) lv_mins = '0'+ lv_mins ;
		var lv_secs = lv_date_value.getSeconds();
			if(lv_secs < 10) lv_secs = '0'+ lv_secs ;
		
		lv_date_value = lv_year+"-"+lv_month+"-"+lv_day+" "+lv_hour+":"+lv_mins+":"+lv_secs;
		
		document.cookie = "cookie-browser-timer=" + lv_date_value + "; path=/";
		return true;
	}

	function get_cookie_browser_timer() {
		var cname = "cookie-browser-timer=";
		var ca = document.cookie.split(';');
		for (var i=0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(cname) == 0) {
				return c.substring(cname.length, c.length);
			}
		}
		return null;
	}
	
	function get_cookie_browser_time_diff() {
		var t1 = new Date(get_cookie_browser_timer());
		var t2 = new Date();
		var dif = Math.abs(t1.getTime() - t2.getTime());
	
		return parseInt(dif / 1000);
	}
 
	$(document).ready(
			function(){
				//will only work if page address is not userlogin
				if(!window.location.href.match(UserLoginlink)){
					
					set_cookie_browser_timer(new Date());
					
					UI5Storage.put('screen_session','active');
					
					function fn_check_session_popup_is_closed(){
						var lv_boolean = !go_dialog_confirm_extend_session.isOpen() && 	!go_dialog_confirm_terminate_session.isOpen() &&  	!go_dialog_confirm_relogin_session.isOpen() && 	!go_dialog_confirm_session_unauthorized.isOpen();
						
						return lv_boolean;
					}
					
					var gv_mousemovement_ctr = 0;
					$(document).mousemove(function( event ) {
						gv_mousemovement_ctr++;
						if(gv_mousemovement_ctr >= 300){
							gv_mousemovement_ctr = 0;
							//sets back to 15 seconds
							if( fn_check_session_popup_is_closed() ){
								set_cookie_browser_timer(new Date());
								
								console.log("Reset timer to "+fn_get_minute_seconds(gv_screen_session_timer_max - get_cookie_browser_time_diff())+" seconds.");
							}
						}
					});
					
					go_dialog_confirm_extend_session = new sap.m.Dialog({
						title: "Session About To Expire",
						contentWidth : "100px",
						contentHeight : "80px",		
						beginButton: new sap.m.Button({text:"No, Logout", icon: "sap-icon://decline", type: sap.m.ButtonType.Reject ,press:function(oEvt){
							// set to old date to expire
							set_cookie_browser_timer(new Date(gv_session_screen_old_date));
							window.location.href = UserLogoutLink;
						}}),
						endButton: new sap.m.Button({text:"Yes, Keep Working" , icon: "sap-icon://accept", type: "Accept" ,press:function(oEvt){ 
							go_dialog_confirm_extend_session.close();
							
							// refresh session token
							fn_refresh_screen_token(function(){});
							 
							// update session last_activity
							$.ajax({
								url:"/admin/users/sessions/check_last_activity" , 
								type: "GET",
								dataType: "json"
							}).done(function (response){
								set_cookie_browser_timer(new Date());
								
								console.log("Reset timer to "+fn_get_minute_seconds(gv_screen_session_timer_max - get_cookie_browser_time_diff())+" seconds.");
							}).fail(function (){
								// unable to update last_activity, show relogin
								go_dialog_confirm_relogin_session.open();
							});
							
							
						}}),
						content:[
							new sap.m.Label("go_dialog_confirm_extend_session_label",{text:"Your session will be locked in "+fn_get_minute_seconds(gv_screen_session_timer_max - get_cookie_browser_time_diff())+" seconds."}),
							new sap.m.Label({text:"Do you want to continue your session?"}),
						],
					}).addStyleClass('sapUiSizeCompact');
					
					go_dialog_confirm_terminate_session = new sap.m.Dialog({
						title: "Session Has Expired",
						//contentWidth : "100px",
						//contentHeight : "50px",		
						beginButton:  new sap.m.Button({text:"Ok" , icon: "sap-icon://accept", type: "Accept" ,press:function(oEvt){ 
							// set to old date to expire
							set_cookie_browser_timer(new Date(gv_session_screen_old_date));
							window.location.href = UserLogoutLink;
							go_dialog_confirm_terminate_session.close();
						}}),
						content:[
							//new sap.m.Label({text:"Your session has expired. Click OK to login again."}),
							new sap.m.VBox({ items:[
									new sap.m.Label({text:"Dear user,"}),
									new sap.m.Label({text:""}),
									new sap.m.Label({text:"If you see this, it means you have left the page idle for some time."}),
									new sap.m.Label({text:""}),
									new sap.m.Label({text:"To ensure you are always in a secure environment, we have signed you out from your page."}),
									new sap.m.Label({text:""}),
									new sap.m.Label({text:"Please sign in again to continue using the system."}),
									new sap.m.Label({text:""}),
									new sap.m.Label({text:"See you soon!"}),
								]
							})
						],
					}).addStyleClass('sapUiSizeCompact');
					
					go_dialog_confirm_relogin_session = new sap.m.Dialog({
						title: "Session Terminated",
						contentWidth : "100px",
						contentHeight : "80px",		
						beginButton:  new sap.m.Button({text:"Ok" , icon: "sap-icon://accept", type: "Accept" ,press:function(oEvt){ 
							// set to old date to expire
							set_cookie_browser_timer(new Date(gv_session_screen_old_date));
							window.location.href = UserLogoutLink;
						}}),
						content:[
							new sap.m.Label({text:"Sorry, unable to continue your session."}),
							new sap.m.Label({text:"Click OK to login again."}),
						],
					}).addStyleClass('sapUiSizeCompact');
					
					// Prompt user if they'd like to be redirected to the login page
					go_dialog_confirm_session_unauthorized = new sap.m.Dialog({
						title: "Session Has Expired",
						//contentWidth : "100px",
						//contentHeight : "50px",		
						beginButton:  new sap.m.Button({text:"Ok" , icon: "sap-icon://accept", type: "Accept" ,press:function(oEvt){ 
							// set to old date to expire
							set_cookie_browser_timer(new Date(gv_session_screen_old_date));
							window.location.href = UserLogoutLink;
							go_dialog_confirm_session_unauthorized.close();
						}}),
						content:[			
							//new sap.m.Label({text:"Your session has expired. Click OK to login again."}),
							new sap.m.VBox({ items:[
									new sap.m.Label({text:"Dear user,"}),
									new sap.m.Label({text:""}),
									new sap.m.Label({text:"If you see this, it means you have left the page idle for some time."}),
									new sap.m.Label({text:""}),
									new sap.m.Label({text:"To ensure you are always in a secure environment, we have signed you out from your page."}),
									new sap.m.Label({text:""}),
									new sap.m.Label({text:"Please sign in again to continue using the system."}),
									new sap.m.Label({text:""}),
									new sap.m.Label({text:"See you soon!"}),
								]
							})
							//new sap.m.Label({text:"Your session has expired."}),
							//new sap.m.Label({text:"Would you like to be redirected to the login page?"}),
						],
					}).addStyleClass('sapUiSizeCompact');
					
					var fn_set_screen_session_timer_interval = setInterval(
						function(){
								
								if((gv_screen_session_timer_max - get_cookie_browser_time_diff()) <= 0){
									clearInterval(fn_set_screen_session_timer_interval);
									// log expire session
									$.get('/users/log_session_expire').done(function(data){
										go_dialog_confirm_extend_session.close();
										UI5Storage.put('screen_session','expired');
										// set to old date to expire
										set_cookie_browser_timer(new Date(gv_session_screen_old_date));
										window.location.href = UserLogoutLink;
									}).fail(function(data){
										go_dialog_confirm_extend_session.close();
										UI5Storage.put('screen_session','expired');
										// set to old date to expire
										set_cookie_browser_timer(new Date(gv_session_screen_old_date));
										window.location.href = UserLogoutLink;
									});
								} 
								else if((gv_screen_session_timer_max - get_cookie_browser_time_diff()) < gv_screen_session_timer_min ){
									ui('go_dialog_confirm_extend_session_label').setText("Your session will be locked in "+fn_get_minute_seconds(gv_screen_session_timer_max - get_cookie_browser_time_diff())+" seconds.");
									
									if(fn_check_session_popup_is_closed() ){
										go_dialog_confirm_extend_session.open();
									}
								}
								else if((gv_screen_session_timer_max - get_cookie_browser_time_diff()) >= gv_screen_session_timer_min ){
									go_dialog_confirm_extend_session.close();
								}
						}, 
						500
					);
					fn_set_screen_session_timer_interval;
					
					console.log("Screen idle checking has been initialized. ");
					console.log("Timer: "+parseInt(gv_screen_session_timer_max / 60)+" minutes. ");
				
					$(document).ajaxError(function(event, jqxhr, settings, exception) {
						console.log("AJAX ERROR");
						console.log(event);
						console.log(typeof exception);
						console.log(exception);
						console.log(jqxhr);
						// console.log(settings);
						
						if (exception == "Unauthorized") {
							
							if( !go_dialog_confirm_session_unauthorized.isOpen() ){
								// log expire session
								$.get('/users/log_session_expire').done(function(data){
									// set to old date to expire
									set_cookie_browser_timer(new Date(gv_session_screen_old_date));
									$.get(UserLogoutLink);
									go_dialog_confirm_session_unauthorized.open();
								}).fail(function(data){
									// set to old date to expire
									set_cookie_browser_timer(new Date(gv_session_screen_old_date));
									$.get(UserLogoutLink);
									go_dialog_confirm_session_unauthorized.open();
								});
								
								// For Sales Order - Stop Querying Sync Status on display mode
								if(typeof fn_interval_get_single_order_sync_status != "undefined"){
									clearInterval(fn_interval_get_single_order_sync_status);
								}
								
							}
						}
						
						if (exception == "Internal Server Error") {
							// it is programmed inside app\Exceptions\Handler.php - to return status = 05 when encounter Expired Token
							if(jqxhr.hasOwnProperty("responseJSON") && jqxhr.responseJSON.hasOwnProperty("status") && jqxhr.responseJSON.status == "05" ){
								// console.log("Token error :"+gv_screen_session_csrf_token);
								// fn_refresh_screen_token(function(){
								// 	
								// 	console.log("New Token :"+gv_screen_session_csrf_token);
								// });
							} 
							else if( !go_dialog_confirm_session_unauthorized.isOpen() ){
								$.get("/admin/users/sessions/check_last_activity"); // if returns unauthorized, it will show prompt message
							}
						}
					});
				}
				
			}
	);
	
	// refresh token function
	function fn_refresh_screen_token(callback){
		$.get('/admin/users/sessions/refresh_csrf').done(function(data){
			gv_screen_session_csrf_token = data;
			
			$('[name="csrf-token"]').attr('content',data);
			
			$.ajaxSetup({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				}
			});
			
			callback();
		}).fail(function(XHR, textStatus, errorThrown){   
			gt_left_menu = [];
			return callback(gt_left_menu);
		});
	}
	
	var gv_trigger_ctr_fn_ajax_call = {url:"", ctr:0};
	function fn_ajax_call(lv_ajaxCall_url,lv_ajaxCall_mode, lv_ajaxCall_data, fn_success_ajaxCallback, fn_fail_ajaxCallback, lv_dataType, lv_timeout, lv_contentType ){
				
				if(gv_trigger_ctr_fn_ajax_call.url != lv_ajaxCall_url){
					gv_trigger_ctr_fn_ajax_call.url = lv_ajaxCall_url;
					gv_trigger_ctr_fn_ajax_call.ctr = 1;					
				}
				else{
					gv_trigger_ctr_fn_ajax_call.ctr++;
					
					//will refresh the page when address is userlogin
					if(window.location.href.match(UserLoginlink) && gv_trigger_ctr_fn_ajax_call.ctr > 3){
						window.location.reload();
					}
				}
				
				$.ajax({
					url:lv_ajaxCall_url,
					type:lv_ajaxCall_mode,
					data:lv_ajaxCall_data,
					contentType:typeof(lv_contentType) == "undefined" ? "application/x-www-form-urlencoded; charset=UTF-8" : lv_contentType, //default contentType is "application/x-www-form-urlencoded; charset=UTF-8"
					dataType:typeof(lv_dataType) == "undefined" ? "json" : lv_dataType, //default dataType is json
					timeout: typeof(lv_timeout) == "undefined" ? 0 : lv_timeout, //default timeout is zero which means no timeout
				}).done(function(response){
					fn_success_ajaxCallback(response);
				}).fail(function(XHR, textStatus, errorThrown){
					// token error
					if (errorThrown == "Internal Server Error") {
						if(XHR.hasOwnProperty("responseJSON") && XHR.responseJSON.hasOwnProperty("status") && XHR.responseJSON.status == "05" ){
							console.log("Token error :"+gv_screen_session_csrf_token);
							fn_refresh_screen_token(function(){
								
								console.log("New Token :"+gv_screen_session_csrf_token);
								
								// retrigger function after retrieving new token
								fn_ajax_call(lv_ajaxCall_url,lv_ajaxCall_mode, lv_ajaxCall_data, fn_success_ajaxCallback, fn_fail_ajaxCallback, lv_dataType, lv_timeout, lv_contentType );
							});
						} 
						else {
							console.log("Whoops, looks like something whent wrong.");
							fn_fail_ajaxCallback(XHR, textStatus, errorThrown);
						}
					} 
					else {
						console.log("Whoops, looks like something whent wrong.");
						fn_fail_ajaxCallback(XHR, textStatus, errorThrown);
					}
				});
	}
	
	function fn_get_item_index_from_controller(lv_controller){
		var lv_index = -1;
		var lv_controller_path = lv_controller.getBindingContext().getPath();
		var lt_path = String(lv_controller_path).split('/');
		
		if(lt_path.length > 1){
			lv_index = lt_path[1];
		}
		else{
			console.log("WARNING, THE INDEX OF ITEM WAS NOT RETRIEVED!");
		}
		
		return lv_index;
	}
	
	function fn_clear_table_sorter(lv_table_id){
		
		var lv_table =ui(lv_table_id);
		var iColCounter = 0;
		lv_table.clearSelection();
		
		var iTotalCols = lv_table.getColumns().length;
		var oListBinding = lv_table.getBinding();
		if (oListBinding) {
			oListBinding.aSorters = null;
			oListBinding.aFilters = null;
		}

		for ( iColCounter = 0; iColCounter < iTotalCols; iColCounter++) {
			lv_table.getColumns()[iColCounter].setSorted(false);
			lv_table.getColumns()[iColCounter].setFilterValue("");
			lv_table.getColumns()[iColCounter].setFiltered(false);
		}
	}
	
	//DECODES HTML CHARACTERS
	function fn_decodeEntities(encodedString) {
		var textArea = document.createElement('textarea');
		textArea.innerHTML = encodedString;
		return textArea.value;
	}
			
	
	function fn_get_variant_catalog(lv_sub_app, lv_default, callback){
		
		var lt_array = {
			APP_ID		: SelectedAppID,
			SUB_APP		: lv_sub_app,
			DEFAULT		: lv_default
		};
	
		$.ajax({
			url:"/admin/main/get_variant_catalog" , 
			type: "POST",
			data: lt_array,
			dataType: "json"
		})
		.done(function (response){
			callback(response);
		}).fail(function(XHR, textStatus, errorThrown){

		});
		
		
	}
	
	function fn_save_variant_catalog(lo_data, callback){
		
		var busy_diag = fn_show_busy_dialog("");
			busy_diag.open();
		
		$.ajax({
			url:"/admin/main/save_variant_catalog" , 
			type: "POST",
			data:lo_data,
			dataType: "json"
		})
		.done(function (response){
			busy_diag.close();
			callback(response);
		}).fail(function(XHR, textStatus, errorThrown){
			busy_diag.close();
		});
		
	}
	
	function fn_get_report_variant(lv_sub_app, lv_default, callback){
		
		var lt_array = {
			APP_ID		: SelectedAppID,
			SUB_APP		: lv_sub_app,
			DEFAULT		: lv_default
		};
	
		$.ajax({
			url:"/admin/main/get_report_variant" , 
			type: "POST",
			data: lt_array,
			dataType: "json"
		})
		.done(function (response){
			callback(response);
		}).fail(function(XHR, textStatus, errorThrown){

		});
		
		
	}
	
	function fn_save_report_variant(lo_data, callback){
		
		var busy_diag = fn_show_busy_dialog("");
			busy_diag.open();
		
		$.ajax({
			url:"/admin/main/save_report_variant" , 
			type: "POST",
			data:lo_data,
			dataType: "json"
		})
		.done(function (response){
			busy_diag.close();
			callback(response);
		}).fail(function(XHR, textStatus, errorThrown){
			busy_diag.close();
		});
		
	}
	//2020/02/03 - Noel added function for global valuehelp ID
	var fn_search_vhelp = {
		value_id : "",
		value_desc: "",
		query : function(lv_search){
			
			var lt_array = {
				SEARCH_ID : lv_search
			};

			return $.ajax({
				url:"/admin/main/search_valuehelp" , 
				type: "POST",
				data: lt_array,
				dataType: "json"
			}).fail(function(XHR, textStatus, errorThrown){
				alert(textStatus)
				busy_diag.close();
			});
		},
		dialog : function(lv_search,lv_id,callback){
			callback = callback || function(){};
			var busy_diag = fn_show_busy_dialog("");
			busy_diag.open();

			this.query(lv_search).then(function (response){
				
			if(response.return.error){
				fn_show_notification_message(response.return.message);
				busy_diag.close();
				return false;
			}
			var lt_data = response.return.data;

			var table = new sap.ui.table.Table({
				selectionMode: "None",
				visibleRowCountMode: "Auto",
				autoResizeColumn: true,
				cellClick:function(oEvt){	
						var selectedItem = oEvt.getParameters().rowBindingContext.getProperty('ID');
						var selecteddesc = (oEvt.getParameters().rowBindingContext.getProperty('description') || '') ? oEvt.getParameters().rowBindingContext.getProperty('description') : "";
						fn_search_vhelp.value_id = selectedItem;
						fn_search_vhelp.value_desc = selecteddesc;						
						ui(lv_id).setValue(selectedItem);
						callback(oEvt.getParameters(),lt_data);
						dialog.close();
				},
				columns:[
					new sap.ui.table.Column({
						hAlign:"Left",
						width:"auto",
						label 	: new sap.m.Label({text:"ID"}),
						template: new sap.m.Text({text:"{ID}",textAlign: "Left"}),
						sortProperty:"ID",
						filterProperty:"ID"
					}),
					new sap.ui.table.Column({
						hAlign:"Left",
						width:"auto",
						label 	: new sap.m.Label({text:"Description"}),
						template: new sap.m.Text({text:"{description}",textAlign: "Left"}),
						sortProperty:"description",
						filterProperty:"description"
					}),
				]
			});

			var search = new sap.m.SearchField({width:"100%",placeholder:"Search...",
				search:function(oEvt){
					var filter = [];
					var sVal = oEvt.getSource().getValue()
					var sEventType = oEvt.getParameter("eventType");
					var selectCtr = "ID";
					if(sVal !== undefined && sVal != "") {
						var oBinding = table.getBinding("rows");
						selectFilter = [new sap.ui.model.Filter([ new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.Contains, sVal),
														new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, sVal)
														],false)];
						oBinding.filter(selectFilter);
					}
				},
				liveChange:function(oEvt){
		
					var filter = [];
					var sVal = oEvt.getSource().getValue()
					var sEventType = oEvt.getParameter("eventType")
					if(sVal !== undefined  && sVal != "") {
						var oBinding = table.getBinding("rows");
						selectFilter = [new sap.ui.model.Filter([ new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.Contains, sVal),
														new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, sVal)
														],false)];
						oBinding.filter(selectFilter);
					}
				},
					});


			var searchList = new sap.m.SearchField({width:"100%",placeholder:"Search...",
				search:function(oEvt){
					var filter = [];
					var sVal = oEvt.getSource().getValue()
					var sEventType = oEvt.getParameter("eventType");
					// var selectCtr = "ID";
					if(sVal !== undefined && sVal != "") {
						var oBinding = list.getBinding("items");
						selectFilter = [new sap.ui.model.Filter([ new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.Contains, sVal),
														new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, sVal)
														],false)];
						oBinding.filter(selectFilter);
					}
				},
				liveChange:function(oEvt){
		
					var filter = [];
					var sVal = oEvt.getSource().getValue()
					var sEventType = oEvt.getParameter("eventType")
					if(sVal !== undefined  && sVal != "") {
						var oBinding =list.getBinding("items");
						selectFilter = [new sap.ui.model.Filter([ new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.Contains, sVal),
														new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, sVal)
														],false)];
						oBinding.filter(selectFilter);
					}
				},
					});

					var dialog = new sap.m.Dialog({
						stretchOnPhone:false,
						stretch: false,
						horizontalScrolling: false,
						verticalScrolling : false,
						draggable:true,
						contentWidth : "500px",
						contentHeight : "420px",
						endButton: new sap.m.Button({
							icon:"sap-icon://decline",
							text:"Cancel",
							type: "Reject",
							press:function(evt){
								evt.getSource().getParent().close();
							}
						}),
					}).addStyleClass("sapUiSizeCompact");

					var dialog_list = new sap.m.Dialog({
							showHeader: true,
							stretchOnPhone:false,
							stretch: false,
							horizontalScrolling: false,
							verticalScrolling : false,
							draggable:true,
							// contentWidth : "430px",
							// contentHeight : "450px",
							endButton: new sap.m.Button({
							icon:"sap-icon://decline",
							text:"Cancel",
							type: "Reject",
							press:function(evt){
								evt.getSource().getParent().close();
							},
							}),
							content:[
									
								new sap.m.Bar({
								enableFlexBox: true,
								contentLeft: [
									searchList
								]
								}),
							],
							
						
						
						}).addStyleClass("dialog_scroll").addStyleClass('sapUiSizeCompact');
					

					dialog.addContent(search)
					//dialog_list.addContent(searchList)


					busy_diag.close();
				if(response.return.config.DIALOG_TYPE == 'TABLE'){
					var lo_model = new sap.ui.model.json.JSONModel();
					lo_model.setSizeLimit(lt_data.length);
					lo_model.setData(lt_data);
					table.setModel(lo_model).bindRows("/", lt_data);
					
					dialog.addContent(table)
					
					dialog.setTitle(response.return.config.DIALOG_TITLE);

					dialog.open()
				}else if(response.return.config.DIALOG_TYPE == 'LIST'){
					var lv_valuehelp = [];

					lt_data.sort(function(a, b) {
					      
						  return ((a.description < b.description) ? -1 : ((a.description > b.description) ? 1 : 0));
					});

					for(i=0;i<lt_data.length;i++){
						
									imguri = (lt_data[i].guid) ? "/admin/download/file/"+ lt_data[i].guid : userphoto_path;
			   
								lv_valuehelp.push({
								   ID:lt_data[i].ID,
								   icon:imguri,
								   description:lt_data[i].description
								 })
			   
							}

					var list = new sap.m.List({growingScrollToLoad:true,
											   growing:true,
											   type : sap.m.ListType.DetailAndActive,
  											   });

					var lo_model= new sap.ui.model.json.JSONModel();
						lo_model.setSizeLimit(lv_valuehelp.length);
						lo_model.setData(lv_valuehelp);
					
					list.setModel(lo_model).bindAggregation("items",{
						path:"/",
						// template:new sap.m.StandardListItem({
						// 			  type:"Active",
						// 			  title:"{ID}",
						// 			  description:"{description}",
						// 			  icon:"{icon}",
						// 			  iconDensityAware:false,
						// 			  iconInset:false,
						// 			  // class:"round_img"									
						// 			}),		

						template : 	

								new sap.m.CustomListItem({

									draggable:true,

									content: [

									      new sap.m.HBox({
									        items: [
													new sap.m.Image({
					                                src : "{icon}", 
					                                densityAware: false,
					                                width: "50px",
					                                height:"50px",
					                        		}).addStyleClass('round_img'),



					                        		new sap.m.VBox({
													backgroundDesign:"Transparent",
																	items:[
																		new sap.m.Text({text:"{description}"}).addStyleClass('set_font_size'),
																		new sap.m.Text({text:"{ID}"}),
															]
												})

												
									        ],
									      }),

									     ],

									      type : sap.m.ListType.Active,
							              press: function(oEvt){
							                  var selectedItem = oEvt.getSource().getBindingContext().getObject().ID;
											  var selecteddesc = (oEvt.getSource().getBindingContext().getObject().description || '') ? oEvt.getSource().getBindingContext().getObject().description : "";
											  	fn_search_vhelp.value_id = selectedItem
												fn_search_vhelp.value_desc = selecteddesc
												ui(lv_id).setValue(selectedItem);
												
												callback(oEvt,lt_data)
												dialog_list.close();
							              },

									   				
							}),

					});

					var lv_scroll = new sap.m.ScrollContainer({
						height : "400px",
						vertical : true,
						content:[
							list
						]
					});
					
					dialog_list.addContent(lv_scroll)
					dialog_list.setTitle(response.return.config.DIALOG_TITLE);
					dialog_list.open()
				}
				
			})
		}
	}
	var fn_searchhelp = {
		page:0,
		sql:function(query){
			return $.ajax({
				type: 'GET',
				url: '/admin/api/search_valuehelp',
				data: {search_id:__SELF.search_id,query:query}
			});
		},
	
		getConfig : function(){     
			return this.sql({})
		},

		check : function(search_id,val,callback){
			__SELF = this;
			__SELF.search_id = search_id;
			var query = {
				value: val,
				column:[],
				searchable:false,
				skip:0,
				limit:""
			};
			
			__SELF.sql(query).then(function(obj){
				if(!obj.error){
					data = obj.data;key = obj.config.seqHeader.key;
					found = data.find((x)=>x[key] == val);					
						found ? callback(true) :  callback(false) ;
				}				
			});
		},
	
		fn_sfSearch:function(val){
			__SELF = this;
	
			var query = {
				value: val,
				column:[],
				searchable:false,
				skip:0,
				limit:__SELF.limitInput.getValue()
			};
				 __SELF.listing.setBusy(true)
				__SELF.sql(query).then(function(obj){
					__SELF.listing.setBusy(false)
					if(!obj.error){
						__SELF.lt_data = obj.data
						if(__SELF.configuration.DIALOG_TYPE == "LIST"){
							lv_valuehelp = __SELF.makeList();
						}else{
							lv_valuehelp = __SELF.lt_data
						}
						__SELF.binding.getModel().setData(lv_valuehelp)
					}
				   
				})
	
		},
	
		fn_sfLiveChange:function(val){
			__SELF = this;
	
			var query = {
				value: val,
				column:[],
				searchable:false,
				skip:0,
				limit:__SELF.limitInput.getValue()
			};
				 __SELF.listing.setBusy(true)
				__SELF.sql(query).then(function(obj){
					__SELF.listing.setBusy(false)
					if(!obj.error){
						__SELF.lt_data = obj.data
						if(__SELF.configuration.DIALOG_TYPE == "LIST"){
							lv_valuehelp = __SELF.makeList();
						}else{
							lv_valuehelp = __SELF.lt_data
						}
						__SELF.binding.getModel().setData(lv_valuehelp)
					}
				   
				})
		},
	
		fn_listGrown:function(val){        
			__SELF = this;
			var current_list = __SELF.binding.getModel().getData();
			
			var query = {
				value: val,
				column:[],
				searchable:false,
				skip:__SELF.page,
				limit:__SELF.limitInput.getValue()
			};
	
			if(__SELF.listing.getModel().getData().length < __SELF.total_data){
				 __SELF.listing.setBusy(true)
				__SELF.sql(query).then(function(obj){
					__SELF.listing.setBusy(false)
	
					if(!obj.error){
						__SELF.page = parseInt(__SELF.page)+parseInt(obj.dataCount);
						__SELF.lt_data = obj.data
						if(__SELF.configuration.DIALOG_TYPE == "LIST"){
							lv_valuehelp = __SELF.makeList();  
						}else{
							lv_valuehelp = __SELF.lt_data
						}
						new_list = current_list.concat(lv_valuehelp)
						
						__SELF.binding.getModel().setData(new_list)
					}               
				})
				}
		},
	
		dialog : function(lv_search,input_id,callback,auto_filter = false,addAllKey = false){
			var busy_diag = fn_show_busy_dialog("loading...");
			busy_diag.open();
			
			__SELF = this;       
			__SELF.input_id = input_id;
			__SELF.search_id = lv_search;
	
			callback = callback || function(){};
			
			var lv_input_text = "";

			if(auto_filter)
			{
				lv_input_text = ui(input_id).getValue();
			}

			__SELF.getConfig().then(function(obj){
				busy_diag.close();
				if(obj.error){
					fn_show_notification_message(obj.message);
					return false;
				}

				if(addAllKey)
				{
					obj.data.unshift({ ID:"ALL", description:"All data" });
				}
				
				__SELF.lt_data = obj.data;
				__SELF.configuration = obj.config;
				__SELF.total_data = obj.dataCountAll;

				__SELF.searchField = new sap.m.SearchField({width:"80%",placeholder:"Search...", value:lv_input_text,
					search:function(oEvt){
						var filter = [];
						var sVal = oEvt.getSource().getValue()
							__SELF.fn_sfSearch(sVal);
					},
					liveChange:function(oEvt){
						var filter = [];
						var sVal = oEvt.getSource().getValue()
								var filters = [];

								for( i in __SELF.configuration.seqHeader.column ){
									filters.push( new sap.ui.model.Filter(i, sap.ui.model.FilterOperator.Contains, sVal))
								}
								var oBinding = __SELF.binding
								selectFilter = [new sap.ui.model.Filter(filters,false)];
								oBinding.filter(selectFilter);
					},
				});
				
				__SELF.limitInput = new sap.m.Input({ width : "20%", placeholder : "Limit", value: __SELF.configuration.SEARCH_LIMIT,submit:function(oEvt){
					__SELF.searchField.fireSearch();
				} });
	
			
	
				__SELF.dialogBox = new sap.m.Dialog({
					showHeader: true,
					stretchOnPhone:false,
					stretch: false,
					horizontalScrolling: false,
					verticalScrolling : false,
					draggable:true,
					contentWidth : "500px",
					endButton: new sap.m.Button({ icon:"sap-icon://decline", text:"Cancel", type: "Reject", press:function(evt){ evt.getSource().getParent().destroy(); }}),
					content:[							
						new sap.m.Toolbar({
						enableFlexBox: true,
						content: [
							__SELF.searchField,						
							__SELF.limitInput
						]
						}),
					],
					afterOpen:function(){ if( __SELF.searchField.getValue().length > 0 ) { __SELF.searchField.fireSearch(); }}
				}).addStyleClass("dialog_scroll").addStyleClass('sapUiSizeCompact');
	
					if(__SELF.configuration.DIALOG_TYPE == 'LIST'){
					   
						var lv_valuehelp = __SELF.makeList()
	
						var lo_model= new sap.ui.model.json.JSONModel();
						lo_model.setSizeLimit(lv_valuehelp.length);
						lo_model.setData(lv_valuehelp);
	
						var list = new sap.m.List({growingScrollToLoad:true,
							growing:true,
							growingThreshold:9,
							type : sap.m.ListType.DetailAndActive,
							updateStarted:function(oEvt){						
								var sVal = __SELF.searchField.getValue();
								if(oEvt.getParameters().reason == "Growing"){
								__SELF.fn_listGrown(sVal)
								}
							}
							});
						var text_box = new sap.m.VBox({
							backgroundDesign:"Transparent", items:[
												new sap.m.Text({text:"{description}"}).addStyleClass('set_font_size'),
												new sap.m.Text({text:"{ID}"}),
							]})

						var item = new sap.m.CustomListItem({
									draggable:true,
									type : sap.m.ListType.Active,
									content: [
									new sap.m.HBox({
											items: [
													new sap.m.Image({
													src : "{icon}", 
													densityAware: false,
													width: "50px",
													height:"50px",
													}).addStyleClass('round_img'),
													text_box
													
											],
										}),
										],
									press: function(oEvt){
										var selectedItem = oEvt.getSource().getBindingContext().getObject().ID;
										var selecteddesc = (oEvt.getSource().getBindingContext().getObject().description || '') ? oEvt.getSource().getBindingContext().getObject().description : "";
										__SELF.value_id = selectedItem
										__SELF.value_desc = selecteddesc
										ui(__SELF.input_id).setValue(selectedItem);				
										console.log(callback)							
										callback(oEvt,lt_data)
										oEvt.getSource().getParent().getParent().getParent().destroy();
									}});
	
						list.setModel(lo_model).bindAggregation("items",{
							path:"/",
							template : 	item 
						});

						list.setGrowingThreshold(parseInt(__SELF.configuration.SEARCH_LIMIT) - 1);
	
						var lv_scroll = new sap.m.ScrollContainer({ height : "400px",vertical : true, content:[ list ]});
	
						__SELF.listing = list;
						__SELF.binding = list.getBinding("items");
						content = lv_scroll;
					}else{
						key = __SELF.configuration.seqHeader.key;
	
						var table = new sap.ui.table.Table({
							selectionMode: "None",
							visibleRowCount : 10,
							visibleRowCountMode: "Fixed",
							// autoResizeColumn: true,
							cellClick:function(oEvt){	
									var selectedItem = oEvt.getParameters().rowBindingContext.getProperty(key);					
									ui(__SELF.input_id).setValue(selectedItem).fireChange();
									callback(oEvt.getParameters(),__SELF.lt_data);
									oEvt.getSource().getParent().destroy();
							}
						});

						for( i in __SELF.configuration.seqHeader.column ){
							table.addColumn(  new sap.ui.table.Column({
								hAlign:"Left",
								width:"auto",
								label 	: new sap.m.Label({text:__SELF.configuration.seqHeader.column[i]}),
								template: new sap.m.Text({text:"{"+i+"}",textAlign: "Left",renderWhitespace:true,maxLines:1,tooltip:"{"+i+"}"}),
								sortProperty:i,
								filterProperty:i
							})
							)
						}
				
				
						var lo_model = new sap.ui.model.json.JSONModel();
								lo_model.setSizeLimit(__SELF.lt_data.length);
								lo_model.setData(__SELF.lt_data);
								table.setModel(lo_model).bindRows("/", __SELF.lt_data);
				
						__SELF.binding = table.getBinding("rows");
						__SELF.listing  = table;
						content =  table;	
					}
	
				__SELF.dialogBox.addContent(content)
				__SELF.dialogBox.setTitle(obj.config.DIALOG_TITLE);
				__SELF.dialogBox.open()
			})
		},
	
		makeTable:function(){
			__SELF = this;
			lt_data = __SELF.lt_data
			config = __SELF.configuration
		},
		
		makeList:function(){
			__SELF = this;
			lt_data = __SELF.lt_data;			
			var lv_valuehelp = [];
			for(i=0;i<lt_data.length;i++){						
				imguri = (lt_data[i].guid) ? "/admin/download/file/"+ lt_data[i].guid : userphoto_path;
				lv_valuehelp.push({ ID:lt_data[i].ID, icon:imguri,description:lt_data[i].description })
			}
				return lv_valuehelp;
		}
	}
	
	