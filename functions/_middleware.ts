type Env = {
  BASIC_AUTH_USERNAME?: string;
  BASIC_AUTH_PASSWORD?: string;
};

type PagesContext = {
  request: Request;
  env: Env;
  next: () => Promise<Response>;
};

function parseBasicCredentials(header: string | null) {
  if (!header?.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = atob(header.slice("Basic ".length).trim());
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

function authenticationRequired() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Osushi Gallery", charset="UTF-8"',
    },
  });
}

function authenticationNotConfigured() {
  return new Response("Authentication is not configured", {
    status: 503,
  });
}

export async function onRequest(context: PagesContext) {
  const expectedUsername = context.env.BASIC_AUTH_USERNAME;
  const expectedPassword = context.env.BASIC_AUTH_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    return authenticationNotConfigured();
  }

  const credentials = parseBasicCredentials(
    context.request.headers.get("Authorization"),
  );

  if (
    credentials?.username !== expectedUsername ||
    credentials.password !== expectedPassword
  ) {
    return authenticationRequired();
  }

  return context.next();
}
