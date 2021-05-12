<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class MailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         \App\Models\Email::factory(2)->create();
    }
}