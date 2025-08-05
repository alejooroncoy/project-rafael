import {DomainEvent, DomainEventClass} from "@/server/shared/domain/entities/DomainEvent";

export interface DomainEventSubscriber<T extends DomainEvent> {
	subscribedTo(): Array<DomainEventClass>;
	on(domainEvent: T): Promise<void>;
}
