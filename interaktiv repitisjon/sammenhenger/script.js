document.addEventListener('DOMContentLoaded', function() {
    // --- Eksisterende referanser ---
    const topicNodes = document.querySelectorAll('.topic-node');
    const contentInner = document.getElementById('content-inner');
    const contentTitle = document.getElementById('content-title');
    const contentImage = document.getElementById('content-image');
    const contentDescription = document.getElementById('content-description');
    
    // --- Nye referanser for quiz ---
    const quizContainer = document.getElementById('quiz-container');
    const quizQuestionEl = document.getElementById('quiz-question');
    const quizAnswersEl = document.getElementById('quiz-answers');
    const quizFeedbackEl = document.getElementById('quiz-feedback');

    // Variabler for å holde styr på quiz-tilstanden
    let currentTopicQuiz = [];
    let currentQuestionIndex = 0;

    const topicData = {
        platedrift: {
            title: "Platedrift og Jordens Indre Varme",
            image: "platedrift.jpg",
            description: "Platedrift drives av en enorm mengde <strong>varmeenergi</strong> fra jordas kjerne...",
            quiz: [
                {
                    question: "Hvilken energiform er den primære motoren bak platedrift?",
                    choices: ["Kjemisk energi", "Bevegelsesenergi", "Varmeenergi (konveksjon)", "Solenergi"],
                    correct: 2 // Indeks for riktig svar
                },
                {
                    question: "Ved en midthavsrygg, hvor platene går fra hverandre, hva skjer med energien?",
                    choices: ["Bevegelsesenergi omdannes til varme", "Varmeenergi fra mantelen danner ny jordskorpe", "Kjemisk energi frigjøres som jordskjelv", "Solenergi absorberes"],
                    correct: 1
                }
            ]
        },
        oppvarming: {
            title: "Global Oppvarming og Energibalansen",
            image: "global_oppvarming.jpg",
            description: "Global oppvarming handler om en ubalanse i jordas <strong>energibudsjett</strong>...",
            quiz: [
                {
                    question: "Hva er den direkte årsaken til at den globale temperaturen øker?",
                    choices: ["Atmosfæren slipper inn mer solenergi", "Jorda har en overskudd av energi den ikke blir kvitt", "Ozonlaget blir tykkere", "Månen reflekterer mer energi"],
                    correct: 1
                },
                {
                    question: "Når vi brenner kull for å lage strøm, hvilken energiovergang bidrar til global oppvarming?",
                    choices: ["Bevegelsesenergi til elektrisk energi", "Varmeenergi til kjemisk energi", "Kjemisk energi (i kullet) til varme- og lysenergi", "Kjernekraft til varmeenergi"],
                    correct: 2
                }
            ]
        },
        kroppen: {
            title: "Menneskekroppen: En Energi-maskin",
            image: "kroppen.jpg",
            description: "Kroppen din er helt avhengig av <strong>energi</strong> for å fungere...",
            quiz: [
                {
                    question: "Hvilken energiform er lagret i maten vi spiser?",
                    choices: ["Varmeenergi", "Bevegelsesenergi", "Kjemisk energi", "Elektrisk energi"],
                    correct: 2
                },
                {
                    question: "Hva er hovedenergiovergangen som skjer når du løper?",
                    choices: ["Kjemisk energi → Bevegelses- og varmeenergi", "Varmeenergi → Bevegelsesenergi", "Bevegelsesenergi → Kjemisk energi", "Elektrisk energi → Varmeenergi"],
                    correct: 0
                }
            ]
        },
        varme: {
            title: "Varmeoverføring: Vær og Vinds Motor",
            image: "varmeoverforing.jpg",
            description: "Varme er egentlig bare <strong>energi</strong> i bevegelse fra et varmere sted til et kaldere sted...", // Bruk den nye versjonen av teksten her
            quiz: [
                {
                    question: "Hvordan flyttes mesteparten av solens energi rundt på jorden for å skape vær og vind?",
                    choices: ["Ved ledning gjennom bakken", "Ved stråling direkte mellom skyene", "Ved strømning (konveksjon) i luft og hav", "Ved kjemiske reaksjoner"],
                    correct: 2
                }
            ]
        }
    };
    
    // --- Funksjoner for å håndtere quiz ---

    function startQuiz(topicKey) {
        contentInner.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        currentTopicQuiz = topicData[topicKey].quiz;
        currentQuestionIndex = 0;
        quizFeedbackEl.innerHTML = '';
        showQuestion();
    }

    function showQuestion() {
        // Tøm tidligere svar og feedback
        quizAnswersEl.innerHTML = '';
        quizFeedbackEl.innerHTML = '';

        if (currentQuestionIndex < currentTopicQuiz.length) {
            let question = currentTopicQuiz[currentQuestionIndex];
            quizQuestionEl.textContent = question.question;

            question.choices.forEach((choice, index) => {
                const button = document.createElement('button');
                button.textContent = choice;
                button.classList.add('answer-btn');
                button.addEventListener('click', () => selectAnswer(index));
                quizAnswersEl.appendChild(button);
            });
        } else {
            showFinalResults();
        }
    }

    function selectAnswer(selectedIndex) {
        const question = currentTopicQuiz[currentQuestionIndex];
        const buttons = quizAnswersEl.querySelectorAll('.answer-btn');

        // Deaktiver alle knapper etter svar
        buttons.forEach(btn => btn.disabled = true);

        if (selectedIndex === question.correct) {
            quizFeedbackEl.textContent = "Helt riktig!";
            quizFeedbackEl.className = 'correct';
            buttons[selectedIndex].classList.add('correct');
        } else {
            quizFeedbackEl.textContent = `Feil. Det riktige svaret var: "${question.choices[question.correct]}"`;
            quizFeedbackEl.className = 'incorrect';
            buttons[selectedIndex].classList.add('incorrect');
            buttons[question.correct].classList.add('correct'); // Vis også det riktige svaret
        }

        // Gå til neste spørsmål etter en kort pause
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 2500); // 2.5 sekunders pause for å lese feedback
    }

    function showFinalResults() {
        quizQuestionEl.textContent = "Quiz fullført!";
        quizAnswersEl.innerHTML = '';
        quizFeedbackEl.innerHTML = '';

        const backButton = document.createElement('button');
        backButton.textContent = 'Tilbake til oversikten';
        backButton.className = 'btn';
        backButton.addEventListener('click', () => {
            quizContainer.classList.add('hidden');
            contentInner.classList.remove('hidden');
            // Fjern den aktive klassen fra noden for å vise at man er "ferdig"
            topicNodes.forEach(n => n.classList.remove('active'));
        });
        quizAnswersEl.appendChild(backButton);
    }
    
    // --- Oppdatert event listener for temavalg ---

    topicNodes.forEach(node => {
        node.addEventListener('click', () => {
            const topicKey = node.dataset.topic;
            const data = topicData[topicKey];

            topicNodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            // Skjul quiz og vis innhold
            quizContainer.classList.add('hidden');
            contentInner.classList.remove('hidden');
            contentInner.classList.remove('visible');

            setTimeout(() => {
                // Tøm eventuelle gamle quiz-knapper
                const oldBtn = contentInner.querySelector('.quiz-start-btn');
                if (oldBtn) oldBtn.remove();
                
                contentTitle.textContent = data.title;
                contentDescription.innerHTML = data.description;
                if (data.image) {
                    contentImage.src = data.image;
                    contentImage.style.display = 'block';
                } else {
                    contentImage.style.display = 'none';
                }

                // Legg til ny quiz-knapp
                const quizButton = document.createElement('button');
                quizButton.textContent = 'Test din kunnskap!';
                quizButton.className = 'btn quiz-start-btn';
                quizButton.addEventListener('click', () => startQuiz(topicKey));
                contentInner.appendChild(quizButton);
                
                contentInner.classList.add('visible');
            }, 250);
        });
    });

    contentInner.classList.add('visible');
});
