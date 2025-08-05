import {DomainEvent} from "@/server/shared/domain/entities/DomainEvent";
import {DomainEventSubscriber} from "@/server/shared/domain/ports/DomainEventSuscriber";

export interface EventBus {
	publish(events: Array<DomainEvent>): Promise<void>;
	addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void;
}
