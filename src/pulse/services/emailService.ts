import { Invoice } from '../types';

export interface EmailResult {
  success: boolean;
  message: string;
  previewHtml?: string;
}

export const formatCurrency = (amount: number, currency: string = 'NGN') => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const generateInvoiceEmailHtml = (invoice: Invoice, appUrl: string = window.location.origin): string => {
  const invoiceLink = `${appUrl}/inv/${invoice.id}`;
  const currencySymbol = invoice.currency === 'USD' ? '$' : '₦';

  const itemsHtml = invoice.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0;">
          <strong style="color: #0F172A; font-size: 14px;">${item.title}</strong>
          ${item.specs ? `<div style="color: #64748B; font-size: 12px; margin-top: 2px;">${item.specs}</div>` : ''}
          ${item.warranty ? `<span style="display: inline-block; background-color: #FEF3C7; color: #92400E; font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px; margin-top: 4px;">${item.warranty}</span>` : ''}
        </td>
        <td style="padding: 12px 8px; border-bottom: 1px solid #E2E8F0; text-align: center; color: #475569; font-size: 13px;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; text-align: right; font-weight: 600; color: #0F172A; font-size: 14px;">
          ${formatCurrency(item.total, invoice.currency)}
        </td>
      </tr>
    `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Solikos Energy Commercial Invoice ${invoice.invoiceNumber}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 24px; color: #0F172A;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <!-- Brand Header -->
    <tr>
      <td style="background-color: #0F172A; padding: 32px 32px; text-align: left;">
        <table width="100%">
          <tr>
            <td>
              <div style="color: #FFFFFF; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">SOLIKOS <span style="font-weight: 300; font-size: 13px; letter-spacing: 3px; color: #F59E0B; margin-left: 6px;">ENERGY</span></div>
              <div style="color: #94A3B8; font-size: 12px; margin-top: 4px;">Your Power, Our Priority</div>
            </td>
            <td style="text-align: right;">
              <span style="background-color: rgba(245, 158, 11, 0.15); color: #F59E0B; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase;">COMMERCIAL INVOICE</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Salutation -->
    <tr>
      <td style="padding: 32px 32px 16px 32px;">
        <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 8px 0; color: #0F172A;">Commercial Invoice: ${invoice.invoiceNumber}</h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.5; margin: 0;">
          Dear <strong>${invoice.customer.name}</strong>,<br>
          Thank you for partnering with Solikos Energy LTD. Your commercial invoice has been issued and is available for digital review.
        </p>
      </td>
    </tr>

    <!-- Summary Box -->
    <tr>
      <td style="padding: 0 32px;">
        <table width="100%" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px;">
          <tr>
            <td style="padding: 8px;">
              <span style="color: #64748B; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Invoice Number</span>
              <div style="font-size: 14px; font-weight: 700; color: #0F172A;">${invoice.invoiceNumber}</div>
            </td>
            <td style="padding: 8px;">
              <span style="color: #64748B; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Issue Date</span>
              <div style="font-size: 14px; font-weight: 700; color: #0F172A;">${invoice.issueDate}</div>
            </td>
            <td style="padding: 8px; text-align: right;">
              <span style="color: #64748B; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Total Amount</span>
              <div style="font-size: 18px; font-weight: 800; color: #D97706;">${formatCurrency(invoice.total, invoice.currency)}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Items Table -->
    <tr>
      <td style="padding: 24px 32px;">
        <table width="100%" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th style="text-align: left; font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; padding-bottom: 8px; border-bottom: 2px solid #E2E8F0;">Hardware / Description</th>
              <th style="text-align: center; font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; padding-bottom: 8px; border-bottom: 2px solid #E2E8F0;">Qty</th>
              <th style="text-align: right; font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; padding-bottom: 8px; border-bottom: 2px solid #E2E8F0;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
      </td>
    </tr>

    <!-- Call to Action Button -->
    <tr>
      <td style="padding: 0 32px 32px 32px; text-align: center;">
        <a href="${invoiceLink}" style="display: inline-block; background-color: #D97706; color: #FFFFFF; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 9999px; box-shadow: 0 4px 10px rgba(217, 119, 6, 0.3);">
          View &amp; Download Digital Invoice &rarr;
        </a>
        <div style="font-size: 11px; color: #94A3B8; margin-top: 12px;">
          You can inspect the technical specifications and download a vector PDF directly from this link.
        </div>
      </td>
    </tr>

    <!-- Bank Details -->
    ${
      invoice.bankAccounts && invoice.bankAccounts.length > 0
        ? `
    <tr>
      <td style="background-color: #F8FAFC; padding: 24px 32px; border-top: 1px solid #E2E8F0;">
        <div style="font-size: 12px; font-weight: 700; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Official Remittance Account:</div>
        <div style="font-size: 13px; color: #334155;">
          <strong>Bank:</strong> ${invoice.bankAccounts[0].bankName}<br>
          <strong>Account Name:</strong> ${invoice.bankAccounts[0].accountName}<br>
          <strong>Account Number:</strong> <span style="font-family: monospace; font-size: 14px; font-weight: 700; color: #0F172A;">${invoice.bankAccounts[0].accountNumber}</span>
          ${invoice.bankAccounts[0].swiftCode ? `<br><strong>SWIFT Code:</strong> ${invoice.bankAccounts[0].swiftCode}` : ''}
        </div>
      </td>
    </tr>`
        : ''
    }

    <!-- Footer -->
    <tr>
      <td style="padding: 24px 32px; text-align: center; font-size: 11px; color: #94A3B8; border-top: 1px solid #E2E8F0;">
        Solikos Energy LTD &bull; Victoria Island, Lagos, Nigeria<br>
        Phone: +234 803 344 0084 &bull; Email: info@solikosenergyltd.com<br>
        &copy; ${new Date().getFullYear()} Solikos Energy LTD. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

export const sendInvoiceViaResend = async (
  invoice: Invoice,
  recipientEmail?: string
): Promise<EmailResult> => {
  const targetEmail = recipientEmail || invoice.customer.email;

  if (!targetEmail) {
    return {
      success: false,
      message: 'No email address provided for this invoice.',
    };
  }

  const emailHtml = generateInvoiceEmailHtml(invoice);
  const apiKey = (import.meta as any).env?.VITE_RESEND_API_KEY;

  if (!apiKey) {
    // Graceful fallback for staging / demo: generate HTML and log dispatch
    console.info(`[Resend Engine Mock] Invoice ${invoice.invoiceNumber} dispatched to ${targetEmail}`);
    return {
      success: true,
      message: `Invoice email successfully formatted and queued for ${targetEmail}. (Add VITE_RESEND_API_KEY in environment for live SMTP relay).`,
      previewHtml: emailHtml,
    };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Solikos Energy Invoicing <billing@solikosenergyltd.com>',
        to: [targetEmail],
        subject: `Invoice ${invoice.invoiceNumber} from Solikos Energy LTD - ${formatCurrency(invoice.total, invoice.currency)}`,
        html: emailHtml,
      }),
    });

    if (res.ok) {
      return {
        success: true,
        message: `Invoice email successfully sent via Resend to ${targetEmail}!`,
        previewHtml: emailHtml,
      };
    } else {
      const err = await res.json();
      return {
        success: false,
        message: err.message || 'Failed to send email via Resend.',
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Network error communicating with Resend.',
    };
  }
};
