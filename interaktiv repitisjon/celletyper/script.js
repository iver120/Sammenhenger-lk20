document.addEventListener('DOMContentLoaded', () => {
    const cellButtons = document.querySelectorAll('.cell-type-button');
    const cellNameTitle = document.getElementById('cell-name-title');
    const cellImage = document.getElementById('cell-image');
    const cellDescription = document.getElementById('cell-description');
    const cellCharacteristicsList = document.getElementById('cell-characteristics');

    const cellData = {
        bakterie: {
            name: "Bakteriecelle (Prokaryot)",
            image: "bakteriecelle_umerket.png", // Ligger i samme mappe (celletyper/)
            description: "En enkel encellet organisme uten en ekte cellekjerne eller andre membranomsluttede organeller. Bakterier er prokaryoter.",
            characteristics: [
                "Har cellevegg (ofte med peptidoglykan).",
                "DNA (kromosomet) er vanligvis sirkulært og ligger i et område kalt nukleoiden, ikke i en kjerne.",
                "Har ribosomer for proteinsyntese.",
                "Kan ha flageller for bevegelse og pili for feste eller overføring av genetisk materiale.",
                "Mangler organeller som mitokondrier, kloroplaster, endoplasmatisk retikulum og Golgi-apparat."
            ],
            quizQuestions: [
                { question: "Hvilken struktur gir bakteriecellen dens form og beskyttelse?", answer: "Cellevegg" },
                { question: "Hvor finner man arvestoffet (DNA) i en bakteriecelle?", answer: "Nukleoiden" },
                { question: "Hva heter de små strukturene som lager proteiner i bakteriecellen?", answer: "Ribosomer" }
            ]
        },
        plante: {
            name: "Plantecelle (Eukaryot)",
            image: "plantecelle_umerket.png", // Ligger i samme mappe (celletyper/)
            description: "En type eukaryot celle som utgjør plantevev. Den har flere unike strukturer sammenlignet med dyreceller.",
            characteristics: [
                "Har en stiv cellevegg utenpå cellemembranen, vanligvis laget av cellulose.",
                "Inneholder kloroplaster, organeller hvor fotosyntesen skjer.",
                "Har ofte en stor, sentral vakuole som lagrer vann, næringsstoffer og avfallsstoffer, og bidrar til cellens stivhet.",
                "Har en ekte cellekjerne som inneholder DNA.",
                "Inneholder andre organeller som mitokondrier, ER, Golgi-apparat og ribosomer."
            ],
            quizQuestions: [
                { question: "Hvilken organell utfører fotosyntese i planteceller?", answer: "Kloroplast" },
                { question: "Hva kalles den stive ytre strukturen i en plantecelle?", answer: "Cellevegg" },
                { question: "Hvilken stor organell i planteceller lagrer vann og bidrar til cellens trykk?", answer: "Sentralvakuole" }
            ]
        },
        dyr: {
            name: "Dyrecelle (Eukaryot)",
            image: "dyrecelle_umerket.png", // Ligger i samme mappe (celletyper/)
            description: "En type eukaryot celle som utgjør dyrevev. Den mangler noen av strukturene som finnes i planteceller.",
            characteristics: [
                "Har en fleksibel cellemembran, men mangler en stiv cellevegg.",
                "Mangler kloroplaster (kan ikke utføre fotosyntese).",
                "Mangler en stor, sentral vakuole, men kan ha små, midlertidige vakuoler.",
                "Har en ekte cellekjerne som inneholder DNA.",
                "Inneholder organeller som mitokondrier (for energiproduksjon), endoplasmatisk retikulum, Golgi-apparat, lysosomer (for nedbrytning) og ribosomer."
            ],
            quizQuestions: [
                { question: "Hvilken organell er 'kraftverket' i dyrecellen og produserer energi (ATP)?", answer: "Mitokondrium" },
                { question: "Hva kalles organellen som inneholder cellens arvestoff (DNA)?", answer: "Cellekjerne" },
                { question: "Hvilken organell sorterer og pakker proteiner for transport?", answer: "Golgi-apparat" }
            ]
        }
    };

    function displayCellInfo(cellTypeKey) {
        const data = cellData[cellTypeKey];
        if (!data) {
            cellNameTitle.textContent = "Velkommen!";
            cellImage.src = "placeholder.png"; // Ligger i samme mappe (celletyper/)
            cellImage.alt = "Illustrasjon av celletype";
            cellDescription.textContent = "Klikk på en av celletypene til venstre for å lære mer om den.";
            cellCharacteristicsList.innerHTML = '<li>Velg en celletype for å se kjennetegn.</li>';
            clearQuizArea();
            return;
        }

        cellNameTitle.textContent = data.name;
        cellImage.src = data.image;
        cellImage.alt = `Illustrasjon av ${data.name}`;
        cellDescription.textContent = data.description;

        cellCharacteristicsList.innerHTML = '';
        data.characteristics.forEach(char => {
            const listItem = document.createElement('li');
            listItem.textContent = char;
            cellCharacteristicsList.appendChild(listItem);
        });
        setupQuizForCell(cellTypeKey);
    }

    cellButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cellType = button.dataset.cell;
            displayCellInfo(cellType);
        });
    });

    const quizContainer = document.createElement('div');
    quizContainer.id = 'quiz-container';
    const cellInfoDisplay = document.querySelector('.cell-info-display');
    if (cellInfoDisplay) { // Sjekk om elementet finnes før appendChild
        cellInfoDisplay.appendChild(quizContainer);
    }


    function clearQuizArea() {
        quizContainer.innerHTML = '';
    }

    function setupQuizForCell(cellTypeKey) {
        clearQuizArea();
        const data = cellData[cellTypeKey];
        if (!data || !data.quizQuestions || data.quizQuestions.length === 0) {
            return;
        }

        const quizTitle = document.createElement('h3');
        quizTitle.textContent = "Test din kunnskap!";
        quizTitle.style.marginTop = "30px";
        quizContainer.appendChild(quizTitle);

        data.quizQuestions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.style.marginBottom = "15px";

            const questionLabel = document.createElement('label');
            questionLabel.textContent = `${index + 1}. ${q.question}`;
            questionLabel.style.display = "block";
            questionLabel.style.marginBottom = "5px";

            const answerInput = document.createElement('input');
            answerInput.type = 'text';
            answerInput.id = `quiz-answer-${cellTypeKey}-${index}`;
            answerInput.style.width = "calc(100% - 22px)";
            answerInput.style.padding = "8px";
            answerInput.style.border = "1px solid #ccc";
            answerInput.style.borderRadius = "4px";

            const feedbackP = document.createElement('p');
            feedbackP.id = `feedback-${cellTypeKey}-${index}`;
            feedbackP.style.fontSize = "0.9em";
            feedbackP.style.marginTop = "5px";

            questionDiv.appendChild(questionLabel);
            questionDiv.appendChild(answerInput);
            questionDiv.appendChild(feedbackP);
            quizContainer.appendChild(questionDiv);

            answerInput.addEventListener('blur', () => {
                checkAnswer(answerInput, q.answer, feedbackP);
            });
            answerInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    checkAnswer(answerInput, q.answer, feedbackP);
                    event.preventDefault(); // Forhindre standard Enter-handling (f.eks. form submit)
                }
            });
        });
    }

    function checkAnswer(inputElement, correctAnswer, feedbackElement) {
        const userAnswer = inputElement.value.trim().toLowerCase();
        const correctAnswerLower = correctAnswer.trim().toLowerCase();
        if (userAnswer === correctAnswerLower) {
            feedbackElement.textContent = "Riktig!";
            feedbackElement.style.color = "green";
            inputElement.style.borderColor = "green";
        } else if (userAnswer === "") {
            feedbackElement.textContent = "";
            inputElement.style.borderColor = "#ccc";
        } else {
            feedbackElement.textContent = `Feil. Riktig svar er: ${correctAnswer}`;
            feedbackElement.style.color = "red";
            inputElement.style.borderColor = "red";
        }
    }
    displayCellInfo(null);
});
