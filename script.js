const analogCanvas = document.getElementById("analogCanvas");
const analogCtx = analogCanvas.getContext("2d");
const digitalCanvas = document.getElementById("digitalCanvas");
const digitalCtx = digitalCanvas.getContext("2d");
const radius = analogCanvas.width / 3;
drawTime();
displayDigitalTime();

setInterval(() => {
    drawTime();
    displayDigitalTime();
}, 1000);

function drawClock() {
    analogCtx.clearRect(0, 0, analogCanvas.width, analogCanvas.height); 

    analogCtx.fillStyle = "#e4e4e4";
    analogCtx.beginPath();
    analogCtx.arc(analogCanvas.width / 2, analogCanvas.height / 2, radius, 0, 2 * Math.PI);
    analogCtx.fill();

    analogCtx.lineWidth = 10;
    analogCtx.strokeStyle = "green";
    analogCtx.beginPath();
    analogCtx.arc(analogCanvas.width / 2, analogCanvas.height / 2, radius, 3 * Math.PI / 2, 2 * Math.PI);
    analogCtx.stroke();

    analogCtx.strokeStyle = "yellow";
    analogCtx.beginPath();
    analogCtx.arc(analogCanvas.width / 2, analogCanvas.height / 2, radius, 0, Math.PI / 2);
    analogCtx.stroke();

    analogCtx.strokeStyle = "blue";
    analogCtx.beginPath();
    analogCtx.arc(analogCanvas.width / 2, analogCanvas.height / 2, radius, Math.PI / 2, Math.PI);
    analogCtx.stroke();

    analogCtx.strokeStyle = "red";
    analogCtx.beginPath();
    analogCtx.arc(analogCanvas.width / 2, analogCanvas.height / 2, radius, Math.PI, 3 * Math.PI / 2);
    analogCtx.stroke();    

    analogCtx.font = "36px serif";
    analogCtx.textAlign = "center";
    analogCtx.textBaseline = "middle";
    analogCtx.fillStyle = "black";
    analogCtx.fillText("12", analogCanvas.width / 2, analogCanvas.height / 10);
    analogCtx.fillText("3", analogCanvas.width * 0.9, analogCanvas.height / 2);
    analogCtx.fillText("6", analogCanvas.width / 2, analogCanvas.height * 0.95);
    analogCtx.fillText("9", analogCanvas.width / 10, analogCanvas.height / 2);
}

function drawTime() {
    drawClock();
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();

    let secondAngle = (seconds / 60) * 2 * Math.PI;
    let minuteAngle = (minutes / 60) * 2 * Math.PI + (seconds / 60) * (2 * Math.PI / 60);
    let hourAngle = (hours % 12 / 12) * 2 * Math.PI + (minutes / 60) * (2 * Math.PI / 12); 

    drawHand(secondAngle, radius * 0.9, "black");

    drawHand(minuteAngle, radius * 0.75, "brown");

    drawHand(hourAngle, radius * 0.5, "orange");
}

function drawHand(angle, length, color) {
    analogCtx.strokeStyle = color;
    analogCtx.lineWidth = 5;
    analogCtx.beginPath();
    analogCtx.moveTo(analogCanvas.width / 2, analogCanvas.height / 2);

    analogCtx.lineTo(
        analogCanvas.width / 2 + length * Math.cos(angle - Math.PI / 2),
        analogCanvas.height / 2 + length * Math.sin(angle - Math.PI / 2)
    );
    analogCtx.stroke();
}

function displayDigitalTime() {
    digitalCtx.clearRect(0, 0, digitalCanvas.width, digitalCanvas.height);
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    digitalCtx.font = `${digitalCanvas.height / 2}px 'Seven Segment'`;
    digitalCtx.textAlign = "center";
    digitalCtx.textBaseline = "middle";
    digitalCtx.fillStyle = "#0f0";
    digitalCtx.fillText(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        digitalCanvas.width / 2,
        digitalCanvas.height / 2
    );
}
