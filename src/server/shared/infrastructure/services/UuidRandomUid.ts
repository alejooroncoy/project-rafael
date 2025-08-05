import {RandomUid} from "@/server/shared/domain/ports/RandomUid";
import {v4} from "uuid";

export class UuidRandomUid implements RandomUid {
	public generate = (): string => {
		return v4();
	};
}
