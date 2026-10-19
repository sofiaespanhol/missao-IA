const questions = [
    {
      question: "1. A IA pode ajudar nos estudos. Qual é a melhor escolha?",
      options: [
        "Copiar tudo o que a IA responder.",
        "Usar a IA para aprender e verificar as informações.",
        "Deixar a IA fazer todas as atividades."
      ],
      correct: 1,
      feedback: "A IA pode ajudar no aprendizado, mas é importante pensar e conferir as respostas."
    },
    {
      question: "2. Uma IA apresenta informações pessoais de alguém. O que fazer?",
      options: [
        "Compartilhar as informações com todos.",
        "Publicar nas redes sociais.",
        "Proteger a privacidade e não divulgar os dados."
      ],
      correct: 2,
      feedback: "Respeitar a privacidade é essencial ao utilizar tecnologias inteligentes."
    },
    {
      question: "3. Você percebe que uma IA deu uma resposta preconceituosa. E agora?",
      options: [
        "Questionar a resposta e buscar informações confiáveis.",
        "Aceitar tudo sem questionar.",
        "Repetir a resposta para outras pessoas."
      ],
      correct: 0,
      feedback: "A IA pode reproduzir preconceitos. Avaliar criticamente as respostas é fundamental."
    },
    {
      question: "4. Uma imagem criada por IA parece ser uma notícia real. O que você faz?",
      options: [
        "Compartilha imediatamente.",
        "Verifica a fonte antes de acreditar ou compartilhar.",
        "Acredita porque a imagem parece verdadeira."
      ],
      correct: 1,
      feedback: "Verificar fontes ajuda a combater a desinformação e os conteúdos falsos."
    },
    {
      question: "5. Como podemos construir um futuro melhor com a IA?",
      options: [
        "Usando a tecnologia sem pensar nas consequências.",
        "Deixando todas as decisões para as máquinas.",
        "Usando a IA com responsabilidade, ética e participação humana."
      ],
      correct: 2,
      feedback: "O melhor futuro combina inovação, responsabilidade e decisões humanas conscientes."
    }
  ];
  
  let currentQuestion = 0;
  let selectedAnswer = null;
  let score = 0;
  let answered = false;
  
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const feedbackElement = document.getElementById("feedback");
  const nextButton = document.getElementById("next");
  const progressElement = document.getElementById("progress");
  const stepElement = document.getElementById("step");
  const percentElement = document.getElementById("percent");
  
  function renderQuestion() {
    const item = questions[currentQuestion];
  
    selectedAnswer = null;
    answered = false;
  
    questionElement.textContent = item.question;
    optionsElement.innerHTML = "";
    feedbackElement.textContent = "";
  
    stepElement.textContent =
      `Questão ${currentQuestion + 1} de ${questions.length}`;
  
    const percentage = Math.round(
      ((currentQuestion + 1) / questions.length) * 100
    );
  
    percentElement.textContent = percentage + "%";
    progressElement.style.width = percentage + "%";
  
    item.options.forEach((option, index) => {
      const button = document.createElement("button");
  
      button.className = "option";
      button.textContent = option;
  
      button.addEventListener("click", () => {
        if (answered) return;
  
        selectedAnswer = index;
  
        document.querySelectorAll(".option").forEach((element) => {
          element.classList.remove("selected");
        });
  
        button.classList.add("selected");
        nextButton.disabled = false;
      });
  
      optionsElement.appendChild(button);
    });
  
    nextButton.disabled = true;
    nextButton.textContent = "Confirmar resposta";
  }
  
  nextButton.addEventListener("click", () => {
    if (selectedAnswer === null) return;
  
    if (!answered) {
      answered = true;
  
      const item = questions[currentQuestion];
  
      if (selectedAnswer === item.correct) {
        score++;
        feedbackElement.textContent = "Correto! " + item.feedback;
      } else {
        feedbackElement.textContent = item.feedback;
      }
  
      document.querySelectorAll(".option").forEach((button, index) => {
        button.disabled = true;
  
        if (index === item.correct) {
          button.classList.add("selected");
        }
      });
  
      nextButton.textContent =
        currentQuestion === questions.length - 1
          ? "Ver resultado"
          : "Próxima pergunta";
  
      return;
    }
  
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      showResult();
    }
  });
  
  function showResult() {
    document.getElementById("intro").style.display = "none";
  
    document.getElementById("quiz").innerHTML = `
      <div class="result">
        <h2>Missão concluída!</h2>
  
        <p>
          Você participou da construção de um futuro mais consciente
          para a inteligência artificial.
        </p>
  
        <div class="score">${score}/${questions.length}</div>
  
        <p>${getMessage()}</p>
  
        <button class="main-button" id="restart">
          Jogar novamente
        </button>
      </div>
    `;
  
    stepElement.textContent = "Missão finalizada";
    percentElement.textContent = "100%";
    progressElement.style.width = "100%";
  
    document.getElementById("restart").addEventListener("click", () => {
      currentQuestion = 0;
      score = 0;
      renderInitialScreen();
    });
  }
  
  function getMessage() {
    if (score === 5) {
      return "Excelente! Você demonstrou muita consciência sobre o uso responsável da IA.";
    }
  
    if (score >= 3) {
      return "Bom trabalho! Continue aprendendo e questionando como a IA funciona.";
    }
  
    return "Toda missão é uma oportunidade de aprender. Tente novamente e descubra novas possibilidades.";
  }
  
  function renderInitialScreen() {
    document.getElementById("intro").style.display = "block";
  
    document.getElementById("quiz").innerHTML = `
      <h2 class="question" id="question"></h2>
      <div class="options" id="options"></div>
      <p class="feedback" id="feedback" aria-live="polite"></p>
      <button class="main-button" id="next" disabled>
        Confirmar resposta
      </button>
    `;
  
    // Atualiza as referências aos elementos recriados.
    location.reload();
  }
  
  renderQuestion();