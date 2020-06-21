import {
  EventObject,
  StateConfig,
  MachineOptions,
  interpret,
  State,
  InterpreterOptions,
  Interpreter,
  StateMachine,
  Typestate,
  StateSchema,
} from 'xstate';
import { filter, shareReplay, finalize, tap } from 'rxjs/operators';
import { Observable, from, BehaviorSubject, Subject } from 'rxjs';

export type InterpretedService<
  TContext,
  TStateSchema extends StateSchema = any,
  TEvent extends EventObject = EventObject,
  TTypestate extends Typestate<TContext> = any
> = {
  state$: Observable<State<TContext, TEvent>>;
  send: Interpreter<TContext, TStateSchema, TEvent, TTypestate>['send'];
  service: Interpreter<TContext, TStateSchema, TEvent, TTypestate>;
};

export interface UseMachineOptions<TContext, TEvent extends EventObject> {
  /**
   * If provided, will be merged with machine's `context`.
   */
  context?: Partial<TContext>;
  /**
   * The state to rehydrate the machine to. The machine will
   * start at this state instead of its `initialState`.
   */
  state?: StateConfig<TContext, TEvent>;
}

export function useMachine<
  TContext,
  TStateSchema extends StateSchema = any,
  TEvent extends EventObject = EventObject,
  TTypestate extends Typestate<TContext> = any
>(
  machine: StateMachine<TContext, TStateSchema, TEvent>,
  options: Partial<InterpreterOptions> &
    Partial<UseMachineOptions<TContext, TEvent>> &
    Partial<MachineOptions<TContext, TEvent>> = {}
): InterpretedService<TContext, TStateSchema, TEvent, TTypestate> {
  const {
    context,
    guards,
    actions,
    activities,
    services,
    delays,
    persist,
    state,
    ...interpreterOptions
  } = options;

  const machineConfig = {
    context,
    guards,
    actions,
    activities,
    services,
    delays,
  };

  const createdMachine = machine.withConfig(machineConfig, {
    ...machine.context,
    ...context,
  } as TContext);

  const service = interpret(createdMachine, interpreterOptions).start(
    state ? State.create(state) : undefined
  );

  if (!!persist && persist.key) {
    const state$ = from(service).pipe(
      tap((state) => localStorage.setItem(persist.key, JSON.stringify(state))),
      shareReplay(1)
    );
    return { state$, send: service.send, service };
  }

  const state$ = from(service).pipe(
    filter(({ changed }) => changed),
    shareReplay(1)
  );

  return { state$, send: service.send, service };
}

export function useService<
  TContext,
  TStateSchema extends StateSchema = any,
  TEvent extends EventObject = EventObject,
  TTypestate extends Typestate<TContext> = any
>(
  service: Interpreter<TContext, TStateSchema, TEvent, TTypestate>
): InterpretedService<TContext, TStateSchema, TEvent, TTypestate> {
  const state$ = from(service).pipe(
    shareReplay(1),
    finalize(() => service.stop())
  );

  return { state$, send: service.send, service };
}
