export class TagInfo {
  id: number = 0;
  name: string = '';
  total: number = 0;
  reach: number = 0;
  wiki: Wiki = new Wiki();
}

export class Wiki {
  summary: string = '';
  content: string = '';
}
