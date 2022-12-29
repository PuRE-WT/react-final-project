

export class Service {
  constructor() {
    const localSleeps = localStorage.getItem('sleeps');

    this.sleeps = localSleeps ? JSON.parse(localSleeps) : [];
  }

  syncToLocalStorage() {
    localStorage.setItem('sleeps', JSON.stringify(this.sleeps));
  }

  addSleep(sleep) {
    this.sleeps.push(sleep);
    this.syncToLocalStorage();
  }
}