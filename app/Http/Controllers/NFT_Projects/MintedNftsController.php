<?php

namespace App\Http\Controllers;

use App\Models\MintedNfts;
use App\Models\NftDrafts;
use App\Models\User;
use Facade\FlareClient\Stacktrace\File as StacktraceFile;
use Google\Service\CloudSourceRepositories\Repo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use PhpParser\Node\Stmt\TryCatch;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use File;
use function PHPUnit\Framework\throwException;

class MintedNftsController extends Controller
{

    /**
     * Generate a list of images from user input from dream API
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function generateTextToImage(Request $request)
    {
        try {

            $fields = $request->validate([
                'userInput' => 'string|required',
            ]);

            $engineId = 'stable-diffusion-512-v2-0';
            $apiHost = env('API_HOST') ?? 'https://api.stability.ai';

            $url = "$apiHost/v1alpha/generation/$engineId/text-to-image";

            $apiKey = env('STABILITY_API_KEY');
            if (!$apiKey) {
                throwException("Missing Stability API key.");
            }

            $client = new \GuzzleHttp\Client();

            $body = [
                "cfg_scale" => 7,
                "clip_guidance_prest" =>
                'FAST_BLUE',
                "height" => 512,
                "width" => 512,
                "samples" => 5,
                "steps" => 50,
                "text_prompts" => [["text" => $fields['userInput'], "weight" => 1], ["text" => "Oil Painting", "weight" => 2]]
            ];

            $response = $client->request('POST', $url, [
                'body' => json_encode($body),
                'headers' => [
                    'Authorization' => $apiKey,
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/json',
                ],
            ]);

            return response()->json([
                "message" => "Success",
                "images" => json_decode($response->getBody(), true)
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of all mintedNfts by project ID.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveDraft(Request $request)
    {
        try {
            $fields = $request->validate([
                'name' => 'string|required',
                'description' => 'string|required',
                'htmlCID' => 'string|required',
                'imageCID' => 'string|required',
            ]);

            $userID = auth()->user()->id;

            // create new NFT
            $draft = NftDrafts::create([
                'image_cid' => $fields['imageCID'],
                'html_cid' => $fields['htmlCID'],
                'user_id' => $userID,
                'name' => $fields['name'],
                'description' => $fields['description'],
            ]);

            return response()->json([
                'draft' => $draft
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function discordShare(Request $request)
    {
        try {
            $fields = $request->validate([
                'image' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $file = $request->file('image');


            $json_data = [
                "username" => "IDEA Share Bot",
                "content" => "A new IDEA has been created",
                "tts" => "false",
                "attachments" =>  curl_file_create($file, "image/png", "image.png")
            ];

            $curl = curl_init("");
            curl_setopt($curl, CURLOPT_TIMEOUT, 5); // 5 seconds
            curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 5); // 5 seconds
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: multipart/form-data'));
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $json_data);

            $returned_data = curl_exec($curl);
            curl_close($curl);

            return response()->json([
                "message" => 'success'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of all mintedNfts by project ID.
     *
     * @return \Illuminate\Http\Response
     */
    public function signature(Request $request)
    {

        $fields = $request->validate([
            'metadata' => '',
            'address' => 'string',
            'email' => '',
            'gen' => ''
        ]);

        $client = new \GuzzleHttp\Client();
        $response = $client->get('https://api.coinstats.app/public/v1/coins/matic-network?currency=DOL');

        $coinPrice = json_decode($response->getBody(), true);


        $ethPrice = number_format((99.00 / number_format($coinPrice['coin']['price'], 2, '.', '')));

        $json = json_encode($fields['metadata']);

        $process = '';

        $AIGenContract = $fields['gen'] && $fields['gen'] == 1;


        $process = new Process(
            [
                'node',
                'generateSignatureTest.js',
                $json,
                $AIGenContract ? "0x09076D08C6861395333ca10f6e612d2c90b89548" : "0xF3EaEC549474DD9a3861472694B60B13e1a22cCA",
                $ethPrice
            ]
        );

        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException(($process));
        }

        $output = $process->getOutput();

        $signature = json_decode($output);

        if (isset($fields['email'])) {
            $body = json_encode([
                "quantity" => 1,
                "metadata" => $signature->payload->metadata,
                "expiresInMinutes" => 15,
                "usePaperKey" => false,
                "hideApplePayGooglePay" => false,
                "contractId" =>  $AIGenContract ? env("TEXT_TO_IMAGE_PAPER_CONTRACT_ID") : env('PAINTER_PAPER_CONTRACT_ID'),
                "contractArgs" => ["payload" => $signature->payload, "signature" => $signature->signature],
                "walletAddress" => $fields['metadata']['to'],
                "email" => $fields['email'],
            ]);
            $client = new \GuzzleHttp\Client();

            $response = $client->request('POST', 'https://paper.xyz/api/2022-08-12/checkout-sdk-intent', [
                'body' => $body,
                'headers' => [
                    'Authorization' => "",
                    'accept' => 'application/json',
                    'content-type' => 'application/json',
                ],
            ]);

            return response()->json([
                'paper_secret' => json_decode($response->getBody(), true)['sdkClientSecret'],
            ]);
        } else {
            return response()->json([
                'thirdweb_signature' => $signature,
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  paper_wallet_address of user $wallet
     * @return \Illuminate\Http\Response with all mintedNFTs, this will also    include the Drafts. Front-end sorts them based on the 'is_draft' flag
     */
    public function showNftsAndDrafts(Request $request)
    {
        try {
            $userID = User::where('id', auth()->user()->id)->pluck('id');

            if ($userID) {
                $nfts = MintedNfts::where('user_id', $userID)->get();
                $drafts = NftDrafts::where('user_id', $userID)->get();

                return response()->json([
                    'nfts' => $nfts,
                    'drafts' => $drafts
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeNFT(Request $request)
    {
        $fields = $request->validate([
            'wallet_id' => 'required|string',
            'glb_cid' => 'string',
            'image_cid' => 'string',
            'html_cid' => 'string',
            'song_cid' => 'string',
            'background_cid' => 'string',
            'animation' => 'string',
            'blockchain' => 'required|string',
            'price' => 'required',
            'options' => 'required|json',
            'project_id' => 'required',
            'paper_wallet_address' => 'required',
            'is_draft' => 'boolean'
        ]);

        $userID = User::where('paper_wallet_address', $fields['paper_wallet_address'])->pluck('id');

        // create new NFT
        $nft = MintedNfts::create([
            'wallet_id' => $fields['wallet_id'],
            'glb_cid' => $fields['glb_cid'],
            'image_cid' => $fields['image_cid'],
            'html_cid' => $fields['html_cid'],
            'song_cid' => $fields['song_cid'],
            'background_cid' => $fields['background_cid'],
            'animation' => $fields['animation'],
            'blockchain' => $fields['blockchain'],
            'price' => $fields['price'],
            'options' => $fields['options'],
            'project_id' => $fields['project_id'],
            'user_id' => $userID,
            'is_draft' => $fields['is_draft']
        ]);

        // send back Nft
        $response = [
            'minted_nft' => $nft,
        ];

        // return response($response, 200);
        return response($response, 200);
    }

    /**
     * Update a user to be whitelisted
     *
     * @param  \App\Models\MintedNfts  $mintedNfts
     * @return \Illuminate\Http\Response
     */
    public function updateUserWhiteListed()
    {
        $user = User::where('id', auth()->user()->id)->first();

        $result = $user->update(["white_listed" => true]);
        $updatedUser = $user->refresh();

        $userInfo = ['name' => $updatedUser['name'], 'email' => $updatedUser['email'], 'white_listed' => $updatedUser['white_listed'], 'role' => $updatedUser['role'], 'total_buy_models' => $updatedUser['total_buy_models'], 'paper_wallet_address' => $updatedUser['paper_wallet_address']];


        return response([
            'message' => 'User updated whitelisted',
            'user' => $userInfo,
        ], 200);
    }

    public function createCheckoutIntent()
    {
        $client = new \GuzzleHttp\Client();

        $response = $client->request('POST', 'https://withpaper.com/api/2022-08-12/checkout-link-intent', [
            'body' => json_encode(
                [
                    "contractId" => "6959fd8d-0792-46af-9d8c-b4c2c070d3f8",
                    "title" => "My First PaperCheckout",
                    "contractArgs" => [
                        'collectionContractAddress' => '0x720F6aE0e450e97052Af515B44247a6e6542B9F6',
                        'tokenId' => '0'
                    ]
                ]
            ),
            'headers' => [
                'Authorization' => 'Bearer c068b34d-cc3e-42fa-8740-90735330cac7',
                'accept' => 'application/json',
                'content-type' => 'application/json',
            ],
        ]);

        $body = $response->getBody();

        return response()->json([
            'paper' => json_decode($body, true),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MintedNfts  $mintedNfts
     * @return \Illuminate\Http\Response
     */
    public function destroy(MintedNfts $mintedNfts)
    {
        //
    }
}
