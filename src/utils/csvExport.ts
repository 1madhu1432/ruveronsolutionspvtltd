import type { LeadItem } from '../types';

export interface ExportColumnOption {
  id: string;
  label: string;
  getValue: (lead: LeadItem) => string | number;
}

export const defaultExportColumns: ExportColumnOption[] = [
  { id: 'id', label: 'Lead ID', getValue: (l) => l.id },
  {
    id: 'createdAt',
    label: 'Date Created',
    getValue: (l) =>
      new Date(l.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }) +
      ' ' +
      new Date(l.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
  { id: 'leadType', label: 'Category', getValue: (l) => l.leadType || 'Service' },
  { id: 'serviceOrSolutionName', label: 'Enquiry Subject', getValue: (l) => l.serviceOrSolutionName || 'General' },
  { id: 'fullName', label: 'Client Full Name', getValue: (l) => l.fullName },
  { id: 'phone', label: 'Phone Number', getValue: (l) => l.phone },
  { id: 'email', label: 'Email Address', getValue: (l) => l.email },
  { id: 'company', label: 'Company Name', getValue: (l) => l.company || 'N/A' },
  { id: 'location', label: 'Operating Location', getValue: (l) => l.location || 'N/A' },
  { id: 'source', label: 'Source Channel', getValue: (l) => l.source },
  { id: 'status', label: 'Pipeline Status', getValue: (l) => l.status },
  { id: 'requirement', label: 'Requirement Details', getValue: (l) => l.requirement || '' },
  { id: 'notesCount', label: 'Notes Count', getValue: (l) => (l.notes ? l.notes.length : 0) },
  {
    id: 'updatedAt',
    label: 'Last Updated',
    getValue: (l) =>
      new Date(l.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
  },
];

const escapeCSV = (field: string | number | undefined | null): string => {
  if (field === undefined || field === null) return '""';
  const str = String(field).replace(/"/g, '""');
  return `"${str}"`;
};

/**
 * Exports leads to CSV with UTF-8 BOM for full Microsoft Excel compatibility
 */
export const exportLeadsToCSV = (
  leads: LeadItem[],
  filename = 'ruveron_leads_export.csv',
  selectedColumnIds?: string[]
) => {
  if (!leads || leads.length === 0) {
    alert('No lead records available to export.');
    return;
  }

  const columns = selectedColumnIds
    ? defaultExportColumns.filter((col) => selectedColumnIds.includes(col.id))
    : defaultExportColumns;

  const headers = columns.map((col) => escapeCSV(col.label)).join(',');
  const rows = leads.map((lead) => {
    return columns.map((col) => escapeCSV(col.getValue(lead))).join(',');
  });

  // \uFEFF is the UTF-8 Byte Order Mark for Excel
  const csvContent = '\uFEFF' + [headers, ...rows].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Exports leads to structured JSON format for developer or CRM import
 */
export const exportLeadsToJSON = (
  leads: LeadItem[],
  filename = 'ruveron_leads_export.json'
) => {
  if (!leads || leads.length === 0) {
    alert('No lead records available to export.');
    return;
  }

  const jsonContent = JSON.stringify(leads, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.json') ? filename : `${filename}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Opens a print-ready executive PDF / HTML report in a new browser window
 */
export const printLeadsReport = (leads: LeadItem[], title = 'Ruveron Solutions — Lead Pipeline Report') => {
  if (!leads || leads.length === 0) {
    alert('No lead records to generate a print report.');
    return;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to open the print report window.');
    return;
  }

  const generatedDate = new Date().toLocaleString();
  const newCount = leads.filter((l) => l.status === 'New').length;
  const contactedCount = leads.filter((l) => l.status === 'Contacted').length;
  const qualifiedCount = leads.filter((l) => l.status === 'Qualified').length;
  const convertedCount = leads.filter((l) => l.status === 'Converted').length;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #1e293b;
            padding: 30px;
            margin: 0;
            background: #ffffff;
            font-size: 11px;
          }
          .header {
            border-bottom: 2px solid #0284c7;
            padding-bottom: 12px;
            margin-bottom: 18px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          .title {
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            margin: 0 0 4px 0;
            letter-spacing: -0.5px;
          }
          .subtitle {
            font-size: 11px;
            color: #64748b;
            margin: 0;
          }
          .stats {
            display: flex;
            gap: 12px;
            margin-bottom: 20px;
          }
          .stat-box {
            flex: 1;
            padding: 8px 12px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
          }
          .stat-num {
            font-size: 16px;
            font-weight: 800;
            color: #0284c7;
          }
          .stat-label {
            font-size: 10px;
            color: #64748b;
            text-transform: uppercase;
            font-weight: 600;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          th {
            background: #f1f5f9;
            color: #475569;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 9px;
            padding: 8px 6px;
            border: 1px solid #cbd5e1;
            text-align: left;
          }
          td {
            padding: 6px;
            border: 1px solid #e2e8f0;
            vertical-align: top;
            font-size: 10px;
          }
          tr:nth-child(even) {
            background-color: #f8fafc;
          }
          .badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 9px;
            font-weight: 700;
          }
          .badge-service { background: #dbeafe; color: #1e40af; }
          .badge-solution { background: #f3e8ff; color: #6b21a8; }
          .status-new { color: #0284c7; font-weight: 700; }
          .status-converted { color: #15803d; font-weight: 700; }
          @media print {
            body { padding: 10px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="title">RUVERON SOLUTIONS PRIVATE LIMITED</h1>
            <p class="subtitle">Lead Pipeline Intelligence & Enquiries Export Report</p>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: bold; color: #0f172a;">Total Exported: ${leads.length} Records</div>
            <div style="color: #64748b; font-size: 10px;">Generated: ${generatedDate}</div>
          </div>
        </div>

        <div class="stats">
          <div class="stat-box">
            <div class="stat-num">${leads.length}</div>
            <div class="stat-label">Total Leads</div>
          </div>
          <div class="stat-box">
            <div class="stat-num" style="color: #0284c7;">${newCount}</div>
            <div class="stat-label">New Enquiries</div>
          </div>
          <div class="stat-box">
            <div class="stat-num" style="color: #ca8a04;">${contactedCount}</div>
            <div class="stat-label">Contacted</div>
          </div>
          <div class="stat-box">
            <div class="stat-num" style="color: #9333ea;">${qualifiedCount}</div>
            <div class="stat-label">Qualified</div>
          </div>
          <div class="stat-box">
            <div class="stat-num" style="color: #16a34a;">${convertedCount}</div>
            <div class="stat-label">Converted</div>
          </div>
        </div>

        <div class="no-print" style="margin-bottom: 15px; text-align: right;">
          <button onclick="window.print()" style="background: #0284c7; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 12px;">
            🖨️ Print or Save as PDF
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 60px;">ID</th>
              <th style="width: 80px;">Date</th>
              <th style="width: 110px;">Client Name</th>
              <th style="width: 90px;">Contact</th>
              <th style="width: 100px;">Location</th>
              <th style="width: 130px;">Requirement & Subject</th>
              <th style="width: 65px;">Source</th>
              <th style="width: 70px;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${leads
              .map(
                (l) => `
              <tr>
                <td style="font-family: monospace; font-weight: bold;">${l.id}</td>
                <td>${new Date(l.createdAt).toLocaleDateString()}</td>
                <td>
                  <strong>${l.fullName}</strong>
                  ${l.company ? `<br/><span style="color:#64748b; font-size:9px;">${l.company}</span>` : ''}
                </td>
                <td>
                  ${l.phone}<br/>
                  <span style="color: #64748b; font-size: 9px;">${l.email}</span>
                </td>
                <td>${l.location || 'N/A'}</td>
                <td>
                  <span class="badge ${l.leadType === 'Solution' ? 'badge-solution' : 'badge-service'}">
                    ${l.leadType || 'Service'}
                  </span>
                  <div style="font-weight: 600; margin-top: 2px;">${l.serviceOrSolutionName || 'General'}</div>
                  <div style="color: #64748b; font-size: 9px; margin-top: 2px;">${l.requirement || ''}</div>
                </td>
                <td>${l.source}</td>
                <td><span class="status-${l.status.toLowerCase()}">${l.status}</span></td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
};
