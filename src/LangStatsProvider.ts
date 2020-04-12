export type AuthToken = string

export interface LangStats {
    [language: string]: number;
}

interface RepoData {
    language: string
    size: number
}

export class LangStatsProvider {
    private authToken: AuthToken;

    constructor(authToken: AuthToken) {
        this.authToken = authToken
    }

    public async fetchData(): Promise<LangStats> {
        const url = 'https://api.github.com/users/nij4t/repos?per_page=1000'
        const headers = { 'Authorization': this.authToken }
        return fetch(url, { headers })
            .then(res => res.json())
            .then(data => this.formLangStatsData(data))
    }

    private formLangStatsData(data: Array<RepoData>): LangStats {
        const langStats: LangStats = {}
        data.map(repo => {
            langStats[repo.language] =
                isNaN(langStats[repo.language]) ?
                    repo.size :
                    langStats[repo.language] + repo.size
        })
        delete langStats['null']
        return langStats

    }
}
