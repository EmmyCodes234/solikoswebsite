import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Download,
  Printer,
  Copy,
  Check,
  MessageSquare,
  Mail,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { usePulse } from '../context/PulseContext';
import { sendInvoiceViaResend } from '../services/emailService';

export const PublicInvoiceView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getInvoiceById, settings } = usePulse();
  const invoice = getInvoiceById(id || '');

  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);

  const invoiceRef = useRef<HTMLDivElement>(null);

  if (!invoice) {
    return (
      <div className="min-h-screen bg-[#FBFBFA] flex items-center justify-center p-6 text-[#111111]">
        <div className="bg-white p-8 rounded-xl border border-[#ECECEB] shadow-sm max-w-md text-center space-y-4">
          <AlertCircle size={36} className="mx-auto text-amber-600" />
          <h1 className="text-lg font-semibold">Invoice not found</h1>
          <p className="text-xs text-[#737373]">
            This invoice link may be invalid or has expired. Please contact Solikos Energy for assistance.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-block bg-[#111111] text-white text-xs font-medium px-4 py-2 rounded-lg"
            >
              Back to Solikos home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatMoney = (amt: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: invoice.currency,
      maximumFractionDigits: 0,
    }).format(amt);
  };

  // Direct vector PDF generator: Clean, professional A4 letterhead layout
  const handleDownloadPdf = async () => {
    setDownloading(true);

    try {
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
      const margin = 18;
      let y = margin;

      // Header: Solikos letterhead
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(17, 17, 17);
      doc.text('SOLIKOS ENERGY', margin, y + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(115, 115, 115);
      doc.text(settings.tagline || 'Your Power, Our Priority', margin, y + 11);
      doc.text(settings.address, margin, y + 15.5);
      // Clean RC & TIN strings
      const rcStr = settings.rcNumber.startsWith('RC') ? settings.rcNumber : `RC ${settings.rcNumber}`;
      const tinStr = settings.taxId.startsWith('TIN') ? settings.taxId : `TIN ${settings.taxId}`;
      doc.text(`${rcStr}  ·  ${tinStr}`, margin, y + 20);
      doc.text(`Tel: ${settings.phone}  ·  Email: ${settings.email}`, margin, y + 24.5);

      // Invoice info on right
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(17, 17, 17);
      doc.text('INVOICE', pageWidth - margin, y + 6, { align: 'right' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(68, 68, 68);
      doc.text(invoice.invoiceNumber, pageWidth - margin, y + 12, { align: 'right' });

      doc.setFontSize(8);
      doc.setTextColor(115, 115, 115);
      doc.text(`Issued: ${invoice.issueDate}`, pageWidth - margin, y + 17, { align: 'right' });
      doc.text(`Due: ${invoice.dueDate}`, pageWidth - margin, y + 21.5, { align: 'right' });

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(invoice.status === 'paid' ? 16 : 180, invoice.status === 'paid' ? 149 : 115, invoice.status === 'paid' ? 84 : 20);
      doc.text(`Status: ${invoice.status.toUpperCase()}`, pageWidth - margin, y + 26, { align: 'right' });

      y += 32;

      // Divider line
      doc.setDrawColor(236, 236, 235);
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageWidth - margin, y);

      y += 6;

      // Billed To Section
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(115, 115, 115);
      doc.text('BILLED TO', margin, y + 4);

      doc.setFontSize(10);
      doc.setTextColor(17, 17, 17);
      doc.text(invoice.customer.name, margin, y + 9.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(68, 68, 68);
      let clientY = y + 14;
      doc.text(invoice.customer.phone, margin, clientY);
      if (invoice.customer.email) {
        clientY += 4.5;
        doc.text(invoice.customer.email, margin, clientY);
      }
      if (invoice.customer.address) {
        clientY += 4.5;
        doc.text(invoice.customer.address, margin, clientY);
      }

      y = Math.max(y + 24, clientY + 6);

      // Line Items Table Header
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, y, pageWidth - margin * 2, 7, 'F');
      doc.setDrawColor(236, 236, 235);
      doc.line(margin, y + 7, pageWidth - margin, y + 7);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(115, 115, 115);
      doc.text('ITEM & SPECIFICATIONS', margin + 3, y + 4.8);
      doc.text('QTY', margin + 115, y + 4.8, { align: 'center' });
      doc.text('PRICE', margin + 142, y + 4.8, { align: 'right' });
      doc.text('TOTAL', pageWidth - margin - 3, y + 4.8, { align: 'right' });

      y += 7;

      // Line Items Rows
      invoice.items.forEach((item) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(17, 17, 17);
        doc.text(item.title, margin + 3, y + 4.5);

        // Warranty tag
        if (item.warranty) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          doc.setTextColor(115, 115, 115);
          doc.text(`(${item.warranty})`, margin + 3 + doc.getTextWidth(item.title) + 2, y + 4.5);
        }

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(115, 115, 115);
        const specSummary = (item.specs || item.description || '').slice(0, 80);
        doc.text(specSummary, margin + 3, y + 8.5);

        // Qty
        doc.setFontSize(8);
        doc.setTextColor(68, 68, 68);
        doc.text(item.quantity.toString(), margin + 115, y + 6, { align: 'center' });

        // Price
        doc.text(formatMoney(item.unitPrice), margin + 142, y + 6, { align: 'right' });

        // Total
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(17, 17, 17);
        doc.text(formatMoney(item.total), pageWidth - margin - 3, y + 6, { align: 'right' });

        doc.setDrawColor(244, 244, 243);
        doc.line(margin, y + 11, pageWidth - margin, y + 11);

        y += 12;
      });

      y += 4;

      // Totals Block
      const totalsX = pageWidth - margin - 75;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(115, 115, 115);
      doc.text('Subtotal:', totalsX, y + 4);
      doc.setTextColor(17, 17, 17);
      doc.text(formatMoney(invoice.subtotal), pageWidth - margin - 3, y + 4, { align: 'right' });

      if (invoice.discountAmount > 0) {
        y += 5;
        doc.setTextColor(115, 115, 115);
        doc.text(`Discount (${invoice.discountRate}%):`, totalsX, y + 4);
        doc.setTextColor(16, 149, 84);
        doc.text(`-${formatMoney(invoice.discountAmount)}`, pageWidth - margin - 3, y + 4, { align: 'right' });
      }

      y += 5;
      doc.setTextColor(115, 115, 115);
      doc.text(`VAT (${invoice.taxRate}%):`, totalsX, y + 4);
      doc.setTextColor(17, 17, 17);
      doc.text(invoice.taxAmount > 0 ? `+${formatMoney(invoice.taxAmount)}` : 'Exempt', pageWidth - margin - 3, y + 4, { align: 'right' });

      y += 6;
      doc.setDrawColor(236, 236, 235);
      doc.line(totalsX, y, pageWidth - margin, y);
      y += 4;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(17, 17, 17);
      doc.text('Total:', totalsX, y + 4);
      doc.text(formatMoney(invoice.total), pageWidth - margin - 3, y + 4, { align: 'right' });

      y += 14;

      // Bank Details
      if (invoice.bankAccounts && invoice.bankAccounts.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(115, 115, 115);
        doc.text('PAYMENT DETAILS', margin, y);

        y += 4.5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(68, 68, 68);

        invoice.bankAccounts.forEach((b) => {
          doc.text(`${b.bankName}  ·  Account: ${b.accountNumber}  ·  Name: ${b.accountName} (${b.currency})`, margin, y);
          y += 4;
        });
      }

      // Terms & Notes
      if (invoice.paymentTerms || invoice.notes) {
        y += 2;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(115, 115, 115);
        doc.text('TERMS & NOTES', margin, y);

        y += 4.5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(115, 115, 115);

        if (invoice.paymentTerms) {
          doc.text(`Payment: ${invoice.paymentTerms}`, margin, y);
          y += 4;
        }
        if (invoice.notes) {
          doc.text(`Notes: ${invoice.notes}`, margin, y);
          y += 4;
        }
      }

      // Footer
      const footerY = doc.internal.pageSize.getHeight() - 14;
      doc.setDrawColor(236, 236, 235);
      doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(163, 163, 163);
      doc.text('Thank you for choosing Solikos Energy  ·  www.solikosenergyltd.com', margin, footerY);

      doc.save(`Solikos_Invoice_${invoice.invoiceNumber}.pdf`);
    } catch (err) {
      console.error('PDF generation error:', err);
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const getWhatsAppShareUrl = () => {
    const cleanPhone = invoice.customer.phone.replace(/[\s\-\(\)\+]/g, '');
    const currentUrl = window.location.href;
    const text = encodeURIComponent(
      `Hello ${invoice.customer.name},\n\nHere is your invoice ${invoice.invoiceNumber} from Solikos Energy LTD for ${formatMoney(
        invoice.total
      )}.\n\nYou can view and download your invoice here:\n${currentUrl}\n\nSolikos Energy LTD · Your Power, Our Priority`
    );
    return `https://wa.me/${cleanPhone}?text=${text}`;
  };

  const handleSendEmail = async () => {
    if (!invoice.customer.email) {
      const inputEmail = window.prompt('Enter client email address:');
      if (!inputEmail) return;
      setSendingEmail(true);
      const res = await sendInvoiceViaResend(invoice, inputEmail);
      setSendingEmail(false);
      setEmailStatus(res.message);
      setTimeout(() => setEmailStatus(null), 5000);
      return;
    }

    setSendingEmail(true);
    const res = await sendInvoiceViaResend(invoice);
    setSendingEmail(false);
    setEmailStatus(res.message);
    setTimeout(() => setEmailStatus(null), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-8 px-4 sm:px-6 lg:px-8 font-sans text-[#111111]">
      {/* Action Bar (Hidden in Print) */}
      <div className="max-w-3xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#ECECEB] shadow-xs print:hidden">
        <div className="flex items-center gap-2">
          <img src="/solikos-icon.png" alt="Solikos" className="w-6 h-6 object-contain" />
          <span className="font-semibold text-xs tracking-tight text-[#111111]">
            Solikos Pulse
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {/* WhatsApp */}
          <a
            href={getWhatsAppShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare size={13} />
            <span>WhatsApp</span>
          </a>

          {/* Email */}
          <button
            onClick={handleSendEmail}
            disabled={sendingEmail}
            className="bg-[#F4F4F3] hover:bg-[#EAEAEA] text-[#111111] text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Mail size={13} />
            <span>{sendingEmail ? 'Sending...' : 'Email'}</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="bg-[#F4F4F3] hover:bg-[#EAEAEA] text-[#111111] text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy link'}</span>
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="bg-[#F4F4F3] hover:bg-[#EAEAEA] text-[#111111] text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors hidden sm:flex"
          >
            <Printer size={13} />
            <span>Print</span>
          </button>

          {/* PDF Download */}
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="bg-[#111111] hover:bg-[#222222] text-white text-xs font-medium px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Download size={13} />
            <span>{downloading ? 'Preparing...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {emailStatus && (
        <div className="max-w-3xl mx-auto mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 print:hidden">
          <CheckCircle size={14} className="text-emerald-600 shrink-0" />
          <span>{emailStatus}</span>
        </div>
      )}

      {/* Invoice Letterhead Sheet */}
      <div
        ref={invoiceRef}
        id="printable-invoice"
        className="max-w-3xl mx-auto bg-white rounded-xl border border-[#ECECEB] shadow-xs p-8 sm:p-12 space-y-8 print:border-none print:shadow-none print:p-0 print:m-0"
      >
        {/* Letterhead Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-[#ECECEB]">
          {/* Solikos Branding */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <img src="/solikos-icon.png" alt="Solikos Energy" className="w-8 h-8 object-contain shrink-0" />
              <div>
                <span className="text-base font-bold tracking-tight text-[#111111] block leading-none">
                  SOLIKOS ENERGY
                </span>
                <span className="text-[10px] text-[#737373] tracking-wider uppercase font-medium">
                  {settings.tagline || 'Your Power, Our Priority'}
                </span>
              </div>
            </div>

            <div className="text-xs text-[#737373] space-y-0.5 pt-2">
              <p>{settings.address}</p>
              <p>
                {settings.rcNumber.startsWith('RC') ? settings.rcNumber : `RC ${settings.rcNumber}`} · {settings.taxId.startsWith('TIN') ? settings.taxId : `TIN ${settings.taxId}`}
              </p>
              <p>
                {settings.phone} · {settings.email}
              </p>
            </div>
          </div>

          {/* Invoice Meta */}
          <div className="sm:text-right space-y-1">
            <span className="text-xl font-bold tracking-tight text-[#111111] block">
              INVOICE
            </span>
            <p className="font-mono text-xs text-[#444444] font-medium">{invoice.invoiceNumber}</p>

            <div className="text-xs text-[#737373] space-y-0.5 pt-1">
              <p>Issued: {invoice.issueDate}</p>
              <p>Due: {invoice.dueDate}</p>
              <div className="pt-1">
                {invoice.status === 'paid' ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Paid
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Pending
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Billed To */}
        <div>
          <span className="text-[11px] font-medium text-[#737373] uppercase tracking-wider block mb-1">
            Billed to
          </span>
          <h3 className="font-semibold text-sm text-[#111111]">{invoice.customer.name}</h3>
          <div className="text-xs text-[#737373] mt-0.5 space-y-0.5">
            <p className="font-mono">{invoice.customer.phone}</p>
            {invoice.customer.email && <p>{invoice.customer.email}</p>}
            {invoice.customer.address && <p>{invoice.customer.address}</p>}
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FAFAFA] border-b border-[#ECECEB] text-[#737373] font-medium text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Item</th>
                <th className="py-2.5 px-2 text-center">Qty</th>
                <th className="py-2.5 px-3 text-right">Price</th>
                <th className="py-2.5 px-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F3]">
              {invoice.items.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAFAFA]/60">
                  <td className="py-3 px-3">
                    <div className="flex items-start gap-3">
                      {item.image && (
                        <div className="w-10 h-10 bg-white rounded-md border border-[#ECECEB] p-1 shrink-0 flex items-center justify-center">
                          <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-xs sm:text-sm text-[#111111] flex items-center gap-2">
                          <span>{item.title}</span>
                          {item.warranty && (
                            <span className="text-[10px] text-[#737373] bg-[#EEEEED] px-1.5 py-0.5 rounded">
                              {item.warranty}
                            </span>
                          )}
                        </div>
                        {item.specs && (
                          <div className="text-xs text-[#737373] mt-0.5">
                            {item.specs}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center font-mono text-xs text-[#444444]">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-xs text-[#444444]">
                    {formatMoney(item.unitPrice)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-xs font-medium text-[#111111]">
                    {formatMoney(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals & Notes Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 pt-4 border-t border-[#ECECEB]">
          {/* Bank Details & Terms */}
          <div className="sm:max-w-sm space-y-3 text-xs">
            {invoice.bankAccounts && invoice.bankAccounts.length > 0 && (
              <div>
                <span className="text-[11px] font-medium text-[#737373] uppercase tracking-wider block mb-1">
                  Bank details
                </span>
                <div className="space-y-1 text-xs text-[#444444] bg-[#FAFAFA] p-3 rounded-lg border border-[#ECECEB]">
                  {invoice.bankAccounts.map((b, i) => (
                    <div key={i}>
                      <span className="font-medium text-[#111111]">{b.bankName}</span>
                      <p className="font-mono text-[11px] text-[#737373]">
                        {b.accountNumber} · {b.accountName} ({b.currency})
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {invoice.paymentTerms && (
              <div>
                <span className="text-[11px] font-medium text-[#737373] uppercase tracking-wider block mb-0.5">
                  Payment terms
                </span>
                <p className="text-xs text-[#737373]">{invoice.paymentTerms}</p>
              </div>
            )}

            {invoice.notes && (
              <div>
                <span className="text-[11px] font-medium text-[#737373] uppercase tracking-wider block mb-0.5">
                  Notes
                </span>
                <p className="text-xs text-[#737373]">{invoice.notes}</p>
              </div>
            )}
          </div>

          {/* Calculation */}
          <div className="w-full sm:w-64 space-y-1.5 text-xs self-start">
            <div className="flex justify-between text-[#737373]">
              <span>Subtotal</span>
              <span className="font-mono text-[#111111]">{formatMoney(invoice.subtotal)}</span>
            </div>

            {invoice.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount ({invoice.discountRate}%)</span>
                <span className="font-mono">-{formatMoney(invoice.discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#737373]">
              <span>VAT ({invoice.taxRate}%)</span>
              <span className="font-mono text-[#111111]">
                {invoice.taxAmount > 0 ? `+${formatMoney(invoice.taxAmount)}` : 'Exempt'}
              </span>
            </div>

            <div className="pt-2 border-t border-[#ECECEB] flex justify-between items-baseline text-[#111111]">
              <span className="font-medium">Total</span>
              <span className="font-mono font-semibold text-base">
                {formatMoney(invoice.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-[#ECECEB] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A3A3A3] gap-2">
          <span>Thank you for choosing Solikos Energy.</span>
          <span>www.solikosenergyltd.com</span>
        </div>
      </div>
    </div>
  );
};

export default PublicInvoiceView;
