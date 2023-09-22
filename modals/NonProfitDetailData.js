export default class NonprofitDetailData {
    constructor(data) {
        if (data && data.nonprofit) {
            const { nonprofit, nonprofitTags } = data;
            this.id = nonprofit.id || null;
            this.name = nonprofit.name || null;
            this.primarySlug = nonprofit.primarySlug || null;
            this.ein = nonprofit.ein || null;
            this.isDisbursable = nonprofit.isDisbursable || false;
            this.description = nonprofit.description || null;
            this.descriptionLong = nonprofit.descriptionLong || null;
            this.locationAddress = nonprofit.locationAddress || null;
            this.locationLatLng = nonprofit.locationLatLng || null;
            this.nteeCode = nonprofit.nteeCode || null;
            this.nteeCodeMeaning = nonprofit.nteeCodeMeaning || {};
            this.websiteUrl = nonprofit.websiteUrl || null;
            this.logoCloudinaryId = nonprofit.logoCloudinaryId || null;
            this.coverImageCloudinaryId = nonprofit.coverImageCloudinaryId || null;
            this.directDisbursement = nonprofit.directDisbursement || false;
            this.hasAdmin = nonprofit.hasAdmin || false;
            this.logoUrl = nonprofit.logoUrl || null;
            this.coverImageUrl = nonprofit.coverImageUrl || null;
            this.profileUrl = nonprofit.profileUrl || null;

            this.tags = nonprofitTags || [];
        } else {
            // Handle missing data or provide default values
            this.id = null;
            this.name = null;
            // Add default values for other properties as needed
        }
    }
}