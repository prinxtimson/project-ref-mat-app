<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Dev Tritek',
            'username' => 'devtritek',
            'avatar' => '/images/no_img.png',
            'email' => 'developertritek@gmail.com',
            'password' => Hash::make('Tritek@2024'),
        ]);

        $user->markEmailAsVerified();

        $user->profile()->create([
            'firstname' => 'Dev',
            'lastname' => 'Tritek',
        ]);

        $user2 = User::create([
            'name' => 'Project Refmat',
            'username' => 'refmat',
            'avatar' => '/images/no_img.png',
            'email' => 'projectrefmat0324@gmail.com',
            'password' => Hash::make('Refmat@2024'),
        ]);

        $user2->markEmailAsVerified();

        $user2->profile()->create([
            'firstname' => 'Project',
            'lastname' => 'Refmat',
        ]);
    }
}