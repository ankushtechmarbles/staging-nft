<header class="header navbar navbar-expand-lg">
    <div class="d-flex w-100 justify-content-around container py-3">

        <a href="{{ url('/') }}" class="navbar-brand p-0">
            <img src="{{ asset('assets/img/logo/logo.svg') }}" alt="{{ config('app.name') }}" width="198">
        </a>


        <div id="navbarNav" class="offcanvas offcanvas-start">
            <div class="offcanvas-header border-bottom">
                <h5 class="offcanvas-title">Menu</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-auto justify-content-center">
                    <li class="nav-item">
                        <a class="nav-link" style="font-weight: 500" href="{{ route('about') }}">About</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" style="font-weight: 500" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Create</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="{{ route('leaderboard') }}">Placeholder</a></li>
                            <li><a class="dropdown-item" href="{{ route('leaderboard') }}">Placeholder</a></li>
                            <li><a class="dropdown-item" href="{{ route('showcase') }}">Placeholder</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" style="font-weight: 500" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Marketplace</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/marketplace/1">Marketplace Listing</a></li>
                            <li><a class="dropdown-item" href="{{ url('marketplace') }}">Market</a></li>
                            <li><a class="dropdown-item" href="{{ route('leaderboard') }}">Winners</a></li>
                            <li><a class="dropdown-item" href="{{ route('showcase') }}">Showcase</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="font-weight: 500" href="{{route('leaderboard')}}">Leaderboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="font-weight: 500" href="{{ url('/play') }}">Games</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="d-flex align-items-center order-lg-2 ms-auto gap-2">
{{--            @if (auth()->user())--}}
                <a href="{{route('dashboard')}}" class="btn btn-warning rounded-pill d-none d-lg-inline-flex" style="padding: 0.5rem">
                    <svg class="icon-width">
                        <use xlink:href="{{ asset('assets/img/idea-icon.svg#user') }}"></use>
                    </svg>
                </a>
{{--            @endif--}}
{{--            @guest--}}
                <button
                    href="{{route('dashboard')}}"
                    class="btn btn-warning rounded-pill d-none d-lg-inline-flex"
                    id="walletConnectBtn"
                    data-bs-toggle="modal"
                >
                    Checking for wallet..
                </button>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 style="font-family: Inter, 'serif'; font-weight: 500" class="modal-title fs-5" id="exampleModalLabel">Connect Wallet</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="grid">
                                    <div class="row justify-content-center align-items-center gap-3">
                                        <button class="btn btn-primary col-10" id="connectMetamask">Connect MetaMask</button>
                                        <button class="btn btn-primary col-10" id="connectPaper">Connect PaperWallet</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
{{--            @endguest--}}
        </div>

        {{--   Mobile    --}}
        <button type="button" class="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
</header>

@section('javascript')
    <script>
        $(document).ready(async function() {

            // check for paper
            try {
                if(!!(await window.PaperWallet.getAddress())) {
                    createWalletSdk(window.PaperWallet, await window.PaperWallet.getAddress());
                }
            } catch (e) {
                console.log(e);
            }

            try {
                if(!!(await window.MetaMask.getAddress())) {
                    createWalletSdk(window.MetaMask, await window.MetaMask.getAddress());
                }
            } catch (e) {
                console.log(e);
            }

            updateWalletConnectBtn();

          document.querySelector('#connectPaper').addEventListener('click', async () => {
            await window.PaperWallet.connect((wallet) => {
                createWalletSdk(window.PaperWallet, wallet);
            });
          });

          document.querySelector('#connectMetamask').addEventListener('click', async () => {
              await window.MetaMask.connect().then((wallet) => {
                  createWalletSdk(window.MetaMask, wallet);
              });
          });

            async function createWalletSdk(provider, address) {
                window.walletSdk = await window.thirdweb.ThirdwebSDK.fromWallet(provider, "ethereum", {
                    clientId: "44aa3ec3d8ffe49358a72c91c8e99e83", // Use client id if using on the client side, get it from dashboard settings
                });
                updateWalletConnectBtn(address);
            }

            function updateWalletConnectBtn(address= '') {
                const walletBtn = document.querySelector('#walletConnectBtn');

                // update text
                if(window.walletSdk) {
                    walletBtn.innerHTML = `Address: ${address.slice(0, 6)}...${address.slice(-4)}`;
                } else {
                    walletBtn.innerHTML = 'Connect Wallet';
                    walletBtn.setAttribute('data-bs-target', '#exampleModal');
                }
            }
        });
    </script>
    @parent
@endsection

