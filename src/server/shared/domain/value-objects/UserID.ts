import {ValueObject} from "@/server/shared/domain/value-objects/ValueObject";
import {InvalidArgumentError} from "@/server/shared/domain/exceptions/InvalidArgumentError";

export class UserID extends ValueObject<string> {
    private static REGEX = /^[a-zA-Z0-9_.\-]{1,128}$/

    constructor(value: string) {
        UserID.validateValue(value)
        super(value)
    }

    private static validateValue(value: string) {
        if (!UserID.REGEX.test(value.trim())) {
          throw new InvalidArgumentError(`Invalid User ID format. Expected a valid UUID: ${value}`)
        }
    }

}