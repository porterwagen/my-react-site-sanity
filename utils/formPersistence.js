// utils/formPersistence.js
/**
 * This module provides methods to persist form submissions
 * when third-party services are unavailable or you want a backup.
 */

import fs from 'fs/promises';
import path from 'path';

const SUBMISSIONS_DIR = path.join(process.cwd(), 'data', 'submissions');
const SUBMISSIONS_FILE = path.join(SUBMISSIONS_DIR, 'contact-submissions.json');

/**
 * Ensure the submissions directory exists
 */
async function ensureDirectoryExists() {
  try {
    await fs.access(SUBMISSIONS_DIR);
  } catch (error) {
    // Directory doesn't exist, create it
    await fs.mkdir(SUBMISSIONS_DIR, { recursive: true });
  }
}

/**
 * Load existing submissions from the JSON file
 * @returns {Array} Array of submissions
 */
async function loadSubmissions() {
  try {
    await ensureDirectoryExists();
    const fileExists = await fs.access(SUBMISSIONS_FILE).then(() => true).catch(() => false);
    
    if (!fileExists) {
      // Create the file with an empty array if it doesn't exist
      await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify([]));
      return [];
    }
    
    const data = await fs.readFile(SUBMISSIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading submissions:', error);
    return [];
  }
}

/**
 * Save a new form submission to the JSON file
 * @param {Object} submissionData - The form data to save
 * @returns {Object} - Result of the save operation
 */
export async function saveSubmission(submissionData) {
  try {
    // Add a unique ID and submission timestamp
    const enhancedData = {
      ...submissionData,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      savedAt: new Date().toISOString()
    };
    
    // Load existing submissions
    const submissions = await loadSubmissions();
    
    // Add new submission
    submissions.push(enhancedData);
    
    // Save back to file
    await fs.writeFile(
      SUBMISSIONS_FILE, 
      JSON.stringify(submissions, null, 2)
    );
    
    return { success: true, id: enhancedData.id };
  } catch (error) {
    console.error('Error saving submission:', error);
    return { success: false, error: error.message };
  }
}

// Note: The getSubmissions function was removed as it's no longer needed
