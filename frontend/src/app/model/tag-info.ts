export class TagInfo {
  _id?: string = '';
  name: string = '';
  total: number = 0;
  reach: number = 0;
  url?: string = '';
  wiki: Wiki = new Wiki();
}

export class Wiki {
  published?: string = '';
  summary: string = '';
  content: string = '';
}
