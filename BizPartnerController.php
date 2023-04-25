<?php

namespace App\Http\Controllers\Bizpartner;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\glbmbizpartner;
use Carbon\Carbon;

class BizPartnerController extends Controller
{   

    public function showPage(){

        return view('bizpartner/bizpartner_template');
    }

    public function sampleData(){
        $data = [
            [
                'title'   => "Bizpartner",
                'name'    => "Noel",
                'age'     => 1,
                'status'  => ""
            ]
    
        ];

        return $data;
    }


    public function createBP(Request $request){
    
        $createBpData[] = $request->all();
        $return = [];

        try{

            $date = date('Y-m-d H:i:s');
            $newDate = Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('m/d/Y');

            foreach($createBpData as $k => $v){
                $createBpData[$k]['ADDRESS_ID'] =  1000112;
                $createBpData[$k]['DEL_FLAG'] =  ($createBpData[$k]['DEL_FLAG']) ? "X" : ""; 
                $createBpData[$k]['created_at'] =  \Carbon\Carbon::now();
                $createBpData[$k]['created_by'] =  "Noel";
                $createBpData[$k]['updated_by'] =  "Noel";
            }
           
            glbmbizpartner::insert($createBpData);
        }catch(\Exception $e){
            Log::error($e);
            $return['error']  = true;
            $return['message'] = $e->getMessage();
        }

        return compact('return','createBpData');

    }

    public function updateBP(Request $request){
    
        $updateBpData = (!empty($request->get('bpDataupdate')) ? $request->get('bpDataupdate') : []);
        $bpId = (!empty($request->get('BP_ID')) ? $request->get('BP_ID') : "");

        $return = [];

        try{
          
            foreach($updateBpData as $k => $v){
                $updateBpData[$k]['DEL_FLAG'] =  ($updateBpData[$k]['DEL_FLAG']) ? "X" : ""; 
                $updateBpData[$k]['updated_at'] =  \Carbon\Carbon::now();
                $updateBpData[$k]['created_by'] =  "Noel";
                $updateBpData[$k]['updated_by'] =  "Noel";
            }
            
            glbmbizpartner::where('BIZPART_ID',$bpId)->update($updateBpData[0]);
        }catch(\Exception $e){
            Log::error($e);
            $return['error']  = true;
            $return['message'] = $e->getMessage();
        }

        return compact('return','updateBpData');

    }

    public function getBpById($bpId){
        
        $bpId = base64_decode($bpId);
        $getBpById = glbmbizpartner::where('BIZPART_ID',$bpId)->get();
        
        return $getBpById;
    }

    public function getBpData(){

        $data = glbmbizpartner::get();

        return $data;
    }

    public function removeBpById(Request $request){
        $bpId = (!empty($request->get('BP_ID')) ? $request->get('BP_ID') : "");
        
        try{

            $getBpById = glbmbizpartner::where('BIZPART_ID',$bpId)->delete();

        }catch(\Exception $e){
            Log::error($e);
            $return['error']  = true;
            $return['message'] = $e->getMessage();
        }
        
        
        return $getBpById;
    }
    


   
}
