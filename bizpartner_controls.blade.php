<script>
    
    function CreateContent(){

        var go_Shell = new sap.m.Shell({});
        //left page
        go_App_Left = new sap.m.App({});
        go_App_Left.addPage(create_page_menu());

        //right page
        go_App_Right = new sap.m.App({});
        go_App_Right.addPage(createBizPage());	
		go_App_Right.addPage(createDisplayBizPage());
		go_App_Right.addPage(createListBP());


        go_SplitContainer = new sap.ui.unified.SplitContainer({ content: [go_App_Right], secondaryContent: [go_App_Left]});		
        go_SplitContainer.setSecondaryContentWidth("250px");
        go_SplitContainer.setShowSecondaryContent(true);
        

        let go_App = new sap.m.App({
            pages : [go_SplitContainer]
        });

        go_Shell.setApp(go_App);
        go_Shell.setAppWidthLimited(false);
        go_Shell.placeAt("content");     
    }

    function create_page_menu(){
        let page = new sap.m.Page({}).addStyleClass('sapUiSizeCompact');
        let pageHeader  = new sap.m.Bar({enableFlexBox: false,contentMiddle:[ new sap.m.Label({text:"Action"})]});
        const menuList = new sap.m.List("MENU_LIST",{});
		const menuListTemplate = new sap.m.StandardListItem("LEFT_MENU_TEMPLATE",{
			title:"{title}",
			icon:"{icon}",
			visible:"{visible}",
			type: sap.m.ListType.Active,
			press:function(oEvent){
				
                let menu = oEvent.getSource().getBindingContext().getProperty('funct');
				let list_items = oEvent.getSource().getParent().getItems();

                for (var i = 0; i < list_items.length; i++) {
                    list_items[i].removeStyleClass('class_selected_list_item');
                   //$('LEFT_MENU_TEMPLATE-MENU_LIST-0').removeClass('class_selected_list_item');
                }

                oEvent.getSource().addStyleClass('class_selected_list_item');
				
				switch(menu){
					case "CREATE_BP" :
						go_App_Right.to('CREATE_BP_PAGE');
					break;
					case "DISPLAY_BP" :
						go_App_Right.to('BP_PAGE_DISPLAY');
					break;
					case "BP_LIST" :

						listingBp._getData(bizData);
						go_App_Right.to('PAGE_BP_LISTING');
					break;

				}
                
			}
		});
		
        const gt_list = [
                {
                    title   : "Create Business Partner",
					funct  	: "CREATE_BP",
                    icon    : "sap-icon://add-product",
                    visible : true
                },
                {
                    title   : "Display Business Partner",
                    icon    : "sap-icon://business-card",
					funct  	: "DISPLAY_BP",
                    visible : true
                },
                {
                    title   : "Business Partner Listing",
                    icon    : "sap-icon://checklist-item",
					funct  	: "BP_LIST",
                    visible : true
                }

        ];

        let model = new sap.ui.model.json.JSONModel();
			model.setSizeLimit(gt_list.length);
			model.setData(gt_list);

			ui('MENU_LIST').setModel(model).bindAggregation("items",{
				path:"/",
				template:ui('LEFT_MENU_TEMPLATE')
			});
		
        page.setCustomHeader(pageHeader);
		page.addContent(menuList);		
		return page;
    }

    function createBizPage(){
        let page  = new sap.m.Page("CREATE_BP_PAGE",{}).addStyleClass('sapUiSizeCompact');
        let pageHeader = new sap.m.Bar("",{  
			enableFlexBox: false,
			contentLeft:[
				new sap.m.Button({ icon:"sap-icon://nav-back",
					press:function(oEvt){
						
					} 
				}),
				new sap.m.Button({icon:"sap-icon://menu2",
					press:function(){
						go_SplitContainer.setSecondaryContentWidth("250px");
						if(!go_SplitContainer.getShowSecondaryContent()){
							go_SplitContainer.setShowSecondaryContent(true);
						} else {							
							go_SplitContainer.setShowSecondaryContent(false);
						}
					
					}
				}), 
				
			],
			contentMiddle:[
                new sap.m.Label("",{text:"Create Business Partner"})
            ],
		
		});
        let crumbs = new sap.m.Breadcrumbs("CREATE_BP_BRDCRMS",{
            currentLocationText: "Create Business Partner",
            links: [
                new sap.m.Link({
                    text:"Home",
                    press:function(oEvt){
                       // fn_click_breadcrumbs("HOME");
                    }
                }),
				new sap.m.Link("CREATE_BP_BRDCRMS_TITLE",{
                    text:"Business Partner Management",
                    press:function(oEvt){
                      //  fn_click_breadcrumbs("HOME");
                    }
                }),
				
            ]
        });

        let createPageForm = new sap.uxap.ObjectPageLayout({
            headerTitle:[
                new sap.uxap.ObjectPageHeader("OBJECTHEADER_BP_NAME",{
                    objectTitle:"",
					showPlaceholder : false,
					actions:[
                        new sap.uxap.ObjectPageHeaderActionButton("CREATE_BP_SAVE_BTN",{
                            icon: "sap-icon://save",
							press: function(evt){
								createBP();

                            }
                        }).addStyleClass("sapMTB-Transparent-CTX"),
                        new sap.uxap.ObjectPageHeaderActionButton("CREATE_BP_EDIT_BTN",{
                            icon: "sap-icon://edit",
							press: function(){
									ui("COMPCODE_SAVE_DIALOG").open();
                            }
                        }).addStyleClass("sapMTB-Transparent-CTX"),

                    ],
                })
            ],
            sections:[
                new sap.uxap.ObjectPageSection("GENERAL_DATA_TAB",{
                    title: "General Info",
                    subSections : [
                        new sap.uxap.ObjectPageSubSection({
                            title: "",
							blocks:[
                                new sap.m.Panel({
                                    content: [
                                        new sap.ui.layout.Grid({
                                            defaultSpan:"L12 M12 S12",
											width:"auto",
											content:[
                                                new sap.ui.layout.form.SimpleForm({
                                                    maxContainerCols:2,
													labelMinWidth:130,
													content:[
                                                        new sap.ui.core.Title("GENERAL_INFO_TITLE1",{text:""}),

                                                        new sap.m.Label({text:"Business Partner Type",width:"160px"}).addStyleClass('class_label_padding'),
														new sap.m.Input("BP_TYPE_INFO",{value:"", width:TextWidth}),

                                                        new sap.m.Label({text:"Registered Name",width:labelWidth}).addStyleClass('class_label_padding'),
														new sap.m.Input("BP_TYPE_REGNAME",{value:"", width:TextWidth}),
                                                        
                                                        new sap.m.Label({text:"Business Partner ID",width:"150px"}).addStyleClass('class_label_padding'),
														new sap.m.Input("INPUT_BP_ID",{
															value:"", 
															width:TextWidth,
															liveChange : function(oEvt){
																var lv_value = oEvt.getSource().getValue().trim();
																//if(gv_partner_ind){
																	//var lv_obj_header = ""
																	//var label = "New Business Partner"
																	//lv_obj_header = label + " (" + lv_value + ")";
																	//ui("OBJECTHEADER_BP_NAME").setObjectTitle(lv_obj_header).setObjectSubtitle("");
																//}
															}
														}),
                                                        new sap.ui.core.Title("GENERAL_INFO_TITLE2",{text:""}),

                                                        new sap.m.Label({text:"External Partner",width:labelWidth}).addStyleClass('class_label_padding'),
														new sap.m.Input("BP_TYPE_EXTPARTNER",{value:"", width:TextWidth}),
														
														new sap.m.Label({text:"Source System",width:labelWidth}).addStyleClass('class_label_padding'),
														new sap.m.Input("INPUT_CONTROL_INFO_SOURCE_SYS",{width:TextWidth}),
															
                                                        new sap.m.Label({text:"Deletion Flag",width:labelWidth}).addStyleClass('class_label_padding'),
														new sap.m.Switch("CONTROL_INFO_DEL_FLAG",{state:false}),
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        new sap.uxap.ObjectPageSubSection({
                            title: "ADDRESS",
                            blocks:[]
                        })
                    ]        
                }),
                new sap.uxap.ObjectPageSection("COMP_CODE_TAB",{
					title: "Company Code",
					subSections:[
						new sap.uxap.ObjectPageSubSection({
							blocks:[
								new sap.m.Panel({
									content:[
										new sap.ui.table.Table("GO_TABLE_COMPCODE",{
											visibleRowCount:8,
											selectionMode:"None",
											enableCellFilter: true,
											enableColumnReordering:true,
											toolbar:[
												new sap.m.Toolbar({
													design:"Transparent",
													content:[
														new sap.m.Text("TABLE_LABEL_COMPCODE",{text:"Company Code (0)"}),
														new sap.m.ToolbarSpacer(),
														new sap.m.Button ("COMPCODE_ADD_BUTTON",{
															icon: "sap-icon://add",
															press: function(){
																gv_bind_mode = "create";
																ui('COMPCODE_FORM_DIALOG').open();
															}
														})
													]
												})
											],
											columns:[
												
												new sap.ui.table.Column({label:new sap.m.Text({text:"Company Code"}),
													autoResizable:true,
													sortProperty:"COMPANY_DESC",
													filterProperty:"COMPANY_DESC",
													autoResizable:true,
													template:new sap.m.Text({text:"{COMPANY_DESC}",maxLines:1,tooltip:"{COMPANY_DESC}"})
												}),
												new sap.ui.table.Column({label:new sap.m.Text({text:"Business Reg No"}),
													autoResizable:true,
													sortProperty:"BIZ_REG",
													filterProperty:"BIZ_REG",
													autoResizable:true,
													template:new sap.m.Text({text:"{BIZ_REG}",maxLines:1,tooltip:"{BIZ_REG}"})
												}),
												new sap.ui.table.Column({label:new sap.m.Text({text:"Payment Term"}),
													autoResizable:true,
													sortProperty:"PYMT_TERM",
													filterProperty:"PYMT_TERM",
													autoResizable:true,
													template:new sap.m.Text({text:"{PYMT_TERM}",maxLines:1,tooltip:"{PYMT_TERM}"})
												}),
												new sap.ui.table.Column({label:new sap.m.Text({text:"GST Reg No"}),
													autoResizable:true,
													sortProperty:"GST_REG",
													filterProperty:"GST_REG",
													autoResizable:true,
													template:new sap.m.Text({text:"{GST_REG}",maxLines:1,tooltip:"{GST_REG}"})
												}),
												new sap.ui.table.Column({label:new sap.m.Text({text:"GST Effective Date"}),
													autoResizable:true,
													sortProperty:"GST_DATE",
													filterProperty:"GST_DATE_DESC",
													autoResizable:true,
													template:new sap.m.Text({text:"{GST_DATE_DESC}",maxLines:1,tooltip:"{GST_DATE_DESC}"})
												}),
												new sap.ui.table.Column("COMPCODE_DEL_BTN", {
													width:"50px",
													hAlign :"Left",
													template: new sap.m.Button({
														icon: "sap-icon://delete",
														width: "100%",
														//textAlign: "Left",
														press: function (oEvt) {
															var lo_index = String(oEvt.getSource().getBindingContext().getPath());
															var lv_index = parseInt(lo_index.split("/")[1]);
															var lt_deleted_data = gt_compcode_details.splice(lv_index,1);
																							
															for(var i=0; i < lt_deleted_data.length; i++){
																if(lt_deleted_data[i].DATA_ID !== ""){
																	gt_deleted_compcode_data.push(lt_deleted_data[i]);
																}
															}
															fn_bind_bizdata(gt_compcode_details,"GO_TABLE_COMPCODE");
															ui('TABLE_LABEL_COMPCODE').setText("Company Code ("+gt_compcode_details.length+")");
														}
													})
												}),
												
											],
											cellClick : function(oEvt){
												var lv_bind = oEvt.getParameters().rowBindingContext;	
												if(lv_bind != undefined){
													gv_bind_mode = "edit";
													var lv_data = ui("GO_TABLE_COMPCODE").getModel().getData();
													var lv_row_index = oEvt.getParameters().rowIndex;
													gv_bind_index = fn_actual_index("GO_TABLE_COMPCODE",lv_row_index);
													fn_set_company_code_fields_visibility(lv_bind);
												}
											}
										})
									]
								})
							]
						})
					]
				}),
                new sap.uxap.ObjectPageSection("SECTION_ATTACHMENT",{
                    title:"ATTACHMENT",
					subSections:[
						new sap.uxap.ObjectPageSubSection({
                            title:"Attachment",
							blocks:[
							]
						})
					]
				}),
            ]      
        });

        page.setCustomHeader(pageHeader);
        page.addContent(crumbs);
        page.addContent(createPageForm);
        return page;
    }

	function createDisplayBizPage(){
		
		
		var lv_Page  = new sap.m.Page("BP_PAGE_DISPLAY",{}).addStyleClass('sapUiSizeCompact');
		
		var lv_header = new sap.m.Bar({
			enableFlexBox: false,
			contentLeft:[
				new sap.m.Button({ icon:"sap-icon://nav-back",
					press:function(oEvt){
						//gv_flag_cancel_from = "CREATE_HOME";
						//ui("LABEL_CONFIRMATION_DIALOG").setText("Confirm to navigate to main page?");
						//ui("CONFIRMATION_DIALOG").open();
					} 
				}),
				new sap.m.Button({icon:"sap-icon://menu2",
					press:function(){
						go_SplitContainer.setSecondaryContentWidth("250px");
						if(!go_SplitContainer.getShowSecondaryContent()){
							go_SplitContainer.setShowSecondaryContent(true);
						} else {							
							go_SplitContainer.setShowSecondaryContent(false);
						}
					}
				})
				//new sap.m.Image({src: logo_path}),
			],

			contentMiddle:[gv_Lbl_NewPrdPage_Title = new sap.m.Label("DISP_BP_TITLE",{text:"Display Business Partner"})],
			
			contentRight:[
				new sap.m.Button({
					icon: "sap-icon://home",
					press: function(){
						window.location.href = MainPageLink; 
					}
				})
			]
		});
		
		var lv_crumbs = new sap.m.Breadcrumbs("DISP_BP_BRDCRMS",{
            currentLocationText: "Display Business Partner",
            links: [
                new sap.m.Link({
                    text:"Home",
                    press:function(oEvt){
                       // fn_click_breadcrumbs("HOME");
                    }
                }),
				new sap.m.Link("DISP_BP_BRDCRMS_TITLE",{
                    text:"Business Partner Management",
                    press:function(oEvt){
                      //  fn_click_breadcrumbs("HOME");
                    }
                }),
				
            ]
        }).addStyleClass('breadcrumbs-padding');
		
		
		var lv_searchfield =  new sap.m.Bar({
			enableFlexBox: false,
			contentLeft: [
				// actual search field
				new sap.m.SearchField("SEARCHFIELD_DISPLAY_OUTLET",{
					width: "99%",
					liveChange: function(oEvt){
						var lv_search_val = oEvt.getSource().getValue().trim();
						if(lv_search_val == ""){
							ui("DISPLAY_BP_TABLE").setVisible(false);
						}
					},
					placeholder: "Search...",
					search: function(oEvent){
						var lv_searchval = oEvent.getSource().getValue().trim();
						displayBp._get_data(lv_searchval);
					},
				})
			],
		});
		
		var lv_table = new sap.ui.table.Table("DISPLAY_BP_TABLE", {
			visible:false,
			visibleRowCountMode:"Auto",
			selectionMode:"None",
			enableCellFilter: true,
			enableColumnReordering:true,
			toolbar:[
				new sap.m.Toolbar({
					design:"Transparent",
					content:[
						new sap.m.Text("DISPLAY_BP_TABLE_LABEL",{text:"List (0)"}),
					]
				})
			],
			filter:function(oEvt){
				oEvt.getSource().getBinding("rows").attachChange(function(oEvt){
					var lv_row_count = oEvt.getSource().iLength;
					ui('DISPLAY_BP_TABLE_LABEL').setText("List (" + lv_row_count + ")");
				});
			},
			cellClick: function(oEvt){
				
				var lv_bind = oEvt.getParameters().rowBindingContext;
				
				if(lv_bind != undefined){
					//var lv_addr_id = oEvt.getParameters().rowBindingContext.getProperty("ADDRESS_ID");
					var lv_bp_id = oEvt.getParameters().rowBindingContext.getProperty("BIZPART_ID");
					if(lv_bp_id){
						//fn_get_addr_details(lv_bp_id,lv_addr_id);
					}
				}
				
			},
			columns: [
			
				new sap.ui.table.Column({label:new sap.m.Text({text:"Business Partner ID"}),
					width:"20%",
					sortProperty:"BIZPART_ID",
					filterProperty:"BIZPART_ID",
					autoResizable:true,
					template:new sap.m.Text({text:"{BIZPART_ID}",maxLines:1}),
				}),
				new sap.ui.table.Column({label:new sap.m.Text({text:"Business Partner Name"}),
					width:"40%",
					sortProperty:"NAME1",
					filterProperty:"NAME1",
					autoResizable:true,
					template:new sap.m.Text({text:"{NAME1}",tooltip:"{NAME1}",maxLines:1}),
				}),
				new sap.ui.table.Column({label:new sap.m.Text({text:"External Partner"}),
					width:"40%",
					sortProperty:"EXT_PARTNER",
					filterProperty:"EXT_PARTNER",
					autoResizable:true,
					template:new sap.m.Text({text:"{EXT_PARTNER}",tooltip:"{EXT_PARTNER}",maxLines:1}),
				}),
				
			]
		});
		
		lv_Page.setCustomHeader(lv_header);
		lv_Page.addContent(lv_crumbs);
		lv_Page.addContent(lv_searchfield);
		lv_Page.addContent(lv_table);
		
		return lv_Page;
	}

	function createListBP(){

		var lv_Page  = new sap.m.Page("PAGE_BP_LISTING",{}).addStyleClass('sapUiSizeCompact');

		var lv_header = new sap.m.Bar({
			enableFlexBox: false,
			contentLeft:[
				new sap.m.Button({ icon:"sap-icon://nav-back",
					press:function(oEvt){ 
						
						go_App_Right.to('PAGE_SELECT_BP_SCREEN');
						
					}
				}),
				new sap.m.Button({icon:"sap-icon://menu2",
					press:function(){
						go_SplitContainer.setSecondaryContentWidth("270px");
						if(!go_SplitContainer.getShowSecondaryContent()){
							go_SplitContainer.setShowSecondaryContent(true);
						} else {							
							go_SplitContainer.setShowSecondaryContent(false);
						}
					}
				}), 
				//new sap.m.Image({src: logo_path}),
				],
			contentMiddle:[gv_Lbl_NewPrdPage_Title = new sap.m.Label("BP_LISTING_PAGE_LABEL",{text:"Business Partner Listing"})],
			
			contentRight:[
				//fn_help_button(SelectedAppID,"BP_LISTING"),
				new sap.m.Button({  
					icon: "sap-icon://home",
					press: function(){
					window.location.href = MainPageLink; 
					}
				})
			]
		});
					
		var lv_crumbs = new sap.m.Breadcrumbs("LIST_BP_BRDCRMS",{
			currentLocationText: "Business Partner Listing",
			links: [
				new sap.m.Link({
					text:"Home",
					press:function(oEvt){
					// fn_click_breadcrumbs("HOME");
					}
				}),
				new sap.m.Link("LIST_BP_BRDCRMS_TITLE",{
					text:"Business Partner Management",
					press:function(oEvt){
					//  fn_click_breadcrumbs("HOME");
					}
				}),
				
			]
		}).addStyleClass('breadcrumbs-padding');


		var lv_table = new sap.ui.table.Table("BP_LISTING_TABLE",{
			visibleRowCountMode:"Auto",
			selectionMode:"None",
			enableCellFilter: true,
			enableColumnReordering:true,
			filter:function(oEvt){
				oEvt.getSource().getBinding("rows").attachChange(function(oEvt){
					var lv_row_count = oEvt.getSource().iLength;
					ui('BP_LISTING_LABEL').setText("Business Partner (" + lv_row_count + ")");
				});
			},
			toolbar: [
                new sap.m.Toolbar({
                    content: [
                        new sap.m.Label("BP_LISTING_LABEL", {
                            text:"Business Partner (0)"
                        }),
                        new sap.m.ToolbarSpacer(),
                        new sap.m.Button("BTN_DOWNLOAD", {
                            visible: true,
                            icon: "sap-icon://download",
                            press: function () {
								
                            }
                        })
                    ]
                }).addStyleClass('class_transparent_bar'),
            ],
			cellClick: function(oEvt){
				
				var lv_bind = oEvt.getParameters().rowBindingContext;
				
				if(lv_bind != undefined){
					var lv_addr_id = oEvt.getParameters().rowBindingContext.getProperty("ADDRESS_ID");
					var lv_bp_id = oEvt.getParameters().rowBindingContext.getProperty("BIZPART_ID");
					if(lv_bp_id){
						fn_get_addr_details(lv_bp_id);
					}
				}
			},
			columns:[
				
				new sap.ui.table.Column({label:new sap.m.Text({text:"Business Partner ID"}),
					width:"180px",
					sortProperty:"BIZPART_ID",
					filterProperty:"BIZPART_ID",
					//autoResizable:true,
					template:new sap.m.Text({text:"{BIZPART_ID}",tooltip:"{BIZPART_ID}",maxLines:1}),
				}),
				new sap.ui.table.Column({label:new sap.m.Text({text:"Business Partner Type"}),
					width:"250px",
					sortProperty:"TYPE",
					filterProperty:"TYPE",
					autoResizable:true,
					template:new sap.m.Text({text:"{TYPE}",tooltip:"{TYPE}",maxLines:1}),
				}),
				new sap.ui.table.Column({label:new sap.m.Text({text:"Registered Name"}),
					width:"350px",
					sortProperty:"NAME1",
					filterProperty:"NAME1",
					template:new sap.m.Text({text:"{NAME1}",tooltip:"{NAME1}",maxLines:1}),
				}),
				new sap.ui.table.Column({label:new sap.m.Text({text:"External Partner"}),
					width:"400px",
					sortProperty:"EXT_PARTNER",
					filterProperty:"EXT_PARTNER",
					template:new sap.m.Text({text:"{EXT_PARTNER}",tooltip:"{EXT_PARTNER}",maxLines:1}),
				}),
				
				
				new sap.ui.table.Column({label:new sap.m.Text({text:"Created By"}),
					width:"160px",
					sortProperty:"created_by",
					filterProperty:"created_by",
					template:new sap.m.Text({text:"{created_by}",tooltip:"{created_by}",maxLines:1}),
				}),
				new sap.ui.table.Column({label:new sap.m.Text({text:"Creation Date"}),
					width:"150px",
					sortProperty:"created_at",
					filterProperty:"created_at_desc",
					template:new sap.m.Text({text:"{created_at_desc}",tooltip:"{created_at_desc}",maxLines:1}),
				}),
				
			]

		});

		lv_Page.setCustomHeader(lv_header);
		lv_Page.addContent(lv_crumbs);
		lv_Page.addContent(lv_table);


		return lv_Page;




		}

</script>