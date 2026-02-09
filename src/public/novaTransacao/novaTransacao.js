// const API_URL = "http://localhost:5000/api"
const API_URL = "/api"
const token = localStorage.getItem("token")

const form = document.getElementById("formTransaction")
const categorySelect = document.getElementById("categorySelect")

document.getElementById("btnBack").addEventListener("click", () => {
  window.location.href = "/telaInicial/telaInicial.html"
})


// --- Função de notificação (toast) ---
function showToast(message, type = "success") {
  const toast = document.getElementById("toast")

  if (!toast) {
    const newToast = document.createElement("div")
    newToast.id = "toast"
    newToast.className = "toast"
    document.body.appendChild(newToast)
  }

  const t = document.getElementById("toast")
  t.textContent = message
  t.className = `toast show ${type}`

  setTimeout(() => {
    t.className = "toast"
  }, 3000)
}


// Carregar categorias do user
async function loadCategories() {
  try {
    const res = await fetch(`${API_URL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const categories = await res.json()

    categorySelect.innerHTML = ""

    if (!categories.length) {
      const opt = document.createElement("option")
      opt.textContent = "Nenhuma categoria encontrada"
      opt.disabled = true
      categorySelect.appendChild(opt)
      return
    }

    categories.forEach(cat => {
      const option = document.createElement("option")
      option.value = cat.id
      option.textContent = cat.name
      categorySelect.appendChild(option)
    })

  } catch {
    showToast("Erro ao carregar categorias", "error")
  }
}

loadCategories()


// Enviar transação
form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const categoryId = Number(categorySelect.value)
  const type = document.getElementById("typeSelect").value
  const amount = Number(document.getElementById("amount").value)
  const description = document.getElementById("description").value

  try {
    const res = await fetch(`${API_URL}/create/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ categoryId, type, amount, description })
    })

    const data = await res.json()

    if (res.ok) {
      showToast("Transação criada com sucesso!", "success")

      setTimeout(() => {
        window.location.href = "/telaInicial/telaInicial.html"
      }, 900)

    } else {
      showToast(data.message || "Erro ao salvar", "error")
    }

  } catch {
    showToast("Erro de conexão com servidor", "error")
  }
})
