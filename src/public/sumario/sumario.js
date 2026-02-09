const token = localStorage.getItem("token")
const API_URL = "http://localhost:5000/api"


// function showConfirmToast(message, onConfirm) {
//   const toast = document.getElementById("confirmToast")

//   toast.innerHTML = `
//     <strong>${message}</strong>
//     <div class="actions">
//       <button class="btnCancel">Cancelar</button>
//       <button class="btnConfirm">Excluir</button>
//     </div>
//   `

//   toast.classList.add("show")

//   toast.querySelector(".btnCancel").onclick = () => {
//     toast.classList.remove("show")
//   }

//   toast.querySelector(".btnConfirm").onclick = () => {
//     toast.classList.remove("show")
//     onConfirm()
//   }
// }



// async function loadSummaries() {
//   try {
//     console.log("carregando loadSummarues")
//     const response = await fetch(`${API_URL}/summary`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })

//     const summaries = await response.json()
//     renderSummaries(summaries)

//   } catch {
//     showConfirmToast("Erro ao carregar histórico", "error")
//   }
// }

// function renderSummaries(data) {
//   const container = document.getElementById("summary-list")
//   container.innerHTML = ""

//   if (!data.length) {
//     container.innerHTML = "<p>Nenhum histórico encontrado</p>"
//     return
//   }

//   data.forEach(summary => {
//     const div = document.createElement("div")

//     div.innerHTML = `
//       <div class="summary-card">
//         <h4>${summary.month}/${summary.year}</h4>
//         <p>Receita: R$ ${Number(summary.totalReceita).toFixed(2)}</p>
//         <p>Despesa: R$ ${Number(summary.totalDespesa).toFixed(2)}</p>
//         <p>Saldo Final: R$ ${Number(summary.totalBalance).toFixed(2)}</p>
//       </div>
//     `

//     container.appendChild(div)
//   })
// }

// loadSummaries()


function showConfirmToast(message, onConfirm) {
  const toast = document.getElementById("confirmToast")

  toast.innerHTML = `
    <div class="confirm-overlay">
      <div class="confirm-box">
        <strong>${message}</strong>

        <div class="actions">
          <button class="btnCancel">Cancelar</button>
          <button class="btnConfirm">Excluir</button>
        </div>
      </div>
    </div>
  `

  toast.classList.add("show")

  toast.querySelector(".btnCancel").onclick = () => {
    toast.classList.remove("show")
  }

  toast.querySelector(".btnConfirm").onclick = async () => {
    toast.classList.remove("show")
    await onConfirm()
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





function goBack() {
  window.location.href = "/telaInicial/telaInicial.html"
}

async function loadSummaries() {
  try {
    const response = await fetch(`${API_URL}/summary`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const summaries = await response.json()
    renderSummaries(summaries)

  } catch {
    alert("Erro ao carregar histórico")
  }
}

function renderSummaries(data) {
  const container = document.getElementById("summary-list")
  container.innerHTML = ""

  if (!data.length) {
    container.innerHTML = "<p>Nenhum histórico encontrado</p>"
    return
  }

  data.forEach(summary => {
    const card = document.createElement("div")
    card.className = "summary-card"

    card.innerHTML = `
      <div class="summary-main">
        <span>${summary.month}/${summary.year}</span>
        <span>Saldo Final: R$ ${Number(summary.totalBalance).toFixed(2)}</span>
      </div>

      <div class="summary-details">
        <p>💰 Receita: R$ ${Number(summary.totalReceita).toFixed(2)}</p>
        <p>💸 Despesa: R$ ${Number(summary.totalDespesa).toFixed(2)}</p>
        <p>📅 Criado em: ${new Date(summary.created_At).toLocaleDateString()}</p>
      </div>
      <div class="actions">
          <button onclick="deleteSummary(${summary.id})" id="btnDeleteSummary">Excluir</button>
      </div>

    `

    card.addEventListener("click", () => {
      const details = card.querySelector(".summary-details")
      details.style.display = details.style.display === "block" ? "none" : "block"
    })

    container.appendChild(card)
  })
}

loadSummaries()


async function deleteSummary(id) {
  showConfirmToast("Deseja realmente excluir este Histórico?", async () => {
    
    const token = localStorage.getItem("token")

    try {
      const res = await fetch(`${API_URL}/delete/summary/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.ok) {
        showToast("Registro excluído com sucesso!", "success")
        loadSummaries()
      } else {
        const data = await res.json()
        showToast(data.message || "Erro ao excluir registro", "error")
      }

    } catch {
      showToast("Erro ao conectar com o servidor", "error")
    }
  })
}












