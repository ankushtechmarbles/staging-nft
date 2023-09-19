@props(["live_nfts" => 0])

<div id="nfts-filters-wrapper">
    <div class="row align-items-center mb-3">
        <div class="col-3 d-flex justify-content-between align-items-center btn-filter">
            <div class="filter-icon-wrapper d-flex">
                <button type="button" class="icon-inner-wrapper">
                    <span class="lh-0 d-flex"><svg xmlns="http://www.w3.org/2000/svg" height="14" width="16" viewBox="0 0 448 512"><path d="M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88zM64 248c0-13.3 10.7-24 24-24H360c13.3 0 24 10.7 24 24s-10.7 24-24 24H88c-13.3 0-24-10.7-24-24zM288 408c0 13.3-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24h80c13.3 0 24 10.7 24 24z"/></svg></span>
                    Filter
                </button>
            </div>
        </div>
        <div class="col-9 d-flex justify-content-end align-items-center">
            <div class="live-indicator-wrapper">
                <span class="indicator-before text-dark">Live </span><span> 0 </span>Results
            </div>
        </div>
    </div>
    <div class="content-filter-sidebar">
        <div class="accordion" id="accordionExample">
            <div class="accordion-item border-0">
                <p class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        NFT Type
                    </button>
                </p>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <button type="button" class="accordion-btn btn btn-yellow border text-dark">type 01</button>
                        <button type="button" class="accordion-btn btn btn-gray border text-dark">type 02</button>
                    </div>
                </div>
            </div>
            <div class="accordion-item border-0">
                <p class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        NFT Model
                    </button>
                </p>
                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <button type="button" class="accordion-btn btn btn-yellow border text-dark">type 01</button>
                        <button type="button" class="accordion-btn btn btn-gray border text-dark">type 01</button>
                    </div>
                </div>
            </div>
            <div class="accordion-item border-0">
                <p class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Price
                    </button>
                </p>
                <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <button type="button" class="accordion-btn btn btn-yellow border text-dark">Hight-Low</button>
                        <button type="button" class="accordion-btn btn btn-gray border text-dark">Low-High</button>
                    </div>
                </div>
            </div>
            <div class="accordion-item border-0">
                <p class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                        NFT Type
                    </button>
                </p>
                <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <button type="button" class="accordion-btn btn btn-yellow border text-dark">type 01</button>
                        <button type="button" class="accordion-btn btn btn-gray border text-dark">type 02</button>
                    </div>
                </div>
            </div>
            <div class="accordion-item border-0">
                <p class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                        NFT Type
                    </button>
                </p>
                <div id="collapseFive" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <button type="button" class="accordion-btn btn btn-yellow border text-dark">type 01</button>
                        <button type="button" class="accordion-btn btn btn-gay border text-dark">type 02</button>
                    </div>
                </div>
            </div>
            <div class="accordion-item border-0">
                <p class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
                        NFT Type
                    </button>
                </p>
                <div id="collapseSix" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <button type="button" class="accordion-btn btn btn-yellow border text-dark">type 01</button>
                        <button type="button" class="accordion-btn btn btn-yellow border text-dark">type 02</button>
                    </div>
                </div>
            </div>
            <div class="accordion-item border-0">
                <p class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="true" aria-controls="collapseSeven">
                        NFT Type
                    </button>
                </p>
                <div id="collapseSeven" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <button type="button" class="accordion-btn btn btn-yellow border text-dark">type 01</button>
                        <button type="button" class="accordion-btn btn btn-yellow border text-dark">type 02</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
