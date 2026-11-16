import React, { createContext, useContext, useState, useEffect } from 'react';
import { Invoice, Contact, CompanySettings, InvoiceStatus } from '../types';
import { defaultSettings, sampleInvoices, sampleContacts } from '../defaultData';

interface PulseContextType {
  invoices: Invoice[];
  contacts: Contact[];
  settings: CompanySettings;
  createInvoice: (invoiceData: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) => Invoice;
  updateInvoiceStatus: (id: string, status: InvoiceStatus) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  updateSettings: (updates: Partial<CompanySettings>) => void;
  getInvoiceById: (id: string) => Invoice | undefined;
  getContactByPhoneOrEmail: (phone: string, email?: string) => Contact | undefined;
}

const PulseContext = createContext<PulseContextType | undefined>(undefined);

export const PulseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const stored = localStorage.getItem('solikos_pulse_invoices');
      return stored ? JSON.parse(stored) : sampleInvoices;
    } catch {
      return sampleInvoices;
    }
  });

  const [contacts, setContacts] = useState<Contact[]>(() => {
    try {
      const stored = localStorage.getItem('solikos_pulse_contacts');
      return stored ? JSON.parse(stored) : sampleContacts;
    } catch {
      return sampleContacts;
    }
  });

  const [settings, setSettings] = useState<CompanySettings>(() => {
    try {
      const stored = localStorage.getItem('solikos_pulse_settings');
      return stored ? JSON.parse(stored) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // Persist state updates
  useEffect(() => {
    try {
      localStorage.setItem('solikos_pulse_invoices', JSON.stringify(invoices));
    } catch (e) {
      console.error('Failed to persist invoices', e);
    }
  }, [invoices]);

  useEffect(() => {
    try {
      localStorage.setItem('solikos_pulse_contacts', JSON.stringify(contacts));
    } catch (e) {
      console.error('Failed to persist contacts', e);
    }
  }, [contacts]);

  useEffect(() => {
    try {
      localStorage.setItem('solikos_pulse_settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to persist settings', e);
    }
  }, [settings]);

  // Automatic Contact Harvesting Engine
  const harvestContact = (invoice: Invoice) => {
    const cust = invoice.customer;
    if (!cust.phone && !cust.name) return;

    setContacts((prevContacts) => {
      const cleanPhone = cust.phone.replace(/[\s\-\(\)]/g, '').toLowerCase();
      const cleanEmail = cust.email ? cust.email.trim().toLowerCase() : '';

      const existingIndex = prevContacts.findIndex((c) => {
        const cPhone = c.phone.replace(/[\s\-\(\)]/g, '').toLowerCase();
        const cEmail = c.email ? c.email.trim().toLowerCase() : '';
        return (cleanPhone && cPhone === cleanPhone) || (cleanEmail && cEmail === cleanEmail);
      });

      const isPaid = invoice.status === 'paid';
      const invoiceAmount = invoice.total;

      if (existingIndex >= 0) {
        const existing = prevContacts[existingIndex];
        const updatedContact: Contact = {
          ...existing,
          name: cust.name || existing.name,
          phone: cust.phone || existing.phone,
          email: cust.email || existing.email,
          address: cust.address || existing.address,
          totalInvoiced: existing.totalInvoiced + invoiceAmount,
          totalPaid: isPaid ? existing.totalPaid + invoiceAmount : existing.totalPaid,
          invoiceCount: existing.invoiceCount + 1,
          lastInvoiceDate: invoice.issueDate || new Date().toISOString().split('T')[0],
        };

        const updated = [...prevContacts];
        updated[existingIndex] = updatedContact;
        return updated;
      } else {
        const newContact: Contact = {
          id: `cnt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          name: cust.name,
          phone: cust.phone,
          email: cust.email,
          address: cust.address,
          totalInvoiced: invoiceAmount,
          totalPaid: isPaid ? invoiceAmount : 0,
          invoiceCount: 1,
          lastInvoiceDate: invoice.issueDate || new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
        };
        return [newContact, ...prevContacts];
      }
    });
  };

  const createInvoice = (data: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>): Invoice => {
    const id = `slk-inv-${Date.now()}`;
    const now = new Date().toISOString();
    const newInvoice: Invoice = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };

    setInvoices((prev) => [newInvoice, ...prev]);
    harvestContact(newInvoice);
    return newInvoice;
  };

  const updateInvoiceStatus = (id: string, status: InvoiceStatus) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status, updatedAt: new Date().toISOString() } : inv))
    );
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, ...updates, updatedAt: new Date().toISOString() } : inv))
    );
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const updateSettings = (updates: Partial<CompanySettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const getInvoiceById = (id: string): Invoice | undefined => {
    return invoices.find((inv) => inv.id === id || inv.invoiceNumber.toLowerCase() === id.toLowerCase());
  };

  const getContactByPhoneOrEmail = (phone: string, email?: string): Contact | undefined => {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '').toLowerCase();
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    return contacts.find((c) => {
      const cPhone = c.phone.replace(/[\s\-\(\)]/g, '').toLowerCase();
      const cEmail = c.email ? c.email.trim().toLowerCase() : '';
      return (cleanPhone && cPhone === cleanPhone) || (cleanEmail && cEmail === cleanEmail);
    });
  };

  return (
    <PulseContext.Provider
      value={{
        invoices,
        contacts,
        settings,
        createInvoice,
        updateInvoiceStatus,
        updateInvoice,
        deleteInvoice,
        updateSettings,
        getInvoiceById,
        getContactByPhoneOrEmail,
      }}
    >
      {children}
    </PulseContext.Provider>
  );
};

export const usePulse = () => {
  const context = useContext(PulseContext);
  if (!context) {
    throw new Error('usePulse must be used within a PulseProvider');
  }
  return context;
};
