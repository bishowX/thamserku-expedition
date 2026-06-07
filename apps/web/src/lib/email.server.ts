import { Resend } from 'resend'

export interface EnquiryEmailData {
  fullName: string
  email: string
  phone?: string
  countryOfResidence?: string
  preferredContact?: string
  submittedAt: string
}

function row(label: string, value: string | undefined | null): string {
  if (!value?.trim()) return ''
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #F4F2EC;width:36%;vertical-align:top;">
        <span style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#5A6673;">${label}</span>
      </td>
      <td style="padding:12px 0 12px 20px;border-bottom:1px solid #F4F2EC;vertical-align:top;">
        <span style="font-family:Georgia,serif;font-size:15px;color:#1A1A1A;white-space:pre-wrap;">${value}</span>
      </td>
    </tr>`
}

function section(title: string, rows: string): string {
  if (!rows.trim()) return ''
  return `
    <div style="margin-bottom:36px;">
      <p style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#2E353C;margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid #2E353C;">${title}</p>
      <table style="width:100%;border-collapse:collapse;"><tbody>${rows}</tbody></table>
    </div>`
}

function buildHtml(data: EnquiryEmailData): string {
  const submittedDate = new Date(data.submittedAt).toLocaleString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC',
  })

  const contactRows = [
    row('Email', data.email),
    row('Phone / WhatsApp', data.phone),
    row('Country', data.countryOfResidence),
    row('Preferred Contact', data.preferredContact),
  ].join('')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Enquiry — ${data.fullName}</title></head>
<body style="margin:0;padding:0;background:#F4F2EC;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F2EC;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:white;max-width:600px;width:100%;">
        <tr>
          <td style="background:#2E353C;padding:32px 48px;">
            <p style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#C8CDD2;margin:0 0 8px;">THAMSERKU EXPEDITIONS · NEW ENQUIRY</p>
            <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:white;margin:0;">${data.fullName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:48px;">
            <p style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.1em;color:#5A6673;margin:0 0 4px;">${data.email}</p>
            <p style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.08em;color:#C8CDD2;margin:0 0 40px;">${submittedDate} UTC</p>
            <hr style="border:none;border-top:1px solid #E5E7EB;margin:0 0 40px;">
            ${section('A — Contact', contactRows)}
          </td>
        </tr>
        <tr>
          <td style="background:#F4F2EC;padding:24px 48px;border-top:1px solid #E5E7EB;">
            <p style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#5A6673;margin:0;">THAMSERKU EXPEDITIONS · YETI GROUP · KATHMANDU · NEPAL HIMALAYA</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export interface BookingLineItem {
  label: string
  chosenLabel: string
  priceDelta: number
}

export interface BookingEmailData {
  fullName: string
  email?: string
  phone?: string
  expeditionName?: string
  customPeakName?: string
  expeditionType?: string
  numberOfClimbers?: string
  season?: string
  startDate?: string
  endDate?: string
  specialObjectives?: string
  editionLetter?: string
  editionName?: string
  lineItems?: BookingLineItem[]
  basePrice?: number
  estimatedTotal?: number
  estimatedLow?: number
  estimatedHigh?: number
  currency?: string
  message?: string
  submittedAt: string
}

function money(n: number, currency = 'USD'): string {
  const symbol = currency === 'USD' ? '$' : `${currency} `
  return `${symbol}${n.toLocaleString('en-US')}`
}

// Builds the section row-strings shared by the desk notification and the climber
// confirmation. Empty fields are dropped here (via `row`), and a section with no
// rows is dropped by `section`, so neither email ever shows a blank field.
function bookingRowGroups(data: BookingEmailData) {
  const currency = data.currency ?? 'USD'
  const dateRange = data.startDate || data.endDate ? [data.startDate, data.endDate].filter(Boolean).join(' → ') : undefined
  return {
    contactRows: [row('Email', data.email), row('Phone / WhatsApp', data.phone)].join(''),
    formatRows: [
      row('Peak', data.customPeakName ? `${data.customPeakName} (custom)` : data.expeditionName),
      row('Edition', data.editionLetter && data.editionName ? `${data.editionLetter} · ${data.editionName}` : undefined),
      row('Expedition Type', data.expeditionType),
      row('Climbers', data.numberOfClimbers),
      row('Season', data.season),
      row('Dates', dateRange),
      row('Special Objectives', data.specialObjectives),
    ].join(''),
    configRows: (data.lineItems ?? [])
      .map((li) => {
        // Positive delta → surcharge "+$X"; negative → credit "− $X".
        const delta = li.priceDelta
          ? `  ·  ${li.priceDelta < 0 ? '−' : '+'}${money(Math.abs(li.priceDelta), currency)}${li.priceDelta < 0 ? ' credit' : ''}`
          : ''
        return row(li.label, `${li.chosenLabel}${delta}`)
      })
      .join(''),
    // Indicative estimate shown as a ±10% range of the calculated total. Null
    // total → price on request (A/E or no base price set).
    pricingRows:
      data.estimatedTotal != null
        ? row(
            'Estimated Range',
            `${money(data.estimatedLow ?? Math.round(data.estimatedTotal * 0.9), currency)} – ${money(
              data.estimatedHigh ?? Math.round(data.estimatedTotal * 1.1),
              currency,
            )} — indicative (±10%), final quote on confirmation`,
          )
        : row('Estimate', 'Price on request — our desk will prepare a custom quote'),
    messageRows: row('Message', data.message),
  }
}

export function buildBookingHtml(data: BookingEmailData): string {
  const submittedDate = new Date(data.submittedAt).toLocaleString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC',
  })
  const { contactRows, formatRows, configRows, pricingRows, messageRows } = bookingRowGroups(data)

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Booking — ${data.fullName}</title></head>
<body style="margin:0;padding:0;background:#F4F2EC;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F2EC;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:white;max-width:600px;width:100%;">
        <tr>
          <td style="background:#1A1A1A;padding:32px 48px;">
            <p style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#C8CDD2;margin:0 0 8px;">THAMSERKU EXPEDITIONS · NEW BOOKING CONFIGURATION</p>
            <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:white;margin:0;">${data.fullName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:48px;">
            <p style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.1em;color:#5A6673;margin:0 0 4px;">${data.email ?? data.phone ?? ''}</p>
            <p style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.08em;color:#C8CDD2;margin:0 0 40px;">${submittedDate} UTC</p>
            <hr style="border:none;border-top:1px solid #E5E7EB;margin:0 0 40px;">
            ${section('Contact', contactRows)}
            ${section('Expedition Format', formatRows)}
            ${section('Configuration', configRows)}
            ${section('Estimate', pricingRows)}
            ${messageRows ? section('Message', messageRows) : ''}
          </td>
        </tr>
        <tr>
          <td style="background:#F4F2EC;padding:24px 48px;border-top:1px solid #E5E7EB;">
            <p style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#5A6673;margin:0;">THAMSERKU EXPEDITIONS · YETI GROUP · KATHMANDU · NEPAL HIMALAYA</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendBookingEmail(to: string, data: BookingEmailData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL ?? 'noreply@thamserku.com'
  if (!apiKey) return

  const resend = new Resend(apiKey)
  await resend.emails.send({
    from,
    to,
    subject: `New Booking Configuration — ${data.fullName}`,
    html: buildBookingHtml(data),
  })
}

// Climber-facing confirmation — a warm recap of what they configured. Same
// section helpers (so empty fields are excluded); the Contact section is omitted
// since it's their own details.
export function buildClimberHtml(data: BookingEmailData): string {
  const firstName = data.fullName?.trim().split(/\s+/)[0] || 'there'
  const peak = data.customPeakName || data.expeditionName
  const { formatRows, configRows, pricingRows, messageRows } = bookingRowGroups(data)

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your expedition configuration</title></head>
<body style="margin:0;padding:0;background:#F4F2EC;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F2EC;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:white;max-width:600px;width:100%;">
        <tr>
          <td style="background:#1A1A1A;padding:32px 48px;">
            <p style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#C8CDD2;margin:0 0 8px;">THAMSERKU EXPEDITIONS · YOUR CONFIGURATION</p>
            <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:white;margin:0;">Thank you, ${firstName}.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:48px;">
            <p style="font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#1A1A1A;margin:0 0 40px;">
              We have received your ${peak ? `${peak} ` : ''}expedition configuration. Here is what you designed — our desk will review it and prepare the right proposal. You will hear from us within 48 hours.
            </p>
            <hr style="border:none;border-top:1px solid #E5E7EB;margin:0 0 40px;">
            ${section('Expedition Format', formatRows)}
            ${section('Configuration', configRows)}
            ${section('Estimate', pricingRows)}
            ${messageRows ? section('Your Message', messageRows) : ''}
            <p style="font-family:Georgia,serif;font-style:italic;font-size:15px;line-height:1.6;color:#5A6673;margin:8px 0 0;">
              We do not quote a number before understanding your climb. Nothing here is a commitment — it simply tells us how to build your expedition.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#F4F2EC;padding:24px 48px;border-top:1px solid #E5E7EB;">
            <p style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#5A6673;margin:0;">THAMSERKU EXPEDITIONS · YETI GROUP · KATHMANDU · NEPAL HIMALAYA</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendBookingConfirmationEmail(to: string, data: BookingEmailData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL ?? 'noreply@thamserku.com'
  if (!apiKey) return

  const peak = data.customPeakName || data.expeditionName
  const resend = new Resend(apiKey)
  await resend.emails.send({
    from,
    to,
    subject: peak ? `Your ${peak} expedition configuration — Thamserku` : 'Your expedition configuration — Thamserku',
    html: buildClimberHtml(data),
  })
}

export async function sendEnquiryEmail(to: string, data: EnquiryEmailData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL ?? 'noreply@thamserku.com'
  if (!apiKey) return

  const resend = new Resend(apiKey)
  await resend.emails.send({
    from,
    to,
    subject: `New Enquiry — ${data.fullName}`,
    html: buildHtml(data),
  })
}
