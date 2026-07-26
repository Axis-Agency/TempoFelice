// TempoFelice recruitment application routing configuration.
// Keep mode as 'google_form' until the optional GAS web app has been deployed.
window.TF_RECRUIT_APPLICATION = {
  mode: 'google_form',
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfBEROfsK2hPKZ-IAw7LDQGCIXNRhTbjj9r9Dau_qUAsWzllQ/viewform',
  gasWebAppUrl: '',
  googleFormEntryIds: {
    store: '', // Example: entry.123456789 (obtain from Google Forms prefilled-link function)
    source: ''
  },
  thanksUrl: 'https://axis-agency.github.io/TempoFelice/recruit-thanks.html'
};
