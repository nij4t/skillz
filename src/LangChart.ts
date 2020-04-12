import Chart from 'chart.js'
import { LangStats } from './LangStatsProvider';

export class LangChart {
    private ctx: CanvasRenderingContext2D;
    private chart: Chart;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.chart = new Chart(this.ctx, { type: 'radar' })
    }

    public setData(data: LangStats): void {
        this.chart.data = this.formChartData(data)
    }

    private formChartData(data: LangStats): Chart.ChartData {
        return {
            labels: Object.keys(data),
            datasets: [
                {
                    label: "Languages",
                    backgroundColor: "rgba(255,0,0,0.4)",
                    borderColor: "rgba(255,0,0,0.4)",
                    data: Object.keys(data).map(v => data[v])
                }
            ]
        }
    }
}
