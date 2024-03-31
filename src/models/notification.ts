export class Notification {

    id: string;
    sender_id: string;
    message: string;
    has_read: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted: boolean;

    constructor(id: string, sender_id: string, message: string, has_read: boolean, deleted: boolean = false) {
      this.id = id;
      this.sender_id = sender_id;
      this.message = message;
      this.has_read = has_read;
      this.created_at = new Date();
      this.updated_at = new Date();
      this.deleted = deleted;
    }

  }
