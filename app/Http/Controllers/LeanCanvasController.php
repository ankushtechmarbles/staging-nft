<?php

namespace App\Http\Controllers;

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
}
