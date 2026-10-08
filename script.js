/* =========================================
   ELEMENTS
========================================= */

const envelopeScreen =
    document.getElementById("envelope-screen");

const nameScreen =
    document.getElementById("name-screen");

const invitation =
    document.getElementById("invitation");

const envelopeContainer =
    document.querySelector(".envelope-container");

const music =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");



/* =========================================
   OPEN ENVELOPE
========================================= */

function openEnvelope() {

    // Prevent multiple clicks
    if (envelopeContainer.classList.contains("open")) {
        return;
    }


    // Add opening animation
    envelopeContainer.classList.add("open");


    // Start music
    music.volume = 0.35;

    music.play()
        .catch(() => {
            console.log("Music requires user interaction.");
        });


    // Wait for animation
    setTimeout(() => {

        envelopeScreen.style.opacity = "0";


        setTimeout(() => {

            envelopeScreen.classList.add("hidden");

            nameScreen.classList.remove("hidden");

        }, 800);


    }, 1600);

}



/* =========================================
   SHOW INVITATION
========================================= */

function showInvitation() {


    const nameInput =
        document.getElementById("guestName");


    const name =
        nameInput.value.trim();


    const errorMessage =
        document.getElementById("error-message");


    const helloText =
        document.getElementById("helloText");



    /* Empty name check */

    if (name === "") {

        errorMessage.textContent =
            "Please enter your name first 💕";

        return;

    }



    /* Clear error */

    errorMessage.textContent = "";



    /* Uppercase name */

    helloText.textContent =
        `Hello, ${name.toUpperCase()}!`;



    /* Hide name screen */

    nameScreen.classList.add("hidden");



    /* Show invitation */

    invitation.classList.remove("hidden");



    /* Start countdown */

    startCountdown();

}



/* =========================================
   ENTER KEY SUPPORT
========================================= */

document
    .getElementById("guestName")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            showInvitation();

        }

    });



/* =========================================
   MUSIC CONTROL
========================================= */

function toggleMusic() {


    if (music.paused) {

        music.play();

        musicButton.textContent = "🎵";

    }

    else {

        music.pause();

        musicButton.textContent = "🔇";

    }

}



/* =========================================
   COUNTDOWN
========================================= */


/*
    CHANGE THIS DATE!

    Format:

    YYYY-MM-DDTHH:MM:SS

*/

const birthdayDate =
    new Date("2026-10-12T14:00:00").getTime();



function startCountdown() {


    function updateCountdown() {


        const now =
            new Date().getTime();


        const difference =
            birthdayDate - now;



        /* Birthday has arrived */

        if (difference <= 0) {

            document.getElementById("days")
                .textContent = "00";

            document.getElementById("hours")
                .textContent = "00";

            document.getElementById("minutes")
                .textContent = "00";

            document.getElementById("seconds")
                .textContent = "00";

            return;

        }



        /* Calculate */

        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (difference %
                    (1000 * 60 * 60 * 24))
                /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (difference %
                    (1000 * 60 * 60))
                /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (difference %
                    (1000 * 60))
                /
                1000
            );



        /* Display */

        document.getElementById("days")
            .textContent =
            String(days).padStart(2, "0");


        document.getElementById("hours")
            .textContent =
            String(hours).padStart(2, "0");


        document.getElementById("minutes")
            .textContent =
            String(minutes).padStart(2, "0");


        document.getElementById("seconds")
            .textContent =
            String(seconds).padStart(2, "0");

    }



    /* Run immediately */

    updateCountdown();


    /* Update every second */

    setInterval(updateCountdown, 1000);

}