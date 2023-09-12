@extends('layouts.app')
@section('title','Marketplace')
@section('body-class','nft-details')
@section('header-bg-class','bg-navbar')
@push('custom-css')
@endpush
@section('content')
    <main class="container py-5">
        <div class="row gap-5">
            <section class="col-5 mb-5 d-flex flex-column gap-3">
                    <x-cards.nft-card
                      :score="$project_score->total_score"
                      :title="$project->title"
                      :description="$project->description"
                      :owners="$project->owners"
                      :eth="'1.4'"
                      :id="$project->id"
                      :img="'image/pro_'"
                      :slug="$project->slug"
                    />
                {{--    Button Container      --}}
                <div class="d-flex justify-content-between gap-3">
                    <button id="nft-claim" style="cursor: not-allowed" class="nft-details-btn gold" disabled>Buy now</button>
                    <button type="button" class="nft-details-btn vote" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <x-svg.chevron-up-icon />
                        Vote
                    </button>
                </div>

                {{--     Ranking      --}}
                <livewire:listing-vote-form :project="$project" :score="$project_score->total_score"/>
            </section>
            {{--    Project Details    --}}
            <section class="col-6 nft-info-section">
                <x-marketplace.userHeader
                    :username="$owner->name"
                    :supply="$project->supply"
                    :supply="$project->supply"
                    :blockchains="$blockchains"
                    :title="$project->title"
                    :type="$project_type"
                />

                <div class="mt-3 mb-5">
                    <p>{{$project->description}}</p>
                </div>

                <div class="mt-3 mb-5">
                    <h1 style="font-family: inter; font-weight: 500">Problems</h1>
                    <p>{{$project->problem}}</p>
                </div>

                <div class="mt-3 mb-5">
                    <h1 style="font-family: inter; font-weight: 500">Solutions</h1>
                    <p>{{$project->solution}}</p>
                </div>

                <div class="mt-3 mb-5">
                    <h1 style="font-family: inter; font-weight: 500">Utility</h1>
                    <p>{{$project->utilities}}</p>
                </div>

                <x-marketplace.iconCardGroup :data="$project_votes" />

                <div style="margin-top: 5rem" class="mb-5">
                    <h1 style="font-family: inter; font-weight: 500">Members</h1>
                    <x-cards.member-card :members="$members" />
                </div>
            </section>
        </div>
    </main>

    <section class="container ">
        <livewire:similar-projects :project="$project"  />
    </section>
@endsection
@push('js-plugin')@endpush
@push('custom-scripts')
    <script>
        const tokenId = @json($project->nft_id);

        function updateNumber(e) {
            const value = e.target.value;
            const prev = e.target.previousElementSibling;
            const prevText = prev.textContent;

            if (value === 10) {
                prev.textContent = `${value} - ${prevText.substring(5)}`
            } else {
                prev.textContent = `${value} - ${prevText.substring(4)}`
            }
        }

        document.getElementById('customRange1').addEventListener('input', updateNumber)
        document.getElementById('customRange2').addEventListener('input', updateNumber)
        document.getElementById('customRange3').addEventListener('input', updateNumber)

        let trigger = document.getElementById('dropdownMenuButton1')
        document.getElementById('submit-btn').addEventListener("click", () => {
            bootstrap.Dropdown.getOrCreateInstance(trigger).toggle()
        });

        document.querySelector('.vote').addEventListener('click', function(e) {
            document.querySelector('#chevronUp').classList.toggle('rotate');
        });

        function updateStyles(ele) {
            ele.classList.remove('active')
            ele.style.background = 'white';
            ele.style.color = 'black';
        }

        // Vote button listeners
        document.querySelectorAll('.border-btn').forEach((ele) => {
            ele.addEventListener('click', (e) => {

                // check for button type
                if(e.target.classList.contains('border-btn')) {
                    if(e.target.classList.contains('active')) {
                        updateStyles(e.target);
                    } else {
                        e.target.classList.add('active')
                        e.target.style.background = '#029E57';
                        e.target.style.color = 'white';

                        if(e.target.innerText === 'No') {
                            updateStyles(document.querySelector('#yesBtn'));
                        } else if (e.target.innerText === 'Yes') {
                            updateStyles(document.querySelector('#noBtn'));
                        }
                    }
                }
            });
        })

        $('#nft-claim').click(async function(){
            try {
                // update button text
                $(this).html('Claiming...');

                const contract = await window.walletSdk.getContract('0x247cebbf74CD0E62350538F1DE8333a3FC85Dbb7', 'edition-drop')

                const tx = await contract.erc1155.claim(tokenId, 1);

                $('#toast-message').html(`NFT claimed.`);

                $("#liveToast").toast('show');

                $(this).html('Buy Now');

                const totalSupply = await contract.erc1155.totalSupply(tokenId);
                $('#nft-supply').html(`${totalSupply.toNumber()}/200`);
            } catch (e) {
                $('#toast-message').html(`NFT claim failed.`);
                $("#liveToast").toast('show');
                $(this).html('Buy Now');
            }
        });

        // document ready
        $(document).ready(async function() {
            if(tokenId) {
                const sdk = new window.thirdweb.ThirdwebSDK("mumbai", {
                    clientId: "44aa3ec3d8ffe49358a72c91c8e99e83",
                });
                const contract = await sdk.getContract('0x247cebbf74CD0E62350538F1DE8333a3FC85Dbb7', 'edition-drop')
                const totalSupply = await contract.erc1155.totalSupply(tokenId);
                $('#nft-supply').html(`${totalSupply.toNumber()}/200`);

                const activePhase = await contract.erc1155.claimConditions.getActive(
                    tokenId,
                );

                const price = Number(activePhase.currencyMetadata.displayValue);
                const numberClaimed = totalSupply.toNumber();
                const ethMade = price * numberClaimed;

                $('#eth-count').html(`${ethMade} ETH`);

                document.addEventListener('wallet:installed', async function() {
                        const ownedSupply = await contract.call("getSupplyClaimedByWallet", [tokenId, 0, await window.walletSdk.wallet.getAddress()]);

                        if(ownedSupply > 0) {
                            $('#nft-claim').html('Claimed');
                            $('#nft-claim').attr('disabled', true).css('cursor', 'not-allowed');
                        } else {
                            $('#nft-claim').html('Buy Now');
                            $('#nft-claim').attr('disabled', false).css('cursor', 'pointer');
                        }
                });
            } else {
                $('#nft-supply').html(`0/200`);
            }
        });



    </script>
@endpush
