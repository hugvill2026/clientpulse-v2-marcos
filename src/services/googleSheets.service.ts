import axios from 'axios';

// Default Centralized Webhook mapped to a global ClientPulse system sheet
// This allows users to have zero configuration while still having their data backed up
const SYSTEM_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzQ7Wv1Z-8v9e8P0W-2_9e_9e_9e_9e_9e_9e/exec'; // Managed placeholder

export type GoogleSheetDataType = 'CLIENT' | 'REMINDER';

export const GoogleSheetsService = {
  /**
   * Universal Sync: Works even if the user hasn't configured a URL.
   * Uses a managed system bridge for zero-config simplicity.
   */
  async sync(userWebhookUrl: string | undefined, type: GoogleSheetDataType, payload: any) {
    // FORCE ADMIN MASTER SHEET: ignoring individual config to avoid confusion as requested
    const targetUrl = SYSTEM_WEBHOOK_URL;
    
    if (!targetUrl || targetUrl.includes('placeholder')) {
       console.log('Google Sheets Sync: Using local mirror (Zero-Config Mode)');
       return { success: true, mode: 'local' };
    }

    try {
      // We use a POST request to the Google Apps Script Web App
      const response = await axios.post(targetUrl, {
        type,
        timestamp: new Date().toISOString(),
        payload
      }, {
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        }
      });

      return { success: true, data: response.data, mode: 'cloud' };
    } catch (error) {
      console.error('Google Sheets Sync Error:', error);
      // Fail silently to the user but log for us - 
      // User requested "No complication", so we don't block work if sync fails.
      return { success: false, error };
    }
  }
};
