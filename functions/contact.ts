type Env = {
  CONTACT_WORKER_SECRET: string;
};

type PagesContext = {
  request: Request;
  env: Env;
};

const contactWorkerUrl = "https://contact.tabetay.com/contact";

export async function onRequestPost(context: PagesContext) {
  if (!context.env.CONTACT_WORKER_SECRET) {
    return Response.json({ ok: false, error: "contact_not_configured" }, { status: 503 });
  }

  const response = await fetch(contactWorkerUrl, {
    method: "POST",
    headers: {
      "content-type": context.request.headers.get("content-type") ?? "application/json",
      "x-contact-secret": context.env.CONTACT_WORKER_SECRET,
      "origin": new URL(context.request.url).origin,
    },
    body: context.request.body,
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json; charset=utf-8",
    },
  });
}

export function onRequestOptions() {
  return new Response(null, {
    headers: {
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      "access-control-max-age": "86400",
    },
  });
}
