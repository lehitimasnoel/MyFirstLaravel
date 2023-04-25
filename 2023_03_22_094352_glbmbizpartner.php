<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('glbmbizpartner', function (Blueprint $table) {
            $table->string('COMPANY',10)->nullable();
            $table->string('TYPE',20)->nullable();
            $table->string('BIZPART_ID',30)->nullable();
            $table->string('NAME1',50)->nullable();
            $table->unsignedInteger('ADDRESS_ID');
            $table->string('EXT_PARTNER',30)->nullable();
            $table->string('DEL_FLAG',1)->nullable();
            $table->string('SOURCE_SYS',10)->nullable();
            
            $table->string('created_by',45);
            $table->string('updated_by',45);
            $table->timestamps();
            $table->primary(array('BIZPART_ID'));
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
