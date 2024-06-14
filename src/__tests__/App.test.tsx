import { SolanaAccountManager } from '../SolanaAccountManager';

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

});
