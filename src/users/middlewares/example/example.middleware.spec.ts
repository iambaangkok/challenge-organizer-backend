import { ExampleMiddleware } from './example.middleware';

describe.skip('ExampleMiddleware', () => {
    it('should be defined', () => {
        expect(new ExampleMiddleware()).toBeDefined();
    });
});
