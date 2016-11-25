import { ChapterName } from './chapterName';
import { Verse } from './verse';

export class Chapter {
  constructor(
    public id: number,
    public name: ChapterName,
    public verses: Verse[]
  ) { }
}
