// Alta de contactos en Brevo, con doble opt-in opcional.
// Si existe BREVO_DOI_TEMPLATE_ID y la fuente lo pide, Brevo manda primero
// un email de "confirma tu suscripcion" y solo agrega el contacto a la lista
// cuando la persona hace clic. Esto neutraliza el "subscription bombing":
// las victimas nunca confirman, asi que nunca reciben nuestro contenido.

export async function addToBrevo({ email, firstName, country, source, listId, doi, redirectionUrl }) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error('BREVO_API_KEY no configurada');

  const attributes = { FIRSTNAME: firstName || '', NOMBRE: firstName || '' };
  if (country) attributes.COUNTRY = country;
  if (source) attributes.SOURCE = source;

  const doiTemplateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
  const useDoi = doi && Number.isFinite(doiTemplateId) && doiTemplateId > 0;

  const url = useDoi
    ? 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation'
    : 'https://api.brevo.com/v3/contacts';

  const payload = useDoi
    ? { email, attributes, includeListIds: [listId], templateId: doiTemplateId, redirectionUrl }
    : { email, attributes, listIds: [listId], updateEnabled: true };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(payload),
  });

  // 201 = creado, 204 = ya existia / DOI enviado
  if ([200, 201, 204].includes(response.status)) {
    return { ok: true, doi: useDoi };
  }

  const text = await response.text();
  console.error('Brevo error:', response.status, text);
  return { ok: false };
}
