import { LangChart } from './LangChart'
import { LangStatsProvider } from './LangStatsProvider'

const w = window.innerWidth
const h = window.innerHeight

const radarChart: HTMLCanvasElement = document.createElement("canvas")
const ctx = radarChart.getContext("2d")

radarChart.setAttribute("width", w.toString())
radarChart.setAttribute("height", h.toString())

window.addEventListener("load", () => {
    const token = prompt('Enter your auth token')
    new LangStatsProvider(token)
        .fetchData()
        .then(data => {
            new LangChart(ctx)
                .setData(data)

            document.body.appendChild(radarChart)
        })
        .catch(err => console.error(`could not fetch data: ${err}`))

})
