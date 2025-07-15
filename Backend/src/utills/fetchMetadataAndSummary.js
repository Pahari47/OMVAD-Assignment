const axios = require('axios');
const cheerio = require('cheerio');

async function fetchMetadataAndSummary(url) {
  // Get title and favicon
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const title = $('title').text() || '';
  let favicon = $('link[rel="icon"]').attr('href') || '/favicon.ico';
  if (favicon && !favicon.startsWith('http')) {
    const u = new URL(url);
    favicon = u.origin + (favicon.startsWith('/') ? '' : '/') + favicon;
  }
  // Get summary from Jina AI
  let summary = '';
  try {
    const target = encodeURIComponent(url);
    const res = await axios.get(`https://r.jina.ai/${target}`);
    summary = typeof res.data === 'string' ? res.data : '';
    if (summary.length > 200) {
      summary = summary.slice(0, 200) + '...';
    }
  } catch (err) {
    console.error('Jina AI summary fetch failed:', err.response?.data || err.message);
    summary = 'Summary temporarily unavailable.';
  }
  return { title, favicon, summary };
}

module.exports = { fetchMetadataAndSummary }; 