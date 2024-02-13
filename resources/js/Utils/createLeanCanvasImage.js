import html2canvas from "html2canvas";

export const createLeanCanvasImage = async ({
    data,
    problem,
    alternatives,
    solution,
    proposition,
    concept,
    advantage,
    channels,
    customerSegments,
    adopters,
    constStructure,
    revenueStreams,
    metrics,
}) => {
    const canvas = `
        <div id="capture">
            <header class="lean-header">
                <h3>IDEA</h3>
                <h5>${data}</h5>
            </header>

            <main class="lean-main">

                <section class="problem">
                    <h1>Problem</h1>
                    <p data-type="problem" type="text">${problem}</p>

                    <h1>Existing Alternatives</h1>
                    <p>${alternatives}</p>
                </section>

                <section class="solution">
                    <h1>Solution</h1>
                    <p>${solution}</p>
                </section>

                <section class="metrics">
                    <h1>Key Metrics</h1>
                    <p>${metrics}</p>
                </section>

                <section class="value">
                    <h1>Unique Value Proposition</h1>
                    <p>${proposition}
                    </p>

                    <h1>High-Level Concept</h1>
                    <p>${concept}</p>
                </section>

                <section class="advantage">
                    <h1>Unfair Advantage</h1>
                    <p>${advantage}</p>
                </section>

                <section class="channels">
                    <h1>Channels</h1>
                    <p>${channels}</p>
                </section>

                <section class="customer">
                    <h1>Customer Segments</h1>
                    <p>${customerSegments}</p>

                    <h1>Early Adopters</h1>
                    <p>${adopters}</p>
                </section>

                <section class="structure">
                    <h1>Cost Structure</h1>
                    <p>${constStructure}</p>
                </section>

                <section class="streams">
                    <h1>Revenue Streams</h1>
                    <p>${revenueStreams}</p>
                </section>
            </main>

            <footer class="lean-footer">
                <h2>Powered by IDEA</h2>
                <h1>IDEA LABS</h1>
            </footer>
        </div>
    `;

    // create html element with html string
    const htmlElement = document.createElement("div");

    htmlElement.innerHTML = canvas;

    // add to dom
    document.body.appendChild(htmlElement);

    // take screenshot of html
    const image = await html2canvas(htmlElement);

    // remove from dom
    document.body.removeChild(htmlElement);

    return image;
};
