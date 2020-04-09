import { Chart } from 'chart.js'

const w = window.innerWidth
const h = window.innerHeight

const radarChart: HTMLCanvasElement = document.createElement("canvas")
const ctx = radarChart.getContext("2d")

const rawLangData = {
  "Go": 2018,
  "Makefile": 603,
  "Python": 158,
  "C": 145,
  "V": 51
}

const langData = { 
    labels: Object.keys(rawLangData), 
    datasets: [
        { 
            label: "Languages",
            backgroundColor: "rgba(255,0,0,0.4)",
            borderColor: "rgba(255,0,0,0.4)",
            data: Object.keys(rawLangData).map( v => rawLangData[v] ) 
        }
    ]}

radarChart.setAttribute("width", w.toString())
radarChart.setAttribute("height", h.toString())

new Chart(ctx, {
    type: 'radar',
    data: langData,
    options: {}
});

window.addEventListener("load", () => {
    document.body.appendChild(radarChart)
})
