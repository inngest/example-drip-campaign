// Generated via inngest init

export interface AppUserSignup {
  data: {
    city: string;
  };
  user: {
    email: string;
    external_id: string;
  };
  ts: number;
  name: string;
}

export type EventTriggers = AppUserSignup;

export type Args = {
  event: EventTriggers;
  steps: {
    [clientID: string]: any;
  };
};
