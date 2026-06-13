type EmailAddress = string | { email: string; name?: string };

type SendEmail = {
  send(message: {
    to: EmailAddress | EmailAddress[];
    from: EmailAddress;
    subject: string;
    text?: string;
    html?: string;
    reply_to?: EmailAddress;
  }): Promise<{ messageId?: string }>;
};

type Env = {
  EMAIL: SendEmail;
  CONTACT_TO: string;
  CONTACT_FROM: string;
  CONTACT_WORKER_SECRET: string;
  ALLOWED_ORIGIN?: string;
};

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
};

function corsHeaders(request: Request, env: Env) {
  const origin = request.headers.get("origin") ?? "";
  const allowedOrigins = (env.ALLOWED_ORIGIN ?? origin)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const allowed = allowedOrigins.includes("*") ? "*" : allowedOrigins.includes(origin) ? origin : "null";

  return {
    "access-control-allow-origin": allowed,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
  };
}

function jsonResponse(request: Request, env: Env, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...jsonHeaders,
      ...corsHeaders(request, env),
    },
  });
}

function sanitize(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(request, env) });
    }

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/contact") {
      return jsonResponse(request, env, { ok: false, error: "not_found" }, 404);
    }

    if (
      !env.CONTACT_WORKER_SECRET ||
      request.headers.get("x-contact-secret") !== env.CONTACT_WORKER_SECRET
    ) {
      return jsonResponse(request, env, { ok: false, error: "forbidden" }, 403);
    }

    let payload: ContactPayload;
    try {
      payload = (await request.json()) as ContactPayload;
    } catch {
      return jsonResponse(request, env, { ok: false, error: "invalid_json" }, 400);
    }

    if (sanitize(payload.website, 120)) {
      return jsonResponse(request, env, { ok: true });
    }

    const name = sanitize(payload.name, 80);
    const email = sanitize(payload.email, 160);
    const message = typeof payload.message === "string" ? payload.message.trim().slice(0, 4000) : "";

    if (!name || !isValidEmail(email) || message.length < 10) {
      return jsonResponse(request, env, { ok: false, error: "invalid_input" }, 400);
    }

    const subject = `Osushi Gallery contact: ${name}`;
    const text = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
    const html = `
      <h1>Osushi Gallery contact</h1>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <pre style="white-space:pre-wrap;font:inherit">${escapeHtml(message)}</pre>
    `;

    try {
      const result = await env.EMAIL.send({
        to: env.CONTACT_TO,
        from: { email: env.CONTACT_FROM, name: "Osushi Gallery" },
        reply_to: email,
        subject,
        text,
        html,
      });

      return jsonResponse(request, env, { ok: true, messageId: result.messageId ?? null });
    } catch (error) {
      console.error("contact email failed", error);
      return jsonResponse(request, env, { ok: false, error: "send_failed" }, 502);
    }
  },
};
