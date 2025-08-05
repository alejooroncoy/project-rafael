import { Container } from "inversify";
import { EventBus } from "@/server/shared/domain/ports/EventBus";
import { SHARED_CONTAINER_TYPES } from "@/server/shared/infrastructure/container/types";
import { InMemAsyncEventBus } from "@/server/shared/infrastructure/event-bus/InMemAsyncEventBus";

const SharedContainer = new Container();

SharedContainer.bind<EventBus>(SHARED_CONTAINER_TYPES.EventBus)
  .to(InMemAsyncEventBus)
  .inSingletonScope();

export { SharedContainer };
