<?php

namespace App\Http\Controllers;

use App\Http\Requests\MintProjectRequest;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;


class LeanCanvasController extends Controller
{

    public function index()
    {
        return view ('pdf.lean-canvas');
    }

    public function mint(Request $request)
    {
        try {

        $client = new \GuzzleHttp\Client();

        $response = $client->request('POST', 'https://withpaper.com/api/2022-08-12/shareable-checkout-link', [
            'body' =>
                '{
                "contractId":"dceae6d4-ac6e-457f-acd9-e0aca9ec8af5",
                "title":"IDEA LABS Lean Canvas",
                "description":"IDEA LABS Lean Canvas",
                "imageUrl":"ipfs://QmchAJ9BdQBbCDvEaxcPGYd1HyH5w5dH5iUrittU4Lffcx/lean-canvas.png",
                "limitPerTransaction":5,
                "redirectAfterPayment":false,
                "mintMethod":{"name":"claimTo","args":{"_to":"$WALLET","_quantity":"$QUANTITY","_tokenId":0},
                "payment":{"currency":"MATIC","value":"0.001 * $QUANTITY"}},
                "hideNativeMint":false,
                "hidePaperWallet":false,
                "hideExternalWallet":false,
                "hidePayWithCard":false,
                "hidePayWithCrypto":false,
                "hidePayWithIdeal":true,
                "sendEmailOnTransferSucceeded":true,
                "brandDarkMode":false,
                "brandButtonShape":"full",
                "brandColorScheme":"blue"}',
            'headers' => [
                'Authorization' => 'Bearer 8d0eb4e6-5629-45cb-9370-7fab67f0f911',
                'accept' => 'application/json',
                'content-type' => 'application/json',
            ],
        ]);

        $body = $response->getBody();

        // return as json
        return $body;
        } catch (\Throwable $th) {
            return response($th, 500);
        }
    }

    public function generateThirdWebSignature(MintProjectRequest $request)
    {
        try {

            $data = [
                'name' => $request->name,
            'description' => 'IDEA LABS Lean',
                'address' => $request->address,
                'quantity' => 1,
                'price'=> 0.001,
                'animation_url' => $request->animation_url,
                'image_url' => $request->image_url,
            ];

            $url = 'localhost:3000/web3/mint/canvas';

            // create guzzle post request
            $client = new \GuzzleHttp\Client();
            $response = $client->request('POST', $url, [
                'body' => json_encode($data),
                'headers' => [
                    'Content-Type' => 'application/json',
                ],
            ]);

            // get response body
            $body = $response->getBody();

            // return as json
            return $body;
        } catch (\Throwable $th) {
            return response($th, 500);
        }
    }

    public function generateClientSecret(Request $request)
    {
        try {
            // get metadata from request


            // get signature for signature minting


            $client = new \GuzzleHttp\Client();

            $response = $client->request('POST', 'https://withpaper.com/api/2022-08-12/checkout-sdk-intent', [
                'body' => '{
                "contractId":"f5b49e5b-2027-44c8-892c-911a17dffbea",
                "walletAddress":"0xF99faF695964eF3f5E2474FFC391b618DCb390c7",
                "title":"Mumbai Example",
                "quantity":1,
                "expiresInMinutes":15,
                "metadata":{},
                "mintMethod":{
                    "name":"claimTo",
                    "args":{
                            "_to":"$WALLET",
                            "_quantity":"$QUANTITY",
                            "_tokenId":0
                        },
                    "payment":{
                            "currency":"MATIC",
                            "value":"0.001 * $QUANTITY"
                        }
                    },
                    "feeBearer":"BUYER",
                    "sendEmailOnTransferSucceeded":true,
                    "capturePaymentLater":false
                }',
                'headers' => [
                    'Authorization' => 'Bearer c068b34d-cc3e-42fa-8740-90735330cac7',
                    'accept' => 'application/json',
                    'content-type' => 'application/json',
                ],
            ]);

            $body = $response->getBody();

            // return as json
        return $body;
        } catch (\Throwable $th) {
            return response($th, 500);
        }
    }
}
