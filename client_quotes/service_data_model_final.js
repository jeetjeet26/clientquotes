/**
 * Updated data model for service categories in the quote form
 * This structure supports nested categories and various pricing structures
 * with cost calculation functionality
 */

// Service categories data structure
const serviceCategories = [
    {
        id: "branding",
        name: "BRANDING",
        description: "Brand development and identity services",
        subcategories: [
            {
                id: "vision_positioning",
                name: "VISION & POSITIONING",
                price: 6500,
                priceType: "fixed",
                description: "Fee includes kick-off meeting with client, analysis of project, research of surrounding competition, development of positioning copy, creation of community theme tagline and research of inspirational imagery. Final document to provide the creative direction of future marketing materials. Any required travel will be estimated/billed separately."
            },
            {
                id: "naming_study",
                name: "NAMING STUDY",
                price: 4500,
                priceType: "fixed",
                description: "Fee includes research of community, initial presentation of up to 8 names, up to two rounds of naming refinements and URL search/confirmation of availability. Additional rounds of naming (up to 5 additional names) shall be billed at $1,000 per round."
            },
            {
                id: "logo_identity",
                name: "LOGO IDENTITY",
                price: 6500,
                priceType: "fixed",
                description: "Logo design includes initial presentation of minimum six solutions, secondary presentation of maximum three solutions, one set of revisions and one final design (Additional presentations will be estimated separately). Includes production of identity usage guidelines and final files in all color iterations in PDF, PNG, JPG and EPS file format."
            },
            {
                id: "brand_identity",
                name: "BRAND IDENTITY CREATIVE EXPLORATION",
                price: 7200,
                priceType: "fixed",
                description: "Fee includes comprehensive creative exploration of the visual direction for the community brand. Includes initial presentation of minimum three design directions of up to 4 marketing elements and up to two rounds of revisions of one design (additional design directions shall be billed at $2,000 each. Final design will establish the creative direction for all future marketing materials. Brand guidelines included in fee. Any stock photography will be estimated separately."
            }
        ]
    },
    {
        id: "creative_assets",
        name: "CREATIVE & VISUAL ASSETS",
        description: "Visual content creation services",
        subcategories: [
            {
                id: "floor_plan_illustration",
                name: "DIGITAL FLOOR PLAN ILLUSTRATION",
                priceType: "options",
                options: [
                    { id: "basic", name: "Basic", price: 350 },
                    { id: "standard", name: "Standard", price: 500 },
                    { id: "premium", name: "Premium", price: 750 }
                ],
                description: "Fee includes digital illustration of floor plan with furniture layout. Basic includes simple line drawing, Standard includes shaded elements, Premium includes full color rendering with detailed furniture and decor elements."
            },
            {
                id: "site_plan_illustration",
                name: "SITE PLAN ILLUSTRATION",
                priceType: "options",
                options: [
                    { id: "basic", name: "Basic", price: 1200 },
                    { id: "standard", name: "Standard", price: 2500 },
                    { id: "premium", name: "Premium", price: 4500 }
                ],
                description: "Fee includes digital illustration of site plan. Basic includes simple line drawing with minimal detail, Standard includes color-coded areas and basic landscaping, Premium includes full color rendering with detailed landscaping, amenities, and architectural elements."
            },
            {
                id: "digital_rendering",
                name: "DIGITAL RENDERING",
                priceType: "options",
                options: [
                    { id: "exterior", name: "Exterior", price: 1500 },
                    { id: "interior", name: "Interior", price: 1800 },
                    { id: "aerial", name: "Aerial", price: 2200 }
                ],
                description: "Fee includes high-quality digital rendering. Exterior includes building facade with landscaping, Interior includes room layout with furniture and decor, Aerial includes bird's eye view of the property and surroundings."
            },
            {
                id: "photography",
                name: "PHOTOGRAPHY",
                priceType: "range",
                priceMin: 1500,
                priceMax: 5000,
                description: "Professional photography services for property, amenities, and surroundings. Price varies based on scope, number of shots, and post-processing requirements."
            },
            {
                id: "video_production",
                name: "VIDEO PRODUCTION",
                priceType: "range",
                priceMin: 3500,
                priceMax: 15000,
                description: "Professional video production services including scripting, filming, editing, and post-production. Price varies based on length, complexity, and special requirements like drone footage or special effects."
            }
        ]
    },
    {
        id: "printed_materials",
        name: "PRINTED COLLATERAL AND MARKETING MATERIALS",
        description: "Physical marketing materials and collateral",
        subcategories: [
            {
                id: "brochure",
                name: "BROCHURE",
                priceType: "options",
                options: [
                    { id: "standard", name: "Standard (4-8 pages)", price: 3500 },
                    { id: "premium", name: "Premium (10-16 pages)", price: 5500 },
                    { id: "luxury", name: "Luxury (20+ pages)", price: 8500 }
                ],
                description: "Fee includes design and layout of brochure. Printing costs estimated separately based on quantity, paper stock, and finishing options."
            },
            {
                id: "flyer",
                name: "FLYER/ONE-SHEET",
                price: 1200,
                priceType: "fixed",
                description: "Fee includes design and layout of single-page marketing flyer. Printing costs estimated separately."
            },
            {
                id: "folder",
                name: "PRESENTATION FOLDER",
                price: 2500,
                priceType: "fixed",
                description: "Fee includes design of custom presentation folder with pockets. Printing costs estimated separately."
            },
            {
                id: "stationery",
                name: "STATIONERY PACKAGE",
                price: 1800,
                priceType: "fixed",
                description: "Fee includes design of business cards, letterhead, and envelopes. Printing costs estimated separately."
            }
        ]
    },
    {
        id: "environmental",
        name: "ENVIRONMENTAL GRAPHICS",
        description: "Signage and environmental branding",
        subcategories: [
            {
                id: "signage_system",
                name: "SIGNAGE SYSTEM DESIGN",
                price: 7500,
                priceType: "fixed",
                description: "Fee includes comprehensive design of property signage system including wayfinding, identification, and informational signs. Production and installation costs estimated separately."
            },
            {
                id: "monument_sign",
                name: "MONUMENT SIGN",
                price: 3500,
                priceType: "fixed",
                description: "Fee includes design of main entrance monument sign. Production and installation costs estimated separately."
            },
            {
                id: "banner_system",
                name: "BANNER SYSTEM",
                priceType: "per_unit",
                unitPrice: 450,
                unitName: "banner",
                description: "Fee includes design of promotional banner system. Price is per unique banner design. Production costs estimated separately."
            },
            {
                id: "wall_graphics",
                name: "WALL GRAPHICS/MURALS",
                priceType: "per_unit",
                unitPrice: 1200,
                unitName: "square foot",
                description: "Fee includes design of custom wall graphics or murals. Price is per square foot. Production and installation costs estimated separately."
            }
        ]
    },
    {
        id: "digital",
        name: "DIGITAL EXPERIENCES",
        description: "Digital marketing and web presence",
        subcategories: [
            {
                subheader: true,
                name: "CUSTOM WEBSITES"
            },
            {
                id: "website_basic",
                name: "BASIC WEBSITE",
                priceType: "subscription",
                setupFee: 5000,
                monthlyFee: 150,
                description: "5-7 page informational website with responsive design, contact form, and basic SEO. Includes domain registration, hosting, and monthly maintenance."
            },
            {
                id: "website_standard",
                name: "STANDARD WEBSITE",
                priceType: "subscription",
                setupFee: 8500,
                monthlyFee: 250,
                description: "10-15 page website with responsive design, interactive elements, content management system, contact forms, and comprehensive SEO. Includes domain registration, hosting, and monthly maintenance."
            },
            {
                id: "website_premium",
                name: "PREMIUM WEBSITE",
                priceType: "subscription",
                setupFee: 15000,
                monthlyFee: 450,
                description: "20+ page website with responsive design, custom functionality, content management system, interactive features, virtual tours, and advanced SEO. Includes domain registration, hosting, and monthly maintenance."
            },
            {
                subheader: true,
                name: "TEMPLATE WEBSITES"
            },
            {
                id: "template_basic",
                name: "BASIC TEMPLATE WEBSITE",
                priceType: "subscription",
                setupFee: 2500,
                monthlyFee: 100,
                description: "5-7 page template-based website with responsive design, contact form, and basic SEO. Includes domain registration, hosting, and monthly maintenance."
            },
            {
                id: "template_standard",
                name: "STANDARD TEMPLATE WEBSITE",
                priceType: "subscription",
                setupFee: 4500,
                monthlyFee: 150,
                description: "10-15 page template-based website with responsive design, content management system, contact forms, and comprehensive SEO. Includes domain registration, hosting, and monthly maintenance."
            },
            {
                subheader: true,
                name: "DIGITAL MARKETING"
            },
            {
                id: "seo",
                name: "SEARCH ENGINE OPTIMIZATION (SEO)",
                priceType: "subscription",
                setupFee: 1500,
                monthlyFee: 500,
                minimumCommitment: 6,
                description: "Comprehensive SEO setup including technical and on-page audit, benchmarking, brainstorming, keyword and website research, competitor research. Monthly management includes ongoing content optimization, technical SEO updates, targeted backlinking, on-page meta tagging and overall performance monitoring. Also includes management of Google my Business (GMB)."
            },
            {
                id: "sem",
                name: "SEARCH ENGINE MARKETING (SEM)",
                priceType: "percentage",
                setupFee: 1200,
                percentageFee: 0.20,
                minimumFee: 500,
                minimumCommitment: 6,
                description: "Full management of digital advertising related to Google Ads across search and display platforms. Fees include initial strategy, audience building (targeting and segmentation), keyword and competitor research, comprehensive creative and display ads design, weekly monitoring and optimization, and monthly executive reporting."
            },
            {
                id: "social_ads",
                name: "PAID SOCIAL ADVERTISING",
                priceType: "percentage",
                setupFee: 1000,
                percentageFee: 0.30,
                minimumFee: 500,
                minimumCommitment: 6,
                description: "Full management of digital advertising related to social media platforms (Facebook, Instagram, LinkedIn, etc.). Fees include initial strategy, audience building (targeting and segmentation), comprehensive creative design, weekly monitoring and optimization, and monthly executive reporting."
            },
            {
                id: "social_management",
                name: "MANAGED SOCIAL PRESENCE",
                priceType: "options",
                options: [
                    { id: "basic", name: "Basic (1 platform, 4 posts/month)", price: 750 },
                    { id: "standard", name: "Standard (2 platforms, 8 posts/month)", price: 1250 },
                    { id: "premium", name: "Premium (3 platforms, 12 posts/month)", price: 1750 }
                ],
                description: "Management of social media presence including content creation, posting, community management, and performance reporting."
            },
            {
                id: "blog_content",
                name: "BLOG POSTS/CONTENT CREATION",
                priceType: "per_unit",
                unitPrice: 350,
                unitName: "post",
                description: "Creation of original blog posts or content pieces (500-1000 words) including research, writing, and basic SEO optimization."
            },
            {
                id: "email_marketing",
                name: "EMAIL MARKETING",
                priceType: "options",
                options: [
                    { id: "basic", name: "Basic (1 email/month)", price: 500 },
                    { id: "standard", name: "Standard (2 emails/month)", price: 900 },
                    { id: "premium", name: "Premium (4 emails/month)", price: 1600 }
                ],
                description: "Design, content creation, and distribution of email marketing campaigns including performance reporting."
            }
        ]
    }
];

// Client information fields
const clientInfoFields = [
    { id: "name", label: "Name" },
    { id: "title", label: "Title" },
    { id: "company", label: "Company" },
    { id: "email", label: "Email" },
    { id: "address", label: "Address" },
    { id: "date", label: "Date" },
    { id: "community", label: "Community" },
    { id: "location", label: "Location" }
];

// Quote form data model with calculation functions
const quoteFormDataModel = {
    // Expose the service categories and client info fields
    serviceCategories: serviceCategories,
    clientInfoFields: clientInfoFields,

    // Get default selections object
    getDefaultSelections: function() {
        return {
            clientInfo: {
                date: new Date().toISOString().split('T')[0]
            },
            services: {}
        };
    },

    // Calculate total costs based on selections - this is the function called from the HTML
    calculateTotalCosts: function(selections) {
        let totalOneTime = 0;
        let totalMonthly = 0;
        
        // Process each service category
        this.serviceCategories.forEach(category => {
            // Process subcategories
            category.subcategories.forEach(subcategory => {
                // Skip subheaders
                if (subcategory.subheader) return;
                
                const serviceId = subcategory.id;
                const serviceSelections = selections.services[serviceId];
                
                // If service is selected
                if (serviceSelections && serviceSelections.selected) {
                    const cost = this.calculateServiceCost(subcategory, serviceSelections);
                    totalOneTime += cost.oneTime || 0;
                    totalMonthly += cost.monthly || 0;
                }
            });
        });
        
        // Calculate annual and grand total
        const totalAnnual = totalMonthly * 12;
        const grandTotal = totalOneTime + totalAnnual;
        
        return {
            totalOneTime: totalOneTime,
            totalMonthly: totalMonthly,
            totalAnnual: totalAnnual,
            grandTotal: grandTotal
        };
    },
    
    // Calculate cost for a specific service based on its price type
    calculateServiceCost: function(service, selections) {
        switch(service.priceType) {
            case "fixed":
                return {
                    oneTime: service.price,
                    monthly: 0
                };
                
            case "options":
                const selectedOption = service.options.find(opt => opt.id === selections.selectedOption);
                return {
                    oneTime: selectedOption ? selectedOption.price : 0,
                    monthly: 0
                };
                
            case "range":
                // For range pricing, we use the custom price if provided, otherwise the minimum
                const customPrice = selections.customPrice || service.priceMin;
                return {
                    oneTime: parseFloat(customPrice),
                    monthly: 0
                };
                
            case "per_unit":
                const quantity = selections.quantity || 1;
                return {
                    oneTime: service.unitPrice * quantity,
                    monthly: 0
                };
                
            case "percentage":
                const adSpend = selections.adSpend || 0;
                const managementFee = Math.max(adSpend * service.percentageFee, service.minimumFee || 0);
                return {
                    oneTime: service.setupFee || 0,
                    monthly: managementFee
                };
                
            case "subscription":
                return {
                    oneTime: service.setupFee || 0,
                    monthly: service.monthlyFee || 0
                };
                
            default:
                return {
                    oneTime: 0,
                    monthly: 0
                };
        }
    },
    
    // Format currency
    formatCurrency: function(amount) {
        return '$' + amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
};
