<script>
	var bizData = [
		{
			TYPE     			: "IBM",
			NAME1    			: "Noel Lehitimas",
			BIZPART_ID      	: "100001",
			EXT_PARTNER      	: "EXT_PARTNER1",
			SOURCE_SYS     		: "SOURCESYS1",
			COMPANY				: "ACN",
			DEL_FLAG    		: true
		},
		{
			TYPE     			: "ACT",
			NAME1    			: "Noel Lehitimas2",
			BIZPART_ID      	: "100002",
			EXT_PARTNER      	: "EXT_PARTNER2",
			SOURCE_SYS     		: "SOURCESYS2",
			COMPANY				: "CDA",
			DEL_FLAG    		: true
		}
	];

	const bpDataOrganizer = {
		_getBpData : async function(){
			let busyDialog = showBusyDialog("Please wait loading..");
			busyDialog.open();
		
			const response =  await fetch("/bizpartner/getBpData");
			const data = await response.json();
			busyDialog.close();
			return data;
		},
		_filteredById : async function(id){
			let busyDialog = showBusyDialog("Please wait loading..");
			busyDialog.open();
			const bp_id = btoa(id);
			const response =  await fetch("/bizpartner/getDataById/"+bp_id);
			const dataById = await response.json();
			busyDialog.close();
			return dataById;
			
		},
		_updateById : function(id){
			let busyDialog = showBusyDialog("Please wait loading..");
				busyDialog.open();
				
			 	let bpDataupdate = [{
				 
						NAME1    			: ui('BP_TYPE_REGNAME').getValue().trim(),
						TYPE     			: ui('BP_TYPE_INFO').getSelectedKey(),
						//BIZPART_ID      	: ui('INPUT_BP_ID').getValue().trim(),
						EXT_PARTNER      	: ui('BP_TYPE_EXTPARTNER').getValue().trim(),
						SOURCE_SYS     		: ui('INPUT_CONTROL_INFO_SOURCE_SYS').getValue().trim(),
						COMPANY				: ui("BP_COMPANY").getSelectedButton().getId(),
						DEL_FLAG    		: ui('CONTROL_INFO_DEL_FLAG').getState()
				}];

				const data = {
					BP_ID : id,	
					bpDataupdate : bpDataupdate
				}
				
			
			fetch('/bizpartner/update_data',{
				method : 'POST',
				headers : {
					'Content-Type' : 'application/json',
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				body : JSON.stringify(data)
			}).then((response) => {
				if(response.ok){
					screenMode._display(id);
					fn_show_message_toast("Successfully updated business partner #"+id);
				}
				console.log(response);
				return response.json();
			}).then(data => {
				console.log(data);
				busyDialog.close();
			}).catch((err) => {
				console.log("Rejected "+err);
				busyDialog.close();
			});
		},
		_removeById : function(id){
			let busyDialog = showBusyDialog("Please wait loading..");
				busyDialog.open();
				
			const bp_id = {BP_ID : id}
			fetch('/bizpartner/removeDataById',{
				method : 'POST',
				headers : {
					'Content-Type' : 'application/json',
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				body : JSON.stringify(bp_id)
			}).then((response) => {
				if(response.ok){
					fn_show_message_toast("Successfully deleted business partner #"+id);
					ui('LEFT_MENU_TEMPLATE-MENU_LIST-2').firePress();
				}
				console.log(response);
				return response.json();
			}).then(data => {
				console.log(data);
				busyDialog.close();
			}).catch((err) => {
				console.log("Rejected "+err);
				busyDialog.close();
			});
		},
		_getRadioIndex : function(id){
			let radioButton = ui("BP_COMPANY").getButtons();
			let selectedIndex;
			for(let i=0; i<radioButton.length; i++){
				if(radioButton[i].getId() == id){
					selectedIndex = i;
				}
			}

			return selectedIndex;

		},
		_validateBP : function(id){
			let isExist = false;
			for(let i=0; i<bizData.length; i++){
				if(bizData[i].BIZPART_ID == id){
					isExist = true;
					break;
				}
			}
			return isExist;
		}
	}

	const screenMode = {
		_id : "",
		_title : "",
		_mode : "",
		_create : function(){
			this._mode = "create";
			let bp_title = this._title;
			bp_title = "Create Business Partner";
			this._clear();
			//Buttons
			ui("CREATE_BP_SAVE_BTN").setVisible(true);
			ui("CREATE_BP_EDIT_BTN").setVisible(false);
			ui("CREATE_BP_CANCEL_BTN").setVisible(false);
			ui("CREATE_BP_DEL_BTN").setVisible(false);
			

			//title and crumbs
			ui('BP_TITLE').setText(bp_title);
			ui('CREATE_BP_BRDCRMS').setCurrentLocationText(bp_title);
			ui("PANEL_FORM").setTitle("New Business Partner");

			//Fields
			ui('BP_TYPE_INFO').setEditable(true);
			ui('BP_TYPE_REGNAME').setEditable(true);
			ui('INPUT_BP_ID').setEditable(true);
			ui('BP_TYPE_EXTPARTNER').setEditable(true);
			ui('INPUT_CONTROL_INFO_SOURCE_SYS').setEditable(true);
			ui('BP_COMPANY').setEditable(true);
			ui('CONTROL_INFO_DEL_FLAG').setEnabled(true);

			go_App_Right.to('CREATE_BP_PAGE');
		},
		_edit : function(){
			this._mode = "edit";
			//Buttons
			ui("CREATE_BP_SAVE_BTN").setVisible(true);
			ui("CREATE_BP_EDIT_BTN").setVisible(false);
			ui("CREATE_BP_CANCEL_BTN").setVisible(true);
			ui("CREATE_BP_DEL_BTN").setVisible(false);

			//Fields
			ui('BP_TYPE_INFO').setEditable(true);
			ui('BP_TYPE_REGNAME').setEditable(true);
			ui('INPUT_BP_ID').setEditable(false);
			ui('BP_TYPE_EXTPARTNER').setEditable(true);
			ui('INPUT_CONTROL_INFO_SOURCE_SYS').setEditable(true);
			ui('BP_COMPANY').setEditable(true);
			ui('CONTROL_INFO_DEL_FLAG').setEnabled(true);
		},
		_display : function(id){
			ui('MESSAGE_STRIP_BP_ERROR').destroyContent().setVisible(false);
			ui('INPUT_BP_ID').setValueState("None").setValueStateText("");
			this._mode = "display";
			this._id = id;
			let bp_title = this._title;
			bp_title = "Display Business Partner";
			//Buttons
			ui("CREATE_BP_SAVE_BTN").setVisible(false);
			ui("CREATE_BP_EDIT_BTN").setVisible(true);
			ui("CREATE_BP_CANCEL_BTN").setVisible(false);
			ui("CREATE_BP_DEL_BTN").setVisible(true);


			//fields with value
			let response =  async () => {
				let data = await bpDataOrganizer._filteredById(id);
				console.log(data);
				if(data.length > 0){
					ui('BP_TYPE_INFO').setSelectedKey(data[0].TYPE).setEditable(false);
					ui('BP_TYPE_REGNAME').setValue(data[0].NAME1).setEditable(false);
					ui('INPUT_BP_ID').setValue(data[0].BIZPART_ID).setEditable(false);
					ui('BP_TYPE_EXTPARTNER').setValue(data[0].EXT_PARTNER).setEditable(false);
					ui('INPUT_CONTROL_INFO_SOURCE_SYS').setValue(data[0].SOURCE_SYS).setEditable(false);
					let radioIndex = bpDataOrganizer._getRadioIndex(data[0].COMPANY);
					ui('BP_COMPANY').setSelectedIndex(radioIndex).setEditable(false);
					let delFlagBool = (data[0].DEL_FLAG) ? true : false;
					ui('CONTROL_INFO_DEL_FLAG').setState(delFlagBool).setEnabled(false);
				
				
					//title and crumbs
					ui('BP_TITLE').setText(bp_title);
					ui('CREATE_BP_BRDCRMS').setCurrentLocationText(bp_title);
					ui("PANEL_FORM").setTitle("Business Partner ID "+"("+data[0].BIZPART_ID+")");

					go_App_Right.to('CREATE_BP_PAGE');
				}	
			};
			response();
					
		},
		_clear : function(){
			ui('MESSAGE_STRIP_BP_ERROR').destroyContent().setVisible(false);
			ui('INPUT_BP_ID').setValueState("None").setValueStateText("");
			ui('BP_TYPE_INFO').setValue("");
			ui('BP_TYPE_REGNAME').setValue("");
			ui('INPUT_BP_ID').setValue("");
			ui('BP_TYPE_EXTPARTNER').setValue("");
			ui('INPUT_CONTROL_INFO_SOURCE_SYS').setValue("");
			ui('BP_COMPANY').setSelectedIndex(0).setEditable(true);
			ui('CONTROL_INFO_DEL_FLAG').setEnabled(true);
		}
	};

    const createBP = () => {
		let busyDialog = showBusyDialog("Please wait loading..");
		busyDialog.open();
		let data_for_general = {
			TYPE     			: ui('BP_TYPE_INFO').getSelectedKey(),
			NAME1    			: ui('BP_TYPE_REGNAME').getValue().trim(),
			BIZPART_ID      	: ui('INPUT_BP_ID').getValue().trim(),
			EXT_PARTNER      	: ui('BP_TYPE_EXTPARTNER').getValue().trim(),
			SOURCE_SYS     		: ui('INPUT_CONTROL_INFO_SOURCE_SYS').getValue().trim(),
			COMPANY				: ui("BP_COMPANY").getSelectedButton().getId(),
			DEL_FLAG    		: ui('CONTROL_INFO_DEL_FLAG').getState()
   		};
		
		fetch('/bizpartner/create_data',{
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			body : JSON.stringify(data_for_general)
		}).then((response) => {
			if(response.ok){
				screenMode._display(data_for_general.BIZPART_ID);
				fn_show_message_toast("Successfully created new business partner #"+data_for_general.BIZPART_ID);
			}
			console.log(response);
			return response.json();
		}).then(data => {
			console.log(data);
			busyDialog.close();
		}).catch((err) => {
			console.log("Rejected "+err);
			busyDialog.close();
		});
        
    }

	const displayBp =  {
		
		_get_data(search){
			
			let response = async () => {
				let data =  await bpDataOrganizer._filteredById(search);
				this._bind_data(data);
			};
			response();		
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

	let lv_dialog_save = new sap.m.Dialog("BP_SAVE_DIALOG",{
		title: "Confirmation",
		beginButton: new sap.m.Button({
			text:"Ok",
			type:"Accept",
			icon:"sap-icon://accept",
			press:function(oEvt){
				if(screenMode._mode == "create"){
					createBP();
				}else{
					bpDataOrganizer._updateById(screenMode._id);
				}

				oEvt.getSource().getParent().close();
			}
		}),
		endButton:new sap.m.Button({
			text:"Cancel",
			type:"Reject",
			icon:"sap-icon://decline",
			press:function(oEvt){
			oEvt.getSource().getParent().close();
			}
		}),
		content:[
			new sap.m.HBox({
				items:[
				new sap.m.Label({text:"Confirm to save changes?"})
				]
			})
		]
	}).addStyleClass('sapUiSizeCompact');
	let lv_dialog_del = new sap.m.Dialog("BP_DELETE_DIALOG",{
		title: "Confirmation",
		beginButton: new sap.m.Button({
			text:"Ok",
			type:"Accept",
			icon:"sap-icon://accept",
			press:function(oEvt){
				bpDataOrganizer._removeById(screenMode._id);
				oEvt.getSource().getParent().close();
			}
		}),
		endButton:new sap.m.Button({
			text:"Cancel",
			type:"Reject",
			icon:"sap-icon://decline",
			press:function(oEvt){
			oEvt.getSource().getParent().close();
			}
		}),
		content:[
			new sap.m.HBox({
				items:[
				new sap.m.Label({text:"Confirm to delete business partner?"})
				]
			})
		]
	}).addStyleClass('sapUiSizeCompact');




</script>
