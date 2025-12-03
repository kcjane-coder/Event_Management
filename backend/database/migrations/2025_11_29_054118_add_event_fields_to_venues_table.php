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
        Schema::table('venues', function (Blueprint $table) {
            // Make columns NOT NULL with default values
            $table->string('event_type')->nullable(false)->change();
            $table->string('food_type')->nullable(false)->change();
            $table->string('equipment_type')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('venues', function (Blueprint $table) {
            // Revert columns back to nullable without default
            $table->string('event_type')->nullable()->default(null)->change();
            $table->string('food_type')->nullable()->default(null)->change();
            $table->string('equipment_type')->nullable()->default(null)->change();
        });
    }
};
