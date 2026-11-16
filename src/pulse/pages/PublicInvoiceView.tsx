import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Download,
  Printer,
  Share2,
  Copy,
  Check,
  MessageSquare,
  Mail,
  Shield,
  Clock,
  CheckCircle,
  Building2,
  Phone,
  Calendar,
  AlertCircle,
  Send,
} from 'lucide-react';
import html2canvas from 'html2canvas';
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl max-w-md text-center space-y-4">
          <AlertCircle size={40} className="mx-auto text-amber-500" />
          <h1 className="text-xl font-bold">Commercial Invoice Not Found</h1>
          <p className="text-xs text-slate-500">
            The requested invoice link may be invalid or has expired. Please contact Solikos Energy for assistance.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-block bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-xl"
            >
              Return to Solikos Home
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

  const handleDownloadPdf = async () => {
    if (!invoiceRef.current) return;
    setDownloading(true);

    try {
      const element = invoiceRef.current;
      const canvas = await html2canvas(element, {
        scale: 2.5, // Crisp 250+ DPI for A4
        useCORS: true,
        backgroundColor: '#FFFFFF',
        logging: false,
        onclone: (clonedDoc) => {
          // Replace modern oklch/oklab color functions in stylesheets so html2canvas doesn't fail
          const styleTags = clonedDoc.querySelectorAll('style');
          styleTags.forEach((tag) => {
            if (tag.textContent) {
              tag.textContent = tag.textContent
                .replace(/oklch\([^)]+\)/gi, '#0F172A')
                .replace(/oklab\([^)]+\)/gi, '#0F172A');
            }
          });

          // Ensure printable container has explicit standard colors
          const printable = clonedDoc.getElementById('printable-invoice');
          if (printable) {
            printable.style.backgroundColor = '#FFFFFF';
            printable.style.color = '#0F172A';
          }
        },
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Solikos_Invoice_${invoice.invoiceNumber}.pdf`);
    } catch (err) {
      console.warn('Canvas PDF export fallback to native print:', err);
      // Seamless native print-to-PDF fallback
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
      `Hello ${invoice.customer.name},\n\nYour official commercial invoice (${invoice.invoiceNumber}) from Solikos Energy LTD for ${formatMoney(
        invoice.total
      )} is ready.\n\nReview specifications and download your vector PDF here:\n${currentUrl}\n\nSolikos Energy LTD - Your Power, Our Priority.`
    );
    return `https://wa.me/${cleanPhone}?text=${text}`;
  };

  const handleSendEmail = async () => {
    if (!invoice.customer.email) {
      const inputEmail = window.prompt('Enter client email address to send invoice:');
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
    <div className="min-h-screen bg-slate-100/80 py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-900 selection:bg-amber-100">
      {/* Action Bar (Hidden in Print) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div className="flex items-center gap-2.5">
          <img src="/solikos-icon.png" alt="Solikos" className="w-8 h-8 object-contain" />
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-sm uppercase text-slate-900">Solikos Pulse</span>
            <span className="text-[9px] font-bold tracking-widest text-amber-600 uppercase">
              Digital Document
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* WhatsApp Direct */}
          <a
            href={getWhatsAppShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <MessageSquare size={14} />
            <span>WhatsApp</span>
          </a>

          {/* Email Resend */}
          <button
            onClick={handleSendEmail}
            disabled={sendingEmail}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Mail size={14} />
            <span>{sendingEmail ? 'Dispatching...' : 'Email'}</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors hidden sm:flex"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>

          {/* PDF Download */}
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download size={14} />
            <span>{downloading ? 'Exporting PDF...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {emailStatus && (
        <div className="max-w-4xl mx-auto mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2 print:hidden">
          <CheckCircle size={15} className="text-amber-600 shrink-0" />
          <span>{emailStatus}</span>
        </div>
      )}

      {/* Invoice A4 Paper Sheet */}
      <div
        ref={invoiceRef}
        id="printable-invoice"
        className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-12 lg:p-14 space-y-8 print:border-none print:shadow-none print:p-0 print:m-0"
      >
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b border-slate-200">
          {/* Company Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <img src="/solikos-icon.png" alt="Solikos Energy" className="w-12 h-12 object-contain shrink-0" />
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tight uppercase text-slate-900">
                  SOLIKOS
                </span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-600 mt-1">
                  ENERGY
                </span>
              </div>
            </div>

            <p className="text-xs font-bold text-slate-700 tracking-wide uppercase pt-1">
              {settings.tagline}
            </p>

            <div className="text-xs text-slate-500 space-y-0.5 pt-1">
              <p>{settings.address}</p>
              <p>
                RC: <span className="font-mono">{settings.rcNumber}</span> &bull; TIN:{' '}
                <span className="font-mono">{settings.taxId}</span>
              </p>
              <p>
                Email: {settings.email} &bull; Tel: {settings.phone}
              </p>
            </div>
          </div>

          {/* Invoice Identity */}
          <div className="sm:text-right space-y-2">
            <span className="inline-block bg-slate-900 text-white font-mono font-bold text-xs uppercase px-3 py-1 rounded-full tracking-widest">
              Commercial Invoice
            </span>

            <h2 className="text-xl sm:text-2xl font-black font-mono text-slate-900 pt-1">
              {invoice.invoiceNumber}
            </h2>

            <div className="text-xs text-slate-600 space-y-1">
              <p>
                <span className="text-slate-400">Issue Date:</span>{' '}
                <span className="font-semibold text-slate-800">{invoice.issueDate}</span>
              </p>
              <p>
                <span className="text-slate-400">Due Date:</span>{' '}
                <span className="font-semibold text-slate-800">{invoice.dueDate}</span>
              </p>
              <p>
                <span className="text-slate-400">Status:</span>{' '}
                <span
                  className={`font-bold uppercase text-[11px] px-2 py-0.5 rounded-full ${
                    invoice.status === 'paid'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {invoice.status}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bill To Info */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
              Invoiced To (Client)
            </span>
            <h3 className="font-bold text-base text-slate-900">{invoice.customer.name}</h3>
            {invoice.customer.address && (
              <p className="text-xs text-slate-600 mt-1">{invoice.customer.address}</p>
            )}
          </div>

          <div className="sm:text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
              Contact Verified
            </span>
            <p className="text-xs font-mono font-bold text-slate-800">{invoice.customer.phone}</p>
            {invoice.customer.email && (
              <p className="text-xs text-slate-600 mt-0.5">{invoice.customer.email}</p>
            )}
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Hardware Item &amp; Technical Specifications</th>
                <th className="py-3 px-3 text-center">Qty</th>
                <th className="py-3 px-3 text-right">Unit Price</th>
                <th className="py-3 px-4 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoice.items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-4">
                    <div className="flex items-start gap-3">
                      {item.image && (
                        <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 p-1 shrink-0 flex items-center justify-center">
                          <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <span>{item.title}</span>
                          {item.warranty && (
                            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                              {item.warranty}
                            </span>
                          )}
                        </div>
                        {item.specs && (
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                            {item.specs}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-center font-mono text-slate-700">{item.quantity}</td>
                  <td className="py-4 px-3 text-right font-mono text-slate-700">
                    {formatMoney(item.unitPrice)}
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-slate-900">
                    {formatMoney(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation Totals */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 pt-4 border-t border-slate-200">
          <div className="sm:max-w-xs space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
              Payment Milestones
            </span>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {invoice.paymentTerms}
            </p>
          </div>

          <div className="w-full sm:w-72 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono font-semibold text-slate-800">
                {formatMoney(invoice.subtotal)}
              </span>
            </div>

            {invoice.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount ({invoice.discountRate}%):</span>
                <span className="font-mono font-semibold">-{formatMoney(invoice.discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>VAT / Tax ({invoice.taxRate}%):</span>
              <span className="font-mono font-semibold">
                {invoice.taxAmount > 0 ? `+${formatMoney(invoice.taxAmount)}` : 'Exempt (Clean Energy)'}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="font-bold text-slate-900 text-sm">Grand Total:</span>
              <span className="font-mono font-black text-xl text-amber-700">
                {formatMoney(invoice.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Bank Wire Information */}
        {invoice.bankAccounts && invoice.bankAccounts.length > 0 && (
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Building2 size={16} className="text-amber-600" />
              <span>Official Corporate Remittance Account Details</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {invoice.bankAccounts.map((b, i) => (
                <div key={i} className="p-3 bg-white rounded-xl border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-800">
                    {b.bankName} ({b.currency})
                  </div>
                  <div className="text-slate-500">
                    Beneficiary:{' '}
                    <span className="font-semibold text-slate-700">{b.accountName}</span>
                  </div>
                  <div className="font-mono font-black text-sm text-slate-900">
                    Account: {b.accountNumber}
                  </div>
                  {b.swiftCode && (
                    <div className="text-[11px] font-mono text-slate-400">
                      SWIFT: {b.swiftCode}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Endorsements / Digital Signatory */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="text-xs text-slate-500 max-w-md space-y-1">
            <p className="font-bold text-slate-700">Warranty &amp; Supply Terms:</p>
            <p className="leading-relaxed">{invoice.notes || settings.defaultNotes}</p>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <div className="font-serif italic text-lg font-bold text-slate-900 mb-1">
              {settings.authorizedSignatoryName}
            </div>
            <div className="h-0.5 w-40 bg-slate-300 sm:ml-auto my-1.5" />
            <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest font-bold">
              {settings.authorizedSignatoryTitle}
            </div>
            <div className="text-[9px] text-amber-600 font-mono font-bold mt-1">
              SOLIKOS ENERGY &bull; AUTHORIZED ENDORSEMENT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicInvoiceView;
