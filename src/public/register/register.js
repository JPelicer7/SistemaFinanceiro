const form = document.getElementById("formRegister");
const API_URL = "/api"

// --- Função de notificação (toast) ---
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

 
  if (!toast) {
    const newToast = document.createElement("div");
    newToast.id = "toast";
    newToast.className = "toast";
    document.body.appendChild(newToast);
  }

  const t = document.getElementById("toast");
  t.textContent = message;
  t.className = `toast show ${type}`;

  setTimeout(() => {
    t.className = "toast";
  }, 3000);
}


form.addEventListener("submit", async(e) => {
    e.preventDefault()

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password  }),
        });

        const data = await res.json();

        if (res.ok) {
            
            showToast("Usuário Cadastrado com Sucesso!", "success");

            
            setTimeout(() => {
                window.location.href = "/telaLogin/login.html";
            }, 1000);

        } else {
            showToast(data.message || "Erro ao cadastrar Usuário. Verifique suas credenciais.", "error");
        }

    } catch (error) {
        console.error("Erro de conexão:", error);
        alert("Erro de conexão com o servidor.");
    }


})