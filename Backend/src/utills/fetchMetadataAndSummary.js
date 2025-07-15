const axios = require('axios');
const cheerio = require('cheerio');

async function fetchMetadataAndSummary(url) {
  // Fetch HTML
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  // Get title
  const title = $('title').text() || '';
  // Get favicon
  let favicon = $('link[rel="icon"]').attr('href') || '/favicon.ico';
  if (favicon && !favicon.startsWith('http')) {
    const u = new URL(url);
    favicon = u.origin + (favicon.startsWith('/') ? '' : '/') + favicon;
  }
  // Get summary from Jina AI
  let summary = '';
  try {
    const jinaRes = await axios.post('https://r.jina.ai/api/v1/summary', { url });
    summary = jinaRes.data.summary || '';
  } catch (err) {
    console.error('Jina AI summary fetch failed:', err.response?.data || err.message);
    summary = '';
  }
  return { title, favicon, summary };
}

module.exports = { fetchMetadataAndSummary }; 