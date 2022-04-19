document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const promptResult = prompt("Add new title", event.target.closest("li").firstElementChild.textContent);
    if (promptResult) {
      const id = event.target.dataset.id;
      update({ id, title: promptResult }).then(() => {
        event.target.closest("li").firstElementChild.textContent = promptResult;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function update(newNote) {
  await fetch(`/${newNote.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });
}
