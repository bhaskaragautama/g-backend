<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AreasTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('areas')->delete();
        
        \DB::table('areas')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'hokkaido',
                'display_name' => '北海道',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'tohoku',
                'display_name' => '東北',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'kanto',
                'display_name' => '関東',
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'chubu',
                'display_name' => '中部',
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'kinki',
                'display_name' => '近畿',
            ),
            5 => 
            array (
                'id' => 6,
                'name' => 'chugoku',
                'display_name' => '中国',
            ),
            6 => 
            array (
                'id' => 7,
                'name' => 'shikoku',
                'display_name' => '四国',
            ),
            7 => 
            array (
                'id' => 8,
                'name' => 'kyusyu',
                'display_name' => '九州・沖縄',
            ),
        ));
        
        
    }
}