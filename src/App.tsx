import { useEffect, useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Container } from './components/layout/Container';
import { CustomerInfoForm } from './components/forms/CustomerInfoForm';
import { ProductBuilderForm } from './components/products/ProductBuilderForm';
import { BoqItemList } from './components/boq/BoqItemList';
import { BoqSummary } from './components/boq/BoqSummary';
import { Toast } from './components/common/Toast';
import { Modal } from './components/common/Modal';
import { useBoqState } from './hooks/useBoqState';
import { useToast } from './hooks/useToast';
import { useLocalStorage } from './hooks/useLocalStorage';
import { validateBoqHeader, canGeneratePdf } from './utils/validation';
import { hasDraft, loadDraft, clearDraft } from './utils/storage';
import { ExportService } from './services/export/exportService';
import { companyConfig } from './data/company';

function App() {
  const {
    state,
    updateHeader,
    addItem,
    updateItem,
    deleteItem,
    duplicateItem,
    startEdit,
    cancelEdit,
    reset,
    loadDraft: loadDraftToState,
  } = useBoqState();

  const { toast, showToast, hideToast } = useToast();
  const [headerErrors, setHeaderErrors] = useState<Record<string, string>>({});
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isGeneratingExcel, setIsGeneratingExcel] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [draftLoaded, setDraftLoaded] = useState(false);

  // Auto-save to localStorage
  useLocalStorage(
    { header: state.header, items: state.items },
    true
  );

  // Load draft on mount
  useEffect(() => {
    if (!draftLoaded && hasDraft()) {
      const draft = loadDraft();
      if (draft) {
        loadDraftToState(draft.header, draft.items);
        showToast('Draft loaded', 'info');
      }
      setDraftLoaded(true);
    }
  }, [draftLoaded, loadDraftToState, showToast]);

  const handleHeaderChange = (data: Partial<typeof state.header>) => {
    updateHeader(data);
    // Clear errors for changed fields
    const newErrors = { ...headerErrors };
    Object.keys(data).forEach((key) => {
      delete newErrors[key];
    });
    setHeaderErrors(newErrors);
  };

  const handleGeneratePdf = async () => {
    // Validate header
    const headerValidation = validateBoqHeader(state.header);
    if (!headerValidation.isValid) {
      setHeaderErrors(headerValidation.errors);
      showToast('Please complete all required fields', 'error');
      return;
    }

    // Validate can generate
    const pdfValidation = canGeneratePdf({
      header: state.header,
      items: state.items,
    });

    if (!pdfValidation.isValid) {
      showToast(
        pdfValidation.errors.items || pdfValidation.errors.header || 'Validation failed',
        'error'
      );
      return;
    }

    setIsGeneratingPdf(true);

    try {
      const result = await ExportService.exportPdf(
        { header: state.header, items: state.items },
        companyConfig
      );
      
      if (result.success) {
        showToast('BOQ PDF downloaded successfully!', 'success');
        clearDraft(); // Clear draft after successful generation
      } else {
        showToast(result.error || 'Failed to generate PDF', 'error');
      }
    } catch (error) {
      console.error('PDF generation failed:', error);
      showToast('Failed to generate PDF. Please try again.', 'error');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleGenerateExcel = async () => {
    // Validate header
    const headerValidation = validateBoqHeader(state.header);
    if (!headerValidation.isValid) {
      setHeaderErrors(headerValidation.errors);
      showToast('Please complete all required fields', 'error');
      return;
    }

    // Validate can generate
    const validation = canGeneratePdf({
      header: state.header,
      items: state.items,
    });

    if (!validation.isValid) {
      showToast(
        validation.errors.items || validation.errors.header || 'Validation failed',
        'error'
      );
      return;
    }

    setIsGeneratingExcel(true);

    try {
      const result = await ExportService.exportExcel(
        { header: state.header, items: state.items },
        companyConfig
      );
      
      if (result.success) {
        showToast('BOQ Excel downloaded successfully!', 'success');
        clearDraft(); // Clear draft after successful generation
      } else {
        showToast(result.error || 'Failed to generate Excel', 'error');
      }
    } catch (error) {
      console.error('Excel generation failed:', error);
      showToast('Failed to generate Excel. Please try again.', 'error');
    } finally {
      setIsGeneratingExcel(false);
    }
  };

  const handleReset = () => {
    if (state.items.length > 0 || state.header.clientName) {
      setShowResetConfirm(true);
    } else {
      performReset();
    }
  };

  const performReset = () => {
    reset();
    clearDraft();
    setHeaderErrors({});
    setShowResetConfirm(false);
    showToast('BOQ reset successfully', 'info');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onReset={handleReset}
        draftSaved={true}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <CustomerInfoForm
              header={state.header}
              onChange={handleHeaderChange}
              errors={headerErrors}
            />

            {/* Product Builder */}
            <ProductBuilderForm
              onAdd={addItem}
              onUpdate={updateItem}
              onCancel={cancelEdit}
              editingItem={state.currentItem}
              isEditing={state.isEditing}
            />

            {/* BOQ Items List */}
            <BoqItemList
              items={state.items}
              onEdit={startEdit}
              onDelete={deleteItem}
              onDuplicate={duplicateItem}
            />
          </div>

          {/* Summary - Right Column (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <BoqSummary
                items={state.items}
                onGeneratePdf={handleGeneratePdf}
                onGenerateExcel={handleGenerateExcel}
                onReset={handleReset}
                isGeneratingPdf={isGeneratingPdf}
                isGeneratingExcel={isGeneratingExcel}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Toast Notifications */}
      {toast.isVisible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        title="Reset BOQ?"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to reset this BOQ? All current data will be cleared and cannot be recovered.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              onClick={performReset}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Reset BOQ
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
