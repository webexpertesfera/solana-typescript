import { SolanaAccountManager } from '../SolanaAccountManager';
import { Token } from '../types';

describe('SolanaAccountManager', () => {
    it('should instantiate SolanaAccountManager class', () => {
        // Create an instance of SolanaAccountManager
        const accountManager = new SolanaAccountManager();

        // Assert that accountManager is an instance of SolanaAccountManager
        expect(accountManager).toBeInstanceOf(SolanaAccountManager);
    });

    let accountManager: SolanaAccountManager;

    beforeEach(() => {
        accountManager = new SolanaAccountManager();
    });

    it('fetchTokens should return an array of Token objects', async () => {
        // Call fetchTokens with a mock public key (can be any string)
        const tokens = await accountManager.fetchTokens('mockPublicKey');

        // Assert that tokens is an array
        expect(Array.isArray(tokens)).toBe(true);

        // Assert that each element in the array is an object
        tokens.forEach(token => {
            expect(typeof token).toBe('object');
        });

        // Assert that each token object has properties that match the Token type
        tokens.forEach(token => {
            expect(token).toHaveProperty('name');
            expect(token).toHaveProperty('balance');
            // Add more properties if your Token type defines additional fields
        });

        // Optionally, assert that the tokens match the expected structure from mockData
        expect(tokens).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: expect.any(String), balance: expect.any(Number) }),
            ])
        );
    });

    it('compareBalances should return a ComparisonResult object with the correct structure', async () => {
        // Mock fetchTokens to return specific tokens for testing
        const mockTokens1: Token[] = [
          { name: 'TokenA', balance: 100 },
          { name: 'TokenB', balance: 200 },
        ];
        const mockTokens2: Token[] = [
          { name: 'TokenB', balance: 200 },
          { name: 'TokenC', balance: 300 },
        ];
    
        jest.spyOn(accountManager, 'fetchTokens')
          .mockImplementationOnce(async () => mockTokens1)
          .mockImplementationOnce(async () => mockTokens2);
    
        // Call compareBalances with mock account keys
        const result = await accountManager.compareBalances('account1', 'account2');
    
        // Assert that result has the correct structure
        expect(result).toHaveProperty('account1Only');
        expect(result).toHaveProperty('account2Only');
        expect(result).toHaveProperty('commonTokens');
    
        // Assert that each property is an array of Token objects
        expect(Array.isArray(result.account1Only)).toBe(true);
        expect(Array.isArray(result.account2Only)).toBe(true);
        expect(Array.isArray(result.commonTokens)).toBe(true);
    
        const isToken = (token: Token) => typeof token === 'object' && token !== null && 'name' in token && 'balance' in token;
    
        // Assert that each element in the arrays is a Token object
        result.account1Only.forEach(token => expect(isToken(token)).toBe(true));
        result.account2Only.forEach(token => expect(isToken(token)).toBe(true));
        result.commonTokens.forEach(token => expect(isToken(token)).toBe(true));
      });

});
