import type { LeadItem, LeadCategory, LeadSource, LeadStatus } from '../types';

export interface ParsedLeadResult {
  validLeads: Array<Omit<LeadItem, 'id' | 'createdAt' | 'updatedAt' | 'notes' | 'history'>>;
  errors: string[];
  totalRows: number;
}

/**
 * Parses CSV text, handling quotes, commas within quotes, and CRLF line breaks
 */
export const parseCSVText = (text: string): string[][] => {
  const cleanText = text.replace(/^\uFEFF/, ''); // Strip BOM if present
  const lines: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++; // Skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // Handle CRLF
      }
      currentRow.push(currentField.trim());
      if (currentRow.some((field) => field.length > 0)) {
        lines.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  // Last field/row
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((field) => field.length > 0)) {
      lines.push(currentRow);
    }
  }

  return lines;
};

/**
 * Validates and maps parsed CSV rows into typed LeadItem objects
 */
export const parseLeadsFromCSV = (csvText: string): ParsedLeadResult => {
  const rows = parseCSVText(csvText);
  if (rows.length < 2) {
    return {
      validLeads: [],
      errors: ['File is empty or does not contain header and data rows.'],
      totalRows: 0,
    };
  }

  const rawHeaders = rows[0].map((h) => h.toLowerCase().trim());

  // Helper to find column index matching multiple alias patterns
  const getIndex = (aliases: string[]) => {
    return rawHeaders.findIndex((h) => aliases.some((alias) => h === alias || h.includes(alias)));
  };

  const nameIdx = getIndex(['full name', 'name', 'client', 'contact person', 'fullname']);
  const phoneIdx = getIndex(['phone', 'mobile', 'contact', 'tel', 'phone number']);
  const emailIdx = getIndex(['email', 'email address', 'mail']);
  const companyIdx = getIndex(['company', 'organization', 'firm', 'business']);
  const locationIdx = getIndex(['location', 'city', 'district', 'state', 'operating location']);
  const categoryIdx = getIndex(['lead category', 'category', 'lead type', 'type']);
  const serviceNameIdx = getIndex(['service / solution name', 'service', 'solution', 'subject', 'enquiry']);
  const requirementIdx = getIndex(['requirement', 'message', 'details', 'remarks', 'notes']);
  const sourceIdx = getIndex(['source', 'acquisition', 'channel']);
  const statusIdx = getIndex(['status', 'pipeline status', 'stage']);

  if (nameIdx === -1 && phoneIdx === -1 && emailIdx === -1) {
    return {
      validLeads: [],
      errors: [
        'Could not identify essential columns. Please ensure your CSV includes "Full Name", "Phone", or "Email".',
      ],
      totalRows: rows.length - 1,
    };
  }

  const validLeads: Array<Omit<LeadItem, 'id' | 'createdAt' | 'updatedAt' | 'notes' | 'history'>> = [];
  const errors: string[] = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const fullName = nameIdx >= 0 ? row[nameIdx] || '' : '';
    const phone = phoneIdx >= 0 ? row[phoneIdx] || '' : '';
    const email = emailIdx >= 0 ? row[emailIdx] || '' : '';

    if (!fullName && !phone && !email) {
      continue; // Skip empty trailing rows
    }

    if (!fullName) {
      errors.push(`Row ${r + 1}: Skipped — Missing client Full Name.`);
      continue;
    }

    const company = companyIdx >= 0 ? row[companyIdx] || '' : '';
    const location = locationIdx >= 0 ? row[locationIdx] || 'Vijayawada (NTR), Andhra Pradesh (Corporate HQ)' : 'Vijayawada (NTR), Andhra Pradesh (Corporate HQ)';
    const requirement = requirementIdx >= 0 ? row[requirementIdx] || 'Imported lead' : 'Imported lead';

    // Normalize category
    let leadType: LeadCategory = 'Service';
    if (categoryIdx >= 0) {
      const rawCat = (row[categoryIdx] || '').toLowerCase();
      if (rawCat.includes('sol') || rawCat.includes('solution')) {
        leadType = 'Solution';
      }
    }

    const serviceOrSolutionName = serviceNameIdx >= 0 && row[serviceNameIdx]
      ? row[serviceNameIdx]
      : leadType === 'Service'
      ? 'Recruitment & Talent Acquisition'
      : 'Workforce Solutions';

    // Normalize source
    let source: LeadSource = 'Campaign';
    if (sourceIdx >= 0 && row[sourceIdx]) {
      const rawSrc = row[sourceIdx].toLowerCase();
      if (rawSrc.includes('web')) source = 'Website';
      else if (rawSrc.includes('face') || rawSrc.includes('fb')) source = 'Facebook';
      else if (rawSrc.includes('insta') || rawSrc.includes('ig')) source = 'Instagram';
      else if (rawSrc.includes('ad')) source = 'Advertisement';
      else if (rawSrc.includes('other')) source = 'Other';
    }

    // Normalize status
    let status: LeadStatus = 'New';
    if (statusIdx >= 0 && row[statusIdx]) {
      const rawStatus = row[statusIdx].toLowerCase();
      if (rawStatus.includes('contact')) status = 'Contacted';
      else if (rawStatus.includes('follow')) status = 'Follow-up';
      else if (rawStatus.includes('qual')) status = 'Qualified';
      else if (rawStatus.includes('conv')) status = 'Converted';
      else if (rawStatus.includes('lost')) status = 'Lost';
    }

    validLeads.push({
      fullName,
      phone: phone || '+91 9985965566',
      email: email || `${fullName.toLowerCase().replace(/\s+/g, '')}@lead.ruveron.com`,
      company,
      location,
      leadType,
      serviceOrSolutionName,
      requirement,
      source,
      status,
    });
  }

  return {
    validLeads,
    errors,
    totalRows: rows.length - 1,
  };
};

/**
 * Parses JSON text into LeadItem objects
 */
export const parseLeadsFromJSON = (jsonText: string): ParsedLeadResult => {
  try {
    const parsed = JSON.parse(jsonText);
    const array = Array.isArray(parsed) ? parsed : [parsed];

    const validLeads: Array<Omit<LeadItem, 'id' | 'createdAt' | 'updatedAt' | 'notes' | 'history'>> = [];
    const errors: string[] = [];

    array.forEach((item, index) => {
      if (!item.fullName && !item.name) {
        errors.push(`Item ${index + 1}: Missing fullName`);
        return;
      }

      validLeads.push({
        fullName: item.fullName || item.name || 'Unnamed Client',
        phone: item.phone || '+91 9985965566',
        email: item.email || 'enquiry@client.com',
        company: item.company || '',
        location: item.location || 'Vijayawada (NTR), Andhra Pradesh (Corporate HQ)',
        leadType: item.leadType === 'Solution' ? 'Solution' : 'Service',
        serviceOrSolutionName: item.serviceOrSolutionName || 'General Enquiry',
        requirement: item.requirement || 'Imported JSON record',
        source: item.source || 'Campaign',
        status: item.status || 'New',
      });
    });

    return {
      validLeads,
      errors,
      totalRows: array.length,
    };
  } catch (err) {
    return {
      validLeads: [],
      errors: ['Invalid JSON format: ' + (err instanceof Error ? err.message : String(err))],
      totalRows: 0,
    };
  }
};

/**
 * Downloads a ready-to-fill sample CSV template for admins
 */
export const downloadLeadImportTemplate = () => {
  const headers = [
    'Full Name',
    'Phone Number',
    'Email Address',
    'Company Name',
    'Operating Location',
    'Category',
    'Service or Solution Name',
    'Requirement Details',
    'Source Channel',
    'Pipeline Status',
  ];

  const sampleRows = [
    [
      'Anand Kumar',
      '+91 9848012345',
      'anand@vanguardtech.in',
      'Vanguard Technologies',
      'Vijayawada (NTR), Andhra Pradesh (Corporate HQ)',
      'Service',
      'Recruitment & Talent Acquisition',
      'Needs 25 senior fullstack developers for Amaravati branch expansion.',
      'Website',
      'New',
    ],
    [
      'Priya Sharma',
      '+91 9440123456',
      'priya@nexuslogistics.com',
      'Nexus Logistics Private Limited',
      'Hyderabad, Telangana',
      'Service',
      'Comprehensive Payroll Management',
      'Automated monthly payroll processing for 450 warehouse employees with PF and ESI compliance.',
      'Campaign',
      'Contacted',
    ],
    [
      'Suresh Reddy',
      '+91 9885067890',
      'suresh.reddy@deccaninfra.org',
      'Deccan Infrastructure Group',
      'Visakhapatnam, Andhra Pradesh',
      'Solution',
      'Workforce Solutions',
      'Staffing and statutory compliance audit for port logistics unit.',
      'Advertisement',
      'Qualified',
    ],
    [
      'Kavitha Nair',
      '+91 9820011223',
      'kavitha@solarpower.in',
      'Surya Renewable Energy Corp',
      'Guntur, Andhra Pradesh',
      'Service',
      'Statutory & Regulatory Compliance',
      'Annual labor law compliance audit and filing requirements.',
      'Other',
      'Follow-up',
    ],
  ];

  const escape = (str: string) => `"${str.replace(/"/g, '""')}"`;
  const csvContent =
    '\uFEFF' +
    [
      headers.map(escape).join(','),
      ...sampleRows.map((row) => row.map(escape).join(',')),
    ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'ruveron_leads_sample_template.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
