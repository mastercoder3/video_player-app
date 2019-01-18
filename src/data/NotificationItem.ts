export class NotificationItem {
  constructor(
    title: string,
    description: string,
    picture: string,
    isNew: boolean
  ) {
    this.title = title;
    this.description = description;
    this.dateTime = "15 Feb.";
    this.picture = picture;
    this.isNew = isNew;
  }

  title: string;
  description: string;
  dateTime: string;
  picture: string;
  isNew: boolean;
}
