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
