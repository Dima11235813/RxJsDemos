// RxJS v6+
import { of, Observable, Subscription } from 'rxjs';
import { arrayOfNumbers } from './shared/collectionsForDemos';


export class OfOperatorDemo {
    private _subscription: Subscription;
    private _sourceForSubscription: Observable<number>

    checkClosedSubscriptionInterval: NodeJS.Timeout

    constructor(
        public source = arrayOfNumbers
    ) {

        //emits any number of provided values in sequence
        this._sourceForSubscription = of(...source)

        //NOTE: this event is added to the event loop before the subscribe method is invoked on the collection of subscriptions
        this.checkClosedSubscriptionInterval = setInterval(() => {

            //set indicator of subscription active by polling
            console.log(`Subscription closed status: ${this._subscription.closed}`)

            //based on the sub state invoke the correct handler
            this._subscription.closed ?
                this.handleSubClosed() :
                this.handleSubStillOpen()
                
        //update console with sub status halfway through collection of emitted event handlers
        }, (this.intervalOfTimeToAdd * this.source.length) / 2)

        //subscribe to the observables created by the of operator
        this._subscription = this.getSubscription(this._sourceForSubscription)
    }

    //handle subscription is still open 
    handleSubClosed = () => {
        console.log("Clearing interval")
        clearInterval(this.checkClosedSubscriptionInterval)
    }
    //handle subscription is still open 
    handleSubStillOpen = () => {
        console.log("Subscription is not yet closed.")
        // this._subscription.unsubscribe()
    }
    //receives source and returns a subscription for the collection of observables created from source in constructor
    getSubscription = (source: Observable<number>): Subscription => {
        return source.subscribe(this.handleEmittedValue)
    }
    incrementingTime = 1000
    intervalOfTimeToAdd = 1000
    //handler for each individual value from the array of numbers
    handleEmittedValue = (number: number) => {
        setTimeout(() => {
            //show status of subscription
            console.log(`Status of subscription is ${this._subscription.closed}`)

            //show order of callback to be in order of items passed into of
            let indexOfNumber = this.source.indexOf(number)

            //log the data emitted from the subscription //output: 1,2,3,4,5
            console.log(`Number: ${number} at index: ${indexOfNumber}, emited from subscription`)
        }, this.incrementingTime += this.intervalOfTimeToAdd)
    }
}