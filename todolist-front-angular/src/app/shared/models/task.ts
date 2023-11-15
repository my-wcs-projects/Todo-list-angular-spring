export class Task {
  id?: number;
  title: string;
  isDone: boolean;

  constructor(title: string, isDone: boolean, id?: number) {
    this.id = id;
    this.title = title;
    this.isDone = isDone;
  }
}
