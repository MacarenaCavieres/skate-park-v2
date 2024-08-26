const formRegister = document.querySelector("#formRegister");

if (formRegister) {
    formRegister.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                "/register/skater",
                {
                    email: formRegister.email.value,
                    nombre: formRegister.nombre.value,
                    password: formRegister.password.value,
                    rePassword: formRegister.rePassword.value,
                    years_experience: formRegister.years_experience.value,
                    specialty: formRegister.specialty.value,
                    photo: formRegister.photo.files[0],
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (data.ok) {
                window.location.href = "/register/success";
            }
        } catch (error) {
            console.log("error =====> ", error);
        }
    });
}
