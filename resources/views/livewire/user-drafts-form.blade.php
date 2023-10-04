<div class="row">
    <div class="col-md-4">
        <x-cards.nft-card
            :project="$project"
            :owner="false"
            :title="$project->title"
            :description="$project->description"
            :is_public="$project->is_public"
            :is_minted="$project->is_minted"
            :id="$project->id"
        />
    </div>
    <form wire:submit.prevent="submit"
          class="col-md-6 w-full d-flex flex-column justify-content-center align-items-center gap-3">
        <h1 style="font-family: Inter,serif" class="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                <rect x="0.25" y="0.25" width="36.5" height="36.5" rx="4.75" fill="#F4B406" stroke="black"
                      stroke-width="0.5"/>
                <path
                    d="M20.3554 11.8027L9.91108 22.2478C9.85854 22.3005 9.82059 22.367 9.80253 22.4385L8.64487 27.0851C8.61024 27.225 8.65134 27.3737 8.75342 27.4758C8.83066 27.553 8.9359 27.5958 9.04355 27.5958C9.07653 27.5958 9.11025 27.5917 9.14307 27.5835L13.7897 26.4257C13.8621 26.4076 13.9279 26.3698 13.9804 26.3173L24.4257 15.8729L20.3554 11.8027Z"
                    fill="black"/>
                <path
                    d="M27.0138 10.3785L25.8511 9.21586C25.0741 8.43882 23.7198 8.43957 22.9437 9.21586L21.5195 10.64L25.5896 14.7101L27.0138 13.286C27.4019 12.898 27.6157 12.3815 27.6157 11.8323C27.6157 11.283 27.4019 10.7666 27.0138 10.3785Z"
                    fill="black"/>
            </svg>
            Edit "{{$project_name}}"
        </h1>

        <div class="w-100">
            <label for="title" class="form-label">NFT Name</label>
            <input type="text" class="form-control w-full draft-edit-input" id="title" wire:model.lazy="project_name">
        </div>

        <div class="w-100">
            <label for="description" class="form-label">Description</label>
            <textarea type="text" class="form-control w-100 draft-edit-input" id="description"
                      wire:model.lazy="project_description"> </textarea>
        </div>

        <div class="w-100">
            <label for="problem" class="form-label">Problem</label>
            <textarea type="text" class="form-control w-100 draft-edit-input" id="problem"
                      wire:model.lazy="project_problem"> </textarea>
        </div>

        <div class="w-100">
            <label for="solution" class="form-label">Solution</label>
            <textarea type="text" class="form-control w-100 draft-edit-input" id="solution"
                      wire:model.lazy="project_solution"></textarea>
        </div>

        <div class="w-100">
            <label for="utilities" class="form-label">Utilities</label>
            <textarea type="text" class="form-control w-100 draft-edit-input" id="utilities"
                      wire:model.lazy="project_utilities"></textarea>
        </div>
        {{--        members --}}
        <div class="w-100">
            <label for="members" class="form-label">Member</label>
            <div class="d-flex flex-column justify-content-center align-items-center gap-2">
                @foreach($project_members as $member)
                    <x-dashboard.edit-member-card
                        :member="$member"
                        :index="$loop->index"
                    />
                @endforeach
            </div>
            <button class="mt-2 add-member" type="button" wire:click="addMember">Add New Member +</button>
        </div>

        {{--        track --}}
        <div class="w-100">
            <label for="Track" class="form-label">Track</label>
            <select class="form-select draft-edit-input" id="track" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>


        {{--        chain --}}
        <div class="w-100">
            <label for="chain" class="form-label">Chain</label>
            <input disabled value="" type="text" class="form-control w-100 draft-edit-input" id="chain"
                   wire:model.lazy="project_chain">
        </div>

        <div class="w-100">
            <label for="supply" class="form-label">Supply</label>
            <input type="text" class="form-control w-100 draft-edit-input" id="supply" wire:model.lazy="project_supply">
        </div>

        <div class="w-100 d-flex gap-2">
            <button type="button" class="submit" style="height: 42px">Save Changes</button>
            <button type="button" class="cancel">Cancel</button>
        </div>
    </form>
</div>

<script>
    const chains = @js($project->blockchains);

    const chainEle = document.getElementById('chain');
    for (const item in chains) {
        if (chains[item] === 1 && item !== 'project_id') {
            chainEle.value += item;
        }
    }

    document.querySelector('.cancel').addEventListener('click', function () {
        window.livewire.emit('cancel');
    });

    document.querySelector('.submit').addEventListener('click', function () {
        let posts = @js($project_members);

        // create members data for project
        const memberData = []
        posts.forEach((a, index) => {
            const name = document.getElementById('memberName' + index).value;
            const role = document.getElementById('memberRole' + index).value;
            const image_url = document.getElementById('memberAvatar' + index).src;

            memberData.push({
                name, role, image_url
            })
        });

        const members = JSON.stringify({members: memberData});
        const chains = document.getElementById('chain').value;

        window.livewire.emit('submit', members);
    });
</script>
