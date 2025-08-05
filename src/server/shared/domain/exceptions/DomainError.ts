export abstract class DomainError extends Error {
	abstract readonly name: string;
	constructor(error: string) {
		super(error);
	}
}
