export type StoryFlag = 'metIchika' | 'askedWhere' | 'askedWho' | 'trustedIchika';

export class StoryManager {
  private readonly flags = new Set<StoryFlag>();
  set(flag: StoryFlag): void { this.flags.add(flag); }
  has(flag: StoryFlag): boolean { return this.flags.has(flag); }
}