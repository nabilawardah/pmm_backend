<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class tb_user extends Model
{
   // protected $table='tb_user';
    protected $fillable = [
    	'email', 'password'];
}
    