const formRegister = document.querySelector("#formRegister");

if (formRegister) {
    formRegister.addEventListener("submit", async () => {
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
    });
}
