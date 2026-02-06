export interface Email {
  mail_id: string;
  mail_from: string;
  mail_subject: string;
  mail_excerpt: string;
  mail_timestamp: number;
  mail_date: string;
  mail_read: boolean;
}

export interface EmailDetail extends Email {
  mail_body: string;
}

export interface GuerrillaMailResponse {
  email_addr: string;
  email_timestamp: number;
  alias: string;
  sidtoken: string;
}

export interface EmailListResponse {
  list: Email[];
}
