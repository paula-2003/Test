const questionList = ["Wer ist früher geboren? Isaac Newton oder Paula Gerhardt", "Wer ist Adolf Hitler?", "Wer ist der größte Youtuber?", "Welche Partei ist scheiße?", "Wer ist in diesem Raum am schlausten- Ironie?"]

const question = document.getElementById("question");


const randNum = Math.floor(Math.random() * questionList.length);

question.innerText = questionList[randIndex]

