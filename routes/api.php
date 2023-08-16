<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\MintedNftsController;
use App\Http\Controllers\ProjectScoreController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth routes
// Route::post("/paper/login", [AuthController::class, 'loginWithPaper']);
Route::post("/login", [AuthController::class, 'loginUser']);
Route::post("/register", [AuthController::class, 'register']);

// Mint painter
Route::post("/mintNft", [MintedNftsController::class, 'signature']);

// Text to Image Routes
Route::post('/nfts/textToImage', [MintedNftsController::class, 'generateTextToImage']);
Route::post('/nfts/share/discord', [MintedNftsController::class, 'discordShare']);

Route::post('/project/create', [ProjectController::class, 'create']);

Route::middleware('auth:sanctum')->group(function () {
    // Minted nfts routes
    Route::post('/nfts', [MintedNftsController::class, 'storeNFT']);
    Route::post('/nfts/draft', [MintedNftsController::class, 'saveDraft']);

    // get NFTS and Drafts for profile
    Route::get('/nfts', [MintedNftsController::class, 'showNftsAndDrafts']);

    // Post VOTE for project
    Route::post('/project/vote/{id}', [ProjectScoreController::class, 'vote']);

    // TODO: Update and delete for drafts
    // Route::put('/nfts/{id}', [MintedNftsController::class, 'update']);
    // Route::delete('/nfts/{id}', [MintedNftsController::class, 'destroy']);

    // Auth routes
    Route::post("/paper/connect", [AuthController::class, 'connectPaperWallet']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
