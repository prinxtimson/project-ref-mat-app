<?php

namespace App\Http\Controllers;

use App\Actions\Basecamp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BasecampController extends Controller
{
    public function getProjects()
    {

        $projects = Cache::get('bc_projects', []);

        return response()->json($projects);
    }

    public function setProjects()
    {
        $basecamp = new Basecamp;

        $basecamp->getAllProjects();

        return response()->json(['message' => 'project set successful']);
    }
}
