/**
 * PDF export functionality for the quote form using PDFMake
 * This script handles the generation of PDF documents from the form data
 */

// Function to get the current selections from the form
function getCurrentSelections() {
    // Get selections from the window object where it's stored
    return window.quoteFormSelections;
}

// Function to generate PDF from the form data
function generatePdf() {
    // Get current selections
    const selections = getCurrentSelections();
    if (!selections) {
        console.error('No form selections found');
        alert('Please fill out the form before generating a PDF');
        return;
    }

    // Show loading overlay
    document.getElementById('loading-overlay').style.display = 'flex';
    
    try {
        // Create document definition
        const docDefinition = {
            info: {
                title: 'Client Quote',
                author: 'Quote Generator',
                subject: 'Service Quote',
                keywords: 'quote, services'
            },
            content: [
                // Header with client information
                {
                    text: 'Client Quote',
                    style: 'header',
                    margin: [0, 0, 0, 20]
                },
                createClientInfoSection(selections),
                
                // Services Summary
                {
                    text: 'Services Summary',
                    style: 'sectionHeader',
                    margin: [0, 20, 0, 10]
                },
                createServicesSummarySection(selections),
                
                // Detailed Services
                {
                    text: 'Service Details',
                    style: 'sectionHeader',
                    margin: [0, 20, 0, 10]
                },
                createServicesDetailsSection(selections),
                
                // Cost Summary
                {
                    text: 'Cost Summary',
                    style: 'sectionHeader',
                    margin: [0, 20, 0, 10]
                },
                createCostSummarySection(selections)
            ],
            styles: {
                header: {
                    fontSize: 24,
                    bold: true,
                    color: '#4a6fdc'
                },
                sectionHeader: {
                    fontSize: 18,
                    bold: true,
                    color: '#4a6fdc',
                    margin: [0, 15, 0, 10]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 12,
                    color: '#2c3e50',
                    fillColor: '#f8f9fa'
                },
                serviceItem: {
                    fontSize: 11,
                    margin: [0, 5, 0, 5]
                },
                costSummary: {
                    fontSize: 12,
                    margin: [0, 5, 0, 5]
                }
            },
            defaultStyle: {
                fontSize: 12,
                color: '#333333'
            },
            footer: function(currentPage, pageCount) {
                return {
                    columns: [
                        {
                            text: 'Generated on: ' + new Date().toLocaleDateString(),
                            alignment: 'left',
                            margin: [40, 0]
                        },
                        {
                            text: 'Page ' + currentPage.toString() + ' of ' + pageCount,
                            alignment: 'right',
                            margin: [0, 0, 40, 0]
                        }
                    ],
                    margin: [40, 20],
                    fontSize: 10,
                    color: '#666666'
                };
            }
        };

        // Generate PDF using the global pdfMake object
        try {
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            
            // Download the PDF
            pdfDocGenerator.download('client_quote.pdf');
            
            // Hide loading overlay after successful generation
            document.getElementById('loading-overlay').style.display = 'none';
            console.log('PDF generated successfully');
        } catch (pdfError) {
            console.error('PDF creation error:', pdfError);
            alert('There was an error creating the PDF. Please try again.');
            document.getElementById('loading-overlay').style.display = 'none';
        }

    } catch (error) {
        console.error('PDF generation error:', error);
        alert('There was an error generating the PDF. Please try again.');
        document.getElementById('loading-overlay').style.display = 'none';
    }
}

// Create client information section
function createClientInfoSection(selections) {
    const clientInfo = selections.clientInfo;
    const rows = quoteFormDataModel.clientInfoFields.map(field => [
        { text: field.label + ':', bold: true },
        { text: clientInfo[field.id] || '' }
    ]);

    return {
        table: {
            widths: ['30%', '70%'],
            body: rows
        },
        layout: {
            fillColor: function(rowIndex, node, columnIndex) {
                return (columnIndex === 0) ? '#f8f9fa' : null;
            }
        }
    };
}

// Create services summary section
function createServicesSummarySection(selections) {
    const content = [];
    let hasSelectedServices = false;

    quoteFormDataModel.serviceCategories.forEach(category => {
        const categoryServices = [];
        
        category.subcategories.forEach(subcategory => {
            if (subcategory.subheader) return;
            
            const serviceId = subcategory.id;
            const serviceSelections = selections.services[serviceId];
            
            if (serviceSelections && serviceSelections.selected) {
                hasSelectedServices = true;
                let serviceText = subcategory.name;
                
                if (subcategory.priceType === 'options' && serviceSelections.selectedOption) {
                    const selectedOption = subcategory.options.find(opt => opt.id === serviceSelections.selectedOption);
                    if (selectedOption) {
                        serviceText += ` - ${selectedOption.name}`;
                    }
                } else if (subcategory.priceType === 'per_unit' && serviceSelections.quantity) {
                    serviceText += ` - ${serviceSelections.quantity} ${subcategory.unitName || 'units'}`;
                }
                
                categoryServices.push({
                    text: '• ' + serviceText,
                    style: 'serviceItem'
                });
            }
        });
        
        if (categoryServices.length > 0) {
            content.push({
                text: category.name,
                style: 'sectionHeader',
                margin: [0, 10, 0, 5]
            });
            content.push(...categoryServices);
        }
    });

    return hasSelectedServices ? content : [{ text: 'No services selected.', italics: true }];
}

// Create detailed services section
function createServicesDetailsSection(selections) {
    const content = [];
    let hasSelectedServices = false;

    quoteFormDataModel.serviceCategories.forEach(category => {
        const categoryServices = [];
        
        category.subcategories.forEach(subcategory => {
            if (subcategory.subheader) return;
            
            const serviceId = subcategory.id;
            const serviceSelections = selections.services[serviceId];
            
            if (serviceSelections && serviceSelections.selected) {
                hasSelectedServices = true;
                
                const serviceDetails = {
                    stack: [
                        {
                            text: subcategory.name,
                            style: 'serviceItem',
                            bold: true
                        },
                        {
                            text: serviceSelections.description || subcategory.description || '',
                            style: 'serviceItem'
                        }
                    ],
                    margin: [0, 0, 0, 15]
                };

                // Add pricing information based on price type
                let pricingText = '';
                switch(subcategory.priceType) {
                    case 'fixed':
                        pricingText = `Price: ${quoteFormDataModel.formatCurrency(subcategory.price)}`;
                        break;
                    case 'options':
                        const selectedOption = subcategory.options.find(opt => opt.id === serviceSelections.selectedOption);
                        pricingText = selectedOption ? 
                            `Selected Option: ${selectedOption.name} - ${quoteFormDataModel.formatCurrency(selectedOption.price)}` :
                            'No option selected';
                        break;
                    case 'range':
                        pricingText = `Custom Price: ${quoteFormDataModel.formatCurrency(serviceSelections.customPrice || subcategory.priceMin)}`;
                        break;
                    case 'per_unit':
                        const quantity = serviceSelections.quantity || 1;
                        pricingText = `${quantity} ${subcategory.unitName || 'units'} × ${quoteFormDataModel.formatCurrency(subcategory.unitPrice)} = ${quoteFormDataModel.formatCurrency(quantity * subcategory.unitPrice)}`;
                        break;
                    case 'percentage':
                        const adSpend = serviceSelections.adSpend || 0;
                        const managementFee = Math.max(adSpend * subcategory.percentageFee, subcategory.minimumFee || 0);
                        pricingText = `Setup: ${quoteFormDataModel.formatCurrency(subcategory.setupFee)} | Monthly Management: ${quoteFormDataModel.formatCurrency(managementFee)} (${subcategory.percentageFee * 100}% of ${quoteFormDataModel.formatCurrency(adSpend)} ad spend)`;
                        break;
                    case 'subscription':
                        pricingText = `Setup: ${quoteFormDataModel.formatCurrency(subcategory.setupFee)} | Monthly Fee: ${quoteFormDataModel.formatCurrency(subcategory.monthlyFee)}`;
                        break;
                    default:
                        pricingText = 'Price: Contact for details';
                }
                
                serviceDetails.stack.push({
                    text: pricingText,
                    style: 'serviceItem',
                    bold: true
                });
                
                categoryServices.push(serviceDetails);
            }
        });
        
        if (categoryServices.length > 0) {
            content.push({
                text: category.name,
                style: 'sectionHeader',
                margin: [0, 10, 0, 5]
            });
            content.push(...categoryServices);
        }
    });

    return hasSelectedServices ? content : [{ text: 'No services selected.', italics: true }];
}

// Create cost summary section
function createCostSummarySection(selections) {
    const costs = quoteFormDataModel.calculateTotalCosts(selections);
    
    return {
        table: {
            widths: ['70%', '30%'],
            body: [
                [
                    { text: 'One-Time Costs:', style: 'costSummary', bold: true },
                    { text: quoteFormDataModel.formatCurrency(costs.totalOneTime), style: 'costSummary', alignment: 'right' }
                ],
                [
                    { text: 'Monthly Costs:', style: 'costSummary', bold: true },
                    { text: quoteFormDataModel.formatCurrency(costs.totalMonthly), style: 'costSummary', alignment: 'right' }
                ],
                [
                    { text: 'Annual Costs (Monthly × 12):', style: 'costSummary', bold: true },
                    { text: quoteFormDataModel.formatCurrency(costs.totalAnnual), style: 'costSummary', alignment: 'right' }
                ],
                [
                    { text: 'Grand Total (First Year):', style: 'costSummary', bold: true },
                    { text: quoteFormDataModel.formatCurrency(costs.grandTotal), style: 'costSummary', alignment: 'right', bold: true }
                ]
            ]
        },
        layout: {
            fillColor: function(rowIndex, node, columnIndex) {
                return (rowIndex === 3) ? '#e0e7ff' : null;
            },
            hLineWidth: function(i, node) {
                return (i === 3) ? 2 : 1;
            },
            hLineColor: function(i, node) {
                return (i === 3) ? '#4a6fdc' : '#dee2e6';
            }
        }
    };
}
