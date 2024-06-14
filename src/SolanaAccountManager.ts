import { mockData } from "./mockData";
import { Token, ComparisonResult } from "./types";

const randomNumber = () => Math.floor(Math.random() * 10);

const getIndexes = (): number[] => {
    const indexes: number[] = [];
    while (indexes.length < 3) {
        const randomNum = randomNumber();
        if (!indexes.includes(randomNum)) {
            indexes.push(randomNum);
        }
    }
    return indexes;
}
export class SolanaAccountManager {
    async fetchTokens(publicKey: string): Promise<Token[]> {
        console.log(publicKey);
        
        const tokens: Token[] = [];
        const indexes: number[] = getIndexes();
        indexes.forEach(i => {
            tokens.push(mockData[i])
        })
        return tokens;
    }

    getCommonTokens(firstTokens: Token[], secondTokens: Token[]): Token[] {
        return firstTokens.filter(i => secondTokens.map(i => i.name).includes(i.name));
    }

    async compareBalances(account1: string, account2: string): Promise<ComparisonResult> {
        const account1Tokens = await this.fetchTokens(account1);
        const account2Tokens = await this.fetchTokens(account2);
        const commonTokens = this.getCommonTokens(account1Tokens, account2Tokens);
        return ({
            account1Only: account1Tokens,
            account2Only: account2Tokens,
            commonTokens
        });
    }
}
