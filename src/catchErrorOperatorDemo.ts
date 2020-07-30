import { of, Subscription, Observable, OperatorFunction } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { arrayOfNumbers, romanNumeralCollection } from './shared/collectionsForDemos';



// https://rxjs-dev.firebaseapp.com/api/operators/catchError
export class CatchErrorOperatorDemo {
    
    //this observable return either number or string because we're going to catch the four and treat it as an error
    private _sourceForSubscription: Observable<string | number>

    //this is an augmented subscription that has a custom mapped function that gets applied before each emitted value
    private _pipedSubscription: Observable<unknown>;
    
    private _subscription: Subscription;

    constructor(
        //get an array of numbers
        public source = arrayOfNumbers
    ) {

        //this creates an observable for each item in the source array
        this._sourceForSubscription = of(...source) //of(1, 2, 3, 4, 5)

        //this pipes a map function to each item
        this._pipedSubscription = this._sourceForSubscription.pipe(
            //to be handled before the emitted value
            this.returnThenSuccessResult(),
            //to be used for any errors thrown within the nested mapped function
            this.returnCatchErrorResult()
        )

        this._subscription = this._pipedSubscription.subscribe(this.handleEmittedValue);
        // 1, 2, 3, I, II, III, IV, V
    }
    //return the pipe operator success function
    returnThenSuccessResult = (): OperatorFunction<string | number, string | number> => {
        return this.returnMapOperationFunction()
    }
    //return map operation function 
    returnMapOperationFunction = (): OperatorFunction<string | number, string | number> => {
        return map(this.mappedValueHandler)
    }
    mappedValueHandler = (value: number | string) => {

        //piping and then mapping enables custom error handling
        console.log(`Mapped function got value ${value}`)
        if (value === 4) {
            console.log(`Throwing error for value of 4`)
            throw 'four!';
        }

        //if individual value isn't an error based on domain logic then just pass it on to be emitted
        return value;
    }
    //return catch error operator result
    returnCatchErrorResult = (): OperatorFunction<unknown, unknown> => {

        //this i    s used for each value in the collection of emitted values after an error is thrown
        return catchError(this.catchErrorHandler)
    }
    //type observable of strings due to type of source
    catchErrorHandler = (err: Error): Observable<string> => of(...romanNumeralCollection)

    //handler for each individual value from the array of numbers
    handleEmittedValue = (number: number) => {
        setTimeout(() => {
            let indexOfNumber = this.source.indexOf(number)
            console.log(`Numeral: ${number} at index: ${indexOfNumber}, emited from subscription`)
        }, 1000)
    }
}