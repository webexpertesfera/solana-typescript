import { Token } from "./Token";

export type ComparisonResult = {
    account1Only: Token[];
    account2Only: Token[];
    commonTokens: Token[];
}