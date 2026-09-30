export type PortalDecision = {
  decision: "approved" | "rejected";
  signerName: string | null;
  rejectionReason: string | null;
  actionAt: string;
};

export type QuotePortal = {
  quoteNumber: string;
  issuedAt: string;
  customer: {
    name: string;
    companyName: string;
    address: string;
    email: string;
  };
  lines: Array<{
    title: string;
    details: string[];
    quantity: number;
    unitPriceExclVatCents: number;
    totalExclVatCents: number;
  }>;
  subtotalExclVatCents: number;
  vatCents: number;
  totalInclVatCents: number;
  vatPercentage: number;
  customDescription: string | null;
  decision: PortalDecision | null;
};
