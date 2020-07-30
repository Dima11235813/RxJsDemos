// RxJS v6+
import { of, Observable, Subscription } from 'rxjs';
import { arrayOfNumbers } from './shared/collectionsForDemos';


export class OfOperatorDemo {
    subscription: Subscription;
    constructor(
        //emits any number of provided values in sequence
        public source = of(...arrayOfNumbers)

    ) {
        //subscribe to the observables created by the of operator
        this.subscription = this.getSubscription(source)
    }
    getSubscription = (source: Observable<number>): Subscription => source
        .subscribe((number: number) => console.log(`Number: ${number} emited from subscription`))
}

//output: 1,2,3,4,5