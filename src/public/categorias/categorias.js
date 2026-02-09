const form = document.getElementById("formCategoria");
const token = localStorage.getItem("token")

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

    try {

        const res = await fetch("http://localhost:5000/api/create/category", {
            method: "POST",
            headers: { "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
             },
            body: JSON.stringify({name}),
        });

        const data = await res.json();

        if (res.ok) {
            
            showToast("Categoria Cadastrada com Sucesso!", "success");

            
            setTimeout(() => {
                window.location.href = "/telaInicial/telaInicial.html";
            }, 1000);

        } else {
            showToast(data.message || "Erro ao cadastrar Categoria.", "error");
        }

    } catch (error) {
        console.error("Erro de conexão:", error);
        alert("Erro de conexão com o servidor.");
    }
})


function goBack() {
  window.location.href = "/telaInicial/telaInicial.html"
}