<div id="capture">
    <header class="lean-header">
        <h3>IDEA</h3>
        <h5>Nov 6, 2023</h5>
    </header>

    <main class="lean-main">

        <section class="problem">
            <h1>Problem</h1>
            <textarea data-type="problem" type="text">{{$problem}}</textarea>

            <h1>Existing Alternatives</h1>
            <textarea>{{$alternatives}}</textarea>
        </section>

        <section class="solution">
            <h1>Solution</h1>
            <textarea>{{$solution}}}</textarea>
        </section>

        <section class="metrics">
            <h1>Key Metrics</h1>
            <textarea>{{$metrics}}</textarea>
        </section>

        <section class="value">
            <h1>Unique Value Proposition</h1>
            <textarea>{{$proposition}}
            </textarea>

            <h1>High-Level Concept</h1>
            <textarea>{{$concept}}</textarea>
        </section>

        <section class="advantage">
            <h1>Unfair Advantage</h1>
            <textarea>{{$advantage}}</textarea>
        </section>

        <section class="channels">
            <h1>Channels</h1>
            <textarea>{{$channels}}</textarea>
        </section>

        <section class="customer">
            <h1>Customer Segments</h1>
            <textarea>{{$customerSegments}}</textarea>

            <h1>Early Adopters</h1>
            <textarea>{{$channels}}</textarea>
        </section>

        <section class="structure">
            <h1>Cost Structure</h1>
            <textarea>{{$costStructure}}</textarea>
        </section>

        <section class="streams">
            <h1>Revenue Streams</h1>
            <textarea>{{$revenueStreams}}</textarea>
        </section>

        <iframe id="frame" class="frame" allow="camera *; microphone *; clipboard-write" hidden></iframe>
    </main>

    <button class="btn btn-primary" style="margin-left: 5rem"  id="mintBtn">Check Out</button>

    <footer class="lean-footer">
        <h2>Powered by IDEA</h2>
        <h1>IDEA LABS</h1>
    </footer>
</div>

<script type="module">
    const mintBtn = document.getElementById('mintBtn');

    mintBtn.addEventListener('click', () => {

        // hide button
        mintBtn.style.display = 'none';

       html2canvas(document.querySelector("#capture"), {
           allowTaint: true,
       }).then(canvas => {

            fetch('/api/canvas/mint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: canvas.toDataURL('image/png')
                })
            }).then(response => response.json())
                .then(({checkoutUrl, result}) => {
                    // open checkoutUrl in new tab
                    window.open(checkoutUrl, '_blank');


                });

            // show button
            mintBtn.style.display = 'block';
        });
    });


    displayIframe();

    const textareaList = document.querySelectorAll('textarea')

    textareaList.forEach((textarea) => {
        textarea.style.height = textarea.scrollHeight + "px"
    })


    // import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"

    // add event listener to all text areas
    const textAreas = document.querySelectorAll('textarea');

    async function submitChatGpt(type, input) {

        // using fetch submit to /chatgpt/${type} and print out response
        const data = await fetch(`/api/chatgpt/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: input
            })
        });

        const response = await data.json();

        alert(response.answer);
    }

    for (let i = 0; i < textAreas.length; i++) {
        textAreas[i].addEventListener('focus', function (e) {
            // Chatbot.init({
            //      chatflowid: "616ca894-b77a-4282-bfcf-d4b3c9b8134e",
            //      apiHost: "http://localhost:3000",
            //  });

            // if there is already a chat box do not create one
            if (document.querySelector('.chat-box')) {
                document.querySelector('.chat-box').remove();
            }

            // add chat box element to bottom of textarea element with absolute positioning
            // create chat box element
            const chatBox = document.createElement('div');
            chatBox.classList.add('chat-box');

            // add input as child
            const input = document.createElement('input');
            input.classList.add('chat-input');
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', 'Type your message here');

            // add send button as child
            const sendBtn = document.createElement('button');
            sendBtn.classList.add('chat-send-btn');
            sendBtn.innerHTML = 'Send';

            // add event listener to send button
            sendBtn.addEventListener('click', function (e) {
                // get type from textarea data-type attribute
                const type = e.target.parentNode.parentNode.querySelector('textarea').getAttribute('data-type');
                // get input from input value
                const input = document.querySelector('.chat-input').value;

                submitChatGpt(type, input);
            });

            // append input and send button to chat box
            chatBox.appendChild(input);
            chatBox.appendChild(sendBtn);

            // append chat box to body
            document.body.appendChild(chatBox);

            // position chat box
            const textAreaPosition = e.target.getBoundingClientRect();
            const chatBoxPosition = chatBox.getBoundingClientRect();
            const chatBoxTop = textAreaPosition.top + textAreaPosition.height + 10;
            const chatBoxLeft = textAreaPosition.left + textAreaPosition.width - chatBoxPosition.width;
            chatBox.style.top = `${chatBoxTop}px`;
            chatBox.style.left = `${chatBoxLeft}px`;

        }, false);

        // remove chat box when clicking outside of textarea or not on chat box
        document.addEventListener('click', function (e) {
            const chatBox = document.querySelector('.chat-box');
            if(e.delegateTarget.activeElement.localName === 'textarea') {
                return;
            }

            if (chatBox) {
                if (!chatBox.contains(e.target) && !e.target.classList.contains('chat-input')) {
                    chatBox.remove();
                }
            }
        }, false);
    }
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
