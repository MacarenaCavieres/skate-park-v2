const formLogin = document.querySelector("#formLogin");

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = formLogin.email.value;
    const password = formLogin.password.value;

    try {
        const { data } = await axios.post("/users/login", {
            email,
            password,
        });

        console.log(data);

        localStorage.setItem("token", data.token);

        window.location.href = "/data";
    } catch (error) {
        console.log(error);
    }
});
