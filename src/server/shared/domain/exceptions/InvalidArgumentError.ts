import {DomainError} from "@/server/shared/domain/exceptions/DomainError";

export class InvalidArgumentError extends DomainError {
	readonly name = "InvalidArgumentError";

	constructor(error: string) {
		super("Invalid argument: " + error);
	}
}
