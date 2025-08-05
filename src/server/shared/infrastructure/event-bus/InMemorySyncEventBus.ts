//import { DomainEventMapping } from '../DomainEventMapping';
import { DomainEvent } from "@/server/shared/domain/entities/DomainEvent";
import { DomainEventSubscriber } from "@/server/shared/domain/ports/DomainEventSuscriber";
import { EventBus } from "@/server/shared/domain/ports/EventBus";

type Subscription = {
  // TODO: improve the following function type
  // eslint-disable-next-line
  boundedCallback: Function
  // eslint-disable-next-line
  originalCallback: Function
}

export class InMemorySyncEventBus implements EventBus {
  private subscriptions: Map<string, Array<Subscription>>

  constructor() {
    this.subscriptions = new Map()
  }

  async start(): Promise<void> {}

  async publish(events: Array<DomainEvent>): Promise<void> {
    // TODO: change "any" type
    // eslint-disable-next-line
    const executions: any = []
    events.map(event => {
      const subscribers = this.subscriptions.get(event.eventName)
      if (subscribers) {
        return subscribers.map(subscriber => executions.push(subscriber.boundedCallback(event)))
      }
    })

    await Promise.all(executions)
  }

  addSubscribers(subscribers:  Array<DomainEventSubscriber<DomainEvent>>) {
    subscribers.map(subscriber => subscriber.subscribedTo().map(event => this.subscribe(event.EVENT_NAME!, subscriber)))
  }

  //setDomainEventMapping(domainEventMapping: DomainEventMapping): void {}

  private subscribe(topic: string, subscriber: DomainEventSubscriber<DomainEvent>): void {
    const currentSubscriptions = this.subscriptions.get(topic)
    const subscription = { boundedCallback: subscriber.on.bind(subscriber), originalCallback: subscriber.on }
    if (currentSubscriptions) {
      currentSubscriptions.push(subscription)
    } else {
      this.subscriptions.set(topic, [subscription])
    }
  }
}
