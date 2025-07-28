export interface FetchInvoicesParams {
  startDate?: string;
  endDate?: string;
  key?: string;
}

export async function fetchInvoices(params: FetchInvoicesParams = {}): Promise<any[]> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    const response = await fetch('/api/invoices', {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      // First try to get text (might be HTML error page)
      const text = await response.text();
      try {
        // Try to parse as JSON
        const error = JSON.parse(text);
        throw new Error(error.error || 'Failed to fetch invoices');
      } catch {
        // If not JSON, log the HTML and throw generic error
        console.error('API returned HTML error:', text.substring(0, 500));
        throw new Error('Failed to fetch invoices - API error');
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
}