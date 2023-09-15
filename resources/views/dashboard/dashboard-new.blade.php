@extends('layouts.app')
@section('title','About')
@section('body-class','about-page')
@section('header-bg-class','bg-navbar')
@push('custom-css')
<link rel="stylesheet" media="screen" href="{{asset('assets/css/dashboard-new.css')}}">
<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

@endpush
@section('content')

<!-- Main banner section -->
<section id="dashboard-main-banner" class="section dashboard-main">
	<div class="container inner-element p-0">
		<div class="inner-wrapper">
			<img class="img-fluid hero-image" src="image/dashboard.jpeg">
			<div class="user_detail_info d-flex justify-content-between align-items-center">
				<div class="user_img_prev_detail d-flex align-items-center gap-2">
					<div class="user_avtar">
						<img src="image/user-image.png">
					</div>
					<div class="avtar_details">
						<h2 class="user_avtar_name">{{$user->name}}</h2>
						<div class="selection-join-date">
							<span>
								dropdown here
							</span>
							<span>Joined {{$user->created_at->diffForHumans()}}</span>
						</div>
					</div>
				</div>
				<div class="sell_share_wrapper d-flex align-items-center gap-2">
					<button type="button" class="btn border rounded btn-yellow btn-share text-dark px-5">Sell</button>
					<div class="share_hover position-relative">
						<label for="share-me" class="share-btn">
							<img src="image/share-icon.svg">
						</label>
						<input type="checkbox" name="share-me" id="share-me">
						<div class="social-media-icons-wrapper">
							<p class="mb-2 lh-1 text-dark">Share in</p>
							<div class="media_icons d-flex align-items-center gap-2">
								<a class="bg-gray" href="JavaScript:void(0)"><i class="fa-brands fa-facebook-f"></i></a>
								<a class="bg-gray" href="JavaScript:void(0)"><i class="fa-brands fa-instagram"></i></i></a>
								<a class="bg-gray" href="JavaScript:void(0)"><i class="fa-brands fa-twitter"></i></i></a>
								<a class="bg-gray" href="JavaScript:void(0)"><i class="fa-brands fa-discord"></i></i></a>
								<a class="bg-gray" href="JavaScript:void(0)"><i class="fa-brands fa-reddit-alien"></i></a>
								<a class="bg-gray" href="JavaScript:void(0)"><i class="fa-brands fa-linkedin-in"></i></a>
								<a class="bg-gray" href="JavaScript:void(0)"><i class="fa-brands fa-tiktok"></i></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<!-- Main banner end -->

<!-- Filters tabs -->
<section id="explore-nfts" class="explore-nfts-sec">
	<div class="container">
		<nav class="hide-md-screen">
			<div class="nav nav-tabs mb-0" id="nav-tab" role="tablist">
				<a href="javascript_void(0)" class="nav-link px-3 active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#onward" type="button" role="tab" aria-controls="trending" aria-selected="true">Owned <span class="badge text-bg-warning">12</span></a>
				<a href="javascript_void(0)" class="nav-link px-3" id="explore-tab" data-bs-toggle="tab" data-bs-target="#explore" type="button" role="tab" aria-controls="top-ideas" aria-selected="false">Explore</a>
				<a href="javascript_void(0)" class="nav-link px-3" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#on-sale" type="button" role="tab" aria-controls="top-creators" aria-selected="false">On Sale <span class="badge text-bg-warning">12</span></a>
				<a href="javascript_void(0)" class="nav-link px-3" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#draft" type="button" role="tab" aria-controls="top-creators" aria-selected="false">Draft <span class="badge text-bg-warning">12</span></a>
				<a href="javascript_void(0)" class="nav-link px-3" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#created" type="button" role="tab" aria-controls="top-creators" aria-selected="false">Created <span class="badge text-bg-warning">20</span></a>
				<a href="javascript_void(0)" class="nav-link px-3" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#activity" type="button" role="tab" aria-controls="top-creators" aria-selected="false">Activity</a>
				<div class="dropdown position-relative align-self-center px-3">
					<a class="dropdown-toggle text-dark more-dropdown gap-0" type="button" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						More
					</a>
					<ul class="dropdown-menu">
						<li><a class="dropdown-item" href="#">Action</a></li>
						<li><a class="dropdown-item" href="#">Another action</a></li>
						<li><a class="dropdown-item" href="#">Something else here</a></li>
					</ul>
				</div>
			</div>
		</nav>
	</div>
</section>
<!-- filters tabs end -->

<!-- Filters tabs content  -->
<section>
	<!-- Tab 1 (Owned) -->
	<div class="tab-content py-3  bg-light" id="nav-tabContent">
		<div class="tab-pane fade active show size_chart" id="onward" role="tabpanel" aria-labelledby="trending-tab">
			<div id="nfts-filters-wrapper">
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
								<span class="indicator-before text-dark">Live </span><span> {{$live_nfts}} </span>Results
							</div>
						</div>
						<div class="col-9">
							<div class="row align-items-center justify-content-between">
								<div class="col-8">
									<div class="show-active-filter-wrapper d-flex align-items-center">
										<label>Filter by:</label>
										<ul class="p-0 m-0 over-flow-auto">
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
						<div class="col-md-9 content-element">
                            @if(count($projects) == 0)
                                <div class="d-flex justify-content-center align-items-center" style="height: 100%">
                                    <span>Create a project to begin your new idea</span>
                                </div>
                            @endif

							<div class="row g-3">
                                @foreach($projects as $project)
                                    <div class="col-md-3">
                                        <x-cards.nft-card
                                            :project="$project"
                                            :owner="true"
                                            :title="$project->title"
                                            :description="$project->description"
                                            :is_public="$project->is_public"
                                            :is_minted="$project->is_minted"
                                            :id="$project->id"
                                        />
                                    </div>
                                @endforeach
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
	<!-- Tab 1 end -->

	<!-- Tab 2 (Explore) -->
	<div class="tab-content mt-5 py3 bg-light" id="nav-tabContent">
		<div class="tab-pane fade active show size_chart" id="explore" role="tabpanel" aria-labelledby="explore-tab">
            <div class="container inner-element">
                <div class="explore-utility">
                    <div class="row" data-masonry="{&quot;percentPosition&quot;: true }">
                        <livewire:explore-more />
                        <livewire:explore-more-projects />
                    </div>
                </div>
            </div>
		</div>
	</div>
	<!-- Tab 2 end -->
</div>
</section>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- bootstrap popper js -->
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<!-- bootstrap version 4 -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
<!-- bootstrap masonary js -->
<script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js" integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D" crossorigin="anonymous" async></script>

<script>
	//this code is for sort by filter
	$(document).ready(function() {
		$(".custom-select-sorting-nfts .select-trigger").click(function() {
			$(this).siblings(".select-options").toggle();
		});

		$(".custom-select-sorting-nfts .select-options li").click(function() {
			var selectedValue = $(this).attr("data-value");
			var selectedText = $(this).find(".option-text").text();
			var selectedFlag = $(this).find(".flag").clone();

			      // Update the selected text and value in the trigger element
			$(this).closest(".custom-select-sorting-nfts").find(".selected-text").html(selectedFlag).append(selectedText);
			$(".custom-select-sorting-nfts .select-options").hide();

			      // Update the content of the element with the selected value
			$("#selected-value").text("Selected Value: " + selectedText);

			      // Show the corresponding tab content based on data-value
			$(".tab-pane").hide();
			$("#" + selectedValue).show().css("opacity","1");;
		});

			    // Hide dropdown when clicked outside
		$(document).on("click", function(event) {
			if (!$(event.target).closest(".custom-select-sorting-nfts").length) {
				$(".custom-select-sorting-nfts .select-options").hide();
			}
		});

		$(".custom-select-sorting-nfts li").click(function() {
			var traget = $(this).attr('data-value');
			$('#nav-tabContent').find(jQuery('#'+traget)).show().css("opacity","1");
		});


			    //filter sidebar code show hide on click
		$('.btn-filter').on('click', function(){
			$('#main-content-wrapper .filter-element').toggleClass('d-none');
			$('#main-content-wrapper .content-element').toggleClass('w-100');
		});

	});
</script>

@endsection
@push('js-plugin')@endpush

@push('custom-scripts')
    <script>
        Livewire.on('minted', async (nftData, supply) => {
            $('#toast-message').html('Minting completed. Setting up claim phase transaction.');
            $("#liveToast").toast('show');

            const id = nftData.data[0].id;

            const contract = await window.walletSdk.getContract('0x247cebbf74CD0E62350538F1DE8333a3FC85Dbb7', 'edition-drop')

            const txResult = await contract.erc1155.claimConditions.set(id,
                [
                    {
                        metadata: {
                            name: "Phase 1", // The name of the phase
                        },
                        price: 0.001, // The price of the token in the currency specified above
                        maxClaimablePerWallet: 1, // The maximum number of tokens a wallet can claim
                        maxClaimableSupply: supply, // The total number of tokens that can be claimed in this phase
                        startTime: new Date(), // When the phase starts (i.e. when users can start claiming tokens)
                        waitInSeconds: 60 * 60 * 24 * 7, // The period of time users must wait between repeat claims
                    },
                ],
                false,);
        });

        Livewire.on('mint_failed', () => {
            $('#toast-message').html(`Minting failed. Please try again later.`);

            $("#liveToast").toast('show');
        });
    </script>
@endpush
