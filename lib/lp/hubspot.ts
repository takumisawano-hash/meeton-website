import type { HubspotProfile } from './types'

const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN || ''
const HUBSPOT_BASE = 'https://api.hubapi.com'

const CONTACT_PROPS = [
  'firstname',
  'lastname',
  'email',
  'jobtitle',
  'company',
  'lifecyclestage',
  'hs_lead_status',
  'recent_conversion_event_name',
  'num_form_submissions',
  'lastmodifieddate',
]

async function hsFetch(path: string, init: RequestInit = {}): Promise<Response | null> {
  if (!HUBSPOT_TOKEN) return null
  try {
    return await fetch(`${HUBSPOT_BASE}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${HUBSPOT_TOKEN}`,
        'Content-Type': 'application/json',
        ...(init.headers || {}),
      },
      cache: 'no-store',
    })
  } catch {
    return null
  }
}

type HubspotContactRecord = {
  id?: string
  properties?: Record<string, string | undefined>
}

function shapeContact(record: HubspotContactRecord | undefined): HubspotProfile | null {
  if (!record?.properties) return null
  const p = record.properties
  return {
    contactId: record.id,
    firstName: p.firstname,
    lastName: p.lastname,
    email: p.email,
    jobTitle: p.jobtitle,
    companyName: p.company,
    lifecyclestage: p.lifecyclestage,
    hsLeadStatus: p.hs_lead_status,
    recentConversionEvent: p.recent_conversion_event_name,
    numFormSubmissions: p.num_form_submissions ? Number(p.num_form_submissions) : undefined,
    lastModified: p.lastmodifieddate,
  }
}

export async function fetchByEmail(email: string): Promise<HubspotProfile | null> {
  const res = await hsFetch('/crm/v3/objects/contacts/search', {
    method: 'POST',
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
      properties: CONTACT_PROPS,
      limit: 1,
    }),
  })
  if (!res?.ok) return null
  const data = (await res.json()) as { results?: HubspotContactRecord[] }
  return shapeContact(data.results?.[0])
}

export async function fetchByHubspotutk(hubspotutk: string): Promise<HubspotProfile | null> {
  const res = await hsFetch('/crm/v3/objects/contacts/search', {
    method: 'POST',
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'hubspotscore', operator: 'HAS_PROPERTY' }, { propertyName: 'hs_object_id', operator: 'HAS_PROPERTY' }] }],
      properties: CONTACT_PROPS,
      limit: 1,
    }),
  })
  if (!res?.ok) return null
  const data = (await res.json()) as { results?: HubspotContactRecord[] }
  return shapeContact(data.results?.[0])
}

export async function fetchHubspotProfile(opts: {
  email?: string
  hubspotutk?: string
  companyName?: string
}): Promise<HubspotProfile | null> {
  if (opts.email) {
    const byEmail = await fetchByEmail(opts.email)
    if (byEmail) return byEmail
  }
  if (opts.companyName) {
    const res = await hsFetch('/crm/v3/objects/contacts/search', {
      method: 'POST',
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: 'company', operator: 'EQ', value: opts.companyName }] }],
        properties: CONTACT_PROPS,
        limit: 1,
        sorts: [{ propertyName: 'lastmodifieddate', direction: 'DESCENDING' }],
      }),
    })
    if (res?.ok) {
      const data = (await res.json()) as { results?: HubspotContactRecord[] }
      const shaped = shapeContact(data.results?.[0])
      if (shaped) return shaped
    }
  }
  return null
}
