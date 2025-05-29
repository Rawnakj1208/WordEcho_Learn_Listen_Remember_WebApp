const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");
const cardListContainer = document.querySelector(".card-list-container");

const vocabInput = document.getElementById("vocab");
const banglaInput = document.getElementById("bangla");
const definitionInput = document.getElementById("definition");
const synonymsInput = document.getElementById("synonyms");
const antonymsInput = document.getElementById("antonyms");

let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
let editMode = false;
let editIndex = null;

// Save to localStorage
function saveToLocalStorage() {
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

// Render cards
function renderCards() {
  cardListContainer.innerHTML = "";

  flashcards.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <p class="question-div"><strong>Vocabulary:</strong> ${card.vocab}</p>
      <p class="answer-div hide"><strong>Bangla:</strong> ${card.bangla}</p>
      <p class="answer-div hide"><strong>Definition:</strong> ${card.definition}</p>
      <p class="answer-div hide"><strong>Synonyms:</strong> ${card.synonyms}</p>
      <p class="answer-div hide"><strong>Antonyms:</strong> ${card.antonyms}</p>
    `;

    // Show/Hide button
    const toggleBtn = document.createElement("a");
    toggleBtn.href = "#";
    toggleBtn.className = "show-hide-btn";
    toggleBtn.textContent = "Show/Hide";
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const answers = div.querySelectorAll(".answer-div");
      answers.forEach(ans => ans.classList.toggle("hide"));
    });
    div.appendChild(toggleBtn);

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.onclick = () => {
      vocabInput.value = card.vocab;
      banglaInput.value = card.bangla;
      definitionInput.value = card.definition;
      synonymsInput.value = card.synonyms;
      antonymsInput.value = card.antonyms;
      addQuestionCard.classList.remove("hide");
      container.classList.add("hide");
      editMode = true;
      editIndex = index;
    };

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteBtn.onclick = () => {
      flashcards.splice(index, 1);
      saveToLocalStorage();
      renderCards();
    };

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "buttons-con";
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
    div.appendChild(buttonContainer);

    cardListContainer.appendChild(div);
  });
}

// Open form
addQuestion.onclick = () => {
  container.classList.add("hide");
  addQuestionCard.classList.remove("hide");
  vocabInput.value = "";
  banglaInput.value = "";
  definitionInput.value = "";
  synonymsInput.value = "";
  antonymsInput.value = "";
  editMode = false;
};

// Close form
closeBtn.onclick = () => {
  container.classList.remove("hide");
  addQuestionCard.classList.add("hide");
  editMode = false;
  editIndex = null;
};

// Save flashcard
cardButton.onclick = () => {
  const vocab = vocabInput.value.trim();
  const bangla = banglaInput.value.trim();
  const definition = definitionInput.value.trim();
  const synonyms = synonymsInput.value.trim();
  const antonyms = antonymsInput.value.trim();

  if (!vocab || !bangla) {
    errorMessage.classList.remove("hide");
    return;
  }

  errorMessage.classList.add("hide");

  const newCard = { vocab, bangla, definition, synonyms, antonyms };

  if (editMode) {
    flashcards[editIndex] = newCard;
  } else {
    flashcards.push(newCard);
  }

  saveToLocalStorage();
  renderCards();
  container.classList.remove("hide");
  addQuestionCard.classList.add("hide");
  editMode = false;
  editIndex = null;
};

// Load on page open
renderCards();
