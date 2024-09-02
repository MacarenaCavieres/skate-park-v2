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

        localStorage.setItem("token", data.token);
        if (data.tipo_usuario === 2) {
            window.location.href = "/data";
        }
    } catch (error) {
        console.log(error);
        return alert(error.response.data.msg);
    }
});
