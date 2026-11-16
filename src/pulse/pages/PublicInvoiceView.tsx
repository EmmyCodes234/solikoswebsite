import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Download,
  Printer,
  Copy,
  Check,
  Mail,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { usePulse } from '../context/PulseContext';
import { sendInvoiceViaResend } from '../services/emailService';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

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
        <div className="bg-white p-8 rounded-lg border border-[#ECECEB] shadow-xs max-w-md text-center space-y-4">
          <AlertCircle size={36} className="mx-auto text-amber-600" />
          <h1 className="text-lg font-semibold">Invoice not found</h1>
          <p className="text-xs text-[#737373]">
            This invoice link may be invalid or has expired. Please contact Solikos Energy for assistance.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-block bg-[#111111] text-white text-xs font-medium px-4 py-2 rounded-md hover:bg-[#262626] transition-colors"
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

  // Direct vector PDF generator: Clean, calm executive A4 letterhead layout
  const handleDownloadPdf = async () => {
    setDownloading(true);

    try {
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
      const margin = 20;
      let y = margin;

      // Header: Solikos executive letterhead
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.setTextColor(17, 17, 17);
      doc.text('SOLIKOS ENERGY', margin, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(115, 115, 115);
      doc.text(settings.tagline || 'Your Power, Our Priority', margin, y + 10);
      doc.text(settings.address, margin, y + 15);

      const rcStr = settings.rcNumber.startsWith('RC') ? settings.rcNumber : `RC ${settings.rcNumber}`;
      const tinStr = settings.taxId.startsWith('TIN') ? settings.taxId : `TIN ${settings.taxId}`;
      doc.text(`${rcStr}  ·  ${tinStr}`, margin, y + 19.5);
      doc.text(`Tel: ${settings.phone}  ·  Email: ${settings.email}`, margin, y + 24);

      // Invoice info on right
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(18);
      doc.setTextColor(17, 17, 17);
      doc.text('INVOICE', pageWidth - margin, y + 5, { align: 'right' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(17, 17, 17);
      doc.text(invoice.invoiceNumber, pageWidth - margin, y + 11, { align: 'right' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(115, 115, 115);
      doc.text(`Issued: ${invoice.issueDate}`, pageWidth - margin, y + 16, { align: 'right' });
      doc.text(`Due: ${invoice.dueDate}`, pageWidth - margin, y + 20.5, { align: 'right' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      if (invoice.status === 'paid') {
        doc.setTextColor(16, 149, 84);
        doc.text('Status: PAID', pageWidth - margin, y + 25, { align: 'right' });
      } else {
        doc.setTextColor(180, 83, 9);
        doc.text('Status: PAYMENT PENDING', pageWidth - margin, y + 25, { align: 'right' });
      }

      y += 32;

      // Divider line
      doc.setDrawColor(231, 231, 229);
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageWidth - margin, y);

      y += 8;

      // Billed To & Terms Section
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(115, 115, 115);
      doc.text('BILLED TO', margin, y);
      doc.text('PAYMENT TERMS', pageWidth / 2 + 10, y);

      y += 5;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(17, 17, 17);
      doc.text(invoice.customer.name, margin, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(68, 68, 68);
      let clientY = y + 4.5;
      doc.text(invoice.customer.phone, margin, clientY);
      if (invoice.customer.email) {
        clientY += 4.5;
        doc.text(invoice.customer.email, margin, clientY);
      }
      if (invoice.customer.address) {
        clientY += 4.5;
        doc.text(invoice.customer.address, margin, clientY);
      }

      // Terms on right
      doc.setFontSize(8);
      doc.setTextColor(85, 85, 85);
      const splitTerms = doc.splitTextToSize(invoice.paymentTerms || 'Standard terms apply.', (pageWidth - margin) - (pageWidth / 2 + 10));
      doc.text(splitTerms, pageWidth / 2 + 10, y);

      y = Math.max(clientY + 8, y + 18);

      // Line Items Table Header
      doc.setDrawColor(17, 17, 17);
      doc.setLineWidth(0.4);
      doc.line(margin, y, pageWidth - margin, y);

      y += 4.5;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(115, 115, 115);
      doc.text('ITEM & SPECIFICATIONS', margin, y);
      doc.text('WARRANTY', margin + 98, y);
      doc.text('QTY', margin + 124, y, { align: 'center' });
      doc.text('RATE', margin + 148, y, { align: 'right' });
      doc.text('TOTAL', pageWidth - margin, y, { align: 'right' });

      y += 2.5;
      doc.setDrawColor(231, 231, 229);
      doc.setLineWidth(0.2);
      doc.line(margin, y, pageWidth - margin, y);

      y += 5;

      // Line Items Rows
      invoice.items.forEach((item) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(17, 17, 17);
        doc.text(item.title, margin, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(115, 115, 115);
        const specSummary = (item.specs || item.description || '').slice(0, 75);
        doc.text(specSummary, margin, y + 4);

        // Warranty
        if (item.warranty) {
          doc.text(item.warranty, margin + 98, y);
        }

        // Qty
        doc.setFontSize(8);
        doc.setTextColor(68, 68, 68);
        doc.text(item.quantity.toString(), margin + 124, y, { align: 'center' });

        // Price
        doc.text(formatMoney(item.unitPrice), margin + 148, y, { align: 'right' });

        // Total
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(17, 17, 17);
        doc.text(formatMoney(item.total), pageWidth - margin, y, { align: 'right' });

        y += 7.5;
        doc.setDrawColor(240, 240, 239);
        doc.line(margin, y, pageWidth - margin, y);
        y += 4;
      });

      y += 2;

      // Totals Block
      const totalsX = pageWidth - margin - 70;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(115, 115, 115);
      doc.text('Subtotal:', totalsX, y);
      doc.setTextColor(17, 17, 17);
      doc.text(formatMoney(invoice.subtotal), pageWidth - margin, y, { align: 'right' });

      if (invoice.discountAmount > 0) {
        y += 5;
        doc.setTextColor(115, 115, 115);
        doc.text(`Discount (${invoice.discountRate}%):`, totalsX, y);
        doc.setTextColor(16, 149, 84);
        doc.text(`-${formatMoney(invoice.discountAmount)}`, pageWidth - margin, y, { align: 'right' });
      }

      y += 5;
      doc.setTextColor(115, 115, 115);
      doc.text(`VAT (${invoice.taxRate}%):`, totalsX, y);
      doc.setTextColor(17, 17, 17);
      doc.text(invoice.taxAmount > 0 ? `+${formatMoney(invoice.taxAmount)}` : 'Exempt', pageWidth - margin, y, { align: 'right' });

      y += 5.5;
      doc.setDrawColor(17, 17, 17);
      doc.setLineWidth(0.4);
      doc.line(totalsX, y, pageWidth - margin, y);
      y += 5;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(17, 17, 17);
      doc.text('Total Amount Due:', totalsX, y);
      doc.text(formatMoney(invoice.total), pageWidth - margin, y, { align: 'right' });

      y += 14;

      // Bank Details
      if (invoice.bankAccounts && invoice.bankAccounts.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(115, 115, 115);
        doc.text('BANK TRANSFER DETAILS', margin, y);

        y += 4.5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(68, 68, 68);

        invoice.bankAccounts.forEach((b) => {
          doc.text(`${b.bankName}  ·  Account: ${b.accountNumber}  ·  Name: ${b.accountName} (${b.currency})`, margin, y);
          y += 4;
        });
      }

      // Notes
      if (invoice.notes) {
        y += 2;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(115, 115, 115);
        doc.text('NOTES', margin, y);

        y += 4;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(115, 115, 115);
        const splitNotes = doc.splitTextToSize(invoice.notes, pageWidth - margin * 2);
        doc.text(splitNotes, margin, y);
      }

      // Footer
      const footerY = doc.internal.pageSize.getHeight() - 14;
      doc.setDrawColor(231, 231, 229);
      doc.setLineWidth(0.3);
      doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(163, 163, 163);
      doc.text('Solikos Energy LTD  ·  CAC RC 7492810  ·  www.solikosenergyltd.com', margin, footerY);

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

  const rcDisplay = settings.rcNumber.startsWith('RC') ? settings.rcNumber : `RC ${settings.rcNumber}`;
  const tinDisplay = settings.taxId.startsWith('TIN') ? settings.taxId : `TIN ${settings.taxId}`;

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#111111] antialiased">
      {/* Action Bar (Hidden in Print) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 bg-white py-2.5 px-4 rounded-lg border border-[#ECECEB] shadow-xs print:hidden">
        <div className="flex items-center gap-2.5">
          <img src="/solikos-icon.png" alt="Solikos" className="w-6 h-6 object-contain" />
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-[#111111]">Solikos Energy</span>
            <span className="text-[#CCCCCC]">·</span>
            <span className="text-[#737373]">Invoice {invoice.invoiceNumber}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Official WhatsApp Button */}
          <a
            href={getWhatsAppShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-medium px-3.5 py-1.5 rounded-md transition-colors shadow-xs"
            title="Share via WhatsApp"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Email */}
          <button
            onClick={handleSendEmail}
            disabled={sendingEmail}
            className="inline-flex items-center gap-1.5 bg-[#FBFBFA] hover:bg-[#F4F4F3] border border-[#ECECEB] text-[#111111] text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
          >
            <Mail size={13} className="text-[#666666]" />
            <span>{sendingEmail ? 'Sending...' : 'Email'}</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 bg-[#FBFBFA] hover:bg-[#F4F4F3] border border-[#ECECEB] text-[#111111] text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
          >
            {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} className="text-[#666666]" />}
            <span>{copied ? 'Copied' : 'Copy link'}</span>
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 bg-[#FBFBFA] hover:bg-[#F4F4F3] border border-[#ECECEB] text-[#111111] text-xs font-medium px-3 py-1.5 rounded-md transition-colors hidden sm:inline-flex"
          >
            <Printer size={13} className="text-[#666666]" />
            <span>Print</span>
          </button>

          {/* PDF Download */}
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 bg-[#111111] hover:bg-[#262626] text-white text-xs font-medium px-3.5 py-1.5 rounded-md transition-colors shadow-xs"
          >
            <Download size={13} />
            <span>{downloading ? 'Preparing...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {emailStatus && (
        <div className="max-w-4xl mx-auto mb-4 p-3 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 print:hidden">
          <CheckCircle size={14} className="text-emerald-600 shrink-0" />
          <span>{emailStatus}</span>
        </div>
      )}

      {/* Invoice Letterhead Sheet (Crisp Stationery Canvas) */}
      <div
        ref={invoiceRef}
        id="printable-invoice"
        className="max-w-4xl mx-auto bg-white rounded-md border border-[#E7E7E5] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_12px_28px_-6px_rgba(0,0,0,0.03)] p-8 sm:p-14 lg:p-16 space-y-10 print:border-none print:shadow-none print:p-0 print:m-0"
      >
        {/* Letterhead Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b border-[#E7E7E5]">
          {/* Brand & Legal Info */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <img src="/solikos-icon.png" alt="Solikos Energy" className="w-9 h-9 object-contain shrink-0" />
              <div>
                <span className="text-lg font-bold tracking-tight text-[#111111] block leading-none">
                  SOLIKOS ENERGY
                </span>
                <span className="text-[10px] text-[#888888] tracking-[0.22em] uppercase font-medium mt-0.5 block">
                  {settings.tagline || 'Your Power, Our Priority'}
                </span>
              </div>
            </div>

            <div className="text-xs text-[#666666] leading-relaxed pt-3 space-y-0.5 font-normal">
              <p>{settings.address}</p>
              <p>
                {rcDisplay} · {tinDisplay}
              </p>
              <p>
                {settings.phone} · {settings.email}
              </p>
            </div>
          </div>

          {/* Invoice Meta */}
          <div className="sm:text-right space-y-1">
            <span className="text-2xl sm:text-3xl font-light tracking-tight text-[#111111] block uppercase">
              INVOICE
            </span>
            <p className="font-mono text-xs font-semibold text-[#111111] mt-1">{invoice.invoiceNumber}</p>

            <div className="text-xs text-[#666666] space-y-1 pt-1.5">
              <p>Issued: <span className="text-[#111111] font-medium">{invoice.issueDate}</span></p>
              <p>Due: <span className="text-[#111111] font-medium">{invoice.dueDate}</span></p>
              <div className="pt-1">
                {invoice.status === 'paid' ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Paid
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Payment Pending
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Billed To & Payment Terms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
          <div>
            <span className="text-[10px] font-semibold text-[#888888] tracking-[0.18em] uppercase block mb-1.5">
              Billed to
            </span>
            <h2 className="text-base font-semibold text-[#111111]">{invoice.customer.name}</h2>
            <div className="text-xs text-[#555555] space-y-0.5 mt-1 font-normal leading-relaxed">
              <p className="font-mono">{invoice.customer.phone}</p>
              {invoice.customer.email && <p>{invoice.customer.email}</p>}
              {invoice.customer.address && <p>{invoice.customer.address}</p>}
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-[10px] font-semibold text-[#888888] tracking-[0.18em] uppercase block mb-1.5">
              Payment terms
            </span>
            <p className="text-xs text-[#555555] leading-relaxed">
              {invoice.paymentTerms || 'Payment due upon invoice receipt.'}
            </p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-t border-[#111111]">
            <thead className="border-b border-[#E7E7E5] text-[#666666] font-medium text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-1">Description</th>
                <th className="py-3 px-2">Warranty</th>
                <th className="py-3 px-2 text-center">Qty</th>
                <th className="py-3 px-3 text-right">Rate</th>
                <th className="py-3 px-1 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0EF]">
              {invoice.items.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAFAFA]/50 transition-colors">
                  <td className="py-4 px-1">
                    <div className="flex items-start gap-3">
                      {item.image && (
                        <div className="w-10 h-10 bg-[#FAFAFA] rounded border border-[#E7E7E5] p-1 shrink-0 flex items-center justify-center">
                          <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-[#111111]">
                          {item.title}
                        </div>
                        {item.specs && (
                          <div className="text-xs text-[#666666] mt-0.5 leading-normal">
                            {item.specs}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-xs text-[#666666] whitespace-nowrap">
                    {item.warranty || '—'}
                  </td>
                  <td className="py-4 px-2 text-center font-mono text-xs text-[#444444] whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="py-4 px-3 text-right font-mono text-xs text-[#444444] whitespace-nowrap">
                    {formatMoney(item.unitPrice)}
                  </td>
                  <td className="py-4 px-1 text-right font-mono text-xs font-semibold text-[#111111] whitespace-nowrap">
                    {formatMoney(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bank Details & Financial Totals */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 pt-4">
          {/* Bank Accounts & Notes */}
          <div className="sm:max-w-md space-y-4 text-xs">
            {invoice.bankAccounts && invoice.bankAccounts.length > 0 && (
              <div>
                <span className="text-[10px] font-semibold text-[#888888] tracking-[0.18em] uppercase block mb-2">
                  Bank transfer details
                </span>
                <div className="space-y-2 bg-[#FAFAFA] p-3.5 rounded-md border border-[#E7E7E5]">
                  {invoice.bankAccounts.map((b, i) => (
                    <div key={i} className="text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#111111]">{b.bankName}</span>
                        <span className="text-[10px] font-medium text-[#737373] bg-[#EEEEED] px-1.5 py-0.2 rounded font-mono">
                          {b.currency}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-[#111111] font-medium mt-0.5">
                        {b.accountNumber}
                      </p>
                      <p className="text-[11px] text-[#666666]">
                        {b.accountName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {invoice.notes && (
              <div>
                <span className="text-[10px] font-semibold text-[#888888] tracking-[0.18em] uppercase block mb-1">
                  Notes &amp; Warranty
                </span>
                <p className="text-xs text-[#737373] leading-relaxed">{invoice.notes}</p>
              </div>
            )}
          </div>

          {/* Calculations Summary */}
          <div className="w-full sm:w-80 space-y-2 text-xs self-start">
            <div className="flex justify-between text-[#666666]">
              <span>Subtotal</span>
              <span className="font-mono text-[#111111]">{formatMoney(invoice.subtotal)}</span>
            </div>

            {invoice.discountAmount > 0 && (
              <div className="flex justify-between text-[#666666]">
                <span>Discount ({invoice.discountRate}%)</span>
                <span className="font-mono text-emerald-700">-{formatMoney(invoice.discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#666666]">
              <span>VAT ({invoice.taxRate}%)</span>
              <span className="font-mono text-[#111111]">
                {invoice.taxAmount > 0 ? `+${formatMoney(invoice.taxAmount)}` : 'Exempt'}
              </span>
            </div>

            <div className="pt-2.5 border-t border-[#111111] flex justify-between items-baseline text-[#111111]">
              <span className="font-semibold text-xs whitespace-nowrap">Total Amount Due</span>
              <span className="font-mono font-bold text-base sm:text-lg whitespace-nowrap">
                {formatMoney(invoice.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Corporate Sign-off & Footer */}
        <div className="pt-8 border-t border-[#E7E7E5] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#888888] gap-3">
          <div>
            <p className="font-medium text-[#111111]">
              {settings.authorizedSignatoryName || 'Solikos Energy LTD'}
            </p>
            <p className="text-[11px] text-[#737373]">
              {settings.authorizedSignatoryTitle || 'Authorized Representative'}
            </p>
          </div>

          <div className="text-right text-[11px] text-[#A3A3A3] space-y-0.5">
            <p>Thank you for choosing Solikos Energy.</p>
            <p>www.solikosenergyltd.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicInvoiceView;
