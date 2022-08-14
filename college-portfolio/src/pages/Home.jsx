import React from 'react';

function Home() {
    return (
        <div>
            <section id="main-page-contents" class="blue-bg">
                <div class="main-name-div blue-bg">
                    <h1 class="my-name blue-bg">Solina Kim</h1><br/>
                </div>
                <div class="horizontal-menu-buttons blue-bg" id="horizontal-menu-buttons">
                    <a class='tetris-icon' onclick="showContent('#play-tetris')">
                        <img class='icon tetris-icon' src="assets/tetris.png" width="42" />
                    </a>
                    <a onclick="showContent('#portfolio-pages')">
                        <i class="fa-solid fa-rocket blue-bg"></i>
                    </a>
                    <a href="https://drive.google.com/uc?export=download&id=1Qk-YfcyABw2qaop1Ogp-HGEG9iv34i0T"
                        download="SolinaKim_resume" target="_blank">
                        <i class="fa-solid fa-file blue-bg"></i>
                    </a>
                    <a href="https://github.com/SolinaKEK" target="_blank">
                        <i class="fa-brands fa-github blue-bg"></i>
                    </a>
                    <a href="mailto:kkim24@nd.edu">
                        <i class="fa-regular fa-envelope-open blue-bg"></i>
                    </a>
                    <a class='cave-icon' onclick="showContent('#cave-pages')"><img class="icon cave-icon" src="./assets/cave.png"
                        width="39" />
                    </a>
                </div>
            </section>
            <section>
                <div class="credits blue-bg">
                    <p class="footer blue-bg">
                        Designed and built by Solina Kim | <a href="https://github.com/SolinaKEK/SolinaKEK.github.io"
                            class="blue-bg">Source</a></p>
                </div>
            </section>
        </div>
    );
}
export default Home;