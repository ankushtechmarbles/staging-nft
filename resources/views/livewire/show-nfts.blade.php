<div class="row g-0">
    @foreach ($nfts as $nft)
        <x-project.nftCard :nft="$nft" />
    @endforeach
    @if ($nfts->hasMorePages())
        <livewire:load-more-nfts :page="$page" :perPage="$perPage" :project="$project" />
    @endif
    {{-- TODO: Place holder to be removed --}}
    @if ($nfts->count() == 0)
        <div class="col-md-3 py-3 justify-content-center align-items-center d-flex">
            <img class="h-auto w-75" src="/assets/img/pages/project/nft-card.png" alt="">
        </div>
        <div class="col-md-3 py-3 justify-content-center align-items-center d-flex">
            <img class="h-auto w-75" src="/assets/img/pages/project/nft-card.png" alt="">
        </div>
        <div class="col-md-3 py-3 justify-content-center align-items-center d-flex">
            <img class="h-auto w-75" src="/assets/img/pages/project/nft-card.png" alt="">
        </div>
        <div class="col-md-3 py-3 justify-content-center align-items-center d-flex">
            <img class="h-auto w-75" src="/assets/img/pages/project/nft-card.png" alt="">
        </div>
        <div class="col-md-3 py-3 justify-content-center align-items-center d-flex">
            <img class="h-auto w-75" src="/assets/img/pages/project/nft-card.png" alt="">
        </div>
        <div class="col-md-3 py-3 justify-content-center align-items-center d-flex">
            <img class="h-auto w-75" src="/assets/img/pages/project/nft-card.png" alt="">
        </div>
        <div class="col-md-3 py-3 justify-content-center align-items-center d-flex">
            <img class="h-auto w-75" src="/assets/img/pages/project/nft-card.png" alt="">
        </div>
        <div class="col-md-3 py-3 justify-content-center align-items-center d-flex">
            <img class="h-auto w-75" src="/assets/img/pages/project/nft-card.png" alt="">
        </div>
        <div class="col-md-3 py-3 justify-content-center align-items-center d-flex">
            <img class="h-auto w-75" src="/assets/img/pages/project/nft-card.png" alt="">
        </div>
        <div class="col-md-3 py-3 justify-content-center align-items-center d-flex">
            <img class="h-auto w-75" src="/assets/img/pages/project/nft-card.png" alt="">
        </div>
        <div class="col-md-3 py-3 justify-content-center align-items-center d-flex">
            <img class="h-auto w-75" src="/assets/img/pages/project/nft-card.png" alt="">
        </div>
        <div class="col-md-3 py-3 justify-content-center align-items-center d-flex">
            <img class="h-auto w-75" src="/assets/img/pages/project/nft-card.png" alt="">
        </div>
    @endif

</div>
