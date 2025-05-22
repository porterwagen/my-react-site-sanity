/**
 * Calculate the estimated reading time for content
 * 
 * @param {string} content - HTML or text content
 * @param {number} wordsPerMinute - Reading speed (default: 200 words per minute)
 * @returns {number} - Estimated reading time in minutes
 */
export function calculateReadTime(content, wordsPerMinute = 200) {
  // Strip HTML tags if present
  const textContent = content.replace(/<[^>]+>/g, '');
  
  // Count words (split by whitespace)
  const wordCount = textContent.trim().split(/\s+/).length;
  
  // Calculate reading time
  return Math.ceil(wordCount / wordsPerMinute);
}
