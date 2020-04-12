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
        const url = 'https://api.github.com/user/repos?affiliation=owner&per_page=10000'
        const headers = { Authorization: `token ${this.authToken}` }
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
