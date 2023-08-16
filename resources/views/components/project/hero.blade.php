@props(['project', 'projectScore'])

<div class="container p-5">
    <div class="row">
        <div class="col-md-6 d-flex gap-3 flex-column align-items-center justify-content-center">
            <h5 class='project-header'>{{ $project->title }}</h5>
            <div class="d-flex justify-content-center gap-3 my-3">
                @if ($project->discord)
                    <div class='outline-circle'><a href="{{ $project->discord }}"><img src="/image/footer_01.png"></a>
                    </div>
                @endif

                @if ($project->twitter)
                    <div class='outline-circle'><a href="{{ $project->twitter }}"><img src="/image/footer_02.png"></a>
                    </div>
                @endif

                @if ($project->website)
                    <div class='outline-circle'><a href="{{ $project->website }}"><img
                                src="/image/internet_icon.png"></a>
                    </div>
                @endif
            </div>
            <section class='d-flex gap-5'>
                <div>
                    <div class="d-flex flex-column align-items-center justify-content-center">
                        <h3 class="sequel100black-95-regular-normal-onyx-16px">{{ $project->items }}</h3>
                        <p class="raleway-normal-dove-gray-14px">Items</p>
                    </div>
                </div>
                <div class="d-flex flex-column align-items-center  justify-content-center">
                    <h3 class="sequel100black-95-regular-normal-onyx-16px">{{ $project->collections }}</h3>
                    <p class="raleway-normal-dove-gray-14px">Collections</p>
                </div>
                <div class="d-flex flex-column align-items-center  justify-content-center">
                    <h3 class="sequel100black-95-regular-normal-onyx-16px">{{ $project->owners }}</h3>
                    <p class="raleway-normal-dove-gray-14px">Owners</p>
                </div>
            </section>
            @livewire('voter', ['project' => $project, 'projectScore' => $projectScore])
        </div>
        <div class="col-md-6">
            <img src="{{ $project->coverImagePath() }}" alt="">
        </div>
    </div>
</div>
