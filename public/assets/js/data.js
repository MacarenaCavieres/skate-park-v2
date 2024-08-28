const token = localStorage.getItem("token");
const username = document.querySelector("#username");
const specialtySk = document.querySelector("#specialtySk");
const logout = document.querySelector("#logout");
const formDatos = document.querySelector("#formDatos");
const updateData = document.querySelector("#updateData");
const deleteData = document.querySelector("#deleteData");

if (!token) {
    alert("Inicie sesión");
    window.location.href = "/login";
}

logout.addEventListener("click", () => {
    window.location.href = "/login";
});

const getProfile = async () => {
    try {
        const { data } = await axios.get("/users/data", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        username.textContent = data.data.nombre;
        specialtySk.textContent = data.data.specialty;

        formDatos.email.value = data.data.email;
        formDatos.name.value = data.data.nombre;
        formDatos.years_experience.value = data.data.years_experience;
        formDatos.specialty.value = data.data.specialty;
    } catch (error) {
        console.error("Error al obtener el perfil:", error);
    }
};

updateData.addEventListener("click", async () => {
    const email = formDatos.email.value;
    const nombre = formDatos.name.value;
    const password = formDatos.password.value;
    const rePassword = formDatos.rePassword.value;
    const years_experience = formDatos.years_experience.value;
    const specialty = formDatos.specialty.value;

    if (
        !email.trim() ||
        !nombre.trim() ||
        !password.trim() ||
        !rePassword.trim() ||
        !years_experience.trim() ||
        !specialty.trim()
    )
        return alert("Debe ingresar todos los campos");

    if (password !== rePassword) return alert("Contraseñas no coinciden");

    try {
        await axios.put("/users/skater/update", {
            email,
            nombre,
            password,
            rePassword,
            years_experience,
            specialty,
        });

        alert("Datos actualizados con éxito");
        window.location.href = "/";
    } catch (error) {
        console.log(error);
        return alert("Ups... hubo un error, no se pudo actualizar sus datos, intente de nuevo");
    }
});

deleteData.addEventListener("click", async () => {
    const email = formDatos.email.value;
    const password = formDatos.password.value;

    if (!email.trim() || !password.trim()) return alert("Debe ingresar su email y contraseña");

    const skater = {
        email,
        password,
    };

    const sure = confirm("Segur@ quiere eliminar su cuenta?");
    if (!sure) return;

    try {
        await axios.delete("/users/skater/delete", {
            data: skater,
        });

        alert("Cuenta eliminada con éxito");
        window.location.href = "/";
    } catch (error) {
        console.log(error);
        alert("Ups... hubo un error, no se pudo eliminar su cuenta, intente de nuevo");
    }
});

getProfile();
