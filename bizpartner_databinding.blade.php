<script>
	var bizData = [
		{
			TYPE     			: "TYPE1",
			NAME1    			: "Noel Lehitimas",
			BIZPART_ID      	: "100001",
			EXT_PARTNER      	: "EXT_PARTNER1",
			SOURCE_SYS     		: "SOURCESYS1",
			DEL_FLAG    		: true
		},
		{
			TYPE     			: "TYPE2",
			NAME1    			: "Noel Lehitimas2",
			BIZPART_ID      	: "100002",
			EXT_PARTNER      	: "EXT_PARTNER2",
			SOURCE_SYS     		: "SOURCESYS2",
			DEL_FLAG    		: true
		}
	];

	const bpDataOrganizer = {
		_filteredById : function(id){
			filteredBP = [];
			for(let i=0; i<bizData.length; i++){
				if(bizData[i].BIZPART_ID == id){
					filteredBP.push(bizData[i]);
				}
			}
			return filteredBP;
		}
	}

	const screenMode = {
		_create : function(){
			//Buttons
			ui("CREATE_BP_SAVE_BTN").setVisible(true);
			ui("CREATE_BP_EDIT_BTN").setVisible(false);

			//Fields
			ui('BP_TYPE_INFO').setEditable(true);
			ui('BP_TYPE_REGNAME').setEditable(true);
			ui('INPUT_BP_ID').setEditable(true);
			ui('BP_TYPE_EXTPARTNER').setEditable(true);
			ui('INPUT_CONTROL_INFO_SOURCE_SYS').setEditable(true);
			ui('CONTROL_INFO_DEL_FLAG').setState(true);
		},
		_edit : function(){
			//Buttons
			ui("CREATE_BP_SAVE_BTN").setVisible(true);
			ui("CREATE_BP_EDIT_BTN").setVisible(false);
		},
		_display : function(id){
			//Buttons
			ui("CREATE_BP_SAVE_BTN").setVisible(false);
			ui("CREATE_BP_EDIT_BTN").setVisible(true);


			//fields with value
			let data = bpDataOrganizer._filteredById(id);
			if(data.length > 0){
				ui('BP_TYPE_INFO').setValue(data[0].TYPE).setEditable(false);
       			ui('BP_TYPE_REGNAME').setValue(data[0].NAME1).setEditable(false);
        		ui('INPUT_BP_ID').setValue(data[0].BIZPART_ID).setEditable(false);
				ui('BP_TYPE_EXTPARTNER').setValue(data[0].EXT_PARTNER).setEditable(false);
				ui('INPUT_CONTROL_INFO_SOURCE_SYS').setValue(data[0].SOURCE_SYS).setEditable(false);
				ui('CONTROL_INFO_DEL_FLAG').setState(data[0].DEL_FLAG).setEnabled(false);
			}			
		}
	};

    const createBP = () => {
		let busyDialog = showBusyDialog("Please wait loading..");
		busyDialog.open();
		let data_for_general = {
			TYPE     			: ui('BP_TYPE_INFO').getValue().trim(),
			NAME1    			: ui('BP_TYPE_REGNAME').getValue().trim(),
			BIZPART_ID      	: ui('INPUT_BP_ID').getValue().trim(),
			EXT_PARTNER      	: ui('BP_TYPE_EXTPARTNER').getValue().trim(),
			SOURCE_SYS     		: ui('INPUT_CONTROL_INFO_SOURCE_SYS').getValue().trim(),
			DEL_FLAG    		: ui('CONTROL_INFO_DEL_FLAG').getState()
   		};
		//add new data to array
		bizData.push(data_for_general);
		screenMode._display(data_for_general.BIZPART_ID);
		setTimeout(() => {busyDialog.close();}, 2000);
		
		//commented use for backend only
		/*fetch('/bizpartner/create_data',{
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			body : JSON.stringify(data_for_general)


		}).then((response) => {
			console.log(response);
			return response.json();
		}).then(data => {
			console.log(data);
		}).catch((err) => {
			console.log("Rejected "+err);
		});*/
        
    }

	const displayBp =  {
		
		_get_data(search){
			
			let busyDialog = showBusyDialog("Please wait loading..");
				busyDialog.open();

				let data = bpDataOrganizer._filteredById(search);
				this._bind_data(data);
			
			
			setTimeout(() => {busyDialog.close();}, 2000);
		},
		_bind_data(data){
		
			ui("DISPLAY_BP_TABLE").unbindRows();
			
			var lt_model = new sap.ui.model.json.JSONModel();
				lt_model.setSizeLimit(data.length);
				lt_model.setData(data);
				
			ui('DISPLAY_BP_TABLE').setModel(lt_model).bindRows("/");
			ui("DISPLAY_BP_TABLE").setVisible(true);
			
			ui('DISPLAY_BP_TABLE_LABEL').setText("List (" + data.length + ")");
			//fn_clear_table_sorter("DISPLAY_BP_TABLE");
			
		}		
	};

	const listingBp = {
		_getData : function(data){
			ui("BP_LISTING_TABLE").unbindRows();
			
			var lt_model = new sap.ui.model.json.JSONModel();
				lt_model.setSizeLimit(data.length);
				lt_model.setData(data);
				
			ui('BP_LISTING_TABLE').setModel(lt_model).bindRows("/");
			ui("BP_LISTING_TABLE").setVisible(true);
			
			ui('BP_LISTING_LABEL').setText("Business Partner (" + data.length + ")");
		}
	}




</script>