export type Currency = 'NGN' | 'USD';

export type InvoiceStatus = 'draft' | 'issued' | 'paid' | 'overdue' | 'cancelled';

export interface InvoiceItem {
  id: string;
  productId?: string;
  title: string;
  description: string;
  specs?: string;
  warranty?: string;
  image?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface BankAccount {
  currency: Currency;
  bankName: string;
  accountName: string;
  accountNumber: string;
  swiftCode?: string;
  sortCode?: string;
  routingNumber?: string;
}

export interface InvoiceCustomer {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  customer: InvoiceCustomer;
  items: InvoiceItem[];
  currency: Currency;
  subtotal: number;
  discountRate: number; // percentage (e.g. 5 for 5%)
  discountAmount: number;
  taxRate: number; // percentage (e.g. 7.5 for 7.5% or 0)
  taxAmount: number;
  total: number;
  paymentTerms: string; // e.g. "70% commitment deposit, 30% prior to dispatch"
  notes?: string;
  bankAccounts: BankAccount[];
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  totalInvoiced: number;
  totalPaid: number;
  invoiceCount: number;
  lastInvoiceDate: string;
  createdAt: string;
}

export interface CompanySettings {
  companyName: string;
  tagline: string;
  rcNumber: string;
  taxId: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  defaultCurrency: Currency;
  defaultTaxRate: number;
  defaultPaymentTerms: string;
  defaultNotes: string;
  bankAccounts: BankAccount[];
  authorizedSignatoryName: string;
  authorizedSignatoryTitle: string;
  signatureImage?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales' | 'finance';
  avatar?: string;
}
