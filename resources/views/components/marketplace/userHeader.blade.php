@props(['username', 'title', 'project_id', 'supply', 'avatar', 'blockchains', 'type'])

<div>
    <header>
        <h1 class="font-weight-normal">{{$title}}</h1>
        <livewire:share-dropdown />
    </header>

    <div class="d-flex just align-items-center gap-3">
        <div class="d-flex align-items-center gap-2">
            <x-svg.avatar-frame />
            <div class="d-flex flex-column justify-content-center">
                <div class="d-flex gap-1">
                    <p style="margin: 0">Owned by</p>
                    <h6 style="font-family: Inter, 'serif'; margin: 0" class="font-weight-normal">{{$username}}</h6>
                </div>
                <div class="d-flex gap-1">
                    <p style="margin: 0;">{{$supply}}/200</p>
                    <div class="d-flex justify-content-center gap-2 align-items-center px-2"
                    style="border-radius: 180px;
                    border: 0.5px solid #000;
                    background: #F4B406;
                    box-shadow: 1px 1px 0px 0px #000;
                    "
                    >
                        <x-svg.gaming-icon />
                        <span style="margin: 0; color: black;">{{$type->project_type_name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="horizontal-bar"></div>
        <div class="d-flex flex-column align-items-center justify-content-center">
            <p style="margin: 0; font-weight: bold; color: black; padding-bottom: 10px">Chain</p>
            <div class="d-flex">
                @if (isset($blockchains->polygon) && $blockchains->polygon == 1)
                    <img class="me-2" width="24" src="{{ asset('assets/img/chains/polygon.svg') }}">
                @endif
                @if (isset($blockchains->ethereum) && $blockchains->ethereum == 1)
                    <img class="me-2" width="16" src="{{ asset('assets/img/chains/polygon.svg') }}">
                @endif
            </div>
        </div>
    </div>
</div>
