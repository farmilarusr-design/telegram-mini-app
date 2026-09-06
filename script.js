const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const user = tg.initDataUnsafe.user;

if (user) {
    const firstName = user.first_name || "";
    const lastName = user.last_name || "";
    const fullName = firstName + (lastName ? " " + lastName : "");

    const username = user.username
        ? "@" + user.username
        : "Без username";

    // Главный экран
    document.getElementById("name").textContent =
        fullName || "Пользователь";

    document.getElementById("username").textContent = username;

    // Аватар на главном экране
    setAvatar("avatar", user);

    // Страница профиля
    document.getElementById("profileName").textContent =
        fullName || "Пользователь";

    document.getElementById("profileUsername").textContent =
        username;

    document.getElementById("userId").textContent =
        user.id || "Неизвестно";

    // Аватар в профиле
    setAvatar("profileAvatar", user);

} else {
    document.getElementById("name").textContent = "Пользователь";
    document.getElementById("username").textContent = "Открыто вне Telegram";

    document.getElementById("profileName").textContent = "Пользователь";
    document.getElementById("profileUsername").textContent = "Открыто вне Telegram";
    document.getElementById("userId").textContent = "Недоступен";

    document.getElementById("avatar").textContent = "?";
    document.getElementById("profileAvatar").textContent = "?";
}


// Установка аватарки
function setAvatar(elementId, user) {
    const avatar = document.getElementById(elementId);

    if (user.photo_url) {
        const image = document.createElement("img");

        image.src = user.photo_url;
        image.alt = "Аватар";

        avatar.textContent = "";
        avatar.appendChild(image);
    } else {
        avatar.textContent =
            user.first_name?.charAt(0).toUpperCase() || "?";
    }
}


// Открыть профиль
function openProfile() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("profilePage").style.display = "block";

    window.scrollTo(0, 0);
}


// Назад на главную
function backHome() {
    document.getElementById("profilePage").style.display = "none";
    document.getElementById("homePage").style.display = "block";

    window.scrollTo(0, 0);
}


// Пока оставляем эти кнопки заглушками
function openSettings() {
    alert("⚙️ Настройки сделаем следующим этапом!");
}


function openHelp() {
    alert("❓ Помощь сделаем следующим этапом!");
}