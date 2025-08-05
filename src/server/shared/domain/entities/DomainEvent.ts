import { RandomUid } from "@/server/shared/domain/ports/RandomUid";
import { UuidRandomUid } from "@/server/shared/infrastructure/services/UuidRandomUid";

export abstract class DomainEvent {
  static randomUidService: RandomUid = new UuidRandomUid();
  static EVENT_NAME: string;
  static fromPrimitives: (params: {
    aggregateId: string;
    eventId: string;
    occurredOn: Date;
  // eslint-disable-next-line
    attributes: any;
  }) => DomainEvent;

  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(params: {
    eventName: string;
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    const { aggregateId, eventName, eventId, occurredOn } = params;
    this.aggregateId = aggregateId;
    this.eventId = eventId || DomainEvent.randomUidService.generate();
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
  }

  // eslint-disable-next-line
  abstract toPrimitives(): any;
}

export type DomainEventClass = {
  EVENT_NAME: string;
  fromPrimitives(params: {
    aggregateId: string;
    eventId: string;
    occurredOn: Date;
  // eslint-disable-next-line
    attributes: any;
  }): DomainEvent;
};
