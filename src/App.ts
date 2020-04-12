import { LangChart } from './LangChart'
import { LangStatsProvider, LangStats } from './LangStatsProvider'

const w = window.innerWidth
const h = window.innerHeight

const radarChart: HTMLCanvasElement = document.createElement("canvas")
const ctx = radarChart.getContext("2d")

radarChart.setAttribute("width", w.toString())
radarChart.setAttribute("height", h.toString())

const top5 = (data: LangStats): LangStats => {
    const buf: LangStats = {}
    const arr = Object.keys(data).map( l => { return { l, s: data[l] } }).sort((a,b) => a.s + b.s)
    for(let i=0; i<5; i++) buf[arr[i].l] = arr[i].s
    return buf
}

window.addEventListener("load", () => {
    const token = prompt('Enter your auth token')
    new LangStatsProvider(token)
        .fetchData()
        .then(data => {
            new LangChart(ctx)
                .setData(top5(data))

            document.body.appendChild(radarChart)
        })
        .catch(err => console.error(`could not fetch data: ${err}`))

})
