import type { LeadItem } from '../types';

export const exportLeadsToCSV = (leads: LeadItem[], filename = 'ruveron_leads_export.csv') => {
  if (!leads || leads.length === 0) {
    alert('No lead records available to export.');
    return;
  }

  const headers = [
    'Lead ID',
    'Lead Category (Type)',
    'Service / Solution Name',
    'Full Name',
    'Phone',
    'Email',
    'Company',
    'Location',
    'Requirement',
    'Source',
    'Status',
    'Created At',
    'Last Updated',
    'Total Notes Count'
  ];

  const escapeCSV = (field: string | number | undefined | null): string => {
    if (field === undefined || field === null) return '""';
    const str = String(field).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = leads.map((lead) => [
    escapeCSV(lead.id),
    escapeCSV(lead.leadType || 'Service'),
    escapeCSV(lead.serviceOrSolutionName || 'General'),
    escapeCSV(lead.fullName),
    escapeCSV(lead.phone),
    escapeCSV(lead.email),
    escapeCSV(lead.company),
    escapeCSV(lead.location),
    escapeCSV(lead.requirement),
    escapeCSV(lead.source),
    escapeCSV(lead.status),
    escapeCSV(new Date(lead.createdAt).toLocaleDateString() + ' ' + new Date(lead.createdAt).toLocaleTimeString()),
    escapeCSV(new Date(lead.updatedAt).toLocaleDateString() + ' ' + new Date(lead.updatedAt).toLocaleTimeString()),
    escapeCSV(lead.notes ? lead.notes.length : 0),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
