const formAdmin = document.querySelector("#formAdmin");

formAdmin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = formAdmin.email.value;
    const password = formAdmin.password.value;

    try {
        const { data } = await axios.post("/admin/auth", {
            email,
            password,
        });

        localStorage.setItem("token", data.token);
        if (data.tipo_usuario === 1) {
            window.location.href = "/admin";
        }
    } catch (error) {
        console.log(error);
        return alert(error.response.data.msg);
    }
});
