const formRegister = document.querySelector("#formRegister");

formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = formRegister.email.value;
    const nombre = formRegister.nombre.value;
    const password = formRegister.password.value;
    const rePassword = formRegister.rePassword.value;
    const years_experience = formRegister.years_experience.value;
    const specialty = formRegister.specialty.value;
    const photo = formRegister.photo.files[0];

    if (
        !password.trim() ||
        !rePassword.trim() ||
        !email.trim() ||
        !nombre.trim() ||
        !years_experience.trim() ||
        !specialty.trim() ||
        !photo
    )
        return alert("Debe completar todos los datos");

    if (password !== rePassword) return alert("Contraseñas no coinciden");

    try {
        const { data } = await axios.post(
            "/users/register/skater",
            {
                email,
                nombre,
                password,
                rePassword,
                years_experience,
                specialty,
                photo,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        localStorage.setItem("token", data.msg.token);
        window.location.href = "/users/data";
    } catch (error) {
        console.error(error);
        return alert(error.response.data.msg);
    }
});
