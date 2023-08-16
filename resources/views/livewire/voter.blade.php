<div class="dropdown d-flex flex-column justify-content-center align-items-center gap-3">

    <button class="btn_vote hero dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-auto-close="outside"
        data-bs-toggle="dropdown" aria-expanded="false">❤️🏅🔥💰 {{ $projectScore->total_score }}</button>
    <div class="dropdown-menu" style='min-width: 20rem;' aria-labelledby="dropdownMenuButton1" wire:ignore>
        <div class="px-4 py-3">
            <div class="mb-3">
                <label for="customRange1" id='feasibility' class="form-label">5 - Feasibility
                    ❤️</label>
                <input type="range" class="form-range" wire:model="feasibility" min="0" max="10"
                    value='5' step="1" id="customRange1">
            </div>
            <div class="mb-3">
                <label for="customRange2" id='architecture' class="form-label">5 - Architecture 🏅</label>
                <input type="range" class="form-range" wire:model="architecture" min="0" max="10"
                    value='5' step="1" id="customRange2">
            </div>
            <div class="mb-3">
                <label for="customRange3" id='innovative' class="form-label">5 - Innovative 🔥</label>
                <input type="range" class="form-range" wire:model="innovative" min="0" max="10"
                    value='5' step="1" id="customRange3">
            </div>
            <button type="button" wire:click="vote({{ $project->id }})" id='submit-btn'
                class="btn btn-primary btn-vote">Vote</button>
        </div>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="/auth/register">New around here? Sign up</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="/auth/login">Returning ? Login</a>
    </div>
    <p style='color: red;'>{{ $error }}</p>
    <p style='color: green;'>{{ $success }}</p>

    <script>
        function updateNumber(e) {
            const value = e.target.value;
            const prev = e.target.previousElementSibling;
            const prevText = prev.textContent;

            if (value === 10) {
                prev.textContent = `${value} - ${prevText.substring(5)}`
            } else {
                prev.textContent = `${value} - ${prevText.substring(4)}`
            }
        }

        document.getElementById('customRange1').addEventListener('input', updateNumber)
        document.getElementById('customRange2').addEventListener('input', updateNumber)
        document.getElementById('customRange3').addEventListener('input', updateNumber)

        let trigger = document.getElementById('dropdownMenuButton1')
        document.getElementById('submit-btn').addEventListener("click", () => {
            bootstrap.Dropdown.getOrCreateInstance(trigger).toggle()
        })
    </script>
</div>
