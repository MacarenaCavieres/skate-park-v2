const token = localStorage.getItem("token");
const username = document.querySelector("#username");
const inputState = document.querySelector("#inputState");
const stateSkater = document.querySelectorAll(".check");
const registerAdmin = document.querySelector("#registerAdmin");
const bntModal = document.querySelectorAll(".btn-update");
const btnDelete = document.querySelectorAll(".btn-delete");
const myModal = new bootstrap.Modal(document.getElementById("myModal"));

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

if (!token) {
    alert("Inicie sesión");
    window.location.href = "/admin/login";
}

logout.addEventListener("click", () => {
    window.location.href = "/admin/login";
});

const getAdmin = async () => {
    try {
        const { data } = await axios.get("/admin/data", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        username.textContent = data.data.username;
    } catch (error) {
        console.error(error);
    }
};

stateSkater.forEach((item) => {
    item.addEventListener("click", async (e) => {
        const state = e.target.checked;
        const id = e.target.id;

        const data = {
            id,
            state,
        };

        const response = await axios.put("/users/state", data);

        if (!response.data.ok)
            return alert("Ups... hubo un problema en actualizar el estado, intentelo más tarde");

        return alert(response.data.msg + " Skater: " + response.data.data.nombre);
    });
});

registerAdmin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = registerAdmin.username.value;
    const email = registerAdmin.email.value;
    const password = registerAdmin.password.value;
    const rept_password = registerAdmin.rept_password.value;

    if (!username.trim() || !email.trim() || !password || !rept_password)
        return alert("Debe ingresar todos los datos");

    if (password !== rept_password) return alert("Contraseñas no coinciden");

    const data = {
        username,
        email,
        password,
        rept_password,
    };
    try {
        const response = await axios.post("/admin/register", data);

        if (response.ok === false) return alert("Ups... algo salió mal, intentelo mas tarde");

        window.location.reload();

        return alert("Administrador creado exitosamente");
    } catch (error) {
        console.error(error);
        return alert(error.response.data.msg);
    }
});

const infoAdmin = async (e) => {
    const idAdmin = e.target.id;
    try {
        const { data } = await axios.get(`/admin/id/${idAdmin}`);
        myModal.show();
        console.log(data);

        let username = updateForm.username;
        let email = updateForm.email;

        username.value = data.data.username;
        email.value = data.data.email;
    } catch (error) {
        console.error(error);
        return alert("Algo salió mal");
    }

    // const updateForm = document.querySelector("#updateForm");

    // const username = updateForm.username.value;
    // const email = updateForm.email.value;
    // const password = updateForm.password.value;
    // const rept_password = updateForm.rept_password.value;
    // console.log(username, email, password, rept_password);
};

bntModal.forEach((btn) => btn.addEventListener("click", infoAdmin));

getAdmin();
