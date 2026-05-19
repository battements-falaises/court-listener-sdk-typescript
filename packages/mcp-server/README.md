# Court Listener TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export COURT_LISTENER_API_KEY="My API Key"
export COURT_LISTENER_USERNAME="My Username"
export COURT_LISTENER_PASSWORD="My Password"
npx -y court-listener-sdk-mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "court_listener_sdk_api": {
      "command": "npx",
      "args": ["-y", "court-listener-sdk-mcp"],
      "env": {
        "COURT_LISTENER_API_KEY": "My API Key",
        "COURT_LISTENER_USERNAME": "My Username",
        "COURT_LISTENER_PASSWORD": "My Password"
      }
    }
  }
}
```

### Cursor

If you use Cursor, you can install the MCP server by using the button below. You will need to set your environment variables
in Cursor's `mcp.json`, which can be found in Cursor Settings > Tools & MCP > New MCP Server.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=court-listener-sdk-mcp&config=eyJuYW1lIjoiY291cnQtbGlzdGVuZXItc2RrLW1jcCIsInRyYW5zcG9ydCI6Imh0dHAiLCJ1cmwiOiJodHRwczovL2NvdXJ0LWxpc3RlbmVyLXNkay5zdGxtY3AuY29tIiwiaGVhZGVycyI6eyJ4LWNvdXJ0LWxpc3RlbmVyLWFwaS1rZXkiOiJNeSBBUEkgS2V5IiwieC1jb3VydC1saXN0ZW5lci11c2VybmFtZSI6Ik15IFVzZXJuYW1lIiwieC1jb3VydC1saXN0ZW5lci1wYXNzd29yZCI6Ik15IFBhc3N3b3JkIn19)

### VS Code

If you use MCP, you can install the MCP server by clicking the link below. You will need to set your environment variables
in VS Code's `mcp.json`, which can be found via Command Palette > MCP: Open User Configuration.

[Open VS Code](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22court-listener-sdk-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fcourt-listener-sdk.stlmcp.com%22%2C%22headers%22%3A%7B%22x-court-listener-api-key%22%3A%22My%20API%20Key%22%2C%22x-court-listener-username%22%3A%22My%20Username%22%2C%22x-court-listener-password%22%3A%22My%20Password%22%7D%7D)

### Claude Code

If you use Claude Code, you can install the MCP server by running the command below in your terminal. You will need to set your
environment variables in Claude Code's `.claude.json`, which can be found in your home directory.

```
claude mcp add court_listener_sdk_mcp_api --header "x-court-listener-api-key: My API Key" --header "x-court-listener-username: My Username" --header "x-court-listener-password: My Password" --transport http https://court-listener-sdk.stlmcp.com
```

## Code Mode

This MCP server is built on the "Code Mode" tool scheme. In this MCP Server,
your agent will write code against the TypeScript SDK, which will then be executed in an
isolated sandbox. To accomplish this, the server will expose two tools to your agent:

- The first tool is a docs search tool, which can be used to generically query for
  documentation about your API/SDK.

- The second tool is a code tool, where the agent can write code against the TypeScript SDK.
  The code will be executed in a sandbox environment without web or filesystem access. Then,
  anything the code returns or prints will be returned to the agent as the result of the
  tool call.

Using this scheme, agents are capable of performing very complex tasks deterministically
and repeatably.

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Basic scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| --------------------------- | ------------------------ | --------------- |
| `x-court-listener-api-key` | `apiKey` | tokenAuth |
| `x-court-listener-username` | `username` | basicAuth |
| `x-court-listener-password` | `password` | basicAuth |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "court_listener_sdk_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Basic <auth value>"
      }
    }
  }
}
```
