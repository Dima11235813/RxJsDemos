import { of, Observable, OperatorFunction, SchedulerLike } from 'rxjs';
import { switchMap } from "rxjs/operators";

export class SwitchMapRxJsDemo {
    constructor(
        public arrayOfNumbers = [1, 2, 3]
    ) {

        //perform the operations
        let subject = this.ofOperatorResult(arrayOfNumbers)

        //pipe the switch logic handler
        subject.pipe(this.switchLogicHandler);

        //subscribe to the results
        subject.subscribe(
            this.handlePushFromSubscription
        );
    }
    ofOperatorResult = (numberCollection: number[]): Observable<number> => {
        return of(...numberCollection)
    }
    switchMapHandler = (x: number, index: number): Observable<number> => {
        let one = x
        let two = x ** 2
        let three = x ** 3
        console.log(`Switch Map Handler Index: ${index} number: ${x}`)
        return this.getOfHandler([one, two, three])
    }
    getOfHandler = (collection: (number | SchedulerLike)[]): Observable<number> => {
        return of(...collection)
    }
    switchLogicHandler: OperatorFunction<number, number> = switchMap(this.switchMapHandler)
    handlePushFromSubscription = (number: number): void => {
        console.log(`Of Operator Result number value of ${number}`)
    }
}
