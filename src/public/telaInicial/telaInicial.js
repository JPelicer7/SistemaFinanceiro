//const API_URL = "http://localhost:5000/api"
const API_URL = "/api"
const token = localStorage.getItem("token")


function showConfirmToast(message, onConfirm) {
  const toast = document.getElementById("confirmToast")

  toast.innerHTML = `
    <strong>${message}</strong>
    <div class="actions">
      <button class="btnCancel">Cancelar</button>
      <button class="btnConfirm">Excluir</button>
    </div>
  `

  toast.classList.add("show")

  toast.querySelector(".btnCancel").onclick = () => {
    toast.classList.remove("show")
  }

  toast.querySelector(".btnConfirm").onclick = () => {
    toast.classList.remove("show")
    onConfirm()
  }
}

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


async function loadDashboard() {
  try {
    const [transactionsResponse, walletResponse] = await Promise.all([
      fetch(`${API_URL}/transactions`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
      fetch(`${API_URL}/wallet`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    ])

    const transactions = await transactionsResponse.json()
    const wallet = await walletResponse.json()

    renderTransactions(transactions)
    renderBalance(wallet.balance)

  } catch (error) {
    console.error("Erro ao carregar dashboard:", error)
  }
}






// async function loadDashboard() {
  
//   try {
    
//     const response = await fetch(`${API_URL}/transactions`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })

//     const data = await response.json()

//     renderTransactions(data)
//     calculateBalance(data)

//   } catch (error) {
//     console.error("Erro ao carregar transações:", error)
//   }
// }

// function calculateBalance(transactions) {
//   let balance = 0

//   transactions.forEach(t => {
//     if (t.type === "Receita") {
//       balance += Number(t.amount)
//     } else {
//       balance -= Number(t.amount)
//     }
//   })

//   document.getElementById("balance").innerText =
//     `Saldo: R$ ${balance.toFixed(2)}`
// }

function renderTransactions(transactions) {
  const list = document.getElementById("transactions-list")
  list.innerHTML = ""

  transactions.forEach(t => {
    const li = document.createElement("li")

    const isIncome = t.type === "Receita"
    const sign = isIncome ? "+" : "-"
    const color = isIncome ? "green" : "red"

    li.innerHTML = `
      <div class="transaction">
        <div>
          <strong>${t.description}</strong><br>
          <small>${t.type}</small>
        </div>

        <div style="color:${color}">
          ${sign} R$ ${Number(t.amount).toFixed(2)}
        </div>

        <div class="actions">
          <button onclick="editTransaction(${t.id})">Editar</button>
          <button onclick="deleteTransaction(${t.id})">Excluir</button>
        </div>
      </div>
    `

    list.appendChild(li)
  })
}

function renderBalance(balance) {
  document.getElementById("balance").innerText =
    `Saldo: R$ ${Number(balance).toFixed(2)}`
}



document.getElementById("btnAddTransaction")
  .addEventListener("click", () => {
    window.location.href = "/novaTransacao/novaTransacao.html"
  })

document.getElementById("btnAddCategory")
  .addEventListener("click", () => {
    window.location.href = "/categorias/categorias.html"
  })

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM pronto — chamando loadDashboard")
  loadDashboard()
})


function goToSummaryHistory() {
  window.location.href = "/sumario/sumario.html"
}


async function deleteTransaction(id) {
  showConfirmToast("Deseja realmente excluir esta transação?", async () => {
    
    const token = localStorage.getItem("token")

    try {
      const res = await fetch(`${API_URL}/transaction/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.ok) {
        showToast("Transação excluída com sucesso!", "success")
        loadDashboard()
      } else {
        const data = await res.json()
        showToast(data.message || "Erro ao excluir transação", "error")
      }

    } catch {
      showToast("Erro ao conectar com o servidor", "error")
    }
  })
}


async function editTransaction(id) {
  const token = localStorage.getItem("token")

  try {
    const res = await fetch(`${API_URL}/transaction/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      showConfirmToast("Erro ao carregar transação", "error")
      return
    }

    const t = await res.json()

    document.getElementById("edit-transaction-id").value = t.id
    document.getElementById("edit-description").value = t.description
    document.getElementById("edit-amount").value = t.amount
    document.getElementById("edit-type").value = t.type

    await loadCategories("edit-category", t.categoryId)

    // Abre modal
    document.getElementById("editModal").classList.remove("hidden")

  } catch {
    showConfirmToast("Erro ao buscar dados da transação", "error")
  }
}

async function loadCategories(selectId, selectedId = null) {
  const token = localStorage.getItem("token")

  try {
    const res = await fetch(`${API_URL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const categories = await res.json()
    const select = document.getElementById(selectId)

    select.innerHTML = ""

    categories.forEach(cat => {
      const option = document.createElement("option")
      option.value = cat.id
      option.textContent = cat.name

      if (selectedId && cat.id === selectedId) {
        option.selected = true
      }

      select.appendChild(option)
    })

  } catch {
    showConfirmToast("Erro ao carregar categorias", "error")
  }
}



document.getElementById("btnSaveEdit").addEventListener("click", async () => {
  const id = document.getElementById("edit-transaction-id").value
  const description = document.getElementById("edit-description").value
  const amount = Number(document.getElementById("edit-amount").value)
  const type = document.getElementById("edit-type").value
  const categoryId = Number(document.getElementById("edit-category").value)

  const token = localStorage.getItem("token")

  try {
    const res = await fetch(`${API_URL}/transaction/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        description,
        amount,
        type,
        categoryId
      })
    })

    if (res.ok) {
      showToast("Transação atualizada!", "success")
      document.getElementById("editModal").classList.add("hidden")
      loadDashboard()
    } else {
      const data = await res.json()
      showToast(data.message || "Erro ao atualizar", "error")
    }

  } catch {
    showConfirmToast("Erro ao conectar com servidor", "error")
  }
})


document.getElementById("btnCancelEdit").addEventListener("click", () => {
  document.getElementById("editModal").classList.add("hidden")
})



document.getElementById("btnGenerateSummary")
  .addEventListener("click", generateMonthlySummary)

async function generateMonthlySummary() {
  const token = localStorage.getItem("token")

  try {
    const res = await fetch(`${API_URL}/create/summary`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()

    if (!res.ok) {
      return showConfirmToast(data.message || "Erro ao gerar histórico", "error")
    }

    showToast("📊 Histórico mensal gerado com sucesso!", "success")

    // Atualiza saldo e transações após gerar histórico
    loadDashboard()

    // Opcional: redirecionar para histórico
    setTimeout(() => {
      window.location.href = "/sumario/sumario.html"
    }, 1200)

  } catch {
    showConfirmToast("Erro ao conectar com o servidor", "error")
  }
}
