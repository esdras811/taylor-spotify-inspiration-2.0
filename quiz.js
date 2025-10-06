// ===============================================
// 1. DADOS DO QUIZ: PERGUNTAS E ERAS
// ===============================================

// Mapeamento das pontuações: cada chave (country, pop, dark, etc.)
// corresponde a uma característica forte de um grupo de Eras.
const ERAS_SCORE_MAP = {
    // Grupo Country/Romântico/Narrativo
    'country': { name: "Taylor Swift (Debut)", color: "#6F934C", description: "Sua alma é country e nostálgica. Você valoriza a inocência, a honestidade e os contos de fadas, escrevendo canções sobre sua vida com um violão na mão." },
    'fearless': { name: "Fearless", color: "#E1B846", description: "Você é um espírito otimista e sonhador, que abraça a magia do amor jovem e a coragem de ser vulnerável. Sua vida é um conto de fadas dourado." },
    'speaknow': { name: "Speak Now", color: "#80629A", description: "Você é expressivo e poético. Seu forte desejo de falar a verdade e sua imaginação levam a narrativas grandiosas e dramáticas." },
    
    // Grupo Pop/Eletrônico/Glamour
    'red': { name: "Red", color: "#A51F2A", description: "Sua vida é uma turbulência emocional intensa. Você é apaixonado e corajoso, mas também lida com o caos e a transição, muitas vezes em grande estilo." },
    'pop': { name: "1989", color: "#55B3DA", description: "Você é a rainha do pop moderno. Sua energia é eletrizante, você adora sintetizadores, o glamour de Nova York e está sempre pronta para se reinventar." },
    'dark': { name: "Reputation", color: "#2D2A2B", description: "Você ressurge das cinzas. Sua estética é sombria e dramática, mas por baixo da fachada, você encontrou um amor profundo e secreto." },
    
    // Grupo Soft/Alternativo/Lírico
    'lover': { name: "Lover", color: "#F28DA0", description: "Você é otimista, vulnerável e celebra o amor em todas as suas cores. Sua vida é uma explosão de cores pastel, brilho e felicidade." },
    'folk': { name: "folklore", color: "#A5A5A1", description: "Sua alma é lírica e introspectiva. Você prefere a solidão, os contos complexos e a beleza das canções sussurradas em uma cabana no meio da floresta." },
    'evermore': { name: "evermore", color: "#A88B6E", description: "Você aprofundou sua introspecção. É a era do outono, do mistério e de narrativas adultas, maduras e poéticas." },
    
    // Grupo Final/Confessional/Show
    'midnights': { name: "Midnights", color: "#1A2036", description: "Você tem um lado confessional e noturno. Suas canções são reflexões profundas sobre as 13 noites mais intensas da sua vida, com um retorno glamouroso ao pop." },
    'ttpd': { name: "The Tortured Poets Department", color: "#EBE3DA", description: "Você está na era da catarse e da poesia crua. Usando a dor como arte, você é um intelectual que transforma angústia em versos poderosos." },
    'showgirl': { name: "The Life of a Showgirl", color: "#FF5D33", description: "Sua vida é um espetáculo. Você é a artista, a performer, que lida com o drama e o glamour caótico dos bastidores da fama." }
};

const questions = [
    {
        question: "Qual paleta de cores te atrai mais?",
        answers: [
            { text: "Verde e Marrom, a cor de um campo ou da natureza.", score: 'country' },
            { text: "Azul Bebê e Rosa Pastel.", score: 'lover' },
            { text: "Branco, Preto e Sépia (cores de uma máquina de escrever antiga).", score: 'ttpd' },
            { text: "Preto, Dourado e Cinza Escuro.", score: 'dark' }
        ]
    },
    {
        question: "Qual gênero musical te define melhor?",
        answers: [
            { text: "Indie Folk / Alternativo, com foco na letra.", score: 'folk' },
            { text: "Pop Eletrônico, com sintetizadores e batidas fortes.", score: 'pop' },
            { text: "Country, com violão e melodias tradicionais.", score: 'fearless' },
            { text: "Pop Dramático, com vocais fortes e muito ritmo.", score: 'showgirl' }
        ]
    },
    {
        question: "Como você lida com um coração partido?",
        answers: [
            { text: "Escrevo poemas longos e complexos para processar a dor.", score: 'ttpd' },
            { text: "Transformo a dor em canções explosivas de raiva e estilo.", score: 'red' },
            { text: "Busco consolo na nostalgia, lembrando das histórias de amor inocentes.", score: 'speaknow' },
            { text: "Fico acordado a noite toda, refletindo sobre os erros e confissões.", score: 'midnights' }
        ]
    },
    {
        question: "Qual acessório representa seu humor?",
        answers: [
            { text: "Um cachecol vermelho vibrante.", score: 'red' },
            { text: "Uma jaqueta de couro preta e um colar de cobra.", score: 'dark' },
            { text: "Um vestido de baile (ou de noiva) romântico e lilás.", score: 'speaknow' },
            { text: "Um suéter de lã bege e um copo de vinho.", score: 'evermore' }
        ]
    },
    {
        question: "Onde você prefere passar a noite de sexta-feira?",
        answers: [
            { text: "Em um estádio lotado, sendo o centro das atenções.", score: 'showgirl' },
            { text: "Em uma cabana isolada, lendo e escrevendo.", score: 'folk' },
            { text: "Em uma festa glamourosa em Nova York.", score: 'pop' },
            { text: "Em casa, com a pessoa que você ama, longe dos holofotes.", score: 'lover' }
        ]
    }
];

// Variável para armazenar a pontuação de cada Era
let scores = {};
let currentQuestionIndex = 0;

// ===============================================
// 2. FUNÇÕES DO QUIZ
// ===============================================

const questionText = document.getElementById('question-text');
const answerButtonsDiv = document.getElementById('answer-buttons');
const startButton = document.getElementById('start-button');
const resultScreen = document.getElementById('result-screen');
const questionCard = document.getElementById('question-card');
const resultEra = document.getElementById('result-era');
const resultDescription = document.getElementById('result-description');
const restartButton = document.getElementById('restart-button');
const headerElement = document.querySelector('.spotify-header');

/**
 * Inicializa a pontuação de todas as eras em zero.
 */
function initializeScores() {
    scores = {};
    for (const key in ERAS_SCORE_MAP) {
        scores[key] = 0;
    }
}

/**
 * Mostra a pergunta atual na tela.
 */
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Limpa botões antigos
    answerButtonsDiv.innerHTML = ''; 
    questionText.textContent = currentQuestion.question;

    // Cria os botões para cada resposta
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-button');
        // Adiciona um listener que chama selectAnswer com a pontuação
        button.addEventListener('click', () => selectAnswer(answer.score));
        answerButtonsDiv.appendChild(button);
    });
}

/**
 * Processa a resposta selecionada.
 * @param {string} scoreKey - A chave da Era para pontuar (ex: 'pop', 'dark').
 */
function selectAnswer(scoreKey) {
    scores[scoreKey]++;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

/**
 * Determina e exibe a Era com a maior pontuação.
 */
function showResult() {
    let maxScore = -1;
    let finalEraKey = '';

    // Encontra a Era com a maior pontuação
    for (const key in scores) {
        if (scores[key] > maxScore) {
            maxScore = scores[key];
            finalEraKey = key;
        }
    }

    const finalEra = ERAS_SCORE_MAP[finalEraKey];

    // Oculta o card da pergunta e mostra a tela de resultado
    questionCard.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    // Exibe o resultado e a descrição
    resultEra.textContent = finalEra.name;
    resultDescription.textContent = finalEra.description;
    
    // Define a cor da Era no título e no cabeçalho
    resultEra.style.color = finalEra.color;
    headerElement.style.background = `linear-gradient(to bottom, ${finalEra.color}, #121212)`;
    headerElement.classList.add('dynamic-color');
}

/**
 * Inicia o Quiz.
 */
function startQuiz() {
    initializeScores();
    currentQuestionIndex = 0;
    
    // Oculta o botão de iniciar e mostra o card da pergunta
    startButton.classList.add('hidden');
    questionCard.classList.remove('hidden');
    
    // Esconde a tela de resultado, se estiver visível
    resultScreen.classList.add('hidden');
    
    // Reseta o estilo do cabeçalho
    headerElement.style.background = '';
    headerElement.classList.remove('dynamic-color');

    displayQuestion();
}

/**
 * Reinicia o Quiz.
 */
function restartQuiz() {
    resultScreen.classList.add('hidden');
    startButton.classList.remove('hidden');
    questionCard.classList.add('hidden');
    // Reseta o texto inicial (por segurança)
    questionText.textContent = "Clique em Iniciar para começar o quiz!"; 
    // Reseta o cabeçalho para o estado inicial
    headerElement.style.background = '';
    headerElement.classList.remove('dynamic-color');
    
    // Limpa os botões
    answerButtonsDiv.innerHTML = ''; 
}

// =AFIM DE ESTENDER O QUIZ, ADICIONE MAIS PERGUNTAS NO ARRAY 'questions' ACIMA!

// ===============================================
// 3. EVENT LISTENERS
// ===============================================

// Listener para o botão Iniciar
startButton.addEventListener('click', startQuiz);

// Listener para o botão Fazer Novamente
restartButton.addEventListener('click', restartQuiz);

// Oculta o card de pergunta no carregamento inicial
questionCard.classList.add('hidden');