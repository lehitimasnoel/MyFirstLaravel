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
    var go_App_Right = "";
    var go_App_Left = "";
    var go_SplitContainer = "";
    var labelWidth = "140px";
	var TextWidth ="auto";
    var mode =  "";
    var filteredBP = [];
    
    
    $(document).ready(function () {	
        CreateContent();
	});

   

   
</script>

 @endsection



 