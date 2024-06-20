<?php

namespace App\Http\Controllers;

use App\Models\CandidateReference;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;

class CandidateReferenceController extends Controller
{
    public function index() {
        $references = CandidateReference::withTrashed()->with(['user'])->get();
        return response()->json($references);
    }

    public function getUserReferences()
    {
        $user = User::find(auth()->id());
        $references = $user->candidate_references()->orderBy('id', 'DESC')->get();

        return response()->json($references);
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'firstname' => 'string|required',
            'lastname' => 'string|required',
            'email' => 'string|required|email',
            'phone_number' => 'string|nullable',
            'date_joined' => 'string|required',
            'project_name' => 'string|required',
            'project_role' => 'string|required',
            'is_project_completed' => 'string|required',
            'recruiter_name' => 'string|required',
            'recruiter_email' => 'string|required',
            'position' => 'string|required',
            'success_story' => 'string|required',
        ]);

        $fields['name'] = $fields['firstname'] . ' ' . $fields['lastname'];
        unset($fields['firstname'], $fields['lastname']);

        if(isset($fields['date_joined'])){
            $fields['date_joined'] =  new Carbon($fields['date_joined']);
        }

        if ($request->hasFile('cv')) {
            $path = $request->file('cv')->store(
                'public/candidate_cv'
            );
            $fields['cv'] = Storage::url($path);
        }

        $user = User::find(auth()->id());

        $reference = $user->candidate_references()->create($fields);

        return response()->json([
            'message' => 'Refecrence request successful',
            'data ' => $reference
        ]);
    }

    public function cancelReferenceRequest(Request $request)
    {
        $fields = $request->validate([
            'firstname' => 'string|required',
            'lastname' => 'string|required',
            'date' => 'string|required'
        ]);

        $name = $fields['firstname'] . ' ' . $fields['lastname'];

        $ref = CandidateReference::where('name', $name)->where('created_at', $fields['date'])->where('user_id', auth()->id())->first();

        $ref->delete();

        return response()->json([
            'message' => 'Reference request canceled successful'
        ]);
    }

    public function uploadFile(Request $request)
    {
        $request->validate([
            'file' => 'required|max:6442450944|mimes:application/octet-stream,audio/mpeg,mpga,mp3,wav'
        ]);

        $receiver = new FileReceiver('file', $request, HandlerFactory::classFromRequest($request));

        if(!$receiver->isUploaded()){

        }

        $fileReceived = $receiver->receive();
        if($fileReceived->isFinished()){
            $file = $fileReceived->getFile();

            $this->saveFile($file);
        }

        $handler = $fileReceived->handler();

        return response()->json([
            "done" => $handler->getPercentageDone(),
            'status' => true
        ]);
    }

        /**
     * Saves the file to S3 server
     *
     * @param UploadedFile $file
     *
     * @return JsonResponse
     */
    protected function saveFile($file)
    {
        $fileName = $this->createFilename($file);

        $path = Storage::putFileAs('photos', $file, $fileName);

        $mime = str_replace('/', '-', $file->getMimeType());

        // We need to delete the file when uploaded to s3
        unlink($file->getPathname());

        return response()->json([
            'path' => $path,
            'name' => $fileName,
            'mime_type' =>$mime
        ]);
    }

    /**
     * Create unique filename for uploaded file
     * @param UploadedFile $file
     * @return string
     */
    protected function createFilename(UploadedFile $file)
    {
        $extension = $file->getClientOriginalExtension();
        $filename = str_replace(".".$extension, "", $file->getClientOriginalName()); // Filename without extension

        // Add timestamp hash to name of the file
        $filename .= "_" . md5(time()) . "." . $extension;

        return $filename;
    }
}