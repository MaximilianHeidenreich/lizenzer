Micro serverless function for the lizenzer public api.

## API

### /api/v1/lizenze/validate?lizenze=xxxx-xxxx

Validates a lizenze by checking whether it exists in the database.

> Use the sessions api for better control over lizenze usage

Accepts:

-   `lizenze` query parameter

Returns:

```json
{
    valid: true | false
    permissions?: string[]   // Individual permissions bound to the lizenze (only present on valid lizenzes)
}
```

### /api/v1/session/create

Accepts:

```json
{
    lizenze: string
}
```

Returns:

```
sessionToken as a string
```

### /api/v1/session/validate

Validates a session by verifying the sessionToken

Accepts:

-   `token` query parameter

Returns:

```json
{
    valid: true | false
    payload?: {                 // Payload data carried by the token
        permissions: string[]
    }
    error?: string              // Error description for invalid sessions
}
```
