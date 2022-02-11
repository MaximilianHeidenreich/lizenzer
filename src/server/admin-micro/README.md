Micro serverless function for the lizenzer public api.

## API

### /api/v1/lizenze/create

Accepts:

```json
{
	"owner": string,
    "validUntil": number,
	"permissions": string[]
}
```

Returns:

```json
{
    "createdAt": number,
    "key": string,
    "owner": string,
    "permissions": string[],
    "validUntil": number
}
```

### /api/v1/lizenze/delete/:key

Accepts:

-   nothing

Returns:

```
Done!
```

### /api/v1/lizenze/update/:key

Validates a session by verifying the sessionToken

Accepts:

```json
{
	"owner": string,
    "permissions": string[],
	"validUntil": number
}
```

Returns:

```
Done!
```

### /api/v1/lizenzes/get

Returns all lizenzes

Accepts:

-   `query` URL parameter

Returns:

```
ILizenze[]
```
