export default class NonProfit {
  constructor(ein, name, profileUrl, matchedTerms, slug, location, tags) {
    this.ein = ein;
    this.name = name;
    this.profileUrl = profileUrl;
    this.matchedTerms = matchedTerms;
    this.slug = slug;
    this.location = location;
    this.tags = tags;
  }
}
