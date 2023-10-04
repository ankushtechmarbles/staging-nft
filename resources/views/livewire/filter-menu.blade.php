<div class="container">
    <div class="row pt-4 align-items-center">
        <div class="col-3 d-flex justify-content-between align-items-center btn-filter">
            <div class="filter-icon-wrapper d-flex">
                <button type="button" class="icon-inner-wrapper">
                    <span class="lh-0 d-flex"><svg xmlns="http://www.w3.org/2000/svg" height="14" width="16" viewBox="0 0 448 512"><path d="M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88zM64 248c0-13.3 10.7-24 24-24H360c13.3 0 24 10.7 24 24s-10.7 24-24 24H88c-13.3 0-24-10.7-24-24zM288 408c0 13.3-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24h80c13.3 0 24 10.7 24 24z"/></svg></span>
                    Filter
                </button>
            </div>
            <div class="live-indicator-wrapper">
                <span class="indicator-before text-dark">Live </span><span> {{count($data)}} </span>Results
            </div>
        </div>
        <div class="col-9">
            <div class="row align-items-center justify-content-between">
                <div class="col-8">
                    <div class="show-active-filter-wrapper d-flex align-items-center">
                        <label>Filter by:</label>
                        <ul class="p-0 m-0 over-flow-auto" style="min-height: 48px; min-width: 10rem; overflow: hidden">
                            <li>Type of NFT:<span>AI Paint</span><i class="fa-solid fa-xmark"></i></li>
                            <li>Price:<span>AI Paint</span><i class="fa-solid fa-xmark"></i></li>
                            <li>NFT by:<span>AI Paint</span><i class="fa-solid fa-xmark"></i></li>
                        </ul>
                    </div>
                </div>
                <div class="col-4">
                    <div class="filter-sorting-main-wrapper d-flex align-items-center justify-content-end gap-3">
                        <div class="sorting-wrapper position-relative">
                            <div class="custom-select-sorting-nfts hide-lg-screen">
                                <div class="select-trigger">
                                    <span class="default-text">Sort by:</span>
                                    <span class="selected-text">All</span>
                                    <img class="arrow_down_icon" src="image/arrow-down.svg">
                                </div>
                                <ul class="select-options p-0">
                                    <li data-value="trending" id="trending-tab">
                                        <span class="option-text">Price</span>
                                    </li>
                                    <li data-value="top-ideas"  id="top-ideas-tab">
                                        <span class="option-text">NFT Type</span>
                                    </li>
                                    <li data-value="top-creators" id="top-creators-tab">
                                        <span class="option-text">NFT Model</span>
                                    </li>
                                    <!-- Add more options with images and text here -->
                                </ul>
                            </div>
                        </div>
                        <div class="switch-layout-wrapper">
                            <div class="switch-inner-wrapper btn-group">
                                <div class="layout layout-grid">
                                    <input type="radio" name="layout-switch" id="layout-grid" checked>
                                    <label for="layout-grid" ><svg xmlns="http://www.w3.org/2000/svg" height="10px" width="10px" viewBox="0 0 512 512"><path d="M224 32H32V224H224V32zm0 256H32V480H224V288zM288 32V224H480V32H288zM480 288H288V480H480V288z"/></svg></label>
                                </div>
                                <div class="layout layout-list">
                                    <input type="radio" name="layout-switch" id="layout-list">
                                    <label for="layout-list"><svg xmlns="http://www.w3.org/2000/svg" height="10px" width="10px" viewBox="0 0 512 512"><path d="M112 48H16v96h96V48zm80 16H160v64h32H480h32V64H480 192zm0 160H160v64h32H480h32V224H480 192zm0 160H160v64h32H480h32V384H480 192zM16 208v96h96V208H16zm96 160H16v96h96V368z"/></svg></label>
                                </div>
                            </div>
                        </div>
                        <div class="search-wrapper">
                            <span class="search-icon"><svg xmlns="http://www.w3.org/2000/svg" height="15"  width="15" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<div id="main-content-wrapper">
    <div class="container">
        <div class="row pt-4">
            <div class="col-md-3 filter-element">
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
                                    <button type="button" wire:click="addOrRemoveFromFilterByType('Direct')" class="accordion-btn btn btn-yellow border text-dark">Direct</button>
                                    <button type="button" wire:click="addOrRemoveFromFilterByType('Auction')" class="accordion-btn btn btn-gray border text-dark">Auction</button>
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
                                    <button type="button" wire:click="addOrRemoveFromFilterByType('Direct')" class="accordion-btn btn btn-yellow border text-dark">2D</button>
                                    <button type="button" wire:click="addOrRemoveFromFilterByType('Direct')" class="accordion-btn btn btn-gray border text-dark">3D</button>
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
                                    <button type="button" wire:click="updatePricingFilter('High-Low')" class="accordion-btn btn btn-yellow border text-dark">High-Low</button>
                                    <button type="button" wire:click="updatePricingFilter('Low-High')" class="accordion-btn btn btn-gray border text-dark">Low-High</button>
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
                                    <button type="button" wire:click="addOrRemoveFromFilterByType('Direct')" class="accordion-btn btn btn-yellow border text-dark">Startup</button>
                                    <button type="button" wire:click="addOrRemoveFromFilterByType('Direct')" class="accordion-btn btn btn-gray border text-dark">Helix</button>
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
                                    <button type="button" wire:click="addOrRemoveFromFilterByType('Direct')" class="accordion-btn btn btn-yellow border text-dark">PIMLR</button>
                                    <button type="button" wire:click="addOrRemoveFromFilterByType('Direct')" class="accordion-btn btn btn-gay border text-dark">Music</button>
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
                                    <button type="button" wire:click="addOrRemoveFromFilterByType('Direct')" class="accordion-btn btn btn-yellow border text-dark">Art</button>
                                    <button type="button" wire:click="addOrRemoveFromFilterByType('Direct')" class="accordion-btn btn btn-yellow border text-dark">Gaming</button>
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
                                    <button type="button" wire:click="addOrRemoveFromFilterByType('Direct')" class="accordion-btn btn btn-yellow border text-dark">Humanity Rocks</button>
                                    <button type="button" wire:click="addOrRemoveFromFilterByType('Direct')" class="accordion-btn btn btn-yellow border text-dark">Other</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-9 content-element">
                <livewire:marketplace-nft-list :marketplace_items="$data"  />
            </div>
        </div>
    </div>
