const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const user = tg.initDataUnsafe.user;

if (user) {
    const firstName = user.first_name || "";
    const lastName = user.last_name || "";
    const username = user.username ? "@" + user.username : "Без username";

    document.getElementById("name").textContent =
        firstName + (lastName ? " " + lastName : "");

    document.getElementById("username").textContent = username;

    // Первая буква имени вместо аватарки
    document.getElementById("avatar").textContent =
        firstName.charAt(0).toUpperCase();
} else {
    document.getElementById("name").textContent = "Пользователь";
    document.getElementById("username").textContent = "Открыто вне Telegram";
    document.getElementById("avatar").textContent = "?";
}


function openProfile() {
    alert("Профиль скоро будет здесь!");
}


function openSettings() {
    alert("Настройки скоро будут здесь!");
}


function openHelp() {
    alert("Раздел помощи скоро будет здесь!");
}