<main class="register-container">

    <form class="register-form">

        <div id="step-1">
            <h1>Enter your name</h1>
            <input wire:model="name" type="text" class="register-input"  />
        </div>

        <div id="step-2" style="display: none">
            <h1>Enter your email</h1>
            <input wire:model="email" type="text" class="register-input"  />
        </div>

        <div id="step-3" style="display: none">
            <h1>Enter your email</h1>
            <div>
                <div>
                    <input id="masculine" wire:model="masculine" type="radio" class="register-input"  />
                    <label for="masculine">Masculine</label>
                </div>
                <div>
                    <input id="feminine" wire:model="feminine" type="radio" class="register-input"  />
                    <label for="feminine">Feminine</label>
                </div>
                <div>
                    <input id="notSpecified" wire:model="notSpecified" type="radio" class="register-input"  />
                    <label for="notSpecified">Not Specified</label>
                </div>
            </div>
        </div>

        <div id="step-4" style="display: none">
            <div class="d-flex flex-column justify-content-center align-items-center">
                <h5>Create your avatar</h5>
                <h1 class="bold width-md">For best results take a selfie with a neutral face and good lighting</h1>
                <div class="avatar-icon">
                    <x-svg.avatar-icon />
                </div>
            </div>

            <div class="photo-btns">
                <button style="box-shadow: 0 5px 40px rgba(48, 115, 218, 0.75);">Take a photo</button>
                <div>
                    <span style="color: white">Or </span><button class="file-input">pick a file</button>
                </div>
                <button id="skip-photo">Continue without a photo</button>

                <p style="margin-top: 2rem; color: black; width: 60%;">By clicking "Take a photo! or "Continue without a photo" you confirm you have read and accepted IDEA Lab's Terms of Service.</p>
            </div>
        </div>

        <div id="step-5" style="display: none">
            <iframe id="frame" class="frame" allow="camera *; microphone *; clipboard-write" hidden></iframe>
        </div>

        <div id="step-6" style="display: none">
            <h5>Build your world</h5>
            <h1>What Type of idea do you like</h1>
            <div style="display: flex; justify-content: center; align-content: center; gap: 1rem;">
                <button style="border: none; background: transparent; border-radius: 10px;">
                    <img src="/image/auth-form/futuristic-scifi-fashion.png" />
                </button>

                <button>
                     <img src="/image/auth-form/futuristic-scifi-fashion-2.png" />
                </button>

                <button>
                    <img src="/image/auth-form/Rectangle-6.png" />
                </button>

                <button>
                    <img src="/image/auth-form/Rectangle-3060.png" />
                </button>

                <button>
                    <img src="/image/auth-form/Rectangle-3061.png" />
                </button>
            </div>
        </div>

        <div id="step-7" style="display: none">
            <h1>What type of idea do you want to create</h1>
        </div>

        <div id="step-8" style="display: none">
            <h1>Tell us about your IDEA or What type of IDEA are you looking for</h1>
        </div>

        <div id="step-9" style="display: none">
            <h1>Tell us about your IDEA or What genre of IDEA are you looking for</h1>
        </div>

        <div id="step-10" style="display: none">
            <h1>The Idea Protocol</h1>
        </div>
    </form>

</main>

<footer class="register-footer" style="width: 100%">
    <div class="progress" style="border-radius: 0; background: #E7EAE6;">
        <div class="progress-bar register-bar" role="progressbar" style="width: 0" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="footer-controls">
        <button class="back-btn">Back</button>
        <div>
            <button class="skip-btn">Skip for now</button>
            <button class="next-btn">Next</button>
        </div>
    </div>
</footer>

<script>
    class AuthForm {
        constructor(currentStep, progressValue, progressIncreaseValue) {
            this.currentStep = currentStep;
            this.progressValue = progressValue;
            this.progressIncreaseValue = progressIncreaseValue;
            this.progressBar = document.querySelector('.register-bar');
            this.nextBtn = document.querySelector('.next-btn');
            this.backBtn = document.querySelector('.back-btn');
            this.skipBtn = document.querySelector('.skip-btn');
            this.skipPhotoBtn = document.querySelector('#skip-photo');
            this.registerForm = document.querySelector('.register-form');
        }

        increaseProgress() {
            this.currentStep++;
            document.getElementById(`step-${this.currentStep - 1}`).style.display = 'none';
            document.getElementById(`step-${this.currentStep}`).style.display = 'block';
            this.progressBar.style.width = `${this.progressValue += this.progressIncreaseValue}%`;
            this.progressBar.setAttribute('aria-valuenow', this.progressValue);

            if(this.currentStep === 5) {
                displayIframe();
                // remove padding
                this.registerForm.style.padding = '0';
            }
        }

        decreaseProgress() {
            this.currentStep--;
            document.getElementById(`step-${this.currentStep + 1}`).style.display = 'none';
            document.getElementById(`step-${this.currentStep}`).style.display = 'block';
            this.progressBar.style.width = `${this.progressValue -= this.progressIncreaseValue}%`;
            this.progressBar.setAttribute('aria-valuenow', this.progressValue);

            if (this.currentStep !== 5) {
                // check if register form padding === 0
                if (this.registerForm.style.padding === '0') {
                    this.registerForm.style.padding = '2rem 5rem 2rem 5rem';
                }
            }
        }
    }

    const authForm = new AuthForm(1, 0, 11.11);

    authForm.nextBtn.addEventListener('click', event => {
        if(authForm.currentStep === 10) return;
        window.livewire.emit('next');
        authForm.increaseProgress();
    });

    authForm.backBtn.addEventListener('click', event => {
        if(authForm.currentStep === 1) return;
        window.livewire.emit('back');
        authForm.decreaseProgress();
    });

    authForm.skipBtn.addEventListener('click', event => {
        if(authForm.currentStep === 10) return;
        window.livewire.emit('skip');
        authForm.increaseProgress();
    });

    authForm.skipPhotoBtn.addEventListener('click', event => {
        window.livewire.emit('skipPhoto');
        authForm.increaseProgress();
    });
</script>

{{-- Ready Player Me --}}
<script>
    const frame = document.getElementById('frame');

    frame.src = `https://idea-test.readyplayer.me/avatar?frame&bodyType=halfbody&Api=&id=653940770935b38c908beda9i`;

    window.addEventListener('message', subscribe);
    document.addEventListener('message', subscribe);

    function subscribe(event) {
        const json = parse(event);

        if (json?.source !== 'readyplayerme') {
            return;
        }

        // Susbribe to all events sent from Ready Player Me once frame is ready
        if (json.eventName === 'v1.frame.ready') {
            frame.contentWindow.postMessage(
                JSON.stringify({
                    target: 'readyplayerme',
                    type: 'subscribe',
                    eventName: 'v1.**'
                }),
                '*'
            );
        }

        // Get avatar GLB URL
        if (json.eventName === 'v1.avatar.exported') {
            console.log(`Avatar URL: ${json.data.url}`);
            document.getElementById('avatarUrl').innerHTML = `Avatar URL: ${json.data.url}`;
            document.getElementById('frame').hidden = true;
        }

        // Get user id
        if (json.eventName === 'v1.user.set') {
            console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
        }
    }

    function parse(event) {
        try {
            return JSON.parse(event.data);
        } catch (error) {
            return null;
        }
    }

    function displayIframe() {
        document.getElementById('frame').hidden = false;
    }
</script>
