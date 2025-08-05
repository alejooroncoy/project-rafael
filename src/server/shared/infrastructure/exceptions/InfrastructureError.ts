export abstract class InfrastructureError extends Error {
	abstract readonly name: string;
	constructor(error: string) {
		super(error);
	}
}
