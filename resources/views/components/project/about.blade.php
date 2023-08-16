@props(['project'])

<div class="container p-5">
    <h2 class="py-3 header-pink">ABOUT PROJECT</h2>
    <p class="py-3">Created {{ date_format($project->created_at, 'M, Y') }}</p>
    <section class='d-flex gap-5 mb-3'>
        <div class="d-flex flex-column align-items-center justify-content-center">
            <h3 class="sequel100black-95-regular-normal-onyx-16px text-warning">{{ $project->items }}</h3>
            <p class="raleway-normal-dove-gray-14px">Items</p>
        </div>
        <div class="d-flex flex-column align-items-center  justify-content-center">
            <h3 class="sequel100black-95-regular-normal-onyx-16px text-success">{{ $project->collections }}</h3>
            <p class="raleway-normal-dove-gray-14px">Collections</p>
        </div>
        <div class="d-flex flex-column align-items-center  justify-content-center">
            <h3 class="sequel100black-95-regular-normal-onyx-16px text-primary">{{ $project->owners }}</h3>
            <p class="raleway-normal-dove-gray-14px">Owners</p>
        </div>
    </section>
    <div class="mb-5">
        <p>{{ strip_tags($project->description) }}</p>
    </div>
    <div class="d-flex flex-column justify-content-center gap-3 my-3">
        <div class="d-flex gap-4 justify-content-start align-items-center">
            @if ($project->discord)
                <a href="{{ $project->discord }}">
                    <div class='outline-circle'>
                        <img src="/image/share.png">
                    </div>
                </a>
                {{ $project->discord }}
            @endif
        </div>
        <div class="d-flex gap-4 justify-content-start align-items-center">
            @if ($project->twitter)
                <a href="{{ $project->twitter }}">
                    <div class='outline-circle'>
                        <img src="/image/twitter.png">
                    </div>
                </a>
                {{ $project->twitter }}
            @endif
        </div>
        <div class="d-flex gap-4 justify-content-start align-items-center">
            @if ($project->website)
                <a href="{{ $project->website }}">
                    <div class='outline-circle'>
                        <img src="/image/internet_icon.png">
                    </div>
                </a>
                {{ $project->website }}
            @endif
        </div>
    </div>
</div>
