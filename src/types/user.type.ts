export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}


// Data returned from API
export type Document = {
  id: string;
  title: string;
  description: string | null;

  filePath: string;
  fileName: string;
  fileType: 'IMAGE' | 'PDF' | 'DOC' | 'OTHER';
  fileSize: number;

  categoryId: string;
  uploadedById: string;

  createdAt: string;
  updatedAt: string;

  category: {
    id: string;
    name: string;
  };

  uploadedBy: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

// Type for creating a new document
export type ICreateDocument = {
  title: string;
  description?: string;
  categoryId: string;
  file: File;
};

// Type for updating an existing document
export type IUpdateDocument = {
  title?: string;
  description?: string;
  categoryId?: string;
  file?: File;
};


export interface MonthlyStat {
  month: string;
  count: number;
}

export interface DocumentsPerCategory {
  categoryId: string;
  categoryName: string;
  documentCount: number;
}

export interface DashboardStatistics {
  users: number;
  totalDocuments: number;
  monthlyDocuments: MonthlyStat[];
  userGrowth: MonthlyStat[];
  documentsPerCategory: DocumentsPerCategory[];
}
