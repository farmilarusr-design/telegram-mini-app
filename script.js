const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const user = tg.initDataUnsafe.user;


// =========================
// ПОЛЬЗОВАТЕЛЬ
// =========================

if (user) {

    const firstName = user.first_name || "";
    const lastName = user.last_name || "";

    const fullName =
        firstName + (lastName ? " " + lastName : "");

    const username = user.username
        ? "@" + user.username
        : "Без username";


    document.getElementById("name").textContent =
        fullName || "Пользователь";

    document.getElementById("username").textContent =
        username;


    document.getElementById("profileName").textContent =
        fullName || "Пользователь";

    document.getElementById("profileUsername").textContent =
        username;

    document.getElementById("userId").textContent =
        user.id || "Неизвестно";


    setAvatar("avatar", user);
    setAvatar("profileAvatar", user);

} else {

    document.getElementById("name").textContent =
        "Пользователь";

    document.getElementById("username").textContent =
        "Открыто вне Telegram";

    document.getElementById("profileName").textContent =
        "Пользователь";

    document.getElementById("profileUsername").textContent =
        "Открыто вне Telegram";

    document.getElementById("userId").textContent =
        "Недоступен";

}


// =========================
// АВАТАР
// =========================

function setAvatar(elementId, user) {

    const avatar =
        document.getElementById(elementId);

    if (user && user.photo_url) {

        const image =
            document.createElement("img");

        image.src = user.photo_url;

        image.alt = "Аватар";

        avatar.textContent = "";

        avatar.appendChild(image);

    } else {

        avatar.textContent =
            user?.first_name?.charAt(0).toUpperCase() || "?";
    }
}


// =========================
// СТРАНИЦЫ
// =========================

function hideAllPages() {

    document.getElementById("homePage")
        .classList.add("hidden");

    document.getElementById("gamePage")
        .classList.add("hidden");

    document.getElementById("profilePage")
        .classList.add("hidden");

    document.getElementById("settingsPage")
        .classList.add("hidden");

    document.getElementById("helpPage")
        .classList.add("hidden");
}


function openGame() {

    hideAllPages();

    document.getElementById("gamePage")
        .classList.remove("hidden");

    window.scrollTo(0, 0);

    drawWheel();
}


function backHome() {

    hideAllPages();

    document.getElementById("homePage")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}


function openProfile() {

    hideAllPages();

    document.getElementById("profilePage")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}


function openSettings() {

    hideAllPages();

    document.getElementById("settingsPage")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}


function openHelp() {

    hideAllPages();

    document.getElementById("helpPage")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}


// =========================
// РАНДОМАЙЗЕР
// =========================

let options = [];

let currentRotation = 0;

let spinning = false;


const canvas =
    document.getElementById("wheel");

const ctx =
    canvas.getContext("2d");


const colors = [
    "#4f91d0",
    "#e85d75",
    "#f2a65a",
    "#63c174",
    "#9b6ed0",
    "#36a9a9",
    "#d56c9d",
    "#7d8fd3"
];


// =========================
// ДОБАВИТЬ ВАРИАНТ
// =========================

function addOption() {

    const input =
        document.getElementById("optionInput");

    const value =
        input.value.trim();


    if (!value) {
        return;
    }


    // Максимум вариантов

    if (options.length >= 12) {

        alert("Максимум 12 вариантов");

        return;
    }


    options.push(value);

    input.value = "";

    updateOptions();

    drawWheel();

    updateSpinButton();
}


// Enter тоже добавляет вариант

document
    .getElementById("optionInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            addOption();
        }

    });


// =========================
// СПИСОК ВАРИАНТОВ
// =========================

function updateOptions() {

    const list =
        document.getElementById("optionsList");

    list.innerHTML = "";


    if (options.length === 0) {

        list.innerHTML =
            '<div class="empty-text">Добавь минимум 2 варианта</div>';

        return;
    }


    options.forEach((option, index) => {

        const item =
            document.createElement("div");

        item.className = "player";


        const text =
            document.createElement("span");

        text.textContent = option;


        const remove =
            document.createElement("button");

        remove.className = "remove-player";

        remove.textContent = "×";


        remove.onclick = function() {

            if (spinning) {
                return;
            }

            options.splice(index, 1);

            updateOptions();

            drawWheel();

            updateSpinButton();
        };


        item.appendChild(text);

        item.appendChild(remove);

        list.appendChild(item);

    });
}


// =========================
// КНОПКА КРУТИТЬ
// =========================

function updateSpinButton() {

    const button =
        document.getElementById("spinButton");

    button.disabled =
        options.length < 2 || spinning;
}


// =========================
// РИСОВАНИЕ КОЛЕСА
// =========================

function drawWheel() {

    const centerX =
        canvas.width / 2;

    const centerY =
        canvas.height / 2;

    const radius = 150;


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Нет вариантов

    if (options.length === 0) {

        ctx.beginPath();

        ctx.arc(
            centerX,
            centerY,
            radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#253445";

        ctx.fill();


        ctx.fillStyle = "#9da9b5";

        ctx.font = "18px Arial";

        ctx.textAlign = "center";

        ctx.textBaseline = "middle";


        ctx.fillText(
            "Добавь варианты",
            centerX,
            centerY
        );

        return;
    }


    const segmentAngle =
        (Math.PI * 2) / options.length;


    options.forEach((option, index) => {

        const startAngle =
            index * segmentAngle - Math.PI / 2;

        const endAngle =
            startAngle + segmentAngle;


        // Сектор

        ctx.beginPath();

        ctx.moveTo(
            centerX,
            centerY
        );

        ctx.arc(
            centerX,
            centerY,
            radius,
            startAngle,
            endAngle
        );

        ctx.closePath();


        ctx.fillStyle =
            colors[index % colors.length];

        ctx.fill();


        ctx.strokeStyle =
            "#17212b";

        ctx.lineWidth = 3;

        ctx.stroke();


        // Текст

        const textAngle =
            startAngle + segmentAngle / 2;


        const textX =
            centerX +
            Math.cos(textAngle) *
            radius *
            0.62;


        const textY =
            centerY +
            Math.sin(textAngle) *
            radius *
            0.62;


        ctx.save();

        ctx.translate(
            textX,
            textY
        );

        ctx.rotate(
            textAngle + Math.PI / 2
        );


        ctx.fillStyle =
            "#ffffff";

        ctx.font =
            "bold 15px Arial";

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";


        let displayOption =
            option;


        if (displayOption.length > 13) {

            displayOption =
                displayOption.substring(0, 12) + "…";
        }


        ctx.fillText(
            displayOption,
            0,
            0
        );


        ctx.restore();

    });


    // Центр

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        23,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#17212b";

    ctx.fill();


    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        7,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#ffffff";

    ctx.fill();
}


// =========================
// ВРАЩЕНИЕ
// =========================

function spinWheel() {

    if (
        spinning ||
        options.length < 2
    ) {
        return;
    }


    spinning = true;

    updateSpinButton();


    document
        .getElementById("result")
        .classList.add("hidden");


    // Выбираем случайный вариант

    const winnerIndex =
        Math.floor(
            Math.random() *
            options.length
        );


    const segmentAngle =
        360 / options.length;


    // Куда должно прийти колесо

    const targetAngle =
        360 -
        (
            winnerIndex *
            segmentAngle +
            segmentAngle / 2
        );


    // 5-7 полных оборотов

    const extraSpins =
        360 *
        (
            5 +
            Math.floor(
                Math.random() * 3
            )
        );


    const finalRotation =
        currentRotation +
        extraSpins +
        targetAngle -
        (
            currentRotation % 360
        );


    const startRotation =
        currentRotation;


    const difference =
        finalRotation -
        startRotation;


    const duration =
        4500;


    const startTime =
        performance.now();


    function animate(currentTime) {

        const elapsed =
            currentTime -
            startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        // Плавное торможение

        const eased =
            1 -
            Math.pow(
                1 - progress,
                4
            );


        currentRotation =
            startRotation +
            difference *
            eased;


        canvas.style.transform =
            `rotate(${currentRotation}deg)`;


        if (progress < 1) {

            requestAnimationFrame(
                animate
            );

        } else {

            currentRotation =
                finalRotation;


            spinning = false;

            updateSpinButton();


            showWinner(
                options[winnerIndex]
            );

        }

    }


    requestAnimationFrame(
        animate
    );
}


// =========================
// РЕЗУЛЬТАТ
// =========================

function showWinner(value) {

    document.getElementById("winner")
        .textContent = value;


    document.getElementById("result")
        .classList.remove("hidden");


    const vibration =
        document.getElementById(
            "vibrationToggle"
        );


    if (
        vibration &&
        vibration.checked &&
        tg.HapticFeedback
    ) {

        tg.HapticFeedback
            .notificationOccurred(
                "success"
            );
    }
}


// =========================
// ЗАПУСК
// =========================

updateOptions();

updateSpinButton();

drawWheel();