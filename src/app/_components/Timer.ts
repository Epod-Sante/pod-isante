export class Timer {
  constructor(public counter : number) {

    let intervalId = setInterval(() => {
      this.counter = this.counter - 1;
      console.log(this.counter)
      if(this.counter === 0) clearInterval(intervalId)
    }, 1000)
  }
}
