const wheel = document.getElementById("wheel"),
    spinBtn = document.getElementById("spin-btn"),
    finalValue = document.getElementById("final-value");

// Values of min and max angle for a value

const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: "Mój jeden sekret" },
    { minDegree: 31, maxDegree: 90, value: "Pocaunek gdzie chcesz" },
    { minDegree: 91, maxDegree: 150, value: "Wisze ci wrapa" },
    { minDegree: 151, maxDegree: 210, value: "Jedno użycie STOP" },
    { minDegree: 211, maxDegree: 270, value: "Jedna kołysanka" },
    { minDegree: 271, maxDegree: 330, value: "Trzy bajki na dobranoc" },
    { minDegree: 331, maxDegree: 360, value: "Talon na balon znaczy obiad" },
];

// Size of pieces
const data = [16, 16, 16, 16, 16, 16];

// Background color of pieces
var pieColors = [
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3",
];

// We use pie chart for wheel, so let's create it
let myChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        labels: ["?", "?", "?", "?", "?", "?"],
        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
        ],
    },
    options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            tooltip: false,
            legend: {
                display: false,
            },
            datalabels: {
                color: "#ffffff",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 24 },
            },
        },
    },
});

// Display value based on randomAngle
const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            finalValue.innerHTML = `<p>${i.value}</p>`;
            alert(`Wygrałeś: ${i.value}`);
            setTimeout(() => {
                window.history.back();
            }, 5000);
            break;
        }
    }
};

// Spinner Count
let count = 0;
let resultValue = 101;

// Start spinning
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p>Jednego serio nie chce robic</p>`;
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue;
        myChart.update();
        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
        }
    }, 10);
});
