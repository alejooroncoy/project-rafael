import EventEmitter from "events";
import { DomainEvent } from "@/server/shared/domain/entities/DomainEvent";
import { DomainEventSubscriber } from "@/server/shared/domain/ports/DomainEventSuscriber";
import { EventBus } from "@/server/shared/domain/ports/EventBus";
import { injectable } from "inversify";

@injectable()
export class InMemAsyncEventBus extends EventEmitter implements EventBus {
  public async publish(events: DomainEvent[]) {
    events.map((event) => this.emit(event.eventName, event));
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    subscribers.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((event) => {
        this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
      });
    });
  }
}
