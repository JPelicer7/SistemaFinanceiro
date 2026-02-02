const API_URL = "http://localhost:5000/api"
console.log("JS carregado com sucesso")

const token = localStorage.getItem("token")
console.log("TOKEN:", token)


async function loadDashboard() {
  console.log("loadDashboard foi chamada")
  try {
    console.log("loadDashboard foi chamada")
    const response = await fetch(`${API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log("STATUS:", response.status)

    const data = await response.json()

    console.log("RETORNO API:", data)

    renderTransactions(data)
    calculateBalance(data)

  } catch (error) {
    console.error("Erro ao carregar transações:", error)
  }
}

function calculateBalance(transactions) {
  let balance = 0

  transactions.forEach(t => {
    if (t.type === "Receita") {
      balance += Number(t.amount)
    } else {
      balance -= Number(t.amount)
    }
  })

  document.getElementById("balance").innerText =
    `Saldo: R$ ${balance.toFixed(2)}`
}

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

console.log("JS chegou ao fim do arquivo")

document.getElementById("btnAddTransaction")
  .addEventListener("click", () => {
    window.location.href = "/novaTransacao/novaTransacao.html"
  })

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM pronto — chamando loadDashboard")
  loadDashboard()
})