<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/hello',function(){
    return "Hello World";
});

Route::get('Designs/designs', function () {
    return view('Designs.designs');
});

Route::get('bizpartner/management',function(){
    return view('bizpartner/bizpartner_template');
});
//from controller
Route::get('bizpartner/management1','Bizpartner\BizPartnerController@showPage');

//get data fron controller
Route::get('bizpartner/getDataById/{bp_id}','Bizpartner\BizPartnerController@getBpById');
Route::get('bizpartner/getBpData','Bizpartner\BizPartnerController@getBpData');
Route::post('bizpartner/create_data','Bizpartner\BizPartnerController@createBP');
Route::post('bizpartner/update_data','Bizpartner\BizPartnerController@updateBP');
Route::post('bizpartner/removeDataById','Bizpartner\BizPartnerController@removeBpById');




//basic routing
Route::get('contact_us',function(){
    return "Hello";
})->name("greet_contact_us"); //name route


//required parameters
Route::get('contact_us/{name?}',function($name){
    return "Hello ".$name;
});

//requires parameters optional 
Route::get('contact_us1/{name?}',function($name = "Noel"){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    return "Hello ".$name;
});







