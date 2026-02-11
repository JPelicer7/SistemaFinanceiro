const form = document.getElementById("loginForm");

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

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            showToast("Login realizado com sucesso!", "success");

            
            setTimeout(() => {
                window.location.href = "/telaInicial/telaInicial.html";
            }, 1000);

        } else {
            showToast(data.message || "Erro ao fazer login. Verifique suas credenciais.", "error");
        }

    } catch (error) {
        console.error("Erro de conexão:", error);
        alert("Erro de conexão com o servidor.");
    }
})
