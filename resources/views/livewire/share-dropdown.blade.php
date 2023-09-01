<div class="dropdown">
    <button type="button" class="dropdown-button" data-bs-toggle="dropdown" aria-expanded="false">
        <x-svg.share-icon />
    </button>
    <div class="dropdown-menu">
        <div class="custom-menu d-flex flex-row">
            <button wire:click="share('facebook')">
                <x-svg.facebook-btn-icon />
            </button>
            <button wire:click="share('twitter')">
                <x-svg.twitter-btn-icon />
            </button>
            <button wire:click="share('instagram')">
                <x-svg.instagram-btn-icon />
            </button>
            <button wire:click="share('linkedin')">
                <x-svg.linkedin-btn-icon />
            </button>
            <button wire:click="share('discord')">
                <x-svg.discord-btn-icon />
            </button>
            <button wire:click="share('reddit')">
                <x-svg.reddit-btn-icon />
            </button>
            <button wire:click="share('tiktok')">
                <x-svg.tiktok-btn-icon />
            </button>
        </div>
    </div>
</div>
