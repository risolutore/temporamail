const API_BASE = 'https://api.guerrillamail.com/ajax.php';

export class GuerrillaMailAPI {
  private sidToken: string | null = null;
  private emailAddress: string | null = null;

  async getEmailAddress(): Promise<{ email: string; sidToken: string }> {
    const response = await fetch(`${API_BASE}?f=get_email_address&ip=127.0.0.1&agent=Mozilla`);
    const data = await response.json();
    
    this.sidToken = data.sid_token;
    this.emailAddress = data.email_addr;
    
    return {
      email: data.email_addr,
      sidToken: data.sid_token
    };
  }

  async checkEmail(seq: number = 0): Promise<any> {
    if (!this.sidToken) throw new Error('No session token');
    
    const response = await fetch(
      `${API_BASE}?f=check_email&sid_token=${this.sidToken}&seq=${seq}`
    );
    return await response.json();
  }

  async fetchEmail(emailId: string): Promise<any> {
    if (!this.sidToken) throw new Error('No session token');
    
    const response = await fetch(
      `${API_BASE}?f=fetch_email&sid_token=${this.sidToken}&email_id=${emailId}`
    );
    return await response.json();
  }

  async setEmailUser(username: string): Promise<any> {
    const response = await fetch(
      `${API_BASE}?f=set_email_user&email_user=${username}&lang=en&sid_token=${this.sidToken || ''}`
    );
    const data = await response.json();
    
    this.sidToken = data.sid_token;
    this.emailAddress = data.email_addr;
    
    return data;
  }

  getCurrentEmail(): string | null {
    return this.emailAddress;
  }

  getSidToken(): string | null {
    return this.sidToken;
  }
}

export const guerrillaMailAPI = new GuerrillaMailAPI();
