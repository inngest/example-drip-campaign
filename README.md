# Example Drip Campaign

This example Inngest function creates a simple drip email campaign for a hypothetical
restaurant reservation app where we consider the user "_activated_" when they have booked
their first reservation.

1. After the `app/user.signup` event is received...
2. Wait up to 1 day (`1d`) for the user to activate (`app/reservation.booked`)...
3. If they have not triggered the activation event (`app/reservation.booked`)...
4. Send an email

## Function configuration

The function definition is annotated to show how the above is defined:

```json
{
  "name": "activation-drip-email",
  "id": "exciting-dogfish-63761d",
  "triggers": [
    {
      // When this event is received by Inngest, it will start the function
      "event": "app/user.signup",
      "definition": {
        "format": "cue",
        // The file that declares the event schema that your app will send to Inngest
        "def": "file://./events/app-user.signup.cue"
      }
    }
  ],
  "steps": {
    "step-1": {
      // This step will only be run "after" the below condition is true
      "id": "step-1",
      "path": "file://./steps/1d-send-email",
      "name": "activation-drip-email",
      "runtime": {
        "type": "docker"
      },
      // The "after" block lists conditions that will trigger the step to be run
      "after": [
        {
          // "$trigger" means this will happen directly after the above event
          // trigger: "app/user.signup"
          "step": "$trigger",
          // This is an asynchronous condition that will wait up to 1 day (1d)
          // for the "app/reservation.booked" asynchronous event to be received
          // The "match" checks that both events (the initial "event" and the
          // "async" event) contain the same user id ("external_id").
          "async": {
            "event": "app/reservation.booked",
            "match": "async.user.external_id == event.user.external_id",
            "ttl": "1d",
            "onTimeout": true
          }
        }
      ]
    }
  }
}
```
