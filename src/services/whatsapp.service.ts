import axios from 'axios';

// The WhatsApp service using CallMeBot API
export const WhatsAppService = {
  /**
   * Send a WhatsApp message via CallMeBot.
   * Note: The user MUST have already saved the CallMeBot phone number
   * and sent the activation message "I allow callmebot to send me messages".
   * For ClientPulse V2 testing, the phone number must include the country code (e.g., +593...)
   * and the apiKey should be precisely the one provided by the bot.
   */
  async sendMessage(phone: string, text: string, apiKey: string) {
    try {
      // Clean phone number (remove spaces, ensure + prefix is encoded contextually)
      // Callmebot requires: phone=+CCC...
      const cleanPhone = phone.replace(/[\s-()]/g, '');
      const encodedPhone = encodeURIComponent(cleanPhone.startsWith('+') ? cleanPhone : `+${cleanPhone}`);
      const encodedText = encodeURIComponent(text);

      const url = `https://api.callmebot.com/whatsapp.php?phone=${encodedPhone}&text=${encodedText}&apikey=${apiKey}`;
      
      const response = await axios.get(url);
      
      console.log('CallMeBot Response:', response.data);
      
      // Callmebot returns HTML with success or error texts. We assume 200 is success. 
      // If the body contains "Error" or "Message Not Sent", it could be a logical error despite 200 OK.
      if (response.data && response.data.includes('Error')) {
         throw new Error('CallMeBot returned an error: ' + response.data);
      }

      return { success: true, data: response.data };
    } catch (error) {
       console.error("WhatsAppService.sendMessage Error:", error);
       throw error;
    }
  }
};
