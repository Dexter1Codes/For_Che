/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: affectionmessages
 * Interface for AffectionMessages
 */
export interface AffectionMessages {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  messageText?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType text */
  senderName?: string;
  /** @wixFieldType text */
  recipientName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  messageImage?: string;
  /** @wixFieldType date */
  dateCreated?: Date | string;
}
