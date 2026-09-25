import { BoqData } from '../../types/boq';
import { CompanyConfig } from '../../types/company';
import { generateBoqPdf } from '../pdf/pdfGenerator';
import { generateBoqExcel } from '../excel/excelGenerator';

/**
 * Export format types
 */
export type ExportFormat = 'pdf' | 'excel';

/**
 * Export result interface
 */
export interface ExportResult {
  success: boolean;
  format: ExportFormat;
  error?: string;
}

/**
 * Export options interface
 */
export interface ExportOptions {
  format: ExportFormat;
  boqData: BoqData;
  companyConfig: CompanyConfig;
}

/**
 * Unified export service that handles both PDF and Excel generation
 * Ensures consistency by using the same data source for both formats
 */
export class ExportService {
  /**
   * Export BOQ in the specified format
   */
  static async export(options: ExportOptions): Promise<ExportResult> {
    const { format, boqData, companyConfig } = options;

    try {
      // Validate data before export
      if (!boqData.items || boqData.items.length === 0) {
        throw new Error('No items to export');
      }

      if (!boqData.header.clientName) {
        throw new Error('Client name is required');
      }

      // Generate export based on format
      switch (format) {
        case 'pdf':
          await generateBoqPdf(boqData, companyConfig);
          break;
        case 'excel':
          await generateBoqExcel(boqData, companyConfig);
          break;
        default:
          throw new Error(`Unsupported export format: ${format}`);
      }

      return {
        success: true,
        format,
      };
    } catch (error) {
      console.error(`Export failed for format ${format}:`, error);
      return {
        success: false,
        format,
        error: error instanceof Error ? error.message : 'Export failed',
      };
    }
  }

  /**
   * Export BOQ as PDF
   */
  static async exportPdf(
    boqData: BoqData,
    companyConfig: CompanyConfig
  ): Promise<ExportResult> {
    return this.export({ format: 'pdf', boqData, companyConfig });
  }

  /**
   * Export BOQ as Excel
   */
  static async exportExcel(
    boqData: BoqData,
    companyConfig: CompanyConfig
  ): Promise<ExportResult> {
    return this.export({ format: 'excel', boqData, companyConfig });
  }

  /**
   * Export BOQ in both formats
   */
  static async exportBoth(
    boqData: BoqData,
    companyConfig: CompanyConfig
  ): Promise<{ pdf: ExportResult; excel: ExportResult }> {
    const [pdfResult, excelResult] = await Promise.all([
      this.exportPdf(boqData, companyConfig),
      this.exportExcel(boqData, companyConfig),
    ]);

    return { pdf: pdfResult, excel: excelResult };
  }

  /**
   * Validate BOQ data for export
   */
  static validateForExport(boqData: BoqData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!boqData.header.clientName?.trim()) {
      errors.push('Client name is required');
    }

    if (!boqData.header.projectDetail?.trim()) {
      errors.push('Project detail is required');
    }

    if (!boqData.header.date) {
      errors.push('Date is required');
    }

    if (!boqData.items || boqData.items.length === 0) {
      errors.push('At least one item is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
